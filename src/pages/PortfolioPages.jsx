import { lazy, Suspense, useState } from 'react';
import { PageIntro } from '../components/common/PageIntro';
import { AboutSection, AboutTeaser } from '../sections/About/AboutSection';
import { ExperienceSection } from '../sections/Experience/ExperienceSection';
import { ContactSection } from '../sections/Contact/ContactSection';
import { CodeCraftSection } from '../sections/CodeCraft/CodeCraftSection';
import { CinematicStorySection } from '../sections/CinematicStory/CinematicStorySection';
import { HeroSection } from '../sections/Hero/HeroSection';
import { AchievementsSection } from '../sections/Journey/AchievementsSection';
import { JourneySection } from '../sections/Journey/JourneySection';
import { ProjectsSection } from '../sections/Projects/ProjectsSection';
import { TechStackSection, SkillsTeaser } from '../sections/TechStack/TechStackSection';
import { TechPowerMode } from '../sections/TechStack/PowerMode/TechPowerMode';
import { ProjectDetailPage } from './ProjectDetailPage';
import { skillsData } from '../data/skillsData';

const AdminJourneyPage = lazy(() =>
  import('./AdminJourneyPage').then((mod) => ({ default: mod.AdminJourneyPage }))
);

export function HomePreviews() {
  const previewSkills = skillsData.slice(0, 2).flatMap((group) => group.skills.slice(0, 3).map((skill) => skill.name));

  return (
    <section className="home-previews" aria-label="Portfolio previews">
      <div className="container home-preview-grid">
        <article className="home-preview-card home-preview-about reveal">
          <span className="section-eyebrow">// A LITTLE CONTEXT</span>
          <h2>Curiosity is the through-line.</h2>
          <p>I’m a web and mobile developer from Jamshedpur who enjoys turning unclear problems into useful, well-finished software.</p>
          <a className="text-link" href="/about">Read the story &amp; experience <span aria-hidden="true">→</span></a>
        </article>

        <article className="home-preview-card home-preview-stack reveal">
          <span className="section-eyebrow">// CURRENT TOOLKIT</span>
          <h2>Build, test, learn, repeat.</h2>
          <div className="home-preview-tags">
            {previewSkills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <a className="text-link" href="/tech-stack">See the toolkit <span aria-hidden="true">→</span></a>
        </article>

        <article className="home-preview-card home-preview-contact reveal">
          <span className="section-eyebrow">// NEXT CONVERSATION</span>
          <h2>Have something worth making clearer?</h2>
          <p>Bring the problem, the constraint, or the rough idea. We can start with an honest next step.</p>
          <a className="btn btn-primary" href="/contact">Start a conversation <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>
  );
}

export function AboutPage({ onToast, onNavigate }) {
  return (
    <>
      <PageIntro
        eyebrow="// 01 · THE BUILDER"
        title="A curious developer who likes useful software."
        description="The background, engineering experience, and learning journey behind the work."
      />
      <AboutSection onToast={onToast} onNavigate={onNavigate} />
    </>
  );
}

export function ExperiencePage({ onNavigate }) {
  return (
    <>
      <PageIntro
        eyebrow="// 02 · EXPERIENCE"
        title="Where theory meets shipped software."
        description="From independent mobile utilities to regional studio prototypes and computer science coursework, every track sharpens product judgment."
      />
      <ExperienceSection hideHeader={true} />
      <section className="experience-pathway-section" style={{ padding: '0 0 clamp(3rem, 5vw, 5rem)' }}>
        <div className="container">
          <div
            className="experience-cta-card glass-crystal"
            style={{
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <span className="selected-eyebrow">// NEXT CONVERSATION</span>
            <h2 className="selected-title" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', margin: 0 }}>
              Have an opportunity or project in mind?
            </h2>
            <p className="selected-subtitle" style={{ maxWidth: '48ch', margin: '0 auto' }}>
              Whether it is an engineering internship, full-stack collaboration, or a mobile utility idea, let’s talk.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <a
                href="/contact"
                className="btn-contact-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/contact');
                }}
              >
                <span>Start a Conversation</span>
                <span className="submit-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="/projects"
                className="btn-selected-all glass-pill"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/projects');
                }}
              >
                <span>View Projects Archive</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function JourneyPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    const timelineEl = document.getElementById('journey');
    timelineEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageIntro
        eyebrow="// 03 · PROFESSIONAL JOURNEY"
        title="Achievements, launches, and turning points."
        description="A dynamic timeline covering competitions, awards, college activities, certifications, project launches, and technical milestones."
      />
      <AchievementsSection onSelectCategory={handleSelectCategory} />
      <JourneySection externalCategory={selectedCategory} />
    </>
  );
}

export function ProjectsPage({ onSelectProject, onNavigate }) {
  return (
    <>
      <PageIntro
        eyebrow="// 02 · SELECTED WORK"
        title="Proof lives in the details."
        description="Curating thoughtful digital platforms, personal applications, and engineering experiments."
      />
      <ProjectsSection onSelectProject={onSelectProject} onNavigate={onNavigate} />
    </>
  );
}

export function TechStackPage() {
  return (
    <>
      <TechPowerMode />
      <TechStackSection />
    </>
  );
}

export function StudioPage({ onStartInquiry }) {
  return (
    <>
      <PageIntro
        eyebrow="// 04 · CURIOUS MINDS STUDIO"
        title="Creative technology with a practical point of view."
        description="A proposed secondary studio identity for thoughtful digital platforms, experiments, and useful interfaces."
      />
      <CodeCraftSection onStartInquiry={onStartInquiry} />
    </>
  );
}

export function ContactPage({ selectedTopic, prefilledMessage, onToast }) {
  return (
    <>
      <PageIntro
        eyebrow="// 05 · CONTACT"
        title="Have a problem worth building around?"
        description="Tell me what is stuck, what could be clearer, or what you want to make real."
      />
      <ContactSection selectedTopic={selectedTopic} prefilledMessage={prefilledMessage} onToast={onToast} />
    </>
  );
}

export function PortfolioPage({
  pathname,
  onOpenStory,
  onInitiateProject,
  onSelectProject,
  onStartInquiry,
  onToast,
  onNavigate,
  selectedTopic,
  prefilledMessage
}) {
  if (pathname.startsWith('/projects/')) {
    const id = pathname.replace('/projects/', '').replace(/\/$/, '');
    return (
      <ProjectDetailPage
        projectId={id}
        onToast={onToast}
        onNavigate={onNavigate}
        onInquire={onStartInquiry}
      />
    );
  }

  switch (pathname) {
    case '/':
      return (
        <>
          <HeroSection onOpenStory={onOpenStory} onInitiateProject={onInitiateProject} />
          <AboutTeaser onNavigate={onNavigate} />
          <CinematicStorySection />
          <SkillsTeaser onNavigate={onNavigate} />
          <ProjectsSection onSelectProject={onSelectProject} onNavigate={onNavigate} featuredOnly={true} />
          <JourneySection compact={true} onNavigate={onNavigate} />
          <ContactSection selectedTopic={selectedTopic} prefilledMessage={prefilledMessage} onToast={onToast} />
        </>
      );
    case '/about':
      return <AboutPage onToast={onToast} onNavigate={onNavigate} />;
    case '/experience':
      return <ExperiencePage onNavigate={onNavigate} />;
    case '/journey':
      return <JourneyPage />;
    case '/projects':
      return <ProjectsPage onSelectProject={onSelectProject} onNavigate={onNavigate} />;
    case '/tech-stack':
      return <TechStackPage />;
    case '/studio':
      return <StudioPage onStartInquiry={onStartInquiry} />;
    case '/contact':
      return (
        <ContactPage
          selectedTopic={selectedTopic}
          prefilledMessage={prefilledMessage}
          onToast={onToast}
        />
      );
    case '/admin':
      return (
        <Suspense
          fallback={
            <section className="admin-cms-loading">
              <div className="container">
                <p>Loading Journey CMS Studio…</p>
              </div>
            </section>
          }
        >
          <AdminJourneyPage onToast={onToast} onNavigate={onNavigate} />
        </Suspense>
      );
    default:
      return <NotFoundPage />;
  }
}

export function NotFoundPage() {
  return (
    <section className="page-not-found">
      <div className="container">
        <span className="section-eyebrow">404 · OFF THE MAP</span>
        <h1>This page took a wrong turn.</h1>
        <p>The destination does not exist, but the next useful thing is still one click away.</p>
        <a className="btn btn-primary" href="/">Return home <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
