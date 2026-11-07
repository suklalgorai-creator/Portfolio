import React, { useRef, useEffect } from 'react';

export function VideoBackground() {
  const videoRef = useRef(null);

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

    let idleHandle;
    let fallbackTimer;
    const loadVideo = () => {
      video.load();
      playVideo();
    };

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(loadVideo, { timeout: 3000 });
    } else {
      fallbackTimer = window.setTimeout(loadVideo, 1500);
    }

    video.addEventListener('canplay', playVideo, { once: true });
    return () => {
      video.removeEventListener('canplay', playVideo);
      if (idleHandle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleHandle);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="cinematic-bg-container" id="cinematicBg" aria-hidden="true">
      <video
        ref={videoRef}
        className="cinematic-bg-video"
        id="cinematicVideo"
        src="assets/videos/part 1.mp4"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="none"
        poster="assets/images/developer-workspace.jpg"
      >
        <source src="assets/videos/part 1.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-bg-scrim" />
    </div>
  );
}
