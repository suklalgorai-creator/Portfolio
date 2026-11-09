import { siteConfig } from '../config/siteConfig';

export const terminalCommands = {
  help: () => ({ content: 'Available commands: projects, skills, story, studio, socials, theme, clear' }),
  projects: () => ({
    content: '[PERSONAL APPS] College Attendance Tracker (v2.1.1), ReelCount (Kotlin), Scientific Calculator (Flutter)\n[STUDIO SHOWCASE + CONCEPTS] CodeCraft Digital, Sahyog Jharkhand NGO, Aranyak Resort, Wedding Studio, Food Ordering, Parlour & Salon.'
  }),
  skills: () => ({
    content: '[LANGUAGES] Dart, Kotlin, JavaScript, Python, C, HTML/CSS\n[ECOSYSTEM] Flutter, Android SDK, React, Next.js, Firebase, Supabase, Git, Docker, Vercel.'
  }),
  story: () => ({
    content: '[BACKGROUND] Following competitive NEET training (2024–2025), transitioned to B.Tech CSE @ Netaji Subhas University, Jamshedpur — developing mobile apps and modern web concepts.'
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

export const terminalQuickChips = ['help', 'projects', 'skills', 'story', 'studio', 'socials', 'theme', 'clear'];
