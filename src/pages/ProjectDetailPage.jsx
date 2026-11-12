import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { projectsData } from '../data/projectsData';

export function ProjectDetailPage({ projectId, onToast, onNavigate, onInquire }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const project = projectsData.find((p) => p.id === projectId);

  useEffect(() => {
    setActiveImageIdx(0);
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="project-not-found-stage container">
        <div className="glass-crystal not-found-card" style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: 'var(--radius-xl)', textAlign: 'center', margin: '3rem auto', maxWidth: '640px' }}>
          <span className="selected-eyebrow">// 404 · PROJECT NOT FOUND</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', margin: '1rem 0', color: 'var(--ink)' }}>Project Showcase Not Found</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            The project "{projectId}" could not be located in our engineering showcase archive.
          </p>
          <a
            href="/projects"
            className="btn-selected-all glass-pill"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/projects');
            }}
          >
            <span>← Back to Projects Archive</span>
          </a>
        </div>
      </div>
    );
  }

  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [{ title: project.name, url: '/assets/images/project-attendance-tracker.jpg' }];

  const activeScreenshot = screenshots[activeImageIdx] || screenshots[0];

  // Pick related projects from published projects only
  const relatedProjects = projectService
    .getPublishedProjects()
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  const roleText = project.category === 'app'
    ? 'Mobile & Web App Builder'
    : project.category === 'client'
    ? 'Creative Technologist'
    : 'Frontend Experimenter';

  const durationText = project.version ? `Version ${project.version}` : 'Active Showcase';

  return (
    <div className="project-detail-page">
      <div className="container">
        {/* Navigation Breadcrumb Bar */}
        <nav className="project-breadcrumbs" aria-label="Project breadcrumb navigation">
          <div className="breadcrumb-path">
            <a
              href="/projects"
              className="breadcrumb-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/projects');
              }}
            >
              Projects
            </a>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <span className="breadcrumb-category">{project.category.toUpperCase()}</span>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <span className="breadcrumb-current">{project.name}</span>
          </div>

          <a
            href="/projects"
            className="btn-back-archive glass-pill"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/projects');
            }}
          >
            <span>← Back to Projects</span>
          </a>
        </nav>

        {/* Master Vision Pro Liquid Glass Showcase Stage */}
        <section className="project-master-stage glass-crystal">
          <div className="project-hero-grid">
            {/* Left Column: Metadata & Narrative */}
            <div className="project-hero-info">
              <div className="project-badge-row">
                <span className="project-featured-pill glass-pill">
                  <span className="project-featured-dot" aria-hidden="true" />
                  {project.projectType || 'Featured Project'}
                </span>
                {project.version && (
                  <span className="project-version-pill glass-pill">
                    v{project.version}
                  </span>
                )}
              </div>

              <h1 className="project-hero-title">{project.name}</h1>
              <p className="project-hero-tagline">{project.description}</p>

              {/* Technology Stack Pills */}
              <div className="project-tech-pills" aria-label="Technology Stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="detail-tech-pill glass-pill">
                    <span className="detail-tech-dot" aria-hidden="true" />
                    {tech}
                  </span>
                ))}
              </div>

              {/* Primary Action Buttons */}
              <div className="project-actions-row">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-action glass-frosted"
                    title={`View ${project.name} on GitHub`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub Code</span>
                    <span className="action-arrow" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="btn-github-action glass-frosted is-private">
                    <span>Proprietary / Concept</span>
                  </span>
                )}

                <button
                  type="button"
                  className="btn-inquire-action"
                  onClick={() => {
                    if (onInquire) {
                      onInquire(project.name);
                    } else if (onNavigate) {
                      onNavigate('/contact');
                    }
                  }}
                >
                  <span>Inquire About Project</span>
                  <span className="action-arrow" aria-hidden="true">↗</span>
                </button>
              </div>

              {/* 3-Column Metadata Strip */}
              <div className="project-meta-strip glass-frosted">
                <div className="meta-col">
                  <span className="meta-label">ROLE</span>
                  <span className="meta-val">{roleText}</span>
                </div>
                <div className="meta-col">
                  <span className="meta-label">DURATION</span>
                  <span className="meta-val">{durationText}</span>
                </div>
                <div className="meta-col">
                  <span className="meta-label">TYPE</span>
                  <span className="meta-val">{project.projectType || 'Personal Project'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Vision Pro Device Showcase */}
            <div className="project-hero-device">
              <div className="device-floating-container">
                {/* Curved Iridescent Glass Ribbon Backdrop */}
                <div className="device-glass-ribbon" aria-hidden="true" />

                {/* Laptop / Screen Glass Frame */}
                <div className="device-screen-frame glass-frosted">
                  <div className="device-camera-dot" aria-hidden="true" />
                  <div className="device-screen-inner">
                    <img
                      src={activeScreenshot.url}
                      alt={activeScreenshot.title || project.name}
                      className="device-screen-img"
                      loading="lazy"
                    />
                    <div className="device-screen-glare" aria-hidden="true" />
                  </div>
                </div>

                {/* Floating Holographic Crystal Orb */}
                <div className="device-foreground-orb" aria-hidden="true">
                  <div className="inner-orb-glass" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lower Detail Stage: About, Highlights, Changelog & Inquiry CTA */}
        <div className="project-detail-body-grid">
          {/* Left Column: Narrative, Gallery & Changelog */}
          <div className="detail-main-col">
            {/* About the Project Section */}
            <article className="detail-section-block glass-crystal">
              <h2 className="detail-block-title">About the Project</h2>
              <p className="detail-block-desc">
                {project.description}
              </p>
              <p className="detail-block-desc" style={{ marginTop: '1rem' }}>
                Engineered with practical constraints in mind, this project balances user experience,
                responsive performance across mobile and desktop viewports, and clean modular code architecture.
              </p>
            </article>

            {/* Screenshots Gallery (if multiple) */}
            {screenshots.length > 1 && (
              <article className="detail-section-block glass-crystal">
                <h2 className="detail-block-title">Visual Interface Showcase</h2>
                <div className="detail-gallery-grid">
                  {screenshots.map((s, idx) => (
                    <button
                      key={s.url + idx}
                      type="button"
                      className={`gallery-thumb-card glass-frosted ${idx === activeImageIdx ? 'active' : ''}`}
                      onClick={() => setActiveImageIdx(idx)}
                      aria-label={`View screenshot: ${s.title}`}
                    >
                      <img src={s.url} alt={s.title} className="gallery-thumb-img" loading="lazy" />
                      <span className="gallery-thumb-title">{s.title}</span>
                    </button>
                  ))}
                </div>
              </article>
            )}

            {/* Version Changelog (if available) */}
            {project.changelog && project.changelog.length > 0 && (
              <article className="detail-section-block glass-crystal">
                <h2 className="detail-block-title">Release History &amp; Changelog</h2>
                <div className="detail-changelog-timeline">
                  {project.changelog.map((entry) => (
                    <div key={entry.version} className="changelog-entry">
                      <div className="changelog-header">
                        <span className="changelog-version">v{entry.version}</span>
                        <span className="changelog-date">{entry.date}</span>
                      </div>
                      <ul className="changelog-list">
                        {entry.changes.map((change, cIdx) => (
                          <li key={cIdx}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          {/* Right Column: Key Highlights & Contact Card */}
          <aside className="detail-sidebar-col">
            {/* Key Highlights Card */}
            <div className="detail-sidebar-card glass-crystal">
              <h3 className="sidebar-card-title">Key Highlights</h3>
              <ul className="detail-highlights-list">
                {project.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="detail-highlight-item">
                    <span className="highlight-icon-box glass-pill" aria-hidden="true">
                      {hIdx === 0 ? '⚡' : hIdx === 1 ? '❖' : hIdx === 2 ? '📱' : '☁'}
                    </span>
                    <span className="highlight-text">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apple Vision Pro Inquire Box */}
            <div className="detail-inquire-card glass-crystal">
              <span className="inquire-eyebrow">HAVE A SIMILAR VISION?</span>
              <h3 className="inquire-title">Let's build something great together.</h3>
              <p className="inquire-desc">
                Need a tailored web application, mobile experience, or modern digital interface?
              </p>
              <button
                type="button"
                className="btn-inquire-arrow glass-pill"
                onClick={() => {
                  if (onInquire) {
                    onInquire(project.name);
                  } else if (onNavigate) {
                    onNavigate('/contact');
                  }
                }}
                aria-label={`Start inquiry regarding ${project.name}`}
              >
                <span>Inquire Now</span>
                <span className="arrow-circle" aria-hidden="true">→</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Related Projects Showcase */}
        {relatedProjects.length > 0 && (
          <section className="related-projects-section">
            <div className="related-header">
              <span className="selected-eyebrow">// EXPLORE MORE WORK</span>
              <h2 className="related-title">Related Projects</h2>
            </div>

            <div className="related-projects-grid">
              {relatedProjects.map((rel) => (
                <article key={rel.id} className="related-project-card glass-crystal">
                  <div className="related-card-img-wrap">
                    <img
                      src={rel.screenshots?.[0]?.url || '/assets/images/project-attendance-tracker.jpg'}
                      alt={rel.name}
                      className="related-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="related-card-content">
                    <span className="related-category">{rel.category.toUpperCase()}</span>
                    <h3 className="related-name">{rel.name}</h3>
                    <p className="related-desc">{rel.description}</p>
                    <a
                      href={`/projects/${rel.id}`}
                      className="btn-related-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) onNavigate(`/projects/${rel.id}`);
                      }}
                    >
                      <span>Explore Case Study</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
