import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { numintelCountries } from '../../data/numintelCountries';
import '../NumIntelPage.css';

export default function CountryListPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="numintel page-enter">
      <SEO
        title="International Phone Number Validation by Country | NumIntel"
        description="Browse phone number validation rules, calling codes, and numbering plans for countries worldwide."
        path="/numintel/countries"
      />
      
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Link to="/numintel" className="breadcrumb">← Back to NumIntel</Link>
          <h1 className="page-hero__title" style={{ marginTop: 'var(--space-4)' }}>Supported Countries</h1>
          <p className="page-hero__subtitle">
            Explore country-specific numbering plans, formats, and validation rules.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {numintelCountries.map(country => (
              <Link key={country.slug} to={`/numintel/countries/${country.slug}`} className="glass numintel__country-card" style={{ textDecoration: 'none', color: 'inherit', padding: 'var(--space-6)', display: 'block', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {country.name} 
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{country.callingCode}</span>
                </h3>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  View numbering plan and validator
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}