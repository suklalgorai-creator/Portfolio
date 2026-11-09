
export function CodeCraftSection({ onStartInquiry }) {
  return (
    <section id="agency" className="agency-section">
      <div className="container">
        <div className="studio-showcase-panel reveal">
          <div className="studio-content-left">
            <span className="studio-eyebrow-tag">CURIOUS MINDS STUDIO &bull; CREATIVE-TECH SHOWCASE</span>
            <h3 className="studio-heading">Ideas that earn their way into the interface.</h3>
            <p className="studio-desc">
              <strong>Curious Minds Studio</strong> is a proposed secondary identity for exploring useful web platforms, mobile product ideas, and regional digital concepts. The archive includes CodeCraft Digital as a studio showcase, while concepts remain clearly marked as concepts.
            </p>
            <div className="studio-cta-row">
              <button
                type="button"
                className="btn btn-primary"
                id="agencyInquireBtn"
                onClick={onStartInquiry}
              >
                <span>Discuss a Project Idea</span>
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
                <span className="service-title">Web Platforms &amp; Interfaces</span>
              </div>
              <span className="service-meta">Concepts and prototypes</span>
            </div>

            <div className="studio-service-card">
              <div className="service-card-header">
                <span className="service-dot" />
                <span className="service-title">Mobile Product Experiments</span>
              </div>
              <span className="service-meta">Flutter and Android builds</span>
            </div>

            <div className="studio-service-card">
              <div className="service-card-header">
                <span className="service-dot" />
                <span className="service-title">Performance-Minded Delivery</span>
              </div>
              <span className="service-meta">SEO, hosting and accessible flows</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
