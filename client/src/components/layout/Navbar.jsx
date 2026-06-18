import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiDownload } from 'react-icons/hi';
import { navLinks, siteConfig } from '../../data/siteData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
          <img src="/assets/images/profile/profile.jpg" alt="EA" className="navbar__logo-img" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <span className="navbar__logo-text">Elijah</span>
        </Link>

        <nav className="navbar__nav" role="navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">

          <a href={siteConfig.cvUrl} className="navbar__cv-btn" download>
            <HiDownload />
            <span>Download CV</span>
          </a>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-inner">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
              end={link.path === '/'}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={siteConfig.cvUrl}
            className="navbar__mobile-cv"
            download
            onClick={() => setMobileOpen(false)}
          >
            <HiDownload />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
