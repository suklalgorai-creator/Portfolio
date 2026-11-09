# Architecture

This is a React 19 single-page application built with Vite.

## Structure

```text
index.html                 HTML document and Vite entrypoint
src/
  App.jsx                  Application shell and global interaction state
  components/              Shared layout, modal, and feedback components
    common/                Shared feedback, headings, and page framing
    layout/                Navigation, footer, canvas, and video layers
    modals/                Story, terminal, and project dialogs
  config/                  Site links and route metadata
  data/                    Portfolio content and feature-owned records
  hooks/                   Stateful interaction logic and lifecycle cleanup
  pages/                   Route-level composition without a routing dependency
  sections/                Page-level feature sections
css/style.css              Ordered CSS module manifest
css/modules/               Design tokens, sections, components, motion, and responsive rules
src/sections/TechStack/PowerMode/
                          Feature-local power-mode visuals and styles
public/assets/             Static images and video served at `/assets/`
```

## Engineering decisions

- Content is separated from rendering in `src/data` so project and terminal updates do not require component changes.
- `src/pages/PortfolioPages.jsx` owns route-to-page composition while `App.jsx` owns the application shell and global state.
- Route metadata, cinematic stages, and attendance simulation seeds are kept out of their renderers.
- Stateful behavior such as theme, terminal, story playback, and simulations lives in hooks with explicit cleanup.
- Power-mode GSAP contexts and interaction timers are cancelled on replacement and unmount.
- Global CSS is split into ordered modules under `css/modules/`; `css/style.css` remains the
  single entrypoint so Vite and existing imports keep working. The module order intentionally
  preserves the historical cascade, including later visual refinement and theme layers.
- The contact form uses a prefilled `mailto:` action and does not expose secrets or require a backend.
- Images use lazy loading where appropriate; the canvas and video components pause or reduce work when possible.
- The UI uses semantic sections, labels, keyboard-accessible controls, focusable cards, and a skip link.
- An application-level error boundary provides a recoverable fallback for unexpected render failures.
- Decorative canvas animation pauses when the document is hidden and is disabled for reduced-motion users; background video uses poster-first metadata loading.

The active application entry is `index.html` → `src/main.jsx`. The previous vanilla prototype files are not part of the build graph.

The optional `scripts/server.js` is an ES-module local static server with validated traversal and media-range handling; Vite preview remains the recommended production-like preview path.
