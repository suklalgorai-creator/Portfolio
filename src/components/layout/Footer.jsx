import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            Designed &amp; Built by <strong style={{ color: 'var(--paper)' }}>Suklal Gorai</strong> • Founder of CodeCraft Digital &copy; 2026
          </p>
          <div className="footer-links">
            <a href="#hero">Top &uarr;</a>
            <a href="https://github.com/suklalgorai-creator" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/suklal-gorai-7ab4533b0" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:suklalgorai@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
