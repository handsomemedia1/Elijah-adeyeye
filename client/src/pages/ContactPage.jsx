import { useState } from 'react';
import SEO from '../components/SEO';
import { HiMail, HiLocationMarker, HiPhone, HiClock, HiArrowRight } from 'react-icons/hi';
import { siteConfig, contactSubjects, socialLinks } from '../data/siteData';
import { FaLinkedinIn, FaGithub, FaXTwitter, FaTelegram, FaThreads, FaFacebook } from 'react-icons/fa6';
import './ContactPage.css';

const iconMap = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaXTwitter,
  telegram: FaTelegram,
  threads: FaThreads,
  facebook: FaFacebook,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: contactSubjects[0],
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for Phase 1
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: contactSubjects[0], message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact page-enter">
      <SEO
        title="Contact Elijah Adeyeye"
        description="Get in touch for research collaboration, speaking engagements, or cybersecurity consulting."
        path="/contact"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_home_1776720190044.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Get In Touch</span>
          <h1 className="page-hero__title">Let's <span className="gradient-text">Connect</span></h1>
          <p className="page-hero__subtitle">Open for consulting, collaborative research, and speaking engagements.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact__grid">
            
            {/* Contact Info Sidebar */}
            <div className="contact__info">
              <div className="glass contact__info-card">
                <h3 style={{ marginBottom: 'var(--space-6)' }}>Direct Contact</h3>
                
                <div className="contact__method">
                  <div className="contact__icon-wrapper">
                    <HiMail />
                  </div>
                  <div>
                    <span className="contact__method-label">Email</span>
                    <a href={`mailto:${siteConfig.email}`} className="contact__method-val">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="contact__method">
                  <div className="contact__icon-wrapper">
                    <HiPhone />
                  </div>
                  <div>
                    <span className="contact__method-label">Phone / WhatsApp</span>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="contact__method-val">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="contact__method">
                  <div className="contact__icon-wrapper">
                    <HiLocationMarker />
                  </div>
                  <div>
                    <span className="contact__method-label">Location</span>
                    <span className="contact__method-val">{siteConfig.location}</span>
                  </div>
                </div>

                <div className="contact__method">
                  <div className="contact__icon-wrapper">
                    <HiClock />
                  </div>
                  <div>
                    <span className="contact__method-label">Response Time</span>
                    <span className="contact__method-val">Typically within 24-48 hours</span>
                  </div>
                </div>

                <div className="contact__socials">
                  {socialLinks.map((social) => {
                    const Icon = iconMap[social.icon];
                    return (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="contact__social-link" title={social.name}>
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="glass contact__info-card contact__newsletter">
                <h3>Newsletter</h3>
                <p>Get notified when I publish new research or writing.</p>
                <form className="contact__nl-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed! (Preview)'); }}>
                  <input type="email" placeholder="Your email address" required className="form-input" />
                  <button type="submit" className="btn btn--primary">Subscribe</button>
                </form>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-strong contact__form-container">
              <h2>Send a Message</h2>
              <p className="contact__form-desc">Fill out the form below and I'll get back to you as soon as possible.</p>
              
              <form onSubmit={handleSubmit} className="contact__form">
                <div className="form-group grid-2">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="John Doe" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <div className="select-wrapper">
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="form-input">
                      {contactSubjects.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="form-input" rows="6" placeholder="Your message here..."></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn--primary btn--large ${status === 'loading' ? 'btn--loading' : ''}`}
                  disabled={status === 'loading' || status === 'success'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'loading' ? 'Sending...' : 
                   status === 'success' ? 'Message Sent!' : 
                   <><HiMail /> Send Message</>}
                </button>
                
                {status === 'success' && (
                  <p className="form-success">Thank you! Your message has been sent successfully.</p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
