import { useState } from 'react';
import { HiClipboardCopy, HiCheck, HiPhone, HiGlobe, HiIdentification, HiDocumentDuplicate } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa6';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [copiedReport, setCopiedReport] = useState(false);
  const handleCopyReport = () => {
    const reportText = `NumIntel Report for ${result.formatted}
Carrier: ${result.carrier?.name || 'Unknown'}
Score: ${result.score}/100
Valid: ${result.isValid ? 'Yes' : 'Unverified'}
Reports: ${result.reportCount}
View more at https://elijahadeyeye.vercel.app/numintel`;
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const carrierColor = result.carrier?.color || 'var(--color-primary)';

  return (
    <div className="ni-result glass" style={{ '--carrier-color': carrierColor }}>
      <div className="ni-result__header">
        <h3 className="ni-result__title">
          <HiIdentification /> Number Intelligence
        </h3>
        <span className="ni-result__timestamp">
          {new Date(result.checkedAt).toLocaleString()}
        </span>
      </div>

      <div className="ni-result__grid">
        <div className="ni-result__item">
          <span className="ni-result__label"><HiPhone /> Phone</span>
          <span className="ni-result__value">
            {result.formatted}
            <button className="ni-result__copy" onClick={handleCopy} title="Copy">
              {copied ? <HiCheck /> : <HiClipboardCopy />}
            </button>
          </span>
        </div>
        
        <div className="ni-result__item">
          <span className="ni-result__label"><HiGlobe /> Country</span>
          <span className="ni-result__value">{result.country}</span>
        </div>

        <div className="ni-result__item">
          <span className="ni-result__label">📡 Carrier</span>
          <span className="ni-result__value">
            {result.carrier ? (
              <span className="ni-result__carrier" style={{ color: carrierColor }}>
                {result.carrier.name}
              </span>
            ) : (
              <span className="ni-result__unknown">Not detected</span>
            )}
          </span>
        </div>

        <div className="ni-result__item">
          <span className="ni-result__label">📱 Line Type</span>
          <span className="ni-result__value ni-result__line-type">
            {result.lineType === 'mobile' ? 'Mobile' :
             result.lineType === 'voip' ? 'VoIP' :
             result.lineType === 'landline' ? 'Landline' : 'Unknown'}
          </span>
        </div>

        <div className="ni-result__item">
          <span className="ni-result__label">✅ Valid</span>
          <span className={`ni-result__value ${result.isValid ? 'ni-result__valid' : 'ni-result__invalid'}`}>
            {result.isValid ? 'Yes' : 'Unverified'}
          </span>
        </div>

        <div className="ni-result__item">
          <span className="ni-result__label">📋 Reports</span>
          <span className={`ni-result__value ${result.reportCount > 0 ? 'ni-result__danger-count' : ''}`}>
            {result.reportCount} report{result.reportCount !== 1 ? 's' : ''}
          </span>
        </div>

        {result.allocationYear && (
          <div className="ni-result__item">
            <span className="ni-result__label">📅 Est. Age</span>
            <span className="ni-result__value">{result.allocationYear}</span>
          </div>
        )}
      </div>

      {result.inScamDataset && (
        <div className="ni-result__alert ni-result__alert--danger">
          ⚠️ This number is in the Nigerian Scam Number Database
        </div>
      )}

      <div className="ni-result__actions" style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
        <a 
          href={`https://wa.me/${result.phone.replace('+', '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn--outline"
          style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}
        >
          <FaWhatsapp /> WhatsApp Check
        </a>
        <button 
          className="btn btn--primary"
          onClick={handleCopyReport}
          style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}
        >
          {copiedReport ? <HiCheck /> : <HiDocumentDuplicate />} 
          {copiedReport ? 'Copied!' : 'Copy Report'}
        </button>
      </div>
    </div>
  );
}
