import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LabPage from './pages/LabPage';
import PublicationsPage from './pages/PublicationsPage';
import WritingPage from './pages/WritingPage';
import ResearchPage from './pages/ResearchPage';
import ElitechPage from './pages/ElitechPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NumIntelPage from './pages/NumIntelPage';

// Admin
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import ResetPassword from './pages/admin/ResetPassword';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePublications from './pages/admin/ManagePublications';
import ManageWriting from './pages/admin/ManageWriting';
import ManageElitech from './pages/admin/ManageElitech';
import ManageMessages from './pages/admin/ManageMessages';
import ManageSettings from './pages/admin/ManageSettings';

// Hooks
import { usePageTracker } from './hooks/usePageTracker';
import { useEffect } from 'react';

function PageTracker() {
  usePageTracker();
  return null;
}

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
        <BrowserRouter>
          <PageTracker />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="lab" element={<LabPage />} />
              <Route path="numintel" element={<NumIntelPage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="writing" element={<WritingPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="elitech" element={<ElitechPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={
                <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
                  <h1 className="gradient-text" style={{ fontSize: '6rem', marginBottom: '1rem' }}>404</h1>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    The page you're looking for doesn't exist.
                  </p>
                </div>
              } />
            </Route>

            {/* Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="writing" element={<ManageWriting />} />
              <Route path="elitech" element={<ManageElitech />} />
              <Route path="publications" element={<ManagePublications />} />
              <Route path="messages" element={<ManageMessages />} />
              <Route path="settings" element={<ManageSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
