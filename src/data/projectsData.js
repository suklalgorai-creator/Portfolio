export const projectsData = [
  {
    id: "attendance-tracker",
    name: "College Attendance Tracker",
    screenshots: [
      { title: "Attendance Dashboard & Streak", url: "/assets/images/project-attendance-tracker.jpg" },
      { title: "Daily Attendance Register & Actions", url: "/assets/images/attendance-register.jpg" },
      { title: "User Profile & Settings (Suklal Gorai)", url: "/assets/images/attendance-profile.jpg" },
      { title: "Sticky Notes Module", url: "/assets/images/attendance-notes.jpg" }
    ],
    category: "app",
    projectType: "Deployed personal app",
    version: "2.1.1",
    description: "A full-stack progressive web app for college students to track and manage their subject-wise attendance. Features real-time sync with Firebase, safe-bunk calculator, analytics dashboard, and offline-first PWA capabilities deployed on Vercel.",
    highlights: [
      "Real-time cloud sync with Firebase Auth & Firestore",
      "Smart 75% attendance predictor & safe-bunk calculator",
      "Offline-first Service Worker for instant campus access",
      "Dark & Daylight glassmorphic UI with custom mesh theme"
    ],
    techStack: ["React", "Firebase", "Vite", "PWA", "Vercel"],
    githubUrl: "https://github.com/suklalgorai-creator/college-attendance-tracker",
    downloadUrl: null,
    apkSize: null,
    changelog: [
      { version: "2.1.1", date: "Oct 2026", changes: ["Bug fixes and smoother mobile transitions", "Added Vercel analytics integration"] },
      { version: "2.0.0", date: "Sep 2026", changes: ["Complete UI redesign with glassmorphic mesh look", "Added Firebase real-time sync", "PWA offline support with service worker"] },
      { version: "1.0.0", date: "Aug 2026", changes: ["Initial release with subject-wise attendance tracking"] }
    ]
  },
  {
    id: "reelcount",
    name: "ReelCount",
    category: "app",
    projectType: "Personal app",
    version: "1.0.0",
    description: "Break the short-form scroll addiction. ReelCount automatically counts and visualizes your daily Instagram Reels consumption with daily limits, trend graphs, and gentle mindfulness nudges.",
    highlights: [
      "Real-time daily Reels counter with low battery footprint",
      "Visual 7-day scroll trend graphs & session breakdowns",
      "Configurable daily threshold alerts to stop doomscrolling",
      "Privacy-first local storage—data never leaves your phone"
    ],
    techStack: ["Kotlin", "Android SDK", "Local DB", "Gradle"],
    githubUrl: "https://github.com/suklalgorai-creator/reelcount",
    downloadUrl: null,
    apkSize: null,
    changelog: [
      { version: "1.0.0", date: "Aug 2026", changes: ["Automatic daily Reels counter", "Usage visualization graphs", "Daily & weekly reports", "Smart notification reminders"] }
    ]
  },
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    category: "app",
    projectType: "Personal app",
    version: "1.0.0",
    description: "A cross-platform scientific calculator crafted with Flutter and Dart. Features expression parsing, trigonometric & logarithmic functions, persistent calculation tape history, and adaptive dark/light themes.",
    highlights: [
      "Full trigonometric, logarithmic, factorial & power operations",
      "Slide-out calculation history tape with 1-tap reuse",
      "60fps tactile button animations built in Flutter",
      "Structured PRD architecture & clean state separation"
    ],
    techStack: ["Flutter", "Dart", "Material 3"],
    githubUrl: "https://github.com/suklalgorai-creator/scientific-calculator",
    downloadUrl: null,
    apkSize: null,
    changelog: [
      { version: "1.0.0", date: "Oct 2026", changes: ["Basic & scientific expression parser", "Persistent calculation history", "Responsive portrait layout", "Dark & light theme support"] }
    ]
  },
  {
    id: "codecraft-digital",
    name: "CodeCraft Digital",
    category: "client",
    projectType: "Studio showcase",
    version: null,
    description: "The web development portal for CodeCraft Digital — presenting modern website solutions, design concepts, and digital templates tailored for regional businesses.",
    highlights: [
      "Tiered transparent service packages for regional businesses",
      "Interactive showcase of web templates across diverse industries",
      "Fast lead inquiry and consultation capture workflow",
      "Mobile-first performance tuned for regional networks"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "SEO"],
    githubUrl: "https://github.com/suklalgorai-creator",
    downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "sahyog-jharkhand",
    name: "Sahyog Jharkhand NGO",
    category: "client",
    projectType: "Concept prototype",
    version: null,
    description: "A web platform design concept and prototype created for a regional social initiative, demonstrating community drives, volunteer onboarding, and impact reporting.",
    highlights: [
      "Server-side SEO structure with Next.js App architecture",
      "Community initiative showcase & volunteer registration concept",
      "Accessible bilingual-friendly typography and fast load times",
      "Clean component architecture with strict ESLint rules"
    ],
    techStack: ["Next.js", "React", "CSS Modules", "SEO"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "resort-website",
    name: "Aranyak Resort & Nature Retreat",
    screenshots: [
      { title: "Aranyak Resort — Hero & Booking", url: "/assets/images/project-resort.jpg" },
      { title: "Deluxe Rooms & Luxury Suites Showcase", url: "/assets/images/resort-rooms.jpg" },
      { title: "Resort Villas & Landscape Grounds", url: "/assets/images/resort-amenities.jpg" },
      { title: "Explore Neighbourhood & Sightseeing", url: "/assets/images/resort-neighbourhood.jpg" }
    ],
    category: "client",
    projectType: "Concept prototype",
    version: null,
    description: "A hospitality website concept and design prototype featuring luxury room showcases, tariff comparisons, an interactive photo gallery, and reservation inquiry flows.",
    highlights: [
      "Room suite cards with amenity badges & seasonal pricing",
      "Immersive visual gallery with lightbox viewing",
      "Direct booking inquiry integration for hospitality conversion",
      "Responsive layout across mobile, tablet, and desktop"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "wedding-photography",
    name: "Wedding & Photography Studio",
    category: "client",
    projectType: "Concept prototype",
    version: null,
    description: "A visual portfolio website concept for a wedding photography and cinematography studio, showcasing story galleries, service tiers, and consultation request flows.",
    highlights: [
      "Masonry-style high-resolution wedding story galleries",
      "Pre-wedding, candid & cinematic video package tiers",
      "Date availability checker & booking request form",
      "Smooth scroll-reveal animations that frame each photo"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "food-ordering",
    name: "Restaurant & Food Ordering",
    category: "client",
    projectType: "Concept prototype",
    version: null,
    description: "A mobile-first restaurant and food ordering web concept featuring dynamic category menus, quick cart summary, and direct order messaging.",
    highlights: [
      "Instant category filtering (Starters, Mains, Beverages)",
      "Interactive item customization & live bill calculation",
      "Thumb-friendly mobile UI designed for rapid ordering",
      "Direct ordering message workflow for local food businesses"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "parlour-saloon",
    name: "Parlour & Salon Studio",
    category: "client",
    projectType: "Concept prototype",
    version: null,
    description: "A beauty parlour and salon website concept featuring transparent service menus, bridal makeover packages, and appointment request forms.",
    highlights: [
      "Categorized service menu with clear pricing tables",
      "Bridal & festive combo package highlights",
      "Before/after transformation showcase & client reviews",
      "Quick appointment scheduling form"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "friend-teasing",
    name: "Friend Teasing Micro-Site",
    category: "fun",
    projectType: "Experiment",
    version: null,
    description: "A playful interactive web experience built to prank and tease friends with dodging buttons, personalized roast messages, and celebratory confetti.",
    highlights: [
      "Dodging 'No' button physics that responds to cursor/touch",
      "Custom URL query support for personalized friend names",
      "Playful sound-free CSS keyframe animations",
      "Easy sharing for playful friend-to-friend interactions"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  }
];
