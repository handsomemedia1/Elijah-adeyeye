import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { usePageTracker } from './hooks/usePageTracker';
import AppRoutes from './AppRoutes';

import { InitialDataProvider } from './contexts/InitialDataContext';

/** Posts embedded at build time. Stored as JSON so the security policy can block inline scripts. */
function readInitialData() {
  const element = document.getElementById('initial-data');
  return element ? JSON.parse(element.textContent) : null;
}

const initialData = readInitialData();

function PageTracker() {
  usePageTracker();
  return null;
}

const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-primary, #06090e)' }} aria-hidden="true" />
);

function App() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 600);
      }, 500);
    }
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <InitialDataProvider data={initialData}>
          <BrowserRouter>
            <PageTracker />
            <Suspense fallback={<PageFallback />}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </InitialDataProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
