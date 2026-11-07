import React, { useState } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAttendanceSim } from '../../hooks/useAttendanceSim';

export function HeroSection({ onOpenStory, onInitiateProject }) {
  const [persona, setPersona] = useState('dev');
  const [activeTab, setActiveTab] = useState('paneHoloAvatar');

  const typewriterText = useTypewriter([
    'Flutter & Kotlin App Builder',
    'Full-Stack Systems Architect',
    'Founder @ CodeCraft Digital'
  ]);

  const { subjects, overallPercentage, markPresent, markAbsent } = useAttendanceSim();

  const isFounder = persona === 'founder';

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Story, Identity, Narrative & CTAs */}
          <div className="hero-left">
            {/* 1. Identity Row: Story Capsule + Persona Segmented Switcher */}
            <div className="hero-identity-bar hero-seq-1">
              {/* Story trigger capsule */}
              <div
                className="hero-story-banner"
                id="heroStoryTrigger"
                role="button"
                tabIndex={0}
                title="Click to view Suklal's Story"
                aria-label="Suklal Gorai, Available for Projects, click to view story"
                onClick={onOpenStory}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenStory();
                  }
                }}
              >
                <div className="hero-story-ring">
                  <img src="assets/images/avatar.jpg" alt="Suklal Gorai" />
                </div>
                <div className="hero-story-text">
                  <span className="hero-story-user">
                    @suklal_gorai
                    <svg
                      className="verified-icon"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="hero-story-status">
                    <span className="story-dot"></span> Available for Projects{' '}
                    <span className="story-arrow">↗</span>
                  </span>
                </div>
              </div>

              {/* Persona Segmented Control */}
              <div
                className="persona-switcher"
                role="group"
                aria-label="Switch Portfolio Persona"
              >
                <button
                  type="button"
                  className={`persona-btn ${!isFounder ? 'active' : ''}`}
                  data-persona="dev"
                  onClick={() => setPersona('dev')}
                >
                  <span className="persona-indicator"></span>Engineer
                </button>
                <button
                  type="button"
                  className={`persona-btn ${isFounder ? 'active' : ''}`}
                  data-persona="founder"
                  onClick={() => setPersona('founder')}
                >
                  <span className="persona-indicator"></span>Studio
                </button>
              </div>
            </div>

            {/* 2. Technical Domain Eyebrow */}
            <div className="hero-eyebrow hero-seq-2">
              <span className="hero-eyebrow-accent">//</span>
              <span>{isFounder ? 'FOUNDER & DIGITAL STRATEGIST • JAMSHEDPUR, IN' : 'MOBILE ARCHITECT & SYSTEMS ENGINEER • JAMSHEDPUR, IN'}</span>
            </div>

            {/* 3. Primary Focal Point: Hero Name Headline */}
            <h1 className="hero-name hero-seq-2 split-heading" data-parallax="0.025">
              Suklal <span className="gradient-span">Gorai</span>
            </h1>

            {/* 4. Specialization Typing Subtitle */}
            <div className="hero-title hero-seq-3">
              <span className="hero-title-prefix">SPECIALIZATION &bull;</span>
              <span className="typing-text">{typewriterText}</span>
              <span className="cursor" aria-hidden="true"></span>
            </div>

            {/* 5. Natural Storytelling Narrative */}
            <p className="hero-tagline hero-seq-3" id="heroTaglineText">
              {isFounder ? (
                <>
                  As founder of <strong>CodeCraft Digital</strong>, I engineer and deliver{' '}
                  <strong>high-performance websites, client portals, and mobile solutions</strong> for
                  regional businesses, resorts, and clinics across Jharkhand — designed to convert visitors into customers.
                </>
              ) : (
                <>
                  I engineer <strong>production mobile apps and web platforms</strong> that solve real problems &mdash; from
                  offline-first college attendance utilities in <strong>Flutter &amp; Kotlin</strong> to robust digital platforms delivered through <strong>CodeCraft Digital</strong>.
                </>
              )}
            </p>

            {/* 6. High-Contrast, Clear Primary & Secondary CTAs */}
            <div className="hero-cta hero-seq-4">
              <a
                href={isFounder ? '#agency' : '#projects'}
                className="btn btn-primary btn-hero-primary"
                data-magnetic="0.9"
                id="heroPrimaryCta"
              >
                <span>{isFounder ? 'View Client Platforms' : 'View Shipped Projects'}</span>
                <svg
                  className="btn-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="btn btn-secondary btn-hero-secondary"
                data-magnetic="0.65"
                id="heroSecondaryCta"
                onClick={onInitiateProject}
              >
                <span>Contact Me</span>
                <svg
                  className="btn-arrow-subtle"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>

            {/* 7. Verification, Social & Tech Telemetry Strip */}
            <div className="hero-meta-strip hero-seq-5">
              <div className="hero-social">
                <a
                  href="https://github.com/suklalgorai-creator"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/suklal-gorai-7ab4533b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/suklal_gorai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="mailto:suklalgorai@gmail.com" aria-label="Direct Email" title="Email">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
              <div className="hero-tech-divider" aria-hidden="true"></div>
              <div className="hero-tech-pills">
                <span className="hero-tech-pill">
                  <span className="tech-dot tech-dot-flutter"></span>Flutter &amp; Dart
                </span>
                <span className="hero-tech-pill">
                  <span className="tech-dot tech-dot-kotlin"></span>Kotlin Android
                </span>
                <span className="hero-tech-pill">
                  <span className="tech-dot tech-dot-react"></span>React &amp; Next.js
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Linear-Caliber Engineering Workbench */}
          <div className="hero-workbench hero-seq-workbench" data-parallax="0.04">
            <div className="workbench-topbar">
              <div className="window-dots" aria-hidden="true">
                <span className="dot-red"></span>
                <span className="dot-yellow"></span>
                <span className="dot-green"></span>
              </div>
              <div className="workbench-title">suklal-workspace // prod-env</div>
              <div className="workbench-tabs" role="tablist">
                <button
                  type="button"
                  className={`workbench-tab ${activeTab === 'paneHoloAvatar' ? 'active' : ''}`}
                  onClick={() => setActiveTab('paneHoloAvatar')}
                  role="tab"
                  aria-selected={activeTab === 'paneHoloAvatar'}
                >
                  <span className="tab-icon">⌘</span> Studio Hub
                </button>
                <button
                  type="button"
                  className={`workbench-tab ${activeTab === 'paneAttendanceSim' ? 'active' : ''}`}
                  onClick={() => setActiveTab('paneAttendanceSim')}
                  role="tab"
                  aria-selected={activeTab === 'paneAttendanceSim'}
                >
                  <span className="tab-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </span>
                  <span>Live App Demo</span>
                </button>
                <button
                  type="button"
                  className={`workbench-tab ${activeTab === 'paneDevConfig' ? 'active' : ''}`}
                  onClick={() => setActiveTab('paneDevConfig')}
                  role="tab"
                  aria-selected={activeTab === 'paneDevConfig'}
                >
                  <span className="tab-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </span>
                  <span>config.ts</span>
                </button>
              </div>
            </div>

            <div className="workbench-body">
              {/* Pane 0: Developer Studio Visual with Docked HUD Telemetry Shelf */}
              <div
                className={`workbench-pane ${activeTab === 'paneHoloAvatar' ? 'active' : ''}`}
                id="paneHoloAvatar"
                role="tabpanel"
              >
                <div className="holo-showcase">
                  <div className="holo-img-wrap">
                    <img
                      src="assets/images/developer-workspace.jpg"
                      alt="Suklal Gorai at Developer Engineering Workspace"
                    />
                    <div className="holo-vignette-scrim"></div>

                    {/* Top Live Status Pill */}
                    <div className="holo-live-tag">
                      <span className="live-pulse"></span>
                      <span>ONLINE &bull; JAMSHEDPUR, IN</span>
                    </div>

                    {/* Docked Glass Telemetry Shelf at bottom */}
                    <div className="holo-telemetry-shelf">
                      <div className="holo-metric">
                        <span className="holo-metric-val">12+</span>
                        <span className="holo-metric-lbl">Shipped Apps</span>
                      </div>
                      <div className="holo-metric-sep"></div>
                      <div className="holo-metric">
                        <span className="holo-metric-val">Founder</span>
                        <span className="holo-metric-lbl">@ CodeCraft</span>
                      </div>
                      <div className="holo-metric-sep"></div>
                      <div className="holo-metric">
                        <span className="holo-metric-val">B.Tech</span>
                        <span className="holo-metric-lbl">CSE &bull; 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="holo-caption-bar">
                    <div className="holo-caption-status">
                      <span className="status-indicator"></span>
                      <span>Systems Architecture &amp; Production Engineering</span>
                    </div>
                    <span className="holo-tab-hint">Switch tabs above &uarr;</span>
                  </div>
                </div>
              </div>

              {/* Pane 1: Interactive Mini Attendance Tracker */}
              <div
                className={`workbench-pane ${activeTab === 'paneAttendanceSim' ? 'active' : ''}`}
                id="paneAttendanceSim"
                role="tabpanel"
              >
                <div className="sim-header">
                  <div className="sim-title-group">
                    <h4>
                      College Attendance Tracker{' '}
                      <span className="sim-version-badge">v2.1.1</span>
                    </h4>
                    <p>Interactive PWA Simulator &bull; Tap buttons below</p>
                  </div>
                  <div className="sim-overall-badge" id="simOverallBadge">
                    {overallPercentage}% Overall
                  </div>
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

                <div className="sim-footer">
                  <span className="sim-footer-tag">&check; Synced with Offline-First PWA</span>
                  <a
                    href="https://github.com/suklalgorai-creator/college-attendance-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sim-repo-link"
                  >
                    <span>View Repository &rarr;</span>
                  </a>
                </div>
              </div>

              {/* Pane 2: Developer Profile Code Card */}
              <div
                className={`workbench-pane ${activeTab === 'paneDevConfig' ? 'active' : ''}`}
                id="paneDevConfig"
                role="tabpanel"
              >
                <div className="code-terminal-header">
                  <span className="code-file-name">
                    <span className="code-ts-icon">TS</span> suklal.config.ts
                  </span>
                  <span className="code-badge">TypeScript 5.4</span>
                </div>
                <pre className="code-block">
                  <code>
                    <span className="code-comment">// Suklal Gorai &mdash; Engineering &amp; Architecture Profile</span>{'\n'}
                    <span className="code-kw">export const</span> <span className="code-prop">developer</span> = {'{'}{'\n'}
                    {'  '}<span className="code-prop">name</span>: <span className="code-str">"Suklal Gorai"</span>,{'\n'}
                    {'  '}<span className="code-prop">role</span>: <span className="code-str">"Mobile Systems Architect"</span>,{'\n'}
                    {'  '}<span className="code-prop">agency</span>: <span className="code-str">"CodeCraft Digital (Founder)"</span>,{'\n'}
                    {'  '}<span className="code-prop">education</span>: <span className="code-str">"B.Tech CSE @ NSU Jamshedpur"</span>,{'\n'}
                    {'  '}<span className="code-prop">coreStack</span>: [{'\n'}
                    {'    '}<span className="code-str">"Flutter &amp; Dart"</span>, <span className="code-str">"Kotlin Android"</span>,{'\n'}
                    {'    '}<span className="code-str">"React / Next.js"</span>, <span className="code-str">"Firebase &amp; SQL"</span>{'\n'}
                    {'  '}],{'\n'}
                    {'  '}<span className="code-prop">metrics</span>: {'{'}{'\n'}
                    {'    '}<span className="code-prop">productsShipped</span>: <span className="code-num">12</span>,{'\n'}
                    {'    '}<span className="code-prop">activeUsers</span>: <span className="code-str">"2,000+"</span>,{'\n'}
                    {'    '}<span className="code-prop">uptime</span>: <span className="code-str">"99.98%"</span>{'\n'}
                    {'  '}{'}'},{'\n'}
                    {'  '}<span className="code-prop">status</span>: <span className="code-str">"Open for high-impact contracts &amp; roles"</span>{'\n'}
                    {'}'};
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
