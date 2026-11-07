import React, { useState, useEffect } from 'react';

export function ProjectModal({ project, isOpen, onClose, onInquire }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    if (project && project.screenshots && project.screenshots.length > 0) {
      setSelectedScreenshot(project.screenshots[0]);
    } else {
      setSelectedScreenshot(null);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const bannerImg = selectedScreenshot
    ? selectedScreenshot.url
    : 'assets/images/modal-banner-default.jpg';

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      id="projectModalOverlay"
      onClick={(e) => {
        if (e.target.id === 'projectModalOverlay') onClose();
      }}
    >
      <div className="modal">
        <button
          type="button"
          className="modal-close"
          id="projectModalClose"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-hero-banner">
          <img
            id="projectModalBannerImg"
            src={bannerImg}
            alt={project.name}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="modal-body" id="projectModalBody">
          <div className="modal-header">
            <h2 className="modal-project-name">{project.name}</h2>
            {project.version ? (
              <span className="modal-version-badge">v{project.version}</span>
            ) : (
              <span className="project-category-badge badge-client">CodeCraft Digital</span>
            )}
          </div>

          <p className="modal-description">{project.description}</p>

          {/* Screenshots Gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal-gallery-section">
              <div className="modal-gallery-header">
                <span className="modal-gallery-title">
                  Verified Screenshots ({project.screenshots.length})
                </span>
                <span className="modal-gallery-hint">
                  Select thumbnail to preview full resolution
                </span>
              </div>
              <div className="modal-gallery-grid">
                {project.screenshots.map((s, idx) => (
                  <div
                    key={idx}
                    className={`gallery-thumb-item ${
                      selectedScreenshot?.url === s.url ? 'active' : ''
                    }`}
                    onClick={() => setSelectedScreenshot(s)}
                  >
                    <img src={s.url} alt={s.title} loading="lazy" />
                    <span className="gallery-thumb-caption">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-highlights-box">
              <h4>Key Architecture &amp; Features</h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div className="modal-tech-stack">
              {project.techStack.map((t, idx) => (
                <span key={idx} className="modal-tech-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Direct APK download if available */}
          {project.downloadUrl && (
            <div className="modal-download-section">
              <div className="download-info">
                <h4>Direct Android APK Package</h4>
                <p>Release v{project.version} • {project.apkSize} • Verified Build</p>
              </div>
              <a
                href={project.downloadUrl}
                download
                className="btn btn-primary btn-sm modal-apk-trigger"
              >
                Download APK ({project.apkSize})
              </a>
            </div>
          )}

          {/* Release Changelog */}
          {project.changelog && project.changelog.length > 0 && (
            <div className="modal-changelog">
              <h3>Release Changelog</h3>
              {project.changelog.map((entry, idx) => (
                <div key={idx} className="changelog-entry">
                  <div className="changelog-version">
                    <strong>v{entry.version}</strong>
                    <span>— {entry.date}</span>
                  </div>
                  <ul>
                    {entry.changes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="modal-actions">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                View Source on GitHub ↗
              </a>
            )}
            <button
              type="button"
              className="btn btn-purple btn-sm modal-inquire-btn"
              onClick={() => {
                onClose();
                onInquire(project.name);
              }}
            >
              Request Similar Project ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
