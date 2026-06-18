import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ theme, toggleTheme }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="layout__main">
        <div className="page-enter" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
