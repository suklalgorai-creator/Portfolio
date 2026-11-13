import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinematicStoryStages } from '../../data/cinematicStoryData';

gsap.registerPlugin(ScrollTrigger);

export function CinematicStorySection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const stageRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const compactLayout = window.matchMedia('(max-width: 767px)').matches;

    video.muted = true;
    video.defaultMuted = true;

    if (reducedMotion || compactLayout) {
      section.dataset.motionMode = 'static';
      return undefined;
    }

    section.dataset.motionMode = 'scrub';
    let frameId = 0;
    let pendingProgress = 0;

    const seekVideo = () => {
      frameId = 0;
      if (!Number.isFinite(video.duration) || video.duration <= 0 || video.readyState < 1) return;
      const targetTime = pendingProgress * video.duration;
      if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
    };

    const scheduleSeek = (progress) => {
      pendingProgress = progress;
      if (!frameId) frameId = window.requestAnimationFrame(seekVideo);
    };

    const ctx = gsap.context(() => {
      const stages = stageRefs.current.filter(Boolean);
      
      // Ensure the initial stage is fully visible on arrival
      if (stages[0]) {
        gsap.set(stages[0], { autoAlpha: 1, y: 0 });
      }
      if (stages.length > 1) {
        gsap.set(stages.slice(1), { autoAlpha: 0, y: 24 });
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2.2, 1400)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 0.15,
          invalidateOnRefresh: true,
          onUpdate: (self) => scheduleSeek(self.progress),
        },
      });

      stages.forEach((stage, index) => {
        if (index > 0) {
          timeline.to(stages[index - 1], { autoAlpha: 0, y: -20, duration: 0.2 }, `+=${0.12 * index}`);
          timeline.to(stage, { autoAlpha: 1, y: 0, duration: 0.25 }, '<+=0.04');
        }
      });

      if (coarsePointer) section.dataset.pointerMode = 'coarse';
    }, section);

    const handleMetadata = () => {
      scheduleSeek(0);
      ScrollTrigger.refresh();
    };
    video.addEventListener('loadedmetadata', handleMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      if (frameId) window.cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cinematic-story"
      id="cinematic-story"
      aria-labelledby="cinematic-story-title"
      data-motion-mode="static"
    >
      <div className="cinematic-story-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="cinematic-story-video"
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/developer-workspace.jpg"
          aria-hidden="true"
        >
          <source src="/assets/videos/part 1.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-story-vignette" />
      </div>

      <div className="cinematic-story-inner container">
        <div className="cinematic-story-intro">
          <span className="section-eyebrow">// THE WORK, IN MOTION</span>
          <h2 id="cinematic-story-title">A builder&rsquo;s journey, told in three shifts.</h2>
          <span className="cinematic-story-scroll-hint">Scroll to move through the story <span aria-hidden="true">↓</span></span>
        </div>

        <div className="cinematic-story-stages">
          {cinematicStoryStages.map((stage, index) => (
            <article
              key={stage.id}
              ref={(node) => { stageRefs.current[index] = node; }}
              className={`cinematic-story-stage cinematic-story-stage-${index + 1}`}
              aria-labelledby={`cinematic-stage-title-${stage.id}`}
            >
              <div className="cinematic-story-stage-meta">
                <span>{stage.number}</span>
                <span>{stage.label}</span>
              </div>
              <h3 id={`cinematic-stage-title-${stage.id}`}>{stage.title}</h3>
              <p>{stage.copy}</p>
              <span className="cinematic-story-accent">{stage.accent}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
