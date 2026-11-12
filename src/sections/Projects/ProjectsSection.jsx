import { useState, useMemo, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { siteConfig } from '../../config/siteConfig';
import { RevealHeading } from '../../components/common/RevealHeading';

export function ProjectsSection({ onSelectProject, featuredOnly = false, onNavigate, projects: propProjects }) {
  const [allProjects, setAllProjects] = useState(() => propProjects || projectService.getAllProjects());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  useEffect(() => {
    if (propProjects) {
      setAllProjects(propProjects);
      return;
    }
    const unsubscribe = projectService.subscribe((updated) => {
      setAllProjects(updated);
    });
    return unsubscribe;
  }, [propProjects]);

  const publishedProjects = useMemo(() => {
    if (propProjects) return propProjects;
    return allProjects.filter((p) => p.published === true);
  }, [allProjects, propProjects]);

  const featuredList = useMemo(() => {
    const featured = publishedProjects.filter((p) => p.featured === true);
    return featured.length > 0 ? featured : publishedProjects.slice(0, 5);
  }, [publishedProjects]);

  const activeFeatured = featuredList[activeCarouselIdx] || featuredList[0];

  const handlePrev = () => {
    if (featuredList.length === 0) return;
    setActiveCarouselIdx((prev) => (prev > 0 ? prev - 1 : featuredList.length - 1));
  };

  const handleNext = () => {
    if (featuredList.length === 0) return;
    setActiveCarouselIdx((prev) => (prev < featuredList.length - 1 ? prev + 1 : 0));
  };

  const filteredProjects = useMemo(() => {
    const sourceProjects = featuredOnly ? featuredList.slice(0, 3) : publishedProjects;
    return sourceProjects.filter((p) => {
      const matchesFilter = filter === 'all' || p.category === filter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q)));

      return matchesFilter && matchesSearch;
    });
  }, [featuredOnly, featuredList, publishedProjects, filter, search]);

  /* ---------------------------------------------------------------
     1. HOME PAGE COMING SOON TEASER (When no featured projects are live)
     --------------------------------------------------------------- */
  if (featuredOnly && featuredList.length === 0) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="home-projects-teaser glass-crystal reveal">
            <div className="home-teaser-grid">
              <div className="home-teaser-content">
                <span className="selected-eyebrow">// 03 &bull; SELECTED WORK</span>
                <h2 className="home-teaser-title">Something New Is Taking Shape.</h2>
                <p className="home-teaser-desc">
                  I'm preparing a collection of projects that reflect my work, experiments and ideas. New creations will appear here soon.
                </p>
                <div style={{ marginTop: '0.75rem' }}>
                  <a
                    href="/projects"
                    className="btn-hero-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('/projects');
                    }}
                  >
                    <span>Explore Project Archive</span>
                    <span className="btn-icon" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="home-teaser-visual" aria-hidden="true">
                <div className="home-teaser-orb-cluster">
                  <div className="home-teaser-orb" />
                  <span className="home-teaser-badge glass-pill">
                    <span className="empty-pulse-dot" />
                    In the Workbench
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------
     2. PUBLIC PROJECTS PAGE EMPTY STATE (When no projects are published)
     --------------------------------------------------------------- */
  if (!featuredOnly && publishedProjects.length === 0) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-empty-stage glass-crystal reveal">
            <div className="empty-stage-orb-wrap" aria-hidden="true">
              <div className="empty-stage-orb" />
            </div>

            <span className="empty-status-pill glass-pill">
              <span className="empty-pulse-dot" aria-hidden="true" />
              In the Workbench
            </span>

            <h2 className="empty-stage-title">Something New Is Taking Shape.</h2>
            <p className="empty-stage-desc">
              I'm preparing a collection of projects that reflect my work, experiments and ideas. New creations will appear here soon.
            </p>

            <div className="empty-stage-actions">
              <a
                href="/contact"
                className="btn-contact-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/contact');
                }}
              >
                <span>Start a Project Conversation</span>
                <span className="submit-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="/journey"
                className="btn-selected-all glass-pill"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/journey');
                }}
              >
                <span>Discover My Journey</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------
     3. FULL PROJECTS SECTION (When projects are published)
     --------------------------------------------------------------- */
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">// 03 &bull; SELECTED WORK</span>
          <RevealHeading className="section-title">Ideas are better when they leave the notebook.</RevealHeading>
          <p className="section-subtitle">
            A collection of projects that blend technology, design and real-world impact.
          </p>
        </div>

        {/* Apple Liquid Glass Approved Selected Work 3D Stage */}
        {filter === 'all' && !search && activeFeatured && (
          <div className="selected-work-stage glass-crystal">
            <div className="selected-work-header">
              <div className="selected-work-intro">
                <span className="selected-eyebrow">FEATURED SHOWCASE</span>
                <h3 className="selected-title">
                  Interactive <span className="holographic-text">Previews.</span>
                </h3>
                <p className="selected-subtitle">
                  Explore tactile, responsive interfaces engineered for web and mobile.
                </p>
              </div>
              <a href="#projects-grid-anchor" className="btn-selected-all glass-pill">
                <span>View All Projects</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* 3D Glass Device Showcase Carousel */}
            <div className="glass-carousel-stage">
              <button
                type="button"
                className="carousel-nav-btn btn-prev glass-pill"
                onClick={handlePrev}
                aria-label="Previous project"
              >
                ❮
              </button>

              {/* Left Angled Ghost Card */}
              <div
                className="ghost-card card-left glass-frosted"
                onClick={handlePrev}
                aria-hidden="true"
              >
                <img
                  src={featuredList[(activeCarouselIdx - 1 + featuredList.length) % featuredList.length]?.screenshots?.[0]?.url || '/assets/images/project-attendance-tracker.jpg'}
                  alt=""
                  className="ghost-img"
                />
              </div>

              {/* Center Active Glass Device Card */}
              <div
                className="active-glass-showcase glass-crystal"
                onClick={() => onSelectProject && onSelectProject(activeFeatured)}
              >
                <div className="showcase-screen-wrap">
                  <img
                    src={activeFeatured.screenshots?.[0]?.url || `/assets/images/project-${activeFeatured.id}.jpg`}
                    alt={activeFeatured.name}
                    className="showcase-screen-img"
                  />
                  <div className="screen-glass-glare" aria-hidden="true" />
                </div>

                <div className="showcase-card-meta">
                  <div className="showcase-text">
                    <h3 className="showcase-title">
                      {activeFeatured.name} <span className="meta-arrow" aria-hidden="true">↗</span>
                    </h3>
                    <p className="showcase-desc">{activeFeatured.description}</p>
                  </div>

                  <div className="showcase-tags-group">
                    {activeFeatured.techStack?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="showcase-tech-tag glass-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Angled Ghost Card */}
              <div
                className="ghost-card card-right glass-frosted"
                onClick={handleNext}
                aria-hidden="true"
              >
                <img
                  src={featuredList[(activeCarouselIdx + 1) % featuredList.length]?.screenshots?.[0]?.url || '/assets/images/project-resort.jpg'}
                  alt=""
                  className="ghost-img"
                />
              </div>

              <button
                type="button"
                className="carousel-nav-btn btn-next glass-pill"
                onClick={handleNext}
                aria-label="Next project"
              >
                ❯
              </button>
            </div>

            {/* Carousel Pagination Dots */}
            <div className="carousel-dots-row" aria-label="Project carousel pagination">
              {featuredList.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`carousel-dot ${idx === activeCarouselIdx ? 'active' : ''}`}
                  onClick={() => setActiveCarouselIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${item.name}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Linear-Style Segmented Filter Bar + Search */}
        <div id="projects-grid-anchor" className="repository-toolbar-anchor" style={{ marginTop: '2.5rem' }} />

        {!featuredOnly && (
          <div className="projects-toolbar reveal">
            <div className="filter-segmented-bar" role="tablist" aria-label="Filter projects">
              {siteConfig.projectCategories.map((category) => {
                const count =
                  category.id === 'all'
                    ? publishedProjects.length
                    : publishedProjects.filter((project) => project.category === category.id).length;
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`filter-tab-btn ${filter === category.id ? 'active' : ''}`}
                    onClick={() => setFilter(category.id)}
                    role="tab"
                    aria-selected={filter === category.id}
                  >
                    {category.label} <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="project-search-container">
              <svg
                className="search-lens-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                id="projectSearchInput"
                className="project-search-input"
                aria-label="Search projects by name or technology"
                placeholder="Filter by tech (Kotlin, Flutter, Next.js...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Refined Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((p) => {
            const thumbImg =
              p.screenshots && p.screenshots.length > 0
                ? p.screenshots[0].url
                : `/assets/images/project-${p.id}.jpg`;

            const categoryLabel =
              p.projectType ||
              (p.category === 'app'
                ? 'Personal app'
                : p.category === 'client'
                ? 'Concept prototype'
                : 'Experiment');

            return (
              <article
                key={p.id}
                className="refined-project-card glass-frosted reveal"
                onClick={() => onSelectProject && onSelectProject(p)}
              >
                {/* Visual Media Showcase Frame */}
                <div className="project-media-wrap">
                  <img
                    className="project-media-img"
                    src={thumbImg}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="project-media-scrim" />

                  <div className="project-badge-row">
                    <span className="project-type-pill">{categoryLabel}</span>
                    {p.version && <span className="project-version-pill">v{p.version}</span>}
                  </div>
                </div>

                {/* Content Body */}
                <div className="project-card-info">
                  <div className="project-title-bar">
                    <h3 className="project-heading">{p.name}</h3>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github-link"
                        title="View Repository on GitHub"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`GitHub repository for ${p.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <p className="project-brief">{p.description}</p>

                  <div className="project-card-bottom">
                    <div className="project-tags-strip">
                      {p.techStack &&
                        p.techStack.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="tech-tag-chip">
                            {tag}
                          </span>
                        ))}
                    </div>

                    <div className="project-actions-duo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <a
                        href={`/projects/${p.id}`}
                        className="project-details-link text-link"
                        style={{ fontSize: '0.78rem', fontWeight: 600 }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span>Details ↗</span>
                      </a>
                      <button
                        type="button"
                        className="project-cta-link"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (onSelectProject) onSelectProject(p);
                        }}
                        aria-label={`Inspect ${p.name}`}
                      >
                        <span>Inspect</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="empty-search-state" id="emptyFilterState">
              <h3>No matching projects found</h3>
              <p>Try clearing your search query or switching category tabs.</p>
            </div>
          )}
        </div>

        {featuredOnly && (
          <div className="page-section-link" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a className="btn btn-primary glass-pill" href="/projects" id="viewAllProjectsArchiveBtn">
              <span>View All Projects in Complete Archive</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
