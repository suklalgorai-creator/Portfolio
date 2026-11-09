import { PageIntro } from '../components/common/PageIntro';
import { AboutSection } from '../sections/About/AboutSection';
import { ContactSection } from '../sections/Contact/ContactSection';
import { CodeCraftSection } from '../sections/CodeCraft/CodeCraftSection';
import { CinematicStorySection } from '../sections/CinematicStory/CinematicStorySection';
import { HeroSection } from '../sections/Hero/HeroSection';
import { JourneySection } from '../sections/Journey/JourneySection';
import { ProjectsSection } from '../sections/Projects/ProjectsSection';
import { TechStackSection } from '../sections/TechStack/TechStackSection';
import { TechPowerMode } from '../sections/TechStack/PowerMode/TechPowerMode';
import { skillsData } from '../data/skillsData';

export function HomePreviews() {
  const previewSkills = skillsData.slice(0, 2).flatMap((group) => group.skills.slice(0, 3).map((skill) => skill.name));

  return (
    <section className="home-previews" aria-label="Portfolio previews">
      <div className="container home-preview-grid">
        <article className="home-preview-card home-preview-about reveal">
          <span className="section-eyebrow">// A LITTLE CONTEXT</span>
          <h2>Curiosity is the through-line.</h2>
          <p>I’m a web and mobile developer from Jamshedpur who enjoys turning unclear problems into useful, well-finished software.</p>
          <a className="text-link" href="/about">Read the story <span aria-hidden="true">→</span></a>
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

export function AboutPage({ onToast }) {
  return (
    <>
      <PageIntro eyebrow="// 01 · THE BUILDER" title="A curious developer who likes useful software." description="The background, thinking, and learning journey behind the work." />
      <AboutSection onToast={onToast} />
      <JourneySection />
    </>
  );
}

export function ProjectsPage({ onSelectProject }) {
  return (
    <>
      <PageIntro eyebrow="// 02 · SELECTED WORK" title="Proof lives in the details." description="Explore personal applications, a studio showcase, web concepts, and experiments with their real constraints and technologies." />
      <ProjectsSection onSelectProject={onSelectProject} />
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
      <PageIntro eyebrow="// 04 · CURIOUS MINDS STUDIO" title="Creative technology with a practical point of view." description="A proposed secondary studio identity for thoughtful digital platforms, experiments, and useful interfaces." />
      <CodeCraftSection onStartInquiry={onStartInquiry} />
    </>
  );
}

export function ContactPage({ selectedTopic, prefilledMessage, onToast }) {
  return (
    <>
      <PageIntro eyebrow="// 05 · CONTACT" title="Have a problem worth building around?" description="Tell me what is stuck, what could be clearer, or what you want to make real." />
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
  selectedTopic,
  prefilledMessage
}) {
  switch (pathname) {
    case '/':
      return (
        <>
          <HeroSection onOpenStory={onOpenStory} onInitiateProject={onInitiateProject} />
          <CinematicStorySection />
          <ProjectsSection onSelectProject={onSelectProject} featuredOnly />
          <HomePreviews />
          <CodeCraftSection onStartInquiry={onStartInquiry} />
        </>
      );
    case '/about':
      return <AboutPage onToast={onToast} />;
    case '/projects':
      return <ProjectsPage onSelectProject={onSelectProject} />;
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
