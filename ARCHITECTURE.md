# Architecture

This is a React 19 single-page application built with Vite.

## Structure

```text
index.html                 HTML document and Vite entrypoint
src/
  App.jsx                  Application composition and global interaction state
  components/              Shared layout, modal, and feedback components
  config/                  Shared public configuration
  data/                    Portfolio content and project records
  hooks/                   Stateful interaction logic
  sections/                Page-level feature sections
css/style.css              Design tokens, layout, animation, and responsive rules
assets/                    Images and video
```

## Engineering decisions

- Content is separated from rendering in `src/data` so project and terminal updates do not require component changes.
- Stateful behavior such as theme, terminal, story playback, and simulations lives in hooks with explicit cleanup.
- The contact form uses a prefilled `mailto:` action and does not expose secrets or require a backend.
- Images use lazy loading where appropriate; the canvas and video components pause or reduce work when possible.
- The UI uses semantic sections, labels, keyboard-accessible controls, focusable cards, and a skip link.
- An application-level error boundary provides a recoverable fallback for unexpected render failures.
- Decorative canvas animation pauses when the document is hidden and is disabled for reduced-motion users; background video uses poster-first metadata loading.

The active application entry is `index.html` → `src/main.jsx`. The previous vanilla prototype files are not part of the build graph.

The optional `server.js` is an ES-module local static server with validated traversal and media-range handling; Vite preview remains the recommended production-like preview path.
