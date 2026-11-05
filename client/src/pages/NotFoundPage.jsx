import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <SEO title="Page Not Found | Elijah Adeyeye"description="This page doesn't exist." noindex />
      <h1 className="gradient-text" style={{ fontSize: '6rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
