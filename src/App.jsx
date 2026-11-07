import React, { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { useStoryViewer } from './hooks/useStoryViewer';
import { useTerminal } from './hooks/useTerminal';

import { VideoBackground } from './components/layout/VideoBackground';
import { ConstellationCanvas } from './components/layout/ConstellationCanvas';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';

import { StoryModal } from './components/modals/StoryModal';
import { TerminalModal } from './components/modals/TerminalModal';
import { ProjectModal } from './components/modals/ProjectModal';

import { HeroSection } from './sections/Hero/HeroSection';
import { AboutSection } from './sections/About/AboutSection';
import { TechStackSection } from './sections/TechStack/TechStackSection';
import { ProjectsSection } from './sections/Projects/ProjectsSection';
import { CodeCraftSection } from './sections/CodeCraft/CodeCraftSection';
import { JourneySection } from './sections/Journey/JourneySection';
import { ContactSection } from './sections/Contact/ContactSection';

export function App() {
  const { isLight, toggleTheme } = useTheme();
  const storyViewer = useStoryViewer();
  const terminal = useTerminal(toggleTheme);

  const [selectedProject, setSelectedProject] = useState(null);
  const [contactTopic, setContactTopic] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const handleStartInquiry = useCallback(() => {
    setContactTopic('CodeCraft Digital Website Package');
    setContactMessage(
      'Hi Suklal, I want to build a professional website for my business with CodeCraft Digital. Let us discuss pricing and timeline.'
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Scrolled to project inquiry composer');
  }, [showToast]);

  const handleProjectInquire = useCallback((projectName) => {
    setContactTopic('Client Website / App Inquiry');
    setContactMessage(
      `Hi Suklal, I saw your "${projectName}" showcase and would like to build something similar for my business/project.`
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast(`Inquiring about ${projectName}`);
  }, [showToast]);

  return (
    <>
      <a className="skip-link" href="#hero">
        Skip to main content
      </a>

      {/* Global Cinematic Video Background */}
      <VideoBackground />

      {/* Particle Constellation & Spotlight */}
      <ConstellationCanvas isLight={isLight} />

      {/* Navigation Bar */}
      <Navbar
        onOpenStory={() => storyViewer.openStory(0)}
        onOpenTerminal={terminal.openTerminal}
        isLight={isLight}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Sections */}
      <main>
        <HeroSection
          onOpenStory={() => storyViewer.openStory(0)}
          onInitiateProject={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <AboutSection onToast={showToast} />

        <TechStackSection />

        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        <CodeCraftSection onStartInquiry={handleStartInquiry} />

        <JourneySection />

        <ContactSection
          selectedTopic={contactTopic}
          prefilledMessage={contactMessage}
          onToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/918709545464?text=Hi%20Suklal,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat with Suklal on WhatsApp"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>

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
    </>
  );
}
