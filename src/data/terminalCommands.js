export const terminalCommands = {
  help: () => ({ content: 'Available commands: projects, skills, story, agency, socials, theme, clear' }),
  projects: () => ({
    content: '[FLAGSHIP APPS] College Attendance Tracker (v2.1.1), Focus Guard (Kotlin), ReelCount (Kotlin), Scientific Calculator (Flutter)\n[CLIENT SITES] CodeCraft Digital, Sahyog Jharkhand NGO, Luxury Resort, Tour & Travels, Wedding Studio, Food Ordering, Parlour & Salon.'
  }),
  skills: () => ({
    content: '[LANGUAGES] Dart, Kotlin, JavaScript, Python, C, HTML/CSS\n[ECOSYSTEM] Flutter, Android SDK, React, Next.js, Firebase, Supabase, Git, Docker, Vercel.'
  }),
  story: () => ({
    content: '[BACKGROUND] Following competitive NEET training (2024–2025), transitioned to B.Tech CSE @ Netaji Subhas University, Jamshedpur — founded CodeCraft Digital and shipped 12+ production apps & client systems.'
  }),
  agency: () => ({
    content: '[CODECRAFT DIGITAL] Web & mobile engineering studio delivering high-conversion digital experiences, SEO architecture, and automated client inquiry pipelines.'
  }),
  socials: () => ({
    content: 'GitHub: github.com/suklalgorai-creator | LinkedIn: suklal-gorai | Email: suklalgorai@gmail.com'
  })
};

export const terminalQuickChips = ['help', 'projects', 'skills', 'story', 'agency', 'socials', 'theme', 'clear'];
