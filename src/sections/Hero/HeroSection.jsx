import { useState } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAttendanceSim } from '../../hooks/useAttendanceSim';
import { siteConfig } from '../../config/siteConfig';

const HERO_STATS = [
  { icon: '</>', value: 'Active', label: 'CSE Scholar' },
  { icon: '⚡', value: '10+', label: 'Technologies' },
  { icon: '🏆', value: '5+', label: 'Competitions' },
  { icon: '∞', value: '3+', label: 'Years of Learning' }
];

export function HeroSection({ onOpenStory, onInitiateProject }) {
  const [showWorkbench, setShowWorkbench] = useState(false);
  const [activeTab, setActiveTab] = useState('paneAttendanceSim');

  const typewriterText = useTypewriter([
    'High-Performance Web Apps',
    'Flutter & Kotlin Experiences',
    'Creative & Tactile Interfaces',
    'Scalable Modern Architecture'
  ]);

  const { subjects, overallPercentage, markPresent, markAbsent } = useAttendanceSim();

  return (
    <section className="hero" id="hero">
      {/* Ambient Liquid Light Fields */}
      <div className="hero-ambient-layer" aria-hidden="true">
        <div className="ambient-orb ambient-orb-blue" />
        <div className="ambient-orb ambient-orb-violet" />
        <div className="ambient-orb ambient-orb-pink" />
        <div className="ambient-orb ambient-orb-cyan" />
      </div>

      {/* Decorative Apple Vision Pro Floating Iridescent Glass Bubbles */}
      <div className="ambient-holographic-bubble bubble-top-left" aria-hidden="true" />
      <div className="ambient-holographic-bubble bubble-top-right" aria-hidden="true" />
      <div className="ambient-holographic-bubble bubble-mid-left" aria-hidden="true" />
      <div className="ambient-holographic-bubble bubble-bottom-right" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Editorial Narrative & Action Center */}
          <div className="hero-left">
            {/* Top Pill Bar */}
            <div className="hero-pill-bar">
              <div className="hero-status-pill glass-pill">
                <span className="status-wave" aria-hidden="true">👋</span>
                <span>Hello, I'm Suklal Gorai</span>
              </div>

              {/* Story trigger ring */}
              <button
                type="button"
                className="hero-story-pill glass-pill"
                id="heroStoryTrigger"
                title="View Suklal's Story"
                aria-label="Available for Work - View Suklal's story"
                onClick={onOpenStory}
              >
                <span className="live-status-dot" aria-hidden="true" />
                <span className="hero-story-label">Available for Work</span>
                <span className="story-arrow" aria-hidden="true">↗</span>
              </button>
            </div>

            {/* Editorial Headline */}
            <h1 className="hero-name split-heading" data-parallax="0.025">
              Designing the <br />
              Digital <br />
              <span className="holographic-text">Impossible.</span>
            </h1>

            {/* Animated Specialization Line */}
            <div className="hero-specialization">
              <span className="spec-label">CREATING</span>
              <span className="typing-text">{typewriterText}</span>
              <span className="cursor" aria-hidden="true">|</span>
            </div>

            {/* Narrative Subtitle */}
            <p className="hero-tagline" id="heroTaglineText">
              A developer crafting beautiful, high-performance digital experiences at the
              intersection of design, technology, and real-world impact.
            </p>

            {/* Dual Apple Liquid Glass CTAs */}
            <div className="hero-cta-group">
              <a
                href="/projects"
                className="btn-hero-primary"
                id="heroPrimaryCta"
              >
                <span>Explore My Work</span>
                <span className="btn-icon" aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                className="btn-hero-secondary glass-pill"
                id="heroSecondaryCta"
                onClick={onOpenStory}
              >
                <span className="play-triangle" aria-hidden="true">▶</span>
                <span>Discover My Journey</span>
              </button>
            </div>

            {/* Hero Stats Strip (Desktop Alignment) */}
            <div className="hero-stats-card glass-crystal" aria-label="Key highlights">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="hero-stat-item">
                  <div className="stat-top">
                    <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
                    <span className="stat-val">{stat.value}</span>
                  </div>
                  <span className="stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Liquid Glass Character Stage */}
          <div className="hero-right-stage">
            {/* The Ambient Holographic Glass Backdrop Sphere */}
            <div className="hero-holographic-sphere" aria-hidden="true">
              <div className="sphere-caustic-layer" />
              <div className="sphere-specular-ring" />
            </div>

            {/* Flowing 3D Iridescent Glass Ribbon (Curves Behind Subject) */}
            <div className="glass-ribbon glass-ribbon-back" aria-hidden="true" />

            {/* The Main Crystal Liquid Glass Bubble */}
            <div className="liquid-glass-portal glass-crystal">
              {/* Internal Caustic & Shimmer Layer */}
              <div className="portal-specular-shimmer" aria-hidden="true" />
              
              {/* Independent Transparent Developer Character Visual */}
              <div className="character-frame">
                <img
                  src="/assets/images/hero-transparent.png"
                  alt="Suklal Gorai - Creative Developer & Technologist"
                  className="character-portrait"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/hero-character.png';
                  }}
                />
                <div className="character-lighting-blend" aria-hidden="true" />
              </div>

              {/* Flowing 3D Iridescent Glass Ribbon (Sweeps In Front Across Chest) */}
              <div className="glass-ribbon glass-ribbon-front" aria-hidden="true" />

              {/* 3D Floating Glass Cubes / Badges */}
              {/* 1. React Cube */}
              <div className="floating-cube cube-react glass-crystal" title="React / Next.js" data-magnetic="0.18">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#54D8F5" strokeWidth="1.6" transform="rotate(0 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#54D8F5" strokeWidth="1.6" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#54D8F5" strokeWidth="1.6" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.8" fill="#54D8F5" />
                </svg>
              </div>

              {/* 2. TypeScript Cube */}
              <div className="floating-cube cube-ts glass-crystal" title="TypeScript" data-magnetic="0.15">
                <span className="cube-ts-text">TS</span>
              </div>

              {/* 3. Node.js Cube */}
              <div className="floating-cube cube-node glass-crystal" title="Node.js" data-magnetic="0.16">
                <span className="cube-node-text">JS</span>
              </div>

              {/* 4. GitHub Glass Orb */}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-cube cube-github glass-crystal"
                title="GitHub"
                aria-label="GitHub Profile"
                data-magnetic="0.14"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* 5. Figma Glass Cube */}
              <div className="floating-cube cube-figma glass-crystal" title="Figma UI/UX" data-magnetic="0.16">
                <svg width="22" height="22" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                  <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
                  <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                  <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                  <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                  <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                </svg>
              </div>

              {/* 6. Code Pill Card */}
              <div className="floating-cube cube-code glass-crystal" title="Creative Engineering" data-magnetic="0.18">
                <span className="cube-code-text">&lt;/&gt;</span>
              </div>

              {/* Floating Status Pill (Currently Building) */}
              <button
                type="button"
                className="currently-building-pill glass-frosted"
                onClick={() => setShowWorkbench(prev => !prev)}
                title="Toggle Interactive Engineering Hub"
              >
                <span className="building-pulse" aria-hidden="true" />
                <div className="building-text">
                  <span className="building-title">Currently Building</span>
                  <span className="building-desc">Next-gen web experiences with modern tech</span>
                </div>
                <span className="building-chevron" aria-hidden="true">
                  {showWorkbench ? '▼' : '❯'}
                </span>
              </button>
            </div>

            {/* Interactive Engineering Workbench Drawer */}
            {showWorkbench && (
              <div className="hero-workbench-drawer glass-crystal">
                <div className="workbench-topbar">
                  <div className="window-dots" aria-hidden="true">
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>
                  <div className="workbench-title">suklal-workspace // simulator</div>
                  <div className="workbench-tabs" role="tablist">
                    <button
                      type="button"
                      className={`workbench-tab ${activeTab === 'paneAttendanceSim' ? 'active' : ''}`}
                      onClick={() => setActiveTab('paneAttendanceSim')}
                      role="tab"
                      aria-selected={activeTab === 'paneAttendanceSim'}
                    >
                      App Simulator
                    </button>
                    <button
                      type="button"
                      className={`workbench-tab ${activeTab === 'paneDevConfig' ? 'active' : ''}`}
                      onClick={() => setActiveTab('paneDevConfig')}
                      role="tab"
                      aria-selected={activeTab === 'paneDevConfig'}
                    >
                      config.ts
                    </button>
                  </div>
                </div>

                <div className="workbench-body">
                  {activeTab === 'paneAttendanceSim' ? (
                    <div className="sim-container" id="paneAttendanceSim">
                      <div className="sim-header">
                        <div className="sim-title-group">
                          <span className="sim-head-title">College Attendance Tracker</span>
                          <span className="sim-version-badge">v2.1.1 PWA</span>
                        </div>
                        <div className="sim-overall-badge">{overallPercentage}% Overall</div>
                      </div>

                      <div className="sim-subject-list" id="simSubjectList">
                        {subjects.map((sub) => (
                          <div key={sub.id} className="sim-subject">
                            <div className="sim-subject-top">
                              <span className="sim-subject-name">{sub.name}</span>
                              <span className="sim-subject-stats">
                                {sub.attended}/{sub.total} ({sub.percentage}%)
                              </span>
                            </div>
                            <div className="sim-bar-track">
                              <div
                                className="sim-bar-fill"
                                style={{ width: `${sub.percentage}%` }}
                              />
                            </div>
                            <div className="sim-controls">
                              <span className="sim-status-hint">{sub.hint}</span>
                              <div className="sim-btn-group">
                                <button
                                  type="button"
                                  className="sim-btn present"
                                  onClick={() => markPresent(sub.id)}
                                >
                                  + Present
                                </button>
                                <button
                                  type="button"
                                  className="sim-btn absent"
                                  onClick={() => markAbsent(sub.id)}
                                >
                                  - Absent
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="code-container" id="paneDevConfig">
                      <pre className="code-block">
                        <code>
                          <span className="code-comment">// Suklal Gorai &mdash; Engineering Profile</span>{'\n'}
                          <span className="code-kw">export const</span> developer = {'{'}{'\n'}
                          {'  '}name: <span className="code-str">"Suklal Gorai"</span>,{'\n'}
                          {'  '}role: <span className="code-str">"Full-Stack Developer &amp; UI Architect"</span>,{'\n'}
                          {'  '}stack: [<span className="code-str">"React"</span>, <span className="code-str">"Next.js"</span>, <span className="code-str">"Flutter"</span>, <span className="code-str">"TypeScript"</span>],{'\n'}
                          {'  '}status: <span className="code-str">"Building the impossible"</span>{'\n'}
                          {'}'};
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}