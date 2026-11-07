import React from 'react';

export function CodeCraftSection({ onStartInquiry }) {
  return (
    <section id="agency" className="agency-section">
      <div className="container">
        <div className="studio-showcase-panel reveal">
          <div className="studio-content-left">
            <span className="studio-eyebrow-tag">CODECRAFT DIGITAL &bull; STUDIO</span>
            <h3 className="studio-heading">Direct Studio Engagements for Ambitious Businesses</h3>
            <p className="studio-desc">
              Through <strong>CodeCraft Digital</strong>, I partner directly with local businesses, clinics, resorts, and organizations to architect and ship fast, high-converting web platforms and custom mobile software &mdash; without agency overhead or unnecessary complexity.
            </p>
            <div className="studio-cta-row">
              <button
                type="button"
                className="btn btn-primary"
                id="agencyInquireBtn"
                onClick={onStartInquiry}
              >
                <span>Initiate Studio Project</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          <div className="studio-services-matrix">
            <div className="studio-service-card">
              <div className="service-card-header">
                <span className="service-dot" />
                <span className="service-title">Hospitality &amp; Business Platforms</span>
              </div>
              <span className="service-meta">Turnkey Design &amp; Deployment</span>
            </div>

            <div className="studio-service-card">
              <div className="service-card-header">
                <span className="service-dot" />
                <span className="service-title">Native Mobile Engineering</span>
              </div>
              <span className="service-meta">Cross-Platform Flutter &amp; Android</span>
            </div>

            <div className="studio-service-card">
              <div className="service-card-header">
                <span className="service-dot" />
                <span className="service-title">Infrastructure &amp; Lead Systems</span>
              </div>
              <span className="service-meta">SEO, Cloud Hosting &amp; WhatsApp Flows</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
