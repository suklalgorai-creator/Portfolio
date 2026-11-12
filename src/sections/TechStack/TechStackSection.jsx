import { useState } from 'react';
import { skillsData } from '../../data/skillsData';
import { RevealHeading } from '../../components/common/RevealHeading';

const ECOSYSTEM_SUMMARY = [
  {
    id: 'frontend',
    category: 'Frontend',
    stack: 'React, Next.js, Tailwind, TypeScript',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    color: 'var(--electric-blue)'
  },
  {
    id: 'backend',
    category: 'Backend',
    stack: 'Node.js, Express, PostgreSQL, Supabase',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    color: 'var(--royal-violet)'
  },
  {
    id: 'languages',
    category: 'Languages',
    stack: 'JavaScript, TypeScript, Python, Dart, C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: 'var(--coral-orange)'
  },
  {
    id: 'tools',
    category: 'Tools & Platforms',
    stack: 'Git, GitHub, Docker, Vercel, Figma',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    color: '#0284C7'
  }
];

export function TechStackSection() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Apple Liquid Glass Approved Ecosystem Showcase */}
        <div className="ecosystem-master-stage glass-crystal">
          {/* Left Column: Heading, Subtitle & Action */}
          <div className="ecosystem-intro-col">
            <span className="ecosystem-eyebrow">SKILLS</span>
            <h2 className="ecosystem-title">
              My Technology <br />
              <span className="holographic-text">Ecosystem.</span>
            </h2>
            <p className="ecosystem-desc">
              A modern and evolving stack to build high-quality, responsive, and
              resilient digital experiences.
            </p>
            <a href="#skills-bento" className="btn-ecosystem-action glass-pill">
              <span>Explore All Skills</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Center Column: 3D Iridescent Glass Sphere with Orbital Satellites */}
          <div className="ecosystem-orbital-col">
            <div className="orbital-system-stage" aria-hidden="true">
              {/* Outer Orbital Ring */}
              <div className="orbital-ring ring-outer" />
              {/* Inner Orbital Ring */}
              <div className="orbital-ring ring-inner" />

              {/* Central Glowing Liquid Glass Sphere */}
              <div className="orbital-core-sphere glass-crystal">
                <div className="core-shimmer" />
                <span className="core-symbol-pill">&lt;/&gt;</span>
              </div>

              {/* Orbiting Satellites */}
              <div className="orbit-satellite sat-react glass-crystal" title="React">
                <span className="sat-icon">⚛</span>
              </div>
              <div className="orbit-satellite sat-node glass-crystal" title="Node.js">
                <span className="sat-icon-green">JS</span>
              </div>
              <div className="orbit-satellite sat-ts glass-crystal" title="TypeScript">
                <span className="sat-icon-blue">TS</span>
              </div>
              <div className="orbit-satellite sat-tailwind glass-crystal" title="Tailwind CSS">
                <span className="sat-icon-cyan">≈</span>
              </div>
              <div className="orbit-satellite sat-figma glass-crystal" title="Figma">
                <span className="sat-icon-figma">❖</span>
              </div>
              <div className="orbit-satellite sat-github glass-crystal" title="GitHub">
                <span className="sat-icon-dark">🐙</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Categorized Glass Accordion Cards */}
          <div className="ecosystem-categories-col">
            {ECOSYSTEM_SUMMARY.map((item) => (
              <div
                key={item.id}
                className={`ecosystem-category-pill glass-frosted ${selectedDomain === item.id ? 'active' : ''}`}
                onClick={() => setSelectedDomain(prev => prev === item.id ? null : item.id)}
              >
                <div className="cat-icon-wrap" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="cat-text-wrap">
                  <span className="cat-title">{item.category}</span>
                  <span className="cat-stack">{item.stack}</span>
                </div>
                <span className="cat-chevron" aria-hidden="true">❯</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Skills Bento Grid */}
        <div id="skills-bento" className="section-header reveal" style={{ marginTop: '4rem' }}>
          <span className="section-eyebrow">// 02 &bull; TOOLKIT ARCHITECTURE</span>
          <RevealHeading className="section-title">The tools are only the beginning.</RevealHeading>
          <p className="section-subtitle">
            A practical toolkit for turning ambiguous ideas into fast, maintainable products people can actually use.
          </p>
        </div>

        <div className="skills-bento-grid">
          {skillsData.map((group) => (
            <div key={group.id} className={`skills-bento-card card-${group.id} glass-frosted reveal`}>
              <div className="skills-card-top">
                <div className="skills-card-header-left">
                  <span className="skills-category-badge">{group.tag}</span>
                  <h3 className="skills-category-title">{group.category}</h3>
                </div>
                <span className="skills-count-pill">{group.skills.length} Technologies</span>
              </div>

              <p className="skills-category-desc">{group.description}</p>

              <div className="skills-pills-wrap">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-chip">
                    <span className="skill-chip-dot" />
                    <span className="skill-chip-name">{skill.name}</span>
                    <span className="skill-chip-type">{skill.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsTeaser() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <section id="skills" className="skills-section skills-teaser-section">
      <div className="container">
        {/* Apple Liquid Glass Approved Ecosystem Showcase */}
        <div className="ecosystem-master-stage glass-crystal">
          {/* Left Column: Heading, Subtitle & Action */}
          <div className="ecosystem-intro-col">
            <span className="ecosystem-eyebrow">SKILLS</span>
            <h2 className="ecosystem-title">
              My Technology <br />
              <span className="holographic-text">Ecosystem.</span>
            </h2>
            <p className="ecosystem-desc">
              A modern and evolving stack to build high-quality, responsive, and
              resilient digital experiences.
            </p>
            <a href="/tech-stack" className="btn-ecosystem-action glass-pill" id="exploreAllSkillsLink">
              <span>Explore All Skills &amp; Interactive Playground</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Center Column: 3D Iridescent Glass Sphere with Orbital Satellites */}
          <div className="ecosystem-orbital-col">
            <div className="orbital-system-stage" aria-hidden="true">
              {/* Outer Orbital Ring */}
              <div className="orbital-ring ring-outer" />
              {/* Inner Orbital Ring */}
              <div className="orbital-ring ring-inner" />

              {/* Central Glowing Liquid Glass Sphere */}
              <div className="orbital-core-sphere glass-crystal">
                <div className="core-shimmer" />
                <span className="core-symbol-pill">&lt;/&gt;</span>
              </div>

              {/* Orbiting Satellites */}
              <div className="orbit-satellite sat-react glass-crystal" title="React">
                <span className="sat-icon">⚛</span>
              </div>
              <div className="orbit-satellite sat-node glass-crystal" title="Node.js">
                <span className="sat-icon-green">JS</span>
              </div>
              <div className="orbit-satellite sat-ts glass-crystal" title="TypeScript">
                <span className="sat-icon-blue">TS</span>
              </div>
              <div className="orbit-satellite sat-tailwind glass-crystal" title="Tailwind CSS">
                <span className="sat-icon-cyan">≈</span>
              </div>
              <div className="orbit-satellite sat-figma glass-crystal" title="Figma">
                <span className="sat-icon-figma">❖</span>
              </div>
              <div className="orbit-satellite sat-github glass-crystal" title="GitHub">
                <span className="sat-icon-dark">🐙</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Categorized Glass Accordion Cards */}
          <div className="ecosystem-categories-col">
            {ECOSYSTEM_SUMMARY.map((item) => (
              <div
                key={item.id}
                className={`ecosystem-category-pill glass-frosted ${selectedDomain === item.id ? 'active' : ''}`}
                onClick={() => setSelectedDomain(prev => prev === item.id ? null : item.id)}
              >
                <div className="cat-icon-wrap" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="cat-text-wrap">
                  <span className="cat-title">{item.category}</span>
                  <span className="cat-stack">{item.stack}</span>
                </div>
                <span className="cat-chevron" aria-hidden="true">❯</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}