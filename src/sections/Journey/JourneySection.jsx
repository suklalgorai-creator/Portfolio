import { useState, useMemo, useEffect } from 'react';
import { JOURNEY_CATEGORIES } from '../../data/journeyCmsSeed';
import { useJourneyCms } from '../../hooks/useJourneyCms';

const HORIZONTAL_MILESTONES = [
  {
    year: '2023',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'Explored Development',
    desc: 'Started building real projects and exploring the web.'
  },
  {
    year: '2024',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
    title: 'Built & Shipped',
    desc: 'Worked on multiple projects and strengthened my stack.'
  },
  {
    year: '2025',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    title: 'Competed & Learned',
    desc: 'Participated in events, collaborated and expanded my skills.'
  },
  {
    year: 'Next',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "What's Next",
    desc: 'Bigger projects, new technologies and more impact.'
  }
];

export function JourneySection({ compact = false, initialCategory = 'All', externalCategory }) {
  const { publishedEntries, categoryCounts } = useJourneyCms({ onlyPublished: true });
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  const filteredEntries = useMemo(() => {
    const base =
      selectedCategory === 'All'
        ? publishedEntries
        : publishedEntries.filter((entry) => entry.category === selectedCategory);
    return compact ? base.slice(0, 4) : base;
  }, [publishedEntries, selectedCategory, compact]);

  const getCategoryMeta = (categoryId) =>
    JOURNEY_CATEGORIES.find((cat) => cat.id === categoryId) || {
      id: categoryId,
      label: categoryId,
      colorKey: 'blue'
    };

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        {/* Apple Liquid Glass Approved Horizontal Milestones Rail */}
        <div className="journey-rail-stage glass-crystal">
          <div className="journey-rail-top">
            <div className="journey-rail-intro">
              <span className="journey-eyebrow">JOURNEY</span>
              <h2 className="journey-title">
                A Track Record of <span className="holographic-text">Growth.</span>
              </h2>
              <p className="journey-subtitle">
                Key milestones, projects, events and learning experiences that shaped my journey so far.
              </p>
            </div>
            <div className="journey-actions-group">
              <a href="/admin" className="btn-manage-cms glass-pill">
                <span>Manage CMS</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Horizontal Track with 4 Interactive Year Nodes */}
          <div className="horizontal-milestone-rail">
            <div className="rail-connecting-line" aria-hidden="true" />

            <div className="rail-milestones-grid">
              {HORIZONTAL_MILESTONES.map((m) => (
                <div key={m.year} className="rail-milestone-node">
                  <div className="node-year-badge">
                    <span className="year-pill">{m.year}</span>
                    <span className="year-dot" aria-hidden="true" />
                  </div>

                  <div className="node-card glass-frosted">
                    <div className="node-icon-box">{m.icon}</div>
                    <h3 className="node-title">{m.title}</h3>
                    <p className="node-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Bar for Synced CMS Timeline or Compact Teaser CTA */}
        {compact ? (
          <div className="journey-teaser-footer" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="/journey" className="btn btn-primary glass-pill" id="exploreFullJourneyTimelineBtn">
              <span>Explore Full Timeline &amp; Verified Credentials</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        ) : (
          <div className="journey-cms-block" style={{ marginTop: '3.5rem' }}>
            <div className="cms-block-header">
              <h3 className="cms-block-title">Live Synced Milestones</h3>
              <div
                className="journey-filter-bar reveal"
                role="tablist"
                aria-label="Filter journey milestones by category"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'All'}
                  className={`journey-filter-pill ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('All')}
                >
                  <span>All Milestones</span>
                  <span className="pill-count">{categoryCounts.All || 0}</span>
                </button>

                {JOURNEY_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === category.id}
                    className={`journey-filter-pill cat-${category.colorKey} ${
                      selectedCategory === category.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="pill-swatch" aria-hidden="true" />
                    <span>{category.label}</span>
                    <span className="pill-count">{categoryCounts[category.id] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Synced CMS Timeline Stream */}
            {filteredEntries.length > 0 ? (
              <div className="editorial-timeline" aria-live="polite">
                <div className="timeline-rail" aria-hidden="true" />
                {filteredEntries.map((item, idx) => {
                  const catMeta = getCategoryMeta(item.category);
                  return (
                    <article
                      key={item.id}
                      className={`timeline-entry cat-${catMeta.colorKey} reveal active ${
                        idx === 0 && selectedCategory === 'All' ? 'is-current' : ''
                      }`}
                    >
                      <div className="timeline-marker" aria-hidden="true">
                        <span className="marker-dot" />
                        {idx === 0 && selectedCategory === 'All' && <span className="marker-pulse" />}
                      </div>

                      <div className="timeline-content glass-frosted">
                        <div className="timeline-meta">
                          <span className="timeline-date">{item.displayDate}</span>
                          <span className={`timeline-tag cat-${catMeta.colorKey}`}>{catMeta.label}</span>
                          {item.badge && <span className="timeline-badge-pill">{item.badge}</span>}
                        </div>

                        <h3 className="timeline-heading">{item.title}</h3>
                        {item.organization && (
                          <p className="timeline-organization">{item.organization}</p>
                        )}
                        <p className="timeline-text">{item.description}</p>

                        {item.link && (
                          <div className="timeline-footer-link">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-link"
                            >
                              View proof / source <span aria-hidden="true">↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="journey-empty-state glass-frosted">
                <h3>No published entries in {selectedCategory} yet</h3>
                <p>
                  Publish a new {selectedCategory.toLowerCase()} milestone from the Admin CMS Dashboard and it will appear here immediately.
                </p>
                <a className="btn btn-secondary btn-sm" href="/admin">
                  Open Admin Dashboard →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}