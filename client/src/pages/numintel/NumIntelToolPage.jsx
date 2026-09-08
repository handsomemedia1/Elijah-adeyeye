import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import NumIntelTool from '../../components/numintel/NumIntelTool';
import '../NumIntelPage.css';

const TOOL_CONTENT = {
  'phone-number-validator': {
    title: 'Phone Number Validator',
    description: 'Verify phone number validity, format, and line type securely.',
    h1: 'Phone Number Validator',
    subtitle: 'Check if a phone number is valid, extract its country code, and format it correctly without exposing personal data.',
    article: 'NumIntel validates phone numbers using international standards (E.164). This tool instantly checks the numbering plan length, country code, and extracts formatting information. We do not store or share your input.'
  },
  'international-phone-number-validator': {
    title: 'International Phone Number Validator',
    description: 'Validate and format international phone numbers accurately.',
    h1: 'International Validator',
    subtitle: 'Parse global phone numbers into international dialing formats.',
    article: 'Dialing internationally requires dropping national trunk prefixes and correctly applying country calling codes. This tool parses any raw number into the correct international format, ensuring cross-border routing succeeds.'
  },
  'e164-phone-number-validator': {
    title: 'E.164 Phone Number Validator & Converter',
    description: 'Convert and validate phone numbers into strict E.164 format for APIs and telecom routing.',
    h1: 'E.164 Validator',
    subtitle: 'Ensure your phone numbers are ready for Twilio, WhatsApp, and global SMS APIs.',
    article: 'The E.164 format is the international public telecommunication numbering plan. It dictates that numbers can have a maximum of 15 digits and must begin with a plus sign. Our E.164 converter strips invalid characters and applies the correct country code.'
  }
};

export default function NumIntelToolPage({ toolId }) {
  // If not passed via props (from AppRoutes), try params
  const { toolSlug } = useParams();
  const currentId = toolId || toolSlug;
  const content = TOOL_CONTENT[currentId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentId]);

  if (!content) {
    return <Navigate to="/numintel" replace />;
  }

  return (
    <div className="numintel page-enter">
      <SEO
        title={`${content.title} | NumIntel`}
        description={content.description}
        path={`/numintel/${currentId}`}
      />
      
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Link to="/numintel" className="breadcrumb">← Back to NumIntel</Link>
          <h1 className="page-hero__title" style={{ marginTop: 'var(--space-4)' }}>{content.h1}</h1>
          <p className="page-hero__subtitle">{content.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <NumIntelTool />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: 'var(--space-8)' }}>
            <h3>About this tool</h3>
            <p style={{ marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
              {content.article}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}