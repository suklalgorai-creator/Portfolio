import { useState, useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';

export function Navbar({ onOpenStory, onOpenTerminal, isLight, onToggleTheme, currentPath = window.location.pathname, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => setActiveSection(currentPath), [currentPath]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const navigate = (event, path) => {
    event.preventDefault();
    closeMenu();
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container">
        <div className="nav-logo">
          <button
            type="button"
            className="nav-story-ring"
            id="navStoryTrigger"
            title="View Suklal's Story"
            aria-label="View Suklal's story"
            onClick={onOpenStory}
          >
            <img src="/assets/images/avatar.jpg" alt="Suklal Gorai" />
          </button>
          <a href="/" className="logo-text" onClick={(event) => navigate(event, '/')}>&lt;SG/&gt;</a>
        </div>

        <ul id="primary-navigation" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a
              href="/"
              className={`nav-link ${activeSection === '/' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={`nav-link ${activeSection === '/about' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/tech-stack"
              className={`nav-link ${activeSection === '/tech-stack' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/tech-stack')}
            >
              Tech Stack
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className={`nav-link ${activeSection === '/projects' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/projects')}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/studio"
              className={`nav-link ${activeSection === '/studio' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/studio')}
            >
              Curious Minds
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={`nav-link ${activeSection === '/contact' ? 'active' : ''}`}
              onClick={(event) => navigate(event, '/contact')}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-terminal-btn"
            id="cmdTerminalBtn"
            title="Open Interactive Dev Terminal"
            aria-label="Terminal: open interactive developer terminal"
            onClick={onOpenTerminal}
          >
            <span className="cmd-prompt">&gt;_</span>
            {' '}
            <span className="cmd-label">Terminal</span>
            {' '}
            <kbd className="cmd-kbd">Ctrl+K</kbd>
          </button>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github-btn"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="github-label">GitHub</span>
          </a>

          <button
            type="button"
            className="theme-toggle"
            id="themeToggle"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={onToggleTheme}
          >
            <span className="theme-icon" aria-hidden="true">
              {isLight ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
          </button>

          <button
            type="button"
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
