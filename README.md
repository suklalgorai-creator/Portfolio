# Suklal Gorai — Portfolio

React/Vite portfolio and CodeCraft Digital showcase.

## Development

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

QA commands:

```bash
npm test
npm run test:e2e
npm run test:all
```

The test suite uses Vitest/React Testing Library for component behavior and Playwright for browser flows, responsive overflow checks, and axe accessibility checks.

No environment variables or backend services are required. The contact form opens a prefilled `mailto:` draft; it does not transmit data to a third-party server.

## Architecture

- `src/App.jsx` composes page sections and global modal/toast state.
- `src/sections/` contains page-level feature sections.
- `src/components/` contains shared layout, modal, and feedback UI.
- `src/hooks/` contains stateful interaction logic and lifecycle management.
- `src/data/` contains portfolio content, project records, and terminal commands.
- `src/config/` contains shared public configuration.
- `css/style.css` is the global CSS entrypoint; its ordered modules live in `css/modules/` and
  cover foundation tokens, feature sections, shared UI, overlays, motion, themes, and responsive rules.
- `public/assets/` contains the static images and video served at `/assets/`.

The legacy vanilla entrypoints are intentionally excluded; Vite serves `index.html` and `src/main.jsx` as the single application entry.

The optional range-aware static server lives at `scripts/server.js`; use `npm run serve` when a local server with video range support is useful.

## Verification

Run `npm run build`, `npm test`, and `npm run test:e2e` before deployment.

Vitest covers component behavior with React Testing Library. Playwright covers browser flows, responsive overflow, accessibility, direct routes, motion modes, and cinematic video scrubbing. No lint runner is currently configured.
