export const ngCarrierPrefixes = {
  'MTN': {
    prefixes: ['0803','0806','0813','0816','0703','0706','0710','0810','0814','0903','0906','0913','0916'],
    color: '#FFCC00',
    darkColor: '#FFA500'
  },
  'Airtel': {
    prefixes: ['0802','0808','0812','0701','0708','0902','0907','0901','0912'],
    color: '#FF0000',
    darkColor: '#CC0000'
  },
  'Glo': {
    prefixes: ['0805','0807','0811','0815','0705','0905','0915'],
    color: '#00A550',
    darkColor: '#008040'
  },
  '9mobile': {
    prefixes: ['0809','0817','0818','0908','0909'],
    color: '#006B3F',
    darkColor: '#004D2E'
  }
};

export const scamDataset = {
  version: '1.0.0',
  lastUpdated: '2026-06-01',
  source: 'Community submissions + public reports',
  numbers: [
    '+2348001234567',
    '+2349012345678'
  ]
};

export const breachSources = [
  {
    name: 'Facebook',
    date: '2021-04-03',
    records: 533000000,
    dataTypes: ['phone','name','email','location'],
    affectedCountries: ['NG','US','GB','EG','IN','BR'],
    description: 'Phone numbers scraped via contact importer feature. 11.5 million Nigerian accounts affected.'
  },
  {
    name: 'Clubhouse',
    date: '2021-07-24',
    records: 3800000,
    dataTypes: ['phone','name','username'],
    affectedCountries: ['US','GB','NG','GH'],
    description: 'SQL database with phone numbers linked to user profiles scraped and posted on hacker forum.'
  },
  {
    name: 'LinkedIn',
    date: '2021-06-22',
    records: 700000000,
    dataTypes: ['phone','email','name','location'],
    affectedCountries: ['US','GB','NG','IN','BR'],
    description: 'Data scraped from public profiles including phone numbers where users had them visible.'
  }
];

export const scoreCategories = {
  clean: { min: 80, label: 'Clean', color: 'var(--color-success, #63D2AA)', description: 'This number shows no signs of malicious activity.' },
  caution: { min: 50, label: 'Caution', color: 'var(--color-highlight, #F7B955)', description: 'Some signals suggest potential risk. Proceed with caution.' },
  danger: { min: 0, label: 'Danger', color: 'var(--color-danger, #FF6B6B)', description: 'Multiple red flags detected. This number is likely associated with scam activity.' }
};

export const reportCategories = [
  'Phone Scam',
  'SMS Scam', 
  'WhatsApp Fraud',
  'Impersonation',
  'Advance Fee Fraud',
  'Spam Calls',
  'Other'
];

export function detectNigerianCarrier(phoneNumber) {
  let normalized = phoneNumber.replace(/\s+/g, '');
  if (normalized.startsWith('+234')) {
    normalized = '0' + normalized.slice(4);
  } else if (normalized.startsWith('234')) {
    normalized = '0' + normalized.slice(3);
  }
  
  const prefix = normalized.substring(0, 4);
  
  for (const [carrier, data] of Object.entries(ngCarrierPrefixes)) {
    if (data.prefixes.includes(prefix)) {
      return { carrier, color: data.color, darkColor: data.darkColor };
    }
  }
  return null;
}

export function getEstimatedAllocationYear(phoneNumber) {
  let normalized = phoneNumber.replace(/\s+/g, '');
  if (normalized.startsWith('+234')) {
    normalized = '0' + normalized.slice(4);
  } else if (normalized.startsWith('234')) {
    normalized = '0' + normalized.slice(3);
  }
  const prefix = normalized.substring(0, 4);

  const early = ['0802', '0803', '0804', '0805'];
  const mid = ['0702', '0703', '0705', '0806', '0807', '0808'];
  const late = ['0809', '0810', '0811', '0812', '0813', '0814', '0815', '0816', '0817', '0818'];
  const newer = ['0902', '0903', '0905', '0906', '0908', '0909'];
  const newest = ['0912', '0913', '0915', '0916', '0701', '0704', '0706', '0708', '0710', '0901', '0907'];

  if (early.includes(prefix)) return '2001 - 2003';
  if (mid.includes(prefix)) return '2006 - 2008';
  if (late.includes(prefix)) return '2008 - 2012';
  if (newer.includes(prefix)) return '2013 - 2015';
  if (newest.includes(prefix)) return '2016+';
  return 'Unknown';
}

export function getScoreCategory(score) {
  if (score >= scoreCategories.clean.min) return scoreCategories.clean;
  if (score >= scoreCategories.caution.min) return scoreCategories.caution;
  return scoreCategories.danger;
}
