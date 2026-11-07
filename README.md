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
- `css/style.css` contains the design system and responsive styles.
- `assets/` contains images and video used by the site.

The legacy vanilla entrypoints are intentionally excluded; Vite serves `index.html` and `src/main.jsx` as the single application entry.

## Verification

The production build is verified with `npm run build`. The repository currently has no automated test or lint runner configured; browser interaction QA should be performed before deployment.
