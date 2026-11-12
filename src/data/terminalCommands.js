import { siteConfig } from '../config/siteConfig';

export const terminalCommands = {
  help: () => ({ content: 'Available commands: projects, skills, journey, story, studio, socials, theme, clear' }),
  projects: () => ({
    content: '[PROJECT WORKBENCH] Public showcase is currently being curated. Active repositories include College Attendance Tracker (v2.1.1 PWA), ReelCount (Android), and Scientific Calculator (Flutter). Visit /projects for upcoming updates.'
  }),
  skills: () => ({
    content: '[LANGUAGES] Dart, Kotlin, JavaScript, Python, C, HTML/CSS\n[ECOSYSTEM] Flutter, Android SDK, React, Next.js, Firebase, Supabase, Git, Docker, Vercel.'
  }),
  journey: () => ({
    content: '[JOURNEY CMS] Live achievement timeline supporting Competitions, Awards, College activities, Certifications, Project launches & Technical milestones. Visit /journey or manage entries at /admin.'
  }),
  story: () => ({
    content: '[BACKGROUND] Disciplined problem-solving background transitioned into B.Tech CSE @ Netaji Subhas University, Jamshedpur — developing mobile apps, creative technology, and practical software solutions.'
  }),
  studio: () => ({
    content: '[CURIOUS MINDS STUDIO] Proposed creative-tech identity for thoughtful digital experiences, experiments, and useful interfaces.'
  }),
  agency: () => ({
    content: '[CURIOUS MINDS STUDIO] Proposed creative-tech identity for thoughtful digital experiences, experiments, and useful interfaces.'
  }),
  socials: () => ({
    content: 'GitHub: ' + siteConfig.github.replace('https://', '') + ' | LinkedIn: suklal-gorai | Email: ' + siteConfig.email
  })
};

export const terminalQuickChips = ['help', 'projects', 'skills', 'journey', 'story', 'studio', 'socials', 'theme', 'clear'];
