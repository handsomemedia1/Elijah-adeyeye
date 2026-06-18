import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { HiArrowRight, HiMail } from 'react-icons/hi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { researchInterests, activeProjects, collaborators } from '../data/siteData';
import './ResearchPage.css';

export default function ResearchPage() {
  const [philRef, philVisible] = useScrollReveal();
  const [collabRef, collabVisible] = useScrollReveal();

  return (
    <div className="research page-enter">
      <SEO
        title="Research — Active Projects"
        description="Current research collaborations in computational psychology, AI empathy, and cybersecurity with Norfolk State University."
        path="/research"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_research_1776720529427.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Research</span>
          <h1 className="page-hero__title">Ongoing <span className="gradient-text">Research</span></h1>
          <p className="page-hero__subtitle">Research pipeline, collaborations, and methodology</p>
        </div>
      </section>

      {/* Research Interests */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Focus Areas</span>
            <h2 className="section-header__title">Research Interests</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-4 research__interests">
            {researchInterests.map((r, i) => (
              <div key={i} className="interest-card glass">
                <span className="interest-card__icon">{r.icon}</span>
                <h3 className="interest-card__title">{r.title}</h3>
                <p className="interest-card__desc">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Projects */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Pipeline</span>
            <h2 className="section-header__title">Active Projects</h2>
            <div className="accent-line" />
          </div>
          <div className="research__projects">
            {activeProjects.map((p, i) => (
              <div key={i} className="project-card glass">
                <div className="project-card__header">
                  <span className={`pub-card__badge ${p.status === 'Accepted' ? 'badge--accepted' : 'badge--review'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.description}</p>
                <div className="project-card__collab">
                  <span className="project-card__collab-label">Collaborator:</span>
                  <span>{p.collaborator}</span>
                  <span className="project-card__institution">— {p.institution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="section" ref={collabRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Team</span>
            <h2 className="section-header__title">Collaborators</h2>
            <div className="accent-line" />
          </div>
          <div className={`research__collaborators ${collabVisible ? 'visible' : ''}`}>
            {collaborators.map((c, i) => (
              <div key={i} className="collab-card glass">
                <div className="collab-card__avatar">
                  {c.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="collab-card__info">
                  <h3>{c.name}</h3>
                  <p className="collab-card__role">{c.role}</p>
                  <p className="collab-card__institution">{c.institution}</p>
                  <p className="collab-card__desc">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="section section-alt" ref={philRef}>
        <div className="container container-narrow">
          <div className={`research__philosophy glass ${philVisible ? 'visible' : ''}`}>
            <span className="section-header__label">Philosophy</span>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Research Philosophy</h2>
            <p>My research lives at the intersection of behavioral science and cybersecurity — two fields that rarely speak the same language but share a common subject: human behavior under pressure.</p>
            <p>I believe the most effective security systems are those built with an understanding of human psychology. Technical defenses alone cannot account for the social engineering, cognitive biases, and emotional responses that threat actors exploit daily.</p>
            <p>My interdisciplinary approach draws from counselling psychology, statistical analysis, machine learning, and applied cybersecurity to build research that is both rigorous and practically actionable.</p>
          </div>
        </div>
      </section>

      {/* Open to Collaborate */}
      <section className="section research__cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-header__title">Open to Collaboration</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)' }}>
            I'm particularly interested in collaborative research on behavioral cybersecurity,
            AI in mental health, and machine learning applications in social science.
          </p>
          <Link to="/contact" className="btn btn--primary">
            <HiMail /> Get In Touch <HiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
