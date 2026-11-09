# CSS module map

`../style.css` is the only global stylesheet entrypoint. It imports these files
in cascade order so existing markup and Vite imports remain unchanged.

| Module | Responsibility |
| --- | --- |
| `00-foundation` | Tokens, reset, base layers, navigation, shared buttons |
| `01-hero` | Hero workbench and hero presentation |
| `02-about` – `07-contact` | Feature sections and their local UI |
| `08-project-modal` – `09-terminal-modal` | Modal surfaces and terminal UI |
| `10-feedback-footer-motion` | Toasts, footer, keyframes, and shared reveal behavior |
| `11-responsive` | Original mobile/tablet interaction rules |
| `12-stories` | Story ring and story viewer |
| `13-visual-overrides` – `17-cinematic-hero` | Existing visual refinement layers |
| `18-origin-story` | Origin timeline/stage experience |
| `19-editorial-theme` – `21-light-theme` | Editorial, terminal, and light-theme layers |
| `22-cinematic-story` | Cinematic story section |
| `23-narrow-nav` | Narrow viewport navigation safeguards |
| `24-page-framing` | Dedicated page framing and final theme refinements |

Some later modules intentionally override earlier selectors. Those layers are
kept separate and ordered because they encode the current visual treatment;
consolidation should be done only alongside visual regression snapshots.
