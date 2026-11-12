import { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from './hooks/useTheme';
import { useStoryViewer } from './hooks/useStoryViewer';
import { useTerminal } from './hooks/useTerminal';
import { useMotionSystem } from './hooks/useMotionSystem';
import { pageMeta, notFoundMeta } from './config/pageMeta';
import { siteConfig } from './config/siteConfig';
import { projectsData } from './data/projectsData';

import { VideoBackground } from './components/layout/VideoBackground';
import { ConstellationCanvas } from './components/layout/ConstellationCanvas';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { BackToTop } from './components/common/BackToTop';

import { StoryModal } from './components/modals/StoryModal';
import { TerminalModal } from './components/modals/TerminalModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { PortfolioPage } from './pages/PortfolioPages';

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
}

export function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));
  useMotionSystem(pathname);
  const { isLight, toggleTheme } = useTheme();
  const storyViewer = useStoryViewer();
  const terminal = useTerminal(toggleTheme);

  const [selectedProject, setSelectedProject] = useState(null);
  const [contactTopic, setContactTopic] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [toasts, setToasts] = useState([]);
  const toastTimers = useRef(new Set());

  useEffect(() => () => {
    toastTimers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    let metadata = pageMeta[pathname];
    if (!metadata && pathname.startsWith('/projects/')) {
      const id = pathname.replace('/projects/', '').replace(/\/$/, '');
      const project = projectsData.find((p) => p.id === id);
      if (project) {
        metadata = {
          title: `${project.name} — Suklal Gorai`,
          description: project.description.slice(0, 160)
        };
      }
    }
    if (!metadata) metadata = notFoundMeta;
    document.title = metadata.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', metadata.description);
  }, [pathname]);

  const navigate = useCallback((path) => {
    const nextPath = normalizePath(path);
    if (nextPath === pathname) {
      window.scrollTo(0, 0);
      return;
    }
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleInternalLink = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(url.pathname);
    };

    document.addEventListener('click', handleInternalLink);
    return () => document.removeEventListener('click', handleInternalLink);
  }, [navigate]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      toastTimers.current.delete(timer);
    }, 3200);
    toastTimers.current.add(timer);
  }, []);

  const handleStartInquiry = useCallback(() => {
    setContactTopic('Curious Minds Studio conversation');
    setContactMessage(
      'Hi Suklal, I have a digital product idea and would like to discuss the problem, scope, and a practical next step.'
    );
    navigate('/contact');
    showToast('Scrolled to project inquiry composer');
  }, [navigate, showToast]);

  const handleProjectInquire = useCallback((projectName) => {
    setContactTopic('Website / App Inquiry');
    setContactMessage(
      `Hi Suklal, I saw your "${projectName}" showcase and would like to discuss a similar problem or experience for my project.`
    );
    navigate('/contact');
    showToast(`Inquiring about ${projectName}`);
  }, [navigate, showToast]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Ambient video is a Home experience; detail pages stay lighter. */}
      {pathname === '/' && <VideoBackground />}

      {/* Subtle Editorial Geometric Canvas & Spotlight */}
      <ConstellationCanvas isLight={isLight} />

      {/* Navigation Bar */}
      <Navbar
        onOpenStory={() => storyViewer.openStory(0)}
        onOpenTerminal={terminal.openTerminal}
        isLight={isLight}
        onToggleTheme={toggleTheme}
        currentPath={pathname}
        onNavigate={navigate}
      />

      {/* Main Page Sections */}
      <main id="main-content" tabIndex={-1}>
        <PortfolioPage
          pathname={pathname}
          onOpenStory={() => storyViewer.openStory(0)}
          onInitiateProject={() => navigate('/contact')}
          onSelectProject={setSelectedProject}
          onStartInquiry={handleStartInquiry}
          onToast={showToast}
          onNavigate={navigate}
          selectedTopic={contactTopic}
          prefilledMessage={contactMessage}
        />
      </main>

      {/* Footer */}
      <Footer />

      <aside aria-label="Quick contact">
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          aria-label="Chat on WhatsApp"
          title="Chat with Suklal on WhatsApp"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="whatsapp-label">WhatsApp</span>
        </a>
      </aside>

      {/* Modals */}
      <StoryModal
        isOpen={storyViewer.isOpen}
        currentIdx={storyViewer.currentIdx}
        currentSlide={storyViewer.currentSlide}
        stories={storyViewer.stories}
        progress={storyViewer.progress}
        onClose={storyViewer.closeStory}
        onNext={storyViewer.nextSlide}
        onPrev={storyViewer.prevSlide}
        onPause={() => storyViewer.setIsPaused(true)}
        onResume={() => storyViewer.setIsPaused(false)}
        onContact={() => navigate('/contact')}
      />

      <TerminalModal
        isOpen={terminal.isOpen}
        history={terminal.history}
        inputVal={terminal.inputVal}
        onInputChange={terminal.setInputVal}
        onSubmit={terminal.executeCommand}
        onChipClick={terminal.executeCommand}
        onClose={terminal.closeTerminal}
      />

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleProjectInquire}
      />

      {/* Notifications */}
      <Toast toasts={toasts} />
      <BackToTop />
    </>
  );
}
