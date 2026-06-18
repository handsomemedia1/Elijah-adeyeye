import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaXTwitter, FaTelegram, FaThreads, FaFacebook } from 'react-icons/fa6';
import { HiArrowUp } from 'react-icons/hi';
import { siteConfig, socialLinks } from '../../data/siteData';
import './Footer.css';

const iconMap = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaXTwitter,
  telegram: FaTelegram,
  threads: FaThreads,
  facebook: FaFacebook,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__accent-line" />
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* About Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/assets/images/profile/profile.jpg" alt="EA" className="navbar__logo-img" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <span className="footer__logo-text">Elijah</span>
            </Link>
            <p className="footer__bio">
              Combining behavioral science and technology to create more secure digital environments.
            </p>
            <div className="footer__socials">
              {socialLinks.map(social => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <nav className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/lab">Lab</Link>
              <Link to="/publications">Publications</Link>
              <Link to="/writing">Writing</Link>
              <Link to="/research">Research</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <nav className="footer__links">
              <Link to="/elitech">Cybersecurity Training</Link>
              <Link to="/contact">Consulting</Link>
              <Link to="/contact">Speaking</Link>
              <Link to="/contact">Research Collaboration</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
              <span>{siteConfig.location}</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Elijah Adeyeye. All Rights Reserved.
          </p>
          <button className="footer__back-top" onClick={scrollToTop} aria-label="Back to top">
            <HiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
