import { useState, useMemo } from 'react';
import { projectsData } from '../../data/projectsData';
import { siteConfig } from '../../config/siteConfig';
import { RevealHeading } from '../../components/common/RevealHeading';

export function ProjectsSection({ onSelectProject, featuredOnly = false }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    const sourceProjects = featuredOnly ? projectsData.slice(0, 3) : projectsData;
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
  }, [featuredOnly, filter, search]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">// 03 &bull; PROOF OF WORK</span>
          <RevealHeading className="section-title">Ideas are better when they leave the notebook.</RevealHeading>
          <p className="section-subtitle">
            Browse personal applications, a studio showcase, web concepts, and experiments—each one built around a real use case, constraint, or opportunity.
          </p>
        </div>

        {/* Linear-Style Segmented Filter Bar + Search */}
        {!featuredOnly && <div className="projects-toolbar reveal">
          <div className="filter-segmented-bar" role="tablist" aria-label="Filter projects">
            {siteConfig.projectCategories.map((category) => {
              const count = category.id === 'all'
                ? projectsData.length
                : projectsData.filter((project) => project.category === category.id).length;
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
        </div>}

        {/* Refined Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((p) => {
            const thumbImg =
              p.screenshots && p.screenshots.length > 0
                ? p.screenshots[0].url
                : `/assets/images/project-${p.id}.jpg`;

            const categoryLabel = p.projectType || (
              p.category === 'app' ? 'Personal app' :
                p.category === 'client' ? 'Concept prototype' : 'Experiment'
            );

            return (
              <article
                key={p.id}
                className="refined-project-card reveal"
                onClick={() => onSelectProject(p)}
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

                    <button
                      type="button"
                      className="project-cta-link"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectProject(p);
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
          <div className="page-section-link">
            <a className="btn btn-secondary" href="/projects">Explore all projects <span aria-hidden="true">→</span></a>
          </div>
        )}
      </div>
    </section>
  );
}
