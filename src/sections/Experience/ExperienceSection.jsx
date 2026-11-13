import { experienceData } from '../../data/experienceData';
import { RevealHeading } from '../../components/common/RevealHeading';

export function ExperienceSection({ hideHeader = false }) {
  const leadTrack = experienceData[0];
  const secondaryTracks = experienceData.slice(1);

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

        <div className="experience-editorial-layout">
          {/* Spotlight Track 01: Lead Builder Showcase */}
          {leadTrack && (
            <article className={`experience-card-lead accent-${leadTrack.accent} reveal`}>
              <div className="experience-lead-header">
                <div className="experience-lead-badge-group">
                  <span className="experience-track-pill">// TRACK 01 · ACTIVE ENGINEERING</span>
                  <span className="experience-status-pill">
                    <span className="status-dot-pulse" aria-hidden="true" />
                    Actively Shipping
                  </span>
                </div>
                <span className="experience-period">{leadTrack.period}</span>
              </div>

              <div className="experience-lead-content-grid">
                <div className="experience-lead-main">
                  <h3 className="experience-role-lead">{leadTrack.role}</h3>
                  <p className="experience-org-lead">{leadTrack.organization}</p>
                  <p className="experience-summary-lead">{leadTrack.summary}</p>
                  
                  <div className="experience-stack experience-stack-lead">
                    {leadTrack.stack.map((tech) => (
                      <span key={tech} className="experience-stack-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="experience-lead-deliverables">
                  <span className="experience-deliverables-title">Key Shipped Deliverables</span>
                  <div className="experience-deliverables-list">
                    {leadTrack.highlights.map((highlight, idx) => (
                      <div key={idx} className="experience-deliverable-item">
                        <span className="deliverable-index">0{idx + 1}</span>
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Duo: Tracks 02 & 03 */}
          <div className="experience-duo-grid">
            {secondaryTracks.map((item, idx) => (
              <article
                key={item.id}
                className={`experience-card accent-${item.accent} reveal`}
              >
                <div className="experience-card-top">
                  <span className="experience-track-pill">
                    // TRACK 0{idx + 2} · {item.accent === 'coral' ? 'STUDIO EXPLORATIONS' : 'ACADEMIC FOUNDATION'}
                  </span>
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
      </div>
    </section>
  );
}
