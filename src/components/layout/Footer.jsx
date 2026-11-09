import { siteConfig } from '../../config/siteConfig';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            Designed &amp; Built by <strong style={{ color: 'var(--paper)' }}>Suklal Gorai</strong> • Web &amp; Mobile Developer &copy; 2026
          </p>
          <div className="footer-links">
            <a href="/">Home &uarr;</a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={'mailto:' + siteConfig.email}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
