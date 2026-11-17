import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import NumIntelTool from '../../components/numintel/NumIntelTool';
import { numintelCountries } from '../../data/numintelCountries';
import '../NumIntelPage.css';

export default function CountryPage() {
  const { countrySlug } = useParams();
  const country = numintelCountries.find(c => c.slug === countrySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countrySlug]);

  if (!country) {
    return <Navigate to="/numintel/countries" replace />;
  }

  const related = numintelCountries.filter(c => country.relatedCountries.includes(c.slug));

  // Answers built only from this country's data, shown on the page and repeated as FAQ structured data.
  const faqs = [
    {
      q: `What is the country code for ${country.name}?`,
      a: `The international calling code for ${country.name} is ${country.callingCode}. A number in international format looks like ${country.internationalFormatExample}.`,
    },
    {
      q: `How do I write a ${country.name} phone number in international format?`,
      a: `Put ${country.callingCode} in front of the national number and drop a leading 0 trunk prefix if it has one. For example, ${country.nationalFormatExample} becomes ${country.internationalFormatExample}.`,
    },
    country.mobilePrefixes?.length && {
      q: `What do ${country.name} mobile numbers start with?`,
      a: `In national format, ${country.name} mobile numbers commonly start with ${country.mobilePrefixes.join(', ')}.`,
    },
    country.commonFormattingMistakes && {
      q: `What is a common mistake when formatting ${country.name} numbers?`,
      a: country.commonFormattingMistakes,
    },
  ].filter(Boolean);

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <div className="numintel page-enter">
      <SEO
        title={`${country.name} Phone Number Validator & Formatter | NumIntel`}
        description={`Validate ${country.name} phone numbers. Learn the numbering plan, calling code (${country.callingCode}), and correct E.164 formatting.`}
        path={`/numintel/countries/${country.slug}`}
        jsonLd={[faqSchema]}
      />
      
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Link to="/numintel/countries" className="breadcrumb">← All Countries</Link>
          <h1 className="page-hero__title" style={{ marginTop: 'var(--space-4)' }}>{country.name} Phone Number Validator</h1>
          <p className="page-hero__subtitle">
            Validate numbers in {country.name}, extract formats, and understand the {country.callingCode} numbering plan.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <NumIntelTool defaultCountry={country.isoCode} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: 'var(--space-8)' }}>
            <h2>Numbering Plan for {country.name}</h2>
            
            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3>Calling Code</h3>
              <p className="ni-result__value" style={{ fontSize: '1.5rem', margin: 'var(--space-2) 0' }}>{country.callingCode}</p>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3>Structure</h3>
              <p>{country.numberingPlan}</p>
            </div>

            <div className="grid-2" style={{ marginTop: 'var(--space-6)' }}>
              <div>
                <h4>Int. Format Example</h4>
                <code style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                  {country.internationalFormatExample}
                </code>
              </div>
              <div>
                <h4>National Example</h4>
                <code style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                  {country.nationalFormatExample}
                </code>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3>Mobile Prefixes</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {country.mobilePrefixes.map(p => (
                  <span key={p} style={{ padding: '0.2rem 0.6rem', background: 'var(--color-primary)', color: 'black', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3>Fixed Lines</h3>
              <p>{country.fixedLineInformation}</p>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3>Validation Notes & Common Mistakes</h3>
              <p style={{ marginTop: '0.5rem' }}><strong>Notes:</strong> {country.validationNotes}</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Mistakes to avoid:</strong> {country.commonFormattingMistakes}</p>
            </div>
            
            <p style={{ marginTop: 'var(--space-6)', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              Last verified: {country.lastVerified}
            </p>
          </div>

          <div className="ni-faq">
            <h2>{country.name} phone numbers: common questions</h2>
            {faqs.map(({ q, a }) => (
              <details key={q} className="ni-faq__item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 'var(--space-8)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Countries</h3>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {related.map(r => (
                  <Link key={r.slug} to={`/numintel/countries/${r.slug}`} className="btn btn--outline">
                    {r.name} ({r.callingCode})
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}