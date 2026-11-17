import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { scrollToTop } from '../SmoothScroll';

export default function Layout({ theme, toggleTheme }) {
  const { pathname } = useLocation();
  // The first page is already painted from prerendered HTML, so only later navigations animate.
  const [firstPath] = useState(pathname);
  const animate = pathname !== firstPath;

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <div className="layout">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="layout__main" id="main">
        <div className={animate ? 'route-enter' : undefined} key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
