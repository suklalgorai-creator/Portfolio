import React, { useState } from 'react';

const initialHeatPattern = [
  2,3,4,3,2,4,4, 1,3,4,4,2,3,4, 3,4,2,4,4,3,4, 2,4,3,4,4,
  3,2,4,4,3,4,2, 4,3,4,2,4,4,3, 1,4,4,3,4,2,4, 3,4,4,4,4
];

export function AboutSection({ onToast }) {
  const [commits, setCommits] = useState(842);
  const [pattern, setPattern] = useState(initialHeatPattern);

  const handleCellClick = (index) => {
    setPattern(prev => {
      const next = [...prev];
      const cur = next[index];
      next[index] = cur < 4 ? cur + 1 : 4;
      return next;
    });
    setCommits(c => c + 3);
    if (onToast) onToast(`Week ${index + 1}: Logged +3 commits (${commits + 3} in 2026)`);
  };

  const handlePushCommits = () => {
    setCommits(c => c + 5);
    if (onToast) onToast(`Pushed +5 commits to main (${commits + 5} in 2026)`);
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">// 01 &bull; MY STORY</span>
          <h2 className="section-title">From NEET Aspirant to Shipping Software</h2>
          <p className="section-subtitle">
            Discipline forged in competitive exam preparation, channeled into architecting and deploying real software products.
          </p>
        </div>

        <div className="about-grid">
          {/* Biography Card */}
          <div className="about-card reveal">
            <div className="about-narrative">
              <p>
                I'm <span className="highlight">Suklal Gorai</span>, a first-year B.Tech Computer Science &amp; Engineering student at{' '}
                <span className="highlight">Netaji Subhas University, Jamshedpur</span>. My path into software started unconventionally &mdash; after dedicating years to intensive NEET preparation, I discovered that my deepest energy comes from creating tools, solving systems problems, and shipping code.
              </p>
              <p>
                Instead of waiting four years for a degree to start building, I jumped straight into shipping: native Android digital-wellbeing utilities in <span className="highlight">Kotlin</span>, cross-platform apps in <span className="highlight">Flutter</span>, and offline-first progressive web apps with <span className="highlight">React &amp; Firebase</span>.
              </p>
              <p>
                Alongside my academic coursework, I founded <span className="highlight">CodeCraft Digital</span>, helping local businesses, resorts, clinics, and NGOs across Jharkhand launch modern websites that drive measurable business outcomes.
              </p>
            </div>

            <div className="about-pillars">
              <div className="pillar-item">
                <div className="pillar-icon-box" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <h4>Mobile &amp; Systems Engineering</h4>
                  <p>Native Kotlin &amp; Flutter applications built with clean architecture</p>
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon-box" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div>
                  <h4>Founder Mindset</h4>
                  <p>8+ client websites delivered end-to-end via CodeCraft Digital</p>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Matrix (Clean unified stats card) */}
          <div className="about-stats-panel reveal">
            <div className="stats-matrix">
              <div className="stat-matrix-cell">
                <span className="stat-matrix-number">12+</span>
                <span className="stat-matrix-label">Shipped Projects</span>
                <span className="stat-matrix-sub">Mobile &amp; Web</span>
              </div>
              <div className="stat-matrix-cell">
                <span className="stat-matrix-number">8+</span>
                <span className="stat-matrix-label">Client Platforms</span>
                <span className="stat-matrix-sub">CodeCraft Digital</span>
              </div>
              <div className="stat-matrix-cell">
                <span className="stat-matrix-number">4</span>
                <span className="stat-matrix-label">Flagship Utilities</span>
                <span className="stat-matrix-sub">Production Apps</span>
              </div>
              <div className="stat-matrix-cell">
                <span className="stat-matrix-number">6+</span>
                <span className="stat-matrix-label">Core Languages</span>
                <span className="stat-matrix-sub">Dart, Kotlin, C, JS</span>
              </div>
            </div>

            <div className="currently-building-bar">
              <span className="pulse-dot" aria-hidden="true" />
              <div className="currently-building-content">
                <span className="building-label">Active Focus:</span>
                <span className="building-desc">
                  Scaling <strong>College Attendance Tracker v2</strong>, architecting native Kotlin tools, and mastering Core DSA in C and Dart.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2026 Shipping Activity Heatmap */}
        <div className="heatmap-card reveal" id="shippingHeatmap">
          <div className="heatmap-header">
            <div className="heatmap-title-group">
              <h3>Shipping Cadence &amp; Commit Activity</h3>
              <p>
                <strong style={{ color: 'var(--ink-green)' }}>{commits}</strong> code contributions logged in 2026
              </p>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              id="simulateCommitBtn"
              onClick={handlePushCommits}
            >
              <span>Push +5 Commits</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>
          <div className="heatmap-grid" id="shippingHeatmapGrid">
            {pattern.map((lvl, i) => (
              <div
                key={i}
                className={`heat-cell heat-lvl-${lvl}`}
                title={`Week ${i + 1}: ${lvl * 6} contributions`}
                onClick={() => handleCellClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
