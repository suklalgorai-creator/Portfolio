import { useRef, useEffect } from 'react';

export function VideoBackground() {
  const videoRef = useRef(null);
  const source = '/assets/videos/part 1.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener('click', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('touchstart', unlock);
          };
          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('scroll', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true });
        });
      }
    };

    const loadVideo = () => {
      if (video.src) {
        playVideo();
        return;
      }
      video.src = video.dataset.src;
      video.load();
      video.addEventListener('canplay', playVideo, { once: true });
    };

    const activate = () => {
      loadVideo();
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      window.removeEventListener('scroll', activate);
      window.removeEventListener('touchstart', activate);
    };

    // Keep the large ambient asset out of the critical path. The poster is
    // immediately visible; the moving background begins once the visitor
    // interacts with the page, while the cinematic section remains intact.
    window.addEventListener('pointerdown', activate, { passive: true });
    window.addEventListener('keydown', activate, { passive: true });
    window.addEventListener('scroll', activate, { passive: true });
    window.addEventListener('touchstart', activate, { passive: true });

    return () => {
      video.removeEventListener('canplay', playVideo);
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      window.removeEventListener('scroll', activate);
      window.removeEventListener('touchstart', activate);
    };
  }, []);

  return (
    <div className="cinematic-bg-container" id="cinematicBg" aria-hidden="true">
      <video
        ref={videoRef}
        className="cinematic-bg-video"
        id="cinematicVideo"
        data-src={source}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="none"
        poster="/assets/images/developer-workspace.jpg"
      >
      </video>
      <div className="cinematic-bg-scrim" />
    </div>
  );
}
