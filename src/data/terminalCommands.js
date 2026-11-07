export const terminalCommands = {
  help: () => ({
    type: 'html',
    content: 'Available commands: <span class="term-highlight">projects</span>, <span class="term-highlight">skills</span>, <span class="term-highlight">story</span>, <span class="term-highlight">agency</span>, <span class="term-highlight">socials</span>, <span class="term-highlight">theme</span>, <span class="term-highlight">clear</span>'
  }),
  projects: () => ({
    type: 'html',
    content: '<strong>[FLAGSHIP APPS]</strong> College Attendance Tracker (v2.1.1), Focus Guard (Kotlin), ReelCount (Kotlin), Scientific Calculator (Flutter)<br><strong>[CLIENT SITES]</strong> CodeCraft Digital, Sahyog Jharkhand NGO, Luxury Resort, Tour & Travels, Wedding Studio, Food Ordering, Parlour & Salon.'
  }),
  skills: () => ({
    type: 'html',
    content: '<strong>[LANGUAGES]</strong> Dart, Kotlin, JavaScript, Python, C, HTML/CSS<br><strong>[ECOSYSTEM]</strong> Flutter, Android SDK, React, Next.js, Firebase, Supabase, Git, Docker, Vercel.'
  }),
  story: () => ({
    type: 'html',
    content: "<strong>[BACKGROUND]</strong> Following competitive NEET training (2024–2025), transitioned to B.Tech CSE @ Netaji Subhas University, Jamshedpur — founded CodeCraft Digital and shipped 12+ production apps & client systems."
  }),
  agency: () => ({
    type: 'html',
    content: '<strong>[CODECRAFT DIGITAL]</strong> Web & mobile engineering studio delivering high-conversion digital experiences, SEO architecture, and automated client inquiry pipelines.'
  }),
  socials: () => ({
    type: 'html',
    content: 'GitHub: <a href="https://github.com/suklalgorai-creator" target="_blank" rel="noopener">github.com/suklalgorai-creator</a> | LinkedIn: <a href="https://www.linkedin.com/in/suklal-gorai-7ab4533b0" target="_blank" rel="noopener">suklal-gorai</a> | Email: suklalgorai@gmail.com'
  })
};

export const terminalQuickChips = [
  'help', 'projects', 'skills', 'story', 'agency', 'socials', 'theme', 'clear'
];
