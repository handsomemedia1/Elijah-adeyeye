import SEO from '../components/SEO';
import { siteConfig, timeline, education, certifications, skills } from '../data/siteData';
import { HiDownload } from 'react-icons/hi';
import './CVPage.css';

export default function CVPage() {
  return (
    <div className="cv-page page-enter">
      <SEO
        title="Curriculum Vitae"
        description="Curriculum Vitae of Elijah Adeyeye, AI, Behavioural & Cybersecurity Researcher."
        path="/cv"
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="section-header__label">Academic & Professional Record</span>
          <h1 className="page-hero__title"><span className="gradient-text">Curriculum Vitae</span></h1>
          <p className="page-hero__subtitle">
            A summary of my research, experience, and education.
          </p>
          <a href={siteConfig.cvUrl} className="btn btn--primary" style={{ marginTop: 'var(--space-6)' }} target="_blank" rel="noopener noreferrer">
            <HiDownload /> Download PDF
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container cv-page__container">
          <div className="cv-page__main">
            <h2 className="cv-page__section-title">Experience</h2>
            <div className="cv-page__timeline">
              {timeline.map((item, i) => (
                <div key={i} className="cv-page__item glass">
                  <div className="cv-page__item-header">
                    <h3>{item.title}</h3>
                    <span className="cv-page__item-period">{item.period}</span>
                  </div>
                  <h4 className="cv-page__item-company">{item.company}</h4>
                  <p className="cv-page__item-desc">{item.description}</p>
                </div>
              ))}
            </div>

            <h2 className="cv-page__section-title">Education</h2>
            <div className="cv-page__timeline">
              {education.map((item, i) => (
                <div key={i} className="cv-page__item glass">
                  <div className="cv-page__item-header">
                    <h3>{item.degree}</h3>
                    <span className="cv-page__item-period">{item.period}</span>
                  </div>
                  <h4 className="cv-page__item-company">{item.institution}</h4>
                </div>
              ))}
            </div>
          </div>

          <aside className="cv-page__sidebar">
            <div className="glass cv-page__sidebar-box">
              <h3>Technical Skills</h3>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="cv-page__skill-group">
                  <h4>{category}</h4>
                  <div className="cv-page__skill-tags">
                    {items.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass cv-page__sidebar-box">
              <h3>Certifications</h3>
              <ul className="cv-page__cert-list">
                {certifications.map((cert, i) => (
                  <li key={i}>
                    <span className="cv-page__cert-icon">{cert.icon}</span>
                    <div className="cv-page__cert-details">
                      <span className="cv-page__cert-name">{cert.name}</span>
                      {cert.issuer && <span className="cv-page__cert-issuer">{cert.issuer} {cert.year ? `(${cert.year})` : ''}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
