import { useState, useCallback } from 'react';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { supabase } from '../lib/supabase';
import { detectNigerianCarrier, scamDataset, breachSources, getEstimatedAllocationYear } from '../data/numIntelData';

const RATE_LIMIT_KEY = 'numintel_lookups';
const MAX_LOOKUPS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit() {
  const stored = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
  const now = Date.now();
  const recent = stored.filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_LOOKUPS) {
    const resetIn = Math.ceil((recent[0] + WINDOW_MS - now) / 60000);
    return { allowed: false, resetIn };
  }
  recent.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  return { allowed: true };
}

function calculateScore(signals) {
  let score = 100;
  const reasons = [];

  if (signals.isVoIP) {
    score -= 20;
    reasons.push({ text: 'VoIP number — commonly used by scammers', points: -20 });
  }
  if (signals.communityReports > 0) {
    const deduct = Math.min(signals.communityReports * 10, 40);
    score -= deduct;
    reasons.push({ text: `${signals.communityReports} community report(s) found`, points: -deduct });
  }
  if (signals.inScamDataset) {
    score -= 30;
    reasons.push({ text: 'Found in Nigerian scam number dataset', points: -30 });
  }
  if (signals.breachExposure) {
    score -= 10;
    reasons.push({ text: 'Country affected by known data breaches with phone data', points: -10 });
  }
  if (!signals.isValid) {
    score -= 15;
    reasons.push({ text: 'Number format could not be fully validated', points: -15 });
  }
  if (signals.carrierDetected) {
    // Good signal — no deduction, but add positive reason
    reasons.push({ text: `Carrier identified: ${signals.carrierName}`, points: 0 });
  }

  return { score: Math.max(score, 0), reasons };
}

export function useNumberLookup() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = useCallback(async (rawInput, defaultCountry = 'NG') => {
    setError(null);
    setResult(null);

    // Rate limit check
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setError(`Too many lookups. Try again in ${rateCheck.resetIn} minute(s).`);
      return;
    }

    // Validate and parse
    let parsed, e164, international, country, isValid;
    try {
      isValid = isValidPhoneNumber(rawInput, defaultCountry);
      if (!isValid) {
        // Try parsing anyway for partial results
        try {
          parsed = parsePhoneNumber(rawInput, defaultCountry);
          e164 = parsed.format('E.164');
          international = parsed.formatInternational();
          country = parsed.country;
        } catch {
          setError('Invalid phone number. Please check the format and try again.');
          return;
        }
      } else {
        parsed = parsePhoneNumber(rawInput, defaultCountry);
        e164 = parsed.format('E.164');
        international = parsed.formatInternational();
        country = parsed.country;
      }
    } catch {
      setError('Could not parse this number. Please enter a valid phone number.');
      return;
    }

    setLoading(true);

    try {
      // 1. Detect Nigerian carrier from prefix
      const carrierInfo = detectNigerianCarrier(e164);

      // 2. Check community reports from Supabase
      let reportCount = 0;
      let reports = [];
      try {
        const { data, error: dbError } = await supabase
          .from('numintel_reports')
          .select('*')
          .eq('phone', e164)
          .order('created_at', { ascending: false });

        if (!dbError && data) {
          reports = data;
          reportCount = data.length;
        }
      } catch {
        // Supabase might not have table yet — continue gracefully
      }

      // 3. Check scam dataset
      const inScamDataset = scamDataset.numbers.includes(e164);

      // 4. Check breach exposure (by country)
      const relevantBreaches = breachSources.filter(
        b => b.affectedCountries.includes(country || 'NG')
      );

      // External APIs integration
      const IPQS_KEY = 'TMTd6YrDYIbRSJrsEQBwdMXrUsAC0shO';
      const NUMVERIFY_KEY = 'D8Ob3OV31JjG2MvF1qVz3MQaareHQZrC';
      
      const cleanPhone = e164.replace('+', '');
      let isVoIP = false;
      let apiCarrier = null;
      let apiLineType = null;
      let apiValid = isValid; // Default to local parsing validation
      
      try {
        // Try fetching from Numverify (APILayer)
        const nvPromise = fetch(`https://api.apilayer.com/number_verification/validate?number=${cleanPhone}`, {
          headers: { 'apikey': NUMVERIFY_KEY }
        }).then(r => r.json()).catch(() => null);
        
        // Try fetching from IPQualityScore
        const ipqsPromise = fetch(`https://www.ipqualityscore.com/api/json/phone/${IPQS_KEY}/${cleanPhone}`)
          .then(r => r.json()).catch(() => null);
          
        const [nvData, ipqsData] = await Promise.all([nvPromise, ipqsPromise]);
        
        if (nvData && nvData.valid !== undefined) {
          apiValid = nvData.valid;
          if (nvData.line_type) apiLineType = nvData.line_type.toLowerCase();
          if (nvData.carrier) apiCarrier = nvData.carrier;
        }
        
        if (ipqsData && ipqsData.success) {
          if (ipqsData.voip) isVoIP = true;
          if (ipqsData.spammer) reportCount += 1; // Count as community report equivalent
          if (ipqsData.line_type) apiLineType = ipqsData.line_type.toLowerCase();
          if (ipqsData.carrier && !apiCarrier) apiCarrier = ipqsData.carrier;
        }
      } catch (err) {
        console.warn('External API lookup failed, falling back to local dataset.', err);
      }

      // 5. Calculate score
      const signals = {
        isVoIP, 
        communityReports: reportCount,
        inScamDataset,
        breachExposure: relevantBreaches.length > 0,
        isValid: apiValid,
        carrierDetected: !!carrierInfo || !!apiCarrier,
        carrierName: carrierInfo?.carrier || apiCarrier || 'Unknown',
      };

      const { score, reasons } = calculateScore(signals);
      
      const allocationYear = country === 'NG' ? getEstimatedAllocationYear(e164) : 'Unknown';

      setResult({
        phone: e164,
        formatted: international,
        country: country || defaultCountry,
        carrier: carrierInfo ? {
          name: carrierInfo.carrier,
          color: carrierInfo.color,
          darkColor: carrierInfo.darkColor,
        } : apiCarrier ? {
          name: apiCarrier,
          color: 'var(--color-primary)',
          darkColor: 'var(--color-primary)',
        } : null,
        lineType: apiLineType || (carrierInfo ? 'mobile' : 'unknown'),
        score,
        reasons,
        reports,
        reportCount,
        inScamDataset,
        breaches: relevantBreaches,
        isValid: apiValid,
        allocationYear,
        checkedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError('Lookup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, lookup, reset };
}
