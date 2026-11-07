import React from 'react';
import { skillsData } from '../../data/skillsData';
import { RevealHeading } from '../../components/common/RevealHeading';

export function TechStackSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">// 02 &bull; TOOLKIT</span>
          <RevealHeading className="section-title">The tools are only the beginning.</RevealHeading>
          <p className="section-subtitle">
            A practical toolkit for turning ambiguous ideas into fast, maintainable products people can actually use.
          </p>
        </div>

        <div className="skills-bento-grid">
          {skillsData.map((group) => (
            <div key={group.id} className={`skills-bento-card card-${group.id} reveal`}>
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
