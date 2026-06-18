import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';
import {
  biography, researchCredentials, timeline, education,
  certifications, skills, skillIcons, testimonials, siteConfig
} from '../data/siteData';
import './AboutPage.css';

export default function AboutPage() {
  const [bioRef, bioVisible] = useScrollReveal();
  const [credRef, credVisible] = useScrollReveal();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from('portfolio_settings')
        .select('*')
        .limit(1)
        .single();
      if (data) setSettings(data);
    }
    loadSettings();
  }, []);

  return (
    <div className="about page-enter">
      <SEO
        title="About Elijah Adeyeye"
        description="B.Ed University of Ibadan. Certified Counselling Psychologist and Elitech Hub Founder. Background in Guidance & Counselling with advanced cybersecurity certifications."
        path="/about"
      />
      {/* Page Header */}
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_about_1776720215519.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">About</span>
          <h1 className="page-hero__title">About <span className="gradient-text">Elijah</span></h1>
          <p className="page-hero__subtitle">Cybersecurity Researcher · Behavioral Scientist · Founder</p>
        </div>
      </section>

      {/* Biography */}
      <section className="section about__bio" ref={bioRef}>
        <div className="container">
          <div className={`about__bio-content ${bioVisible ? 'visible' : ''}`}>
            <div className="about__bio-text">
              {biography.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="about__bio-sidebar">
              <div className="about__photo glass">
                <img src="/assets/images/profile/about-image.jpg" alt="Elijah Adeyeye" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              </div>
              <div className="about__downloads">
                <a href={settings?.cv_url || siteConfig.cvUrl} className="btn btn--primary about__dl-btn" target="_blank" rel="noopener noreferrer">
                  <HiDownload /> Download CV
                </a>
                
                {settings?.media_kit_url ? (
                  <a href={settings.media_kit_url} className="btn btn--outline about__dl-btn" target="_blank" rel="noopener noreferrer">
                    <HiDownload /> Media Kit
                  </a>
                ) : (
                  <button className="btn btn--outline about__dl-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <HiDownload /> Media Kit
                  </button>
                )}

                {settings?.speaker_bio_url ? (
                  <a href={settings.speaker_bio_url} className="btn btn--outline about__dl-btn" target="_blank" rel="noopener noreferrer">
                    <HiDownload /> Speaker Bio
                  </a>
                ) : (
                  <button className="btn btn--outline about__dl-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <HiDownload /> Speaker Bio
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Credentials */}
      <section className="section section-alt about__credentials" ref={credRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Research</span>
            <h2 className="section-header__title">Research Credentials</h2>
            <div className="accent-line" />
          </div>
          <div className={`about__cred-grid ${credVisible ? 'visible' : ''}`}>
            {researchCredentials.map((cred, i) => (
              <div key={i} className="cred-card glass">
                <span className={`pub-card__badge ${cred.status === 'Accepted' ? 'badge--accepted' : 'badge--review'}`}>
                  {cred.status}
                </span>
                <h3 className="cred-card__title">{cred.title}</h3>
                <p className="cred-card__journal">{cred.journal}</p>
                <p className="cred-card__authors">{cred.coAuthors}</p>
                {cred.date && <p className="cred-card__date">{cred.date}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about__timeline">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Experience</span>
            <h2 className="section-header__title">Professional Journey</h2>
            <div className="accent-line" />
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section section-alt about__education">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Education</span>
            <h2 className="section-header__title">Education & Certifications</h2>
            <div className="accent-line" />
          </div>
          <div className="about__edu-grid">
            {education.map((e, i) => (
              <div key={i} className="edu-card glass edu-card--degree">
                <span className="edu-card__icon">{e.icon}</span>
                <h3>{e.degree}</h3>
                <p className="edu-card__institution">{e.institution}</p>
                <p className="edu-card__period">{e.period}</p>
              </div>
            ))}
            {certifications.map((c, i) => (
              <div key={i} className="edu-card glass">
                <span className="edu-card__icon">{c.icon}</span>
                <h4>{c.name}</h4>
                <p className="edu-card__institution">{c.issuer}</p>
                {c.year && <p className="edu-card__period">{c.year}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="section about__skills">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Expertise</span>
            <h2 className="section-header__title">Skills Matrix</h2>
            <div className="accent-line" />
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-card glass">
                <div className="skill-card__header">
                  <span className="skill-card__icon">{skillIcons[category]}</span>
                  <h3 className="skill-card__title">{category}</h3>
                </div>
                <div className="skill-card__tags">
                  {items.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt about__testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Testimonials</span>
            <h2 className="section-header__title">What People Say</h2>
            <div className="accent-line" />
          </div>
          <div className="about__testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-full glass">
                <p className="testimonial-full__text">"{t.content || t.text}"</p>
                <div className="testimonial-full__author">
                  <div className="testimonial-card__avatar">
                    {t.image ? (
                      <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      t.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                    )}
                  </div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role || t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      className={`timeline-item ${visible ? 'visible' : ''} ${item.highlight ? 'timeline-item--highlight' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-item__dot">
        {item.current && <span className="timeline-item__pulse" />}
      </div>
      <div className="timeline-item__content glass">
        <div className="timeline-item__header">
          <h3>{item.title}</h3>
          {item.current && <span className="pub-card__badge badge--accepted">Current</span>}
        </div>
        <p className="timeline-item__company">{item.company}</p>
        <p className="timeline-item__period">{item.period}</p>
        <p className="timeline-item__desc">{item.description}</p>
      </div>
    </div>
  );
}
