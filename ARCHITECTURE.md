# Architecture

This is a React 19 single-page application built with Vite, designed with a Light-Mode-First editorial design system (`#FAF9F6` Warm Ivory, `#F0EFEA` Soft Neutral, `#20212A` Deep Ink, Electric Blue `#4169F5`, Coral Orange `#FF735C`, Lemon Yellow `#F8D95B`, and Lavender `#B8A5F5`).

## Structure

```text
index.html                 HTML document and Vite entrypoint
src/
  App.jsx                  Application shell, navigation, and global interaction state
  components/              Shared layout, modal, and feedback components
    common/                Shared feedback, headings, and page framing
    layout/                Navigation, footer, canvas, and video layers
    modals/                Story, terminal, and project dialogs
  config/                  Site links and route metadata
  data/                    Portfolio content, experience records, and Journey CMS seed
  services/                Journey CMS CRUD/sync service & Admin auth service
  hooks/                   Stateful interaction logic, Journey CMS subscription, and lifecycle cleanup
  pages/                   Route-level composition + lazy-loaded AdminJourneyPage (`/admin`)
  sections/                Page-level feature sections (Hero, About, Experience, TechStack, Projects, Journey, Studio, Contact)
css/style.css              Ordered CSS module manifest
css/modules/               Modular Light-Mode tokens, sections, CMS, motion, and responsive rules
src/sections/TechStack/PowerMode/
                          Feature-local power-mode visuals and styles
public/assets/             Static images and video served at `/assets/`
```

## Engineering decisions

- **Editorial Light-Mode System**: Warm Ivory (`#FAF9F6`) is the primary surface with section-specific strategic color accents and optional Dark Mode toggle support.
- **Professional Journey CMS**: `src/services/journeyService.js` + `src/hooks/useJourneyCms.js` power the public achievement timeline (`/journey`, `/about`, and Home) with instant synchronization from the authenticated Admin Dashboard (`/admin`) across components and browser tabs via `localStorage` and `BroadcastChannel`.
- **Code Splitting**: `/admin` (`AdminJourneyPage`) is lazy-loaded via `React.lazy` and `Suspense` so public routes stay lean.
- **Accessibility & Motion**: Uses semantic landmarks, `:focus-visible` outlines, accessible form error announcements (`aria-invalid`, `role="alert"`), CSS View-Timeline progressive reveals, and full `prefers-reduced-motion` support.
