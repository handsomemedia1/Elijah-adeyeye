import { useEffect } from 'react';
import SEO from '../components/SEO';
import { researchInterests, activeProjects } from '../data/siteData';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './ResearchPage.css';

export default function ResearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="research page-enter">
      <SEO
        title="Research — Human Behavior & Cybersecurity"
        description="Research by Elijah Adeyeye across AI evaluation, human behaviour, behavioural cybersecurity, AI and cybersecurity, and AI research integrity."
        path="/research"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 210, 170, 0.05) 0%, transparent 50%)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Academic Focus</span>
          <h1 className="page-hero__title"><span className="gradient-text">Research</span></h1>
          <p className="page-hero__subtitle">
            Researching the intersection of artificial intelligence, human behaviour, security, and high-stakes decision-making.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Research Pillars</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-2">
            {researchInterests.map((item, i) => (
              <Link key={i} to={`/research/${item.slug}`} className="research-card glass" style={{ textDecoration: 'none' }}>
                <div className="research-card__icon">{item.icon}</div>
                <h3 className="research-card__title">{item.title}</h3>
                <p className="research-card__desc">{item.description}</p>
                <span className="btn btn--ghost" style={{ marginTop: 'var(--space-4)', padding: 0 }}>
                  View Research <HiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Active Research</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {activeProjects.map((project, i) => (
              <div key={i} className="active-project glass-strong">
                <div className="active-project__header">
                  <span className={`active-project__status ${project.status === 'Published' || project.status === 'Accepted' ? 'status--active' : 'status--review'}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="active-project__title">{project.title}</h3>
                <p className="active-project__desc">{project.description}</p>
                <div className="active-project__meta">
                  <span><strong>With:</strong> {project.collaborator}</span>
                  <span><strong>At:</strong> {project.institution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
