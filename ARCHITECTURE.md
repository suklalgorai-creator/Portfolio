# Website Architecture & Performance Engineering

The portfolio is a high-performance, vanilla static site designed to run with zero build step overhead and deploy directly to GitHub Pages, Netlify, or Vercel.

## Directory Structure

```text
index.html                 Semantic HTML5 document with async fonts, lazy media, and accessible milestones
css/
  style.css                Editorial design system, layout, cinematic styling, and GPU-optimized transitions
js/
  main.js                  Unified coordinator for canvas, interactive components, GSAP reveals, and video scrubbing
assets/
  images/                  Optimized raster assets with explicit loading="lazy" and decoding="async"
  videos/                  Hero media (assets/videos/part 1.mp4) for GSAP ScrollTrigger video scrubbing
```

## Performance & Rendering Highlights

- **Font Delivery:** Google Fonts preconnected and loaded asynchronously via `media="print" onload="this.media='all'"` with `<noscript>` fallback, eliminating render-blocking CSS.
- **Cinematic Hero:** Scroll-scrubbed HTML5 video powered by GSAP ScrollTrigger (`part 1.mp4`), decoupled from scroll events via `requestAnimationFrame` seeking throttles and hardware acceleration.
- **Progressive Enhancement:** Fully accessible without JavaScript; `.reveal` elements render visible by default and receive motion treatment only when `.js-enabled` is applied.
- **Scroll Reveals:** Restrained opacity and translate tweens batched via `ScrollTrigger.batch()`, with CSS transitions disabled when GSAP is active (`html.gsap-enabled .reveal { transition: none !important; }`).
- **Interactive Canvas:** HTML5 2D canvas with `IntersectionObserver` auto-pause when off-screen, `document.visibilitychange` tab-switch pausing, reduced particle counts on mobile (< 768px), and full cancellation on `prefers-reduced-motion: reduce`.
- **CSS Containment:** `content-visibility: auto` with `contain-intrinsic-size` on sections, `contain: layout style paint` on project cards, and GPU promotion (`will-change: transform`) on active animated layers.
- **Mobile Optimizations:** Throttled `backdrop-filter` on mobile viewports (< 480px), touch-friendly targets, and static poster fallback for cinematic video on handheld devices.
