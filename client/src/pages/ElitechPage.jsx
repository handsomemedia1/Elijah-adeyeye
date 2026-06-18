import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import { FaTelegram } from 'react-icons/fa6';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { elitechPrograms, siteConfig } from '../data/siteData';
import './ElitechPage.css';

export default function ElitechPage() {
  const [introRef, introVisible] = useScrollReveal();

  return (
    <div className="elitech page-enter">
      <SEO
        title="Elitech Hub — Cybersecurity Training"
        description="CAC/SMEDAN registered cybersecurity and digital skills training hub. Ethical hacking, digital forensics, threat modeling programs."
        path="/elitech"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_writing_1776720496242.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Company</span>
          <h1 className="page-hero__title">
            <span className="gradient-text">Elitech Hub</span>
          </h1>
          <p className="page-hero__subtitle">Training the Next Generation of Cybersecurity Professionals</p>
        </div>
      </section>

      {/* Intro */}
      <section className="section" ref={introRef}>
        <div className="container container-narrow">
          <div className={`elitech__intro ${introVisible ? 'visible' : ''}`}>
            <div className="elitech__badges">
              <span className="pub-card__badge badge--accepted">CAC Registered</span>
              <span className="pub-card__badge badge--accepted">SMEDAN Registered</span>
              <span className="pub-card__badge badge--published">Abuja, Nigeria</span>
            </div>
            <p className="elitech__mission">
              Elitech Hub is a cybersecurity training company built on a core philosophy: 
              <strong> You cannot defend against human threats using only technical solutions.</strong>
            </p>
            <p className="elitech__desc">
              We train security professionals with an emphasis on both technical and behavioral security competencies. 
              Our curriculum blends industry-standard technical skills (ethical hacking, digital forensics, threat modeling) 
              with behavioral psychology, producing analysts who understand both the attack and the attacker.
            </p>
            <div className="elitech__intro-stats glass">
              <div className="elitech__intro-stat">
                <h3>50+</h3>
                <p>Students Trained</p>
              </div>
              <div className="elitech__intro-stat">
                <h3>5</h3>
                <p>Core Programs</p>
              </div>
              <div className="elitech__intro-stat">
                <h3>100%</h3>
                <p>Practical Approach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Curriculum</span>
            <h2 className="section-header__title">Programs Offered</h2>
            <div className="accent-line" />
          </div>
          <div className="elitech__programs grid-3">
            {elitechPrograms.map((prog, i) => (
              <div key={i} className="program-card glass">
                <div className="program-card__icon">{prog.icon}</div>
                <h3 className="program-card__title">{prog.title}</h3>
                <p className="program-card__desc">{prog.description}</p>
                <div className="program-card__duration">
                  <span>⏱ Duration:</span> {prog.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="section">
        <div className="container container-narrow">
          <div className="elitech__diff glass-strong">
            <h2 className="elitech__diff-title">Why Elitech Hub is Different</h2>
            <p className="elitech__diff-text">
              Most cybersecurity bootcamps teach you how to use tools. We teach you how to think.
            </p>
            <ul className="elitech__diff-list">
              <li>
                <span className="elitech__diff-icon">🧠</span>
                <div>
                  <h4>Psychology-Driven Curriculum</h4>
                  <p>Understand the cognitive biases that lead to breaches and the profiles of threat actors.</p>
                </div>
              </li>
              <li>
                <span className="elitech__diff-icon">🛡️</span>
                <div>
                  <h4>Offensive & Defensive Balance</h4>
                  <p>Learn to attack so you know how to defend. We cover both sides of the security spectrum.</p>
                </div>
              </li>
              <li>
                <span className="elitech__diff-icon">💼</span>
                <div>
                  <h4>Career-Ready Focus</h4>
                  <p>From resume building to interview prep, we mentor you into your first role.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outbound CTA */}
      <section className="section elitech__outbound">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-header__title">Ready to start your journey?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
            Join our community of rising cybersecurity professionals and gain the skills
            you need to stand out in the industry.
          </p>
          <div className="elitech__actions">
            <a href={siteConfig.elitechUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--large">
              Visit elitechub.com <HiExternalLink />
            </a>
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--large">
              <FaTelegram /> Join Telegram Community
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
