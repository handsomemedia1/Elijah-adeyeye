import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Eagerly loaded — critical for SEO prerender
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ResearchPage from './pages/ResearchPage';
import PublicationsPage from './pages/PublicationsPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ResearchCategoryPage from './pages/ResearchCategoryPage';

import LabPage from './pages/LabPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import WritingPage from './pages/WritingPage';
import BlogPage from './pages/BlogPage';
import BlogRedirect from './pages/BlogRedirect';
import ElitechPage from './pages/ElitechPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CVPage from './pages/CVPage';
import CollaboratePage from './pages/CollaboratePage';

// NumIntel Product Pages - Eager loaded for SEO
import NumIntelLanding from './pages/numintel/NumIntelLanding';
import NumIntelToolPage from './pages/numintel/NumIntelToolPage';
import CountryListPage from './pages/numintel/CountryListPage';
import CountryPage from './pages/numintel/CountryPage';
import GuideListPage from './pages/numintel/GuideListPage';
import GuidePage from './pages/numintel/GuidePage';

// Admin — lazy
import ProtectedRoute from './components/ProtectedRoute';
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const ResetPassword = lazy(() => import('./pages/admin/ResetPassword'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManagePublications = lazy(() => import('./pages/admin/ManagePublications'));
const ManageWriting = lazy(() => import('./pages/admin/ManageWriting'));
const ManageElitech = lazy(() => import('./pages/admin/ManageElitech'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageSettings = lazy(() => import('./pages/admin/ManageSettings'));

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="research/:slug" element={<ResearchCategoryPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/:slug" element={<PublicationDetailPage />} />
          <Route path="lab" element={<LabPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          
          <Route path="numintel" element={<NumIntelLanding />} />
          <Route path="numintel/:toolSlug" element={<NumIntelToolPage />} />
          <Route path="numintel/countries" element={<CountryListPage />} />
          <Route path="numintel/countries/:countrySlug" element={<CountryPage />} />
          <Route path="numintel/guides" element={<GuideListPage />} />
          <Route path="numintel/guides/:guideSlug" element={<GuidePage />} />

          <Route path="writing" element={<WritingPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogRedirect />} />
          <Route path="cv" element={<CVPage />} />
          <Route path="collaborate" element={<CollaboratePage />} />
          <Route path="elitech" element={<ElitechPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
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
  );
}
