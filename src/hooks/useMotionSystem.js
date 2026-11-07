import { useEffect } from 'react';

const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = () => (
  window.matchMedia('(hover: none), (pointer: coarse)').matches
  || window.innerWidth < 768
  || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
);

export function useMotionSystem() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-enabled');

    const reduced = isReducedMotion();
    const coarsePointer = isCoarsePointer();
    if (reduced) root.classList.add('motion-reduced');

    const revealNodes = Array.from(document.querySelectorAll('.reveal'));
    revealNodes.forEach((node, index) => {
      node.style.setProperty('--reveal-index', String(index % 6));
      node.style.setProperty('--reveal-delay', `${(index % 6) * 70}ms`);
    });

    if (reduced) {
      revealNodes.forEach((node) => node.classList.add('active'));
      return () => {
        root.classList.remove('js-enabled', 'motion-reduced');
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    revealNodes.forEach((node) => observer.observe(node));

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const magneticNodes = Array.from(document.querySelectorAll('[data-magnetic]'));
    const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax]'));

    const updatePointerMotion = () => {
      frame = 0;
      if (!coarsePointer && magneticNodes.length > 0) {
        magneticNodes.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const strength = Number(node.dataset.magnetic) || 0.12;
          const dx = ((pointerX - (rect.left + rect.width / 2)) / rect.width) * 12 * strength;
          const dy = ((pointerY - (rect.top + rect.height / 2)) / rect.height) * 12 * strength;
          node.style.setProperty('--magnetic-x', `${dx.toFixed(2)}px`);
          node.style.setProperty('--magnetic-y', `${dy.toFixed(2)}px`);
        });
      }
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(updatePointerMotion);
    };

    const updateParallax = () => {
      frame = 0;
      if (coarsePointer || parallaxNodes.length === 0) return;
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const intensity = Number(node.dataset.parallax) || 0.04;
        const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) * intensity;
        node.style.setProperty('--parallax-y', `${Math.max(-18, Math.min(18, -centerOffset))}px`);
      });
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    if (!coarsePointer) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      updateParallax();
    }

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      root.classList.remove('js-enabled', 'motion-reduced');
      [...magneticNodes, ...parallaxNodes].forEach((node) => {
        node.style.removeProperty('--magnetic-x');
        node.style.removeProperty('--magnetic-y');
        node.style.removeProperty('--parallax-y');
      });
    };
  }, []);
}
