import { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

const stages = [
  {
    id: 'stage-1',
    number: '01',
    period: '2024 — 2025',
    tag: 'The Foundation',
    title: 'The Crucible: First-Principles & Focus',
    headline: 'Forging deep focus, cognitive stamina, and resilience under pressure.',
    narrative: (
      <>
        Before writing my first line of production code, my days were defined by intense, 12 to 14-hour daily problem-solving routines.
        While working through intensive coursework, the true takeaway was mental endurance: breaking down complex multi-step systems from first principles, managing extreme pressure, and building an unconditional work ethic.
      </>
    ),
    takeaways: [
      { label: 'Deep Focus', value: 'Long study cycles', desc: 'Sustained cognitive stamina without distractions' },
      { label: 'First Principles', value: 'Methodical', desc: 'Deconstructing complex problems to core fundamentals' },
      { label: 'Mental Grit', value: 'Resilient', desc: 'Thriving under high-stakes competitive environments' }
    ],
    milestones: [
      'Mastered disciplined 14-hour daily problem-solving routines',
      'Developed mathematical decomposition & systematic troubleshooting',
      'Forged psychological resilience and stamina for complex problems'
    ]
  },
  {
    id: 'stage-2',
    number: '02',
    period: 'Early — Mid 2026',
    tag: 'The Awakening',
    title: 'Discovering Software Engineering',
    headline: 'From passive memorization to the exhilaration of shipping code.',
    narrative: (
      <>
        Enrolling in B.Tech Computer Science &amp; Engineering at <strong>Netaji Subhas University, Jamshedpur</strong> was a deliberate pivot to creation. The moment I wrote my first algorithms in C and ran my first mobile application directly on my personal smartphone, everything clicked: software was a way to turn curiosity into useful tools.
        I taught myself modern <strong>Flutter &amp; Kotlin</strong> through hands-on projects and began shaping <strong>Curious Minds Studio</strong> as a proposed space for creative-tech experiments.
      </>
    ),
    takeaways: [
      { label: 'Immediate Execution', value: 'Native APK', desc: 'First working mobile utility running on personal device' },
      { label: 'Core Fundamentals', value: 'C & DSA', desc: 'Rigorous memory management and algorithms' },
      { label: 'Studio Direction', value: 'Curious Minds', desc: 'Proposed home for creative-tech experiments' }
    ],
    milestones: [
      'Transitioned into B.Tech CSE @ Netaji Subhas University, Jamshedpur',
      'Learned C, Dart & Kotlin through hands-on project creation',
      'Shaped Curious Minds Studio as a proposed creative-tech identity'
    ]
  },
  {
    id: 'stage-3',
    number: '03',
    period: 'Oct 2026 — Present',
    tag: 'Production Shipping',
    title: 'Building & Shipping Software',
    headline: 'High-velocity execution: focused apps and modern web solutions.',
    narrative: (
      <>
        Today, my engineering is defined by practical execution and useful details. I architect and build tools that solve concrete user friction: focusing on offline-first progressive web applications, cross-platform mobile utilities, and creative interfaces explored through Curious Minds Studio.
      </>
    ),
    takeaways: [
      { label: 'Engineering Focus', value: 'Mobile & Web', desc: 'Cross-platform apps and modern interfaces' },
      { label: 'Architecture', value: 'Offline-First', desc: 'Local storage, service workers, and cloud sync' },
      { label: 'Craft Philosophy', value: 'User-First', desc: 'Responsive, accessible, and high-performance design' }
    ],
    milestones: [
      'Architected offline-first PWA prototypes with real-time cloud sync',
      'Engineered native Android and Flutter utilities with tactile motion',
      'Explored modern web architectures through Curious Minds Studio'
    ]
  }
];

export function AboutSection({ onToast } = {}) {
  const [activeStageIdx, setActiveStageIdx] = useState(2);
  const activeStage = stages[activeStageIdx];

  return (
    <section id="about" className="origin-section">
      <div className="container">
        {/* Apple Liquid Glass Approved Hero Feature Block */}
        <div className="about-hero-block glass-crystal">
          <div className="about-video-col">
            <div className="about-video-card">
              <img
                src="/assets/images/developer-workspace.jpg"
                alt="Suklal Gorai workspace & craft"
                className="about-video-thumb"
              />
              <div className="about-glass-curved-reflection" aria-hidden="true" />
              <button type="button" className="about-play-button glass-frosted" aria-label="Play introduction video">
                <span className="about-play-icon" aria-hidden="true">▶</span>
              </button>
            </div>
          </div>

          <div className="about-content-col">
            <div className="about-eyebrow">ABOUT ME</div>
            <h2 className="about-main-title">
              A Developer Focused on <br />
              <span className="holographic-text">Impact, Design and Technology.</span>
            </h2>
            <p className="about-main-desc">
              I turn ideas into thoughtful digital products that are functional,
              beautiful, and enjoyable to use.
            </p>

            {/* 3 Editorial Feature Pillars */}
            <div className="about-pillars-grid">
              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Build</span>
                  <span className="pillar-caption">Scalable &amp; modern web applications</span>
                </div>
              </div>

              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-violet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Design</span>
                  <span className="pillar-caption">Clean, intuitive user experiences</span>
                </div>
              </div>

              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Explore</span>
                  <span className="pillar-caption">New technologies and creative ideas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header: Bold, Oversized Editorial Headline */}
        <div className="origin-header reveal">
          <div className="origin-eyebrow-wrap">
            <span className="origin-badge">// 01 &bull; DEVELOPER ORIGIN STORY</span>
            <span className="origin-timeline-badge">2024 &mdash; 2026 ROADMAP</span>
          </div>
          <h2 className="origin-title">
            From Intense Discipline <br />
            <span className="origin-title-gradient">to Shipping Software.</span>
          </h2>
          <p className="origin-subtitle">
            How rigorous problem-solving discipline transformed into an unstoppable drive to architect, code, and ship production software.
          </p>
        </div>

        {/* Stage Navigation Track (Apple / Linear Scrubber) */}
        <div className="origin-scrubber reveal" role="tablist" aria-label="Journey Stages">
          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              type="button"
              className={`origin-scrubber-item ${idx === activeStageIdx ? 'active' : ''}`}
              onClick={() => setActiveStageIdx(idx)}
              role="tab"
              aria-selected={idx === activeStageIdx}
            >
              <div className="scrubber-num-wrap">
                <span className="scrubber-number">{stage.number}</span>
                <span className="scrubber-indicator" />
              </div>
              <div className="scrubber-text">
                <span className="scrubber-tag">{stage.tag}</span>
                <span className="scrubber-title">{stage.period}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Stage Showcase Grid */}
        <div className="origin-showcase-grid">
          {/* Left Column: Stage Editorial Story Card */}
          <div className="origin-card-main reveal" key={activeStage.id}>
            <div className="origin-card-top">
              <div className="origin-stage-tag-row">
                <span className="origin-stage-pill">STAGE {activeStage.number}</span>
                <span className="origin-period-pill">{activeStage.period}</span>
                <span className="origin-tag-pill">{activeStage.tag}</span>
              </div>
              <h3 className="origin-stage-heading">{activeStage.title}</h3>
              <p className="origin-stage-lead">{activeStage.headline}</p>
            </div>

            <div className="origin-stage-narrative">
              <p>{activeStage.narrative}</p>
            </div>

            {/* Story-Integrated Metrics */}
            <div className="origin-takeaways-grid">
              {activeStage.takeaways.map((item, i) => (
                <div key={i} className="origin-takeaway-cell">
                  <span className="takeaway-value">{item.value}</span>
                  <span className="takeaway-label">{item.label}</span>
                  <span className="takeaway-desc">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Verified Milestones List */}
            <div className="origin-milestones-box">
              <h4 className="milestones-title">Key Crucible Milestones</h4>
              <ul className="milestones-list">
                {activeStage.milestones.map((m, mIdx) => (
                  <li key={mIdx}>
                    <svg className="milestone-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Developer System-Status Terminal */}
          <div className="origin-sidebar reveal">
            <div className="origin-terminal-card">
              <div className="origin-terminal-top">
                <div className="terminal-dots" aria-hidden="true">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="terminal-title">suklal@origin ~ system-status</span>
                <span className="terminal-live-badge">
                  <span className="live-dot" /> CURRENT
                </span>
              </div>

              <div className="origin-terminal-body">
                <div className="term-line">
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">sysctl --get developer.origin.status</span>
                </div>
                <div className="term-output">
                  <div className="term-row">
                    <span className="term-key">CURRENT_PHASE:</span>
                    <span className="term-val highlight-green">{activeStage.title}</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">ACADEMIC_BASE:</span>
                    <span className="term-val">B.Tech CSE @ Netaji Subhas Univ (2026)</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">ACTIVE_FOCUS:</span>
                    <span className="term-val highlight-amber">Curating New Project Showcase</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">CORE_SYSTEMS:</span>
                    <span className="term-val">Kotlin Android &bull; Flutter &bull; React &bull; C</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">STUDIO_OPS:</span>
                    <span className="term-val highlight-cyan">Curious Minds Studio (proposed identity)</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">DEPLOYMENT:</span>
                    <span className="term-val">Vercel Cloud &bull; Offline-First PWA</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">MENTALITY:</span>
                    <span className="term-val highlight-purple">First-Principles &bull; Zero Delay Execution</span>
                  </div>
                </div>

                <div className="term-line term-prompt-line">
                  <span className="term-prompt">$</span>
                  <span className="term-cursor" aria-hidden="true" />
                </div>
              </div>

              <div className="origin-terminal-footer">
                <div className="term-telemetry">
                  <span className="telemetry-label">Telemetry Feed</span>
                  <span className="telemetry-val">Learning &amp; shipping in public</span>
                </div>
                <span className="term-build-pill">ENV: BUILDING</span>
              </div>
            </div>

            {/* Quick Origin Quote Capsule */}
            <div className="origin-quote-box">
              <span className="quote-mark">&ldquo;</span>
              <p className="quote-text">
                Competitive exams taught me how to grind without applause. Software engineering gave me the power to turn that grind into real products that live in people's pockets.
              </p>
              <div className="quote-author">
                <span className="author-name">Suklal Gorai</span>
                <span className="author-title">Web &amp; Mobile Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source & GitHub Code Activity */}
        <div className="heatmap-card reveal" id="githubProfileCard">
          <div className="heatmap-header">
            <div className="heatmap-title-group">
              <h3>Open Source &amp; Code Activity</h3>
              <p>
                Explore public repositories, mobile utilities, and source code directly on GitHub.
              </p>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-secondary"
              id="githubProfileLink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View @suklalgorai-creator on GitHub ↗</span>
            </a>
          </div>
        </div>

        {/* Experience Pathway Banner */}
        <div className="about-experience-pathway glass-frosted reveal" style={{ marginTop: '2rem' }}>
          <div className="pathway-content">
            <span className="origin-badge">// 02 &bull; PROFESSIONAL TRACKS</span>
            <h3>Explore Hands-on Engineering Experience</h3>
            <p>
              Dive deeper into my work with Curious Minds Studio, undergraduate CSE coursework, and independent mobile utilities.
            </p>
          </div>
          <a
            href="/experience"
            className="btn btn-primary glass-pill"
            onClick={(e) => {
              if (onToast) onToast('Navigating to Experience');
            }}
          >
            <span>View Experience &amp; Focus →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function AboutTeaser({ onToast } = {}) {
  return (
    <section id="about" className="origin-section about-teaser-section">
      <div className="container">
        {/* Apple Liquid Glass Approved Hero Feature Block */}
        <div className="about-hero-block glass-crystal">
          <div className="about-video-col">
            <div className="about-video-card">
              <img
                src="/assets/images/developer-workspace.jpg"
                alt="Suklal Gorai workspace & craft"
                className="about-video-thumb"
              />
              <div className="about-glass-curved-reflection" aria-hidden="true" />
              <button type="button" className="about-play-button glass-frosted" aria-label="Play introduction video">
                <span className="about-play-icon" aria-hidden="true">▶</span>
              </button>
            </div>
          </div>

          <div className="about-content-col">
            <div className="about-eyebrow">ABOUT ME</div>
            <h2 className="about-main-title">
              A Developer Focused on <br />
              <span className="holographic-text">Impact, Design and Technology.</span>
            </h2>
            <p className="about-main-desc">
              I turn ideas into thoughtful digital products that are functional,
              beautiful, and enjoyable to use.
            </p>

            {/* 3 Editorial Feature Pillars */}
            <div className="about-pillars-grid">
              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Build</span>
                  <span className="pillar-caption">Scalable &amp; modern web applications</span>
                </div>
              </div>

              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-violet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Design</span>
                  <span className="pillar-caption">Clean, intuitive user experiences</span>
                </div>
              </div>

              <div className="about-pillar-card glass-frosted">
                <div className="pillar-icon-box box-cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div className="pillar-text">
                  <span className="pillar-title">Explore</span>
                  <span className="pillar-caption">New technologies and creative ideas</span>
                </div>
              </div>
            </div>

            {/* Teaser Pathway CTA */}
            <div className="about-teaser-footer" style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/about" className="btn btn-secondary glass-pill" id="aboutLearnMoreLink">
                <span>Read Full Background &amp; Philosophy →</span>
              </a>
              <a href="/experience" className="text-link" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                <span>View Shipped Experience ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}