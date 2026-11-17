import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { featuredProjects } from '../data/siteData';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa6';
import { useEffect } from 'react';
import './ProjectDetailPage.css';

// Generating slugs for projects based on their name for routing
const projectsWithSlugs = featuredProjects.map(p => ({
  ...p,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}));

export default function ProjectDetailPage() {
  const { slug } = useParams();

  const project = projectsWithSlugs.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <SEO title="Project Not Found" noindex={true} />
        <h2>Project Not Found</h2>
        <Link to="/lab" className="btn btn--outline" style={{ marginTop: '1rem' }}>Back to Lab</Link>
      </div>
    );
  }

  return (
    <div className="project-detail page-enter">
      <SEO
        title={`${project.name} — Project`}
        description={project.description}
        path={`/projects/${project.slug}`}
      />
      <section className="section">
        <div className="container project-detail__inner">
          <Link to="/lab" className="project-detail__back">
            <HiArrowLeft /> Back to Lab
          </Link>

          <header className="project-detail__header">
            <h1 className="project-detail__title">{project.name}</h1>
            <div className="project-detail__category">
              <span className="badge--published">{project.category}</span>
            </div>
          </header>

          <div className="project-detail__content">
            <div className="project-detail__main">
              <h3>Overview</h3>
              <p className="project-detail__description">{project.description}</p>
              
              <h3>Problem</h3>
              <p>{project.problem}</p>

              <h3>Approach</h3>
              <ul className="project-detail__list">
                {project.approach.map(step => <li key={step}>{step}</li>)}
              </ul>

              <h3>Results</h3>
              <ul className="project-detail__list">
                {project.results.map(result => <li key={result}>{result}</li>)}
              </ul>

              <h3>Technologies Used</h3>
              <div className="project-detail__tech">
                {project.tech.map(t => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>

            <aside className="project-detail__sidebar">
              <div className="glass project-detail__meta">
                <h4>Project Links</h4>
                <div className="project-detail__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                      <FaGithub /> GitHub Repository
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                      <HiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
