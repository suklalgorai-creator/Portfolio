import { useRef, useEffect } from 'react';

export function ConstellationCanvas({ isLight = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2 };
    let animId = null;
    let isPageVisible = !document.hidden;

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && animId === null) render();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile
      ? Math.min(12, Math.floor(width / 70))
      : Math.min(26, Math.floor(width / 54));

    const lightPalette = [
      'rgba(40, 120, 255, 0.35)',
      'rgba(121, 85, 237, 0.32)',
      'rgba(230, 90, 217, 0.28)',
      'rgba(84, 216, 245, 0.38)'
    ];
    const darkPalette = [
      'rgba(77, 142, 255, 0.4)',
      'rgba(149, 120, 248, 0.35)',
      'rgba(240, 123, 230, 0.32)',
      'rgba(112, 225, 249, 0.38)'
    ];

    const nodes = Array.from({ length: nodeCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 1.0,
      colorIndex: idx % 4
    }));

    const render = () => {
      if (!isPageVisible) {
        animId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      const palette = isLight ? lightPalette : darkPalette;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = palette[n.colorIndex];
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isLight ? 0.08 : 0.11);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(65, 105, 245, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        if (!isMobile) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 150) {
            const alpha = (1 - mDist / 150) * (isLight ? 0.14 : 0.18);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 115, 92, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLight]);

  return (
    <>
      <canvas id="bgConstellation" ref={canvasRef} aria-hidden="true" />
      <div className="cursor-spotlight" id="cursorSpotlight" aria-hidden="true" />
      <div className="bg-grid-overlay" aria-hidden="true" />
      <div className="mesh-orb-3" aria-hidden="true" />
    </>
  );
}
