import React, { useState } from 'react';

const stages = [
  {
    id: 'stage-1',
    number: '01',
    period: '2024 — 2025',
    tag: 'The Foundation',
    title: 'The Crucible: NEET Preparation',
    headline: 'Forging deep focus, cognitive stamina, and resilience under pressure.',
    narrative: (
      <>
        Before writing my first line of production code, my days were defined by intense, 12 to 14-hour daily study cycles preparing for India's most competitive medical entrance exam (NEET).
        While the syllabus was biological and physical sciences, the true takeaway was mental endurance: breaking down complex multi-step systems from first principles, managing extreme pressure, and building unconditional work ethic.
      </>
    ),
    takeaways: [
      { label: 'Deep Focus', value: '14h / day', desc: 'Sustained cognitive stamina without distractions' },
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
        Enrolling in B.Tech Computer Science &amp; Engineering at <strong>Netaji Subhas University, Jamshedpur</strong> was a deliberate pivot to creation. The moment I wrote my first algorithms in C and ran my first mobile application directly on my personal smartphone, everything clicked: software wasn't just a career, it was an infinite leverage tool.
        Instead of waiting 4 years for a college degree to start building, I taught myself modern <strong>Flutter &amp; Kotlin</strong>, and founded <strong>CodeCraft Digital</strong> to engineer high-converting digital platforms for businesses in Jharkhand.
      </>
    ),
    takeaways: [
      { label: 'Immediate Execution', value: 'Native APK', desc: 'First working mobile utility running on personal device' },
      { label: 'Core Fundamentals', value: 'C & DSA', desc: 'Rigorous memory management and algorithms' },
      { label: 'Venture Inception', value: 'CodeCraft', desc: 'Founded web studio for regional businesses & clinics' }
    ],
    milestones: [
      'Transitioned into B.Tech CSE @ Netaji Subhas University, Jamshedpur',
      'Learned C, Dart & Kotlin through hands-on project creation',
      'Founded CodeCraft Digital and delivered first commercial client website'
    ]
  },
  {
    id: 'stage-3',
    number: '03',
    period: 'Oct 2026 — Present',
    tag: 'Production Shipping',
    title: 'Building & Shipping Software',
    headline: 'High-velocity execution: 12+ real-world products and production platforms.',
    narrative: (
      <>
        Today, my engineering is defined by velocity and impact. I ship production tools that solve concrete friction: from <strong>College Attendance Tracker v2.1.1</strong> (an offline-first PWA helping college students eliminate attendance penalties) and <strong>Focus Guard</strong> (a native Kotlin digital wellbeing utility) to <strong>ReelCount</strong> and over 8 commercial client web platforms through CodeCraft Digital.
      </>
    ),
    takeaways: [
      { label: 'Shipped Products', value: '12+', desc: 'Production mobile applications & full-stack web platforms' },
      { label: 'Client Deployments', value: '8+', desc: 'Turnkey platforms delivering measurable business growth' },
      { label: 'Flagship Utilities', value: '4 Apps', desc: 'College Attendance Tracker, Focus Guard, ReelCount, Calc' }
    ],
    milestones: [
      'Shipped College Attendance Tracker v2.1.1 with offline-first local storage',
      'Architected Focus Guard (Kotlin) and ReelCount productivity apps',
      'Scaled CodeCraft Digital to 8+ live platforms across Jharkhand'
    ]
  }
];

const initialHeatPattern = [
  2, 3, 4, 3, 2, 4, 4, 1, 3, 4, 4, 2, 3, 4, 3, 4, 2, 4, 4, 3, 4, 2, 4, 3, 4, 4,
  3, 2, 4, 4, 3, 4, 2, 4, 3, 4, 2, 4, 4, 3, 1, 4, 4, 3, 4, 2, 4, 3, 4, 4, 4, 4
];

export function AboutSection({ onToast }) {
  const [activeStageIdx, setActiveStageIdx] = useState(2);
  const [commits, setCommits] = useState(842);
  const [pattern, setPattern] = useState(initialHeatPattern);

  const activeStage = stages[activeStageIdx];

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
    if (onToast) onToast(`Pushed +5 commits to origin/main (${commits + 5} in 2026)`);
  };

  return (
    <section id="about" className="origin-section">
      <div className="container">
        {/* Section Header: Bold, Oversized Editorial Headline */}
        <div className="origin-header reveal">
          <div className="origin-eyebrow-wrap">
            <span className="origin-badge">// 01 &bull; DEVELOPER ORIGIN STORY</span>
            <span className="origin-timeline-badge">2024 &mdash; 2026 ROADMAP</span>
          </div>
          <h2 className="origin-title">
            From NEET Aspirant <br />
            <span className="origin-title-gradient">to Shipping Software.</span>
          </h2>
          <p className="origin-subtitle">
            How two years of intense competitive discipline transformed into an unstoppable drive to architect, code, and ship production software.
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

            {/* Story-Integrated Metrics (Not generic disconnected stats) */}
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

          {/* Right Column: Sophisticated Developer System-Status Terminal */}
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
                  <span className="live-dot" /> LIVE
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
                    <span className="term-val highlight-amber">College Attendance Tracker v2.1.1</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">CORE_SYSTEMS:</span>
                    <span className="term-val">Kotlin Android &bull; Flutter &bull; React &bull; C</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">STUDIO_OPS:</span>
                    <span className="term-val highlight-cyan">CodeCraft Digital (8+ Client Deployments)</span>
                  </div>
                  <div className="term-row">
                    <span className="term-key">SHIPPING_RATE:</span>
                    <span className="term-val">~18.4 Commits / Week &bull; 99.9% Uptime</span>
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
                  <span className="telemetry-val">Verified Continuous Shipping</span>
                </div>
                <span className="term-build-pill">ENV: PROD-2026</span>
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
                <span className="author-title">Mobile Systems Architect &bull; Founder @ CodeCraft Digital</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2026 Shipping Activity Heatmap (Integrated Proof of Velocity) */}
        <div className="heatmap-card reveal" id="shippingHeatmap">
          <div className="heatmap-header">
            <div className="heatmap-title-group">
              <h3>Shipping Cadence &amp; Commit Velocity</h3>
              <p>
                <strong style={{ color: 'var(--ink-green)' }}>{commits}</strong> code contributions logged in 2026 across mobile utilities and client repositories
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
          <div className="heatmap-footer-note">
            <span>Less</span>
            <div className="heatmap-legend-cells">
              <span className="heat-cell heat-lvl-1" />
              <span className="heat-cell heat-lvl-2" />
              <span className="heat-cell heat-lvl-3" />
              <span className="heat-cell heat-lvl-4" />
            </div>
            <span>More Velocity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
