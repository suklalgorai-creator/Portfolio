import { experienceData } from '../../data/experienceData';
import { RevealHeading } from '../../components/common/RevealHeading';

export function ExperienceSection({ hideHeader = false }) {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {!hideHeader && (
          <div className="section-header reveal">
            <span className="section-eyebrow">// 02 &bull; EXPERIENCE &amp; FOCUS</span>
            <RevealHeading className="section-title">Where theory meets shipped software.</RevealHeading>
            <p className="section-subtitle">
              From independent mobile utilities to regional studio prototypes and computer science coursework, every track sharpens product judgment.
            </p>
          </div>
        )}

        <div className="experience-grid">
          {experienceData.map((item, idx) => (
            <article
              key={item.id}
              className={`experience-card accent-${item.accent} reveal`}
            >
              <div className="experience-card-top">
                <span className="experience-index">0{idx + 1}</span>
                <span className="experience-period">{item.period}</span>
              </div>

              <h3 className="experience-role">{item.role}</h3>
              <p className="experience-org">{item.organization}</p>
              <p className="experience-summary">{item.summary}</p>

              <ul className="experience-highlights">
                {item.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>

              <div className="experience-stack">
                {item.stack.map((tech) => (
                  <span key={tech} className="experience-stack-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
