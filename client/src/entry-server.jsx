import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';

import { InitialDataProvider } from './contexts/InitialDataContext';

export function render(url, initialData = null) {
  const helmetContext = {};

  let html = '';
  try {
    html = renderToString(
      <HelmetProvider context={helmetContext}>
        <AuthProvider>
          <InitialDataProvider data={initialData}>
            <StaticRouter location={url}>
              <AppRoutes />
            </StaticRouter>
          </InitialDataProvider>
        </AuthProvider>
      </HelmetProvider>
    );
  } catch (e) {
    console.error('SSR Render Error:', e);
  }

  return { html, helmetContext };
}
