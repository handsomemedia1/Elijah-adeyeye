import SEO from '../components/SEO';
import { siteConfig } from '../data/siteData';
import { HiArrowRight, HiMail } from 'react-icons/hi';
import './CollaboratePage.css';

export default function CollaboratePage() {
  return (
    <div className="collaborate-page page-enter">
      <SEO
        title="Collaborate"
        description="Partner with Elijah Adeyeye for research collaboration, AI evaluation, and cybersecurity consulting."
        path="/collaborate"
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="section-header__label">Work With Me</span>
          <h1 className="page-hero__title"><span className="gradient-text">Collaboration</span></h1>
          <p className="page-hero__subtitle">
            Open to research partnerships, technical consulting, and speaking engagements.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            <div className="glass collaborate__card">
              <div className="collaborate__icon">🔬</div>
              <h3>Research Partnerships</h3>
              <p>I actively collaborate with academic institutions and private research labs on projects involving behavioral cybersecurity, AI evaluation, and human factors in digital security.</p>
            </div>
            <div className="glass collaborate__card">
              <div className="collaborate__icon">🛡️</div>
              <h3>Technical Consulting</h3>
              <p>Advising organizations on threat modeling, security awareness, and integrating behavioral psychology into their security posture to defend against social engineering.</p>
            </div>
            <div className="glass collaborate__card">
              <div className="collaborate__icon">🎤</div>
              <h3>Speaking</h3>
              <p>Available for keynotes, panels, and workshops on the intersection of AI, human behavior, and cybersecurity. Previous engagements include the APA Annual Convention.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="collaborate__cta glass-strong">
            <h2>Let's build something secure.</h2>
            <p>If you're interested in working together, the best way to reach me is via email.</p>
            <div className="collaborate__actions">
              <a href={`mailto:${siteConfig.email}`} className="btn btn--primary">
                <HiMail /> Email Me
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                Connect on LinkedIn <HiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
