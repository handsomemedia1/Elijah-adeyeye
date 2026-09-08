import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import NumIntelTool from '../../components/numintel/NumIntelTool';
import LeaderBoard from '../../components/numintel/LeaderBoard';
import { useReports } from '../../hooks/useReports';
import { numintelCountries } from '../../data/numintelCountries';
import '../NumIntelPage.css'; // Reuse existing styles

export default function NumIntelLanding() {
  const { leaderboard, loading: reportsLoading } = useReports();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="numintel page-enter">
      <SEO
        title="NumIntel — International Phone Number Intelligence"
        description="Validate, format and understand phone numbers across international numbering systems. Privacy-first phone intelligence."
        path="/numintel"
      />
      
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 210, 170, 0.05) 0%, transparent 50%)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Open Source OSINT</span>
          <h1 className="page-hero__title"><span className="gradient-text">NumIntel</span></h1>
          <p className="page-hero__subtitle">
            Validate, format and understand phone numbers across international numbering systems. 
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <NumIntelTool />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Explore</span>
            <h2 className="section-header__title">Global Intelligence</h2>
            <div className="accent-line" />
          </div>
          
          <div className="grid-2">
            <div className="numintel__info glass">
              <h3>Popular Phone Number Tools</h3>
              <ul className="numintel__features">
                {numintelCountries.slice(0, 5).map(country => (
                  <li key={country.slug}>
                    <Link to={`/numintel/countries/${country.slug}`}>
                      {country.name} Phone Number Validator
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 style={{ marginTop: 'var(--space-6)' }}>Educational Guides</h3>
              <ul className="numintel__features">
                <li><Link to="/numintel/guides/what-is-e164">What is E.164 Phone Number Format?</Link></li>
                <li><Link to="/numintel/guides/international-phone-number-format">International Formatting Guide</Link></li>
                <li><Link to="/numintel/guides/phone-number-validation">How Validation Actually Works</Link></li>
              </ul>
            </div>
            
            <LeaderBoard leaderboard={leaderboard} loading={reportsLoading} />
          </div>
        </div>
      </section>
    </div>
  );
}