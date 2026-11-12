import { useState, useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';

export function Navbar({
  onOpenStory,
  onOpenTerminal,
  isLight,
  onToggleTheme,
  currentPath = window.location.pathname,
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/tech-stack', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/journey', label: 'Journey' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar floating-glass-pill" aria-label="Primary navigation">
        {/* Brand Monogram & Identity */}
        <div className="nav-logo">
          <button
            type="button"
            className="nav-story-ring"
            id="navStoryTrigger"
            title="View Suklal's story"
            aria-label="View Suklal's story"
            onClick={onOpenStory}
          >
            <img src="/assets/images/avatar.jpg" alt="Suklal Gorai" />
          </button>
          <a href="/" className="logo-brand-block" onClick={(event) => navigate(event, '/')}>
            <span className="logo-monogram-pill" aria-hidden="true">&lt;/&gt;</span>
            <div className="logo-meta">
              <span className="logo-text">Suklal Gorai</span>
              <span className="logo-subtext">Developer · Designer</span>
            </div>
          </a>
        </div>

        {/* Floating Nav Menu Links */}
        <ul id="primary-navigation" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? activeSection === '/'
              : activeSection.startsWith(item.path);
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(event) => navigate(event, item.path)}
                >
                  {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Trailing Controls & CTAs */}
        <div className="nav-actions">
          {/* Interactive Dev Terminal */}
          <button
            type="button"
            className="cmd-terminal-btn"
            id="cmdTerminalBtn"
            title="Open Interactive Dev Terminal"
            aria-label="Terminal: open interactive developer terminal"
            onClick={onOpenTerminal}
          >
            <span className="cmd-prompt" aria-hidden="true" data-symbol=">_" />
            <span className="cmd-label">Terminal</span>
            <kbd className="cmd-kbd" aria-hidden="true" data-shortcut="Ctrl+K" />
          </button>

          {/* GitHub Icon Link */}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github-btn"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="github-label">GitHub</span>
          </a>

          {/* Theme Mode Toggle */}
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

          {/* Glowing Let's Talk CTA Pill */}
          <a
            href="/contact"
            className="nav-cta-pill"
            onClick={(event) => navigate(event, '/contact')}
          >
            <span>Let's Talk</span>
            <span className="nav-cta-arrow" aria-hidden="true">↗</span>
          </a>

          {/* Mobile Navigation Drawer Button */}
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
      </nav>
    </header>
  );
}
