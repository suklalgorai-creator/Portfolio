import React, { useRef, useEffect } from 'react';

export function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

    playVideo();
    video.addEventListener('canplay', playVideo, { once: true });
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
        preload="auto"
        poster="assets/images/developer-workspace.jpg"
      >
        <source src="assets/videos/part 1.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-bg-scrim" />
    </div>
  );
}
