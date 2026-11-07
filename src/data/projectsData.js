export const projectsData = [
  {
    id: "attendance-tracker",
    name: "College Attendance Tracker",
    screenshots: [
      { title: "Live Dashboard (100% Attendance & Streak)", url: "assets/images/project-attendance-tracker.jpg" },
      { title: "Daily Attendance Register & Actions", url: "assets/images/attendance-register.jpg" },
      { title: "User Profile & Settings (Suklal Gorai)", url: "assets/images/attendance-profile.jpg" },
      { title: "Sticky Notes Module (localhost:3000/notes)", url: "assets/images/attendance-notes.jpg" }
    ],
    category: "app",
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
    id: "focus-guard",
    name: "Focus Guard & StudyFlow Companion",
    screenshots: [
      { title: "StudyFlow Focus Timer & Pomodoro (25:00)", url: "assets/images/project-studyflow.jpg" },
      { title: "Physics Syllabus Progress Tracker", url: "assets/images/studyflow-syllabus.jpg" },
      { title: "Daily Goals Checklist & AI Mentor", url: "assets/images/studyflow-tasks.jpg" }
    ],
    category: "app",
    version: "1.0.0",
    description: "A native Android digital wellbeing app that blocks distracting apps and keeps students locked in during deep study sessions. Built with Kotlin and Android Accessibility/UsageStats APIs for zero-lag native enforcement.",
    highlights: [
      "Strict app-blocking shield during active study timers",
      "Native Android UsageStats & background service integration",
      "Material You dynamic theming with distraction analytics",
      "Lightweight 8.2 MB APK with zero ad bloat"
    ],
    techStack: ["Kotlin", "Android SDK", "Material You", "Gradle"],
    githubUrl: "https://github.com/suklalgorai-creator/focus-guard",
    downloadUrl: "assets/apk/focus-guard.apk",
    apkSize: "8.2 MB",
    changelog: [
      { version: "1.0.0", date: "Aug 2026", changes: ["App blocking shield functionality", "Custom focus session Pomodoro timer", "Daily usage statistics dashboard", "Material You design language"] }
    ]
  },
  {
    id: "reelcount",
    name: "ReelCount",
    category: "app",
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
    downloadUrl: "assets/apk/reelcount.apk",
    apkSize: "6.5 MB",
    changelog: [
      { version: "1.0.0", date: "Aug 2026", changes: ["Automatic daily Reels counter", "Usage visualization graphs", "Daily & weekly reports", "Smart notification reminders"] }
    ]
  },
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    category: "app",
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
    downloadUrl: "assets/apk/scientific-calculator.apk",
    apkSize: "12.0 MB",
    changelog: [
      { version: "1.0.0", date: "Oct 2026", changes: ["Basic & scientific expression parser", "Persistent calculation history", "Responsive portrait layout", "Dark & light theme support"] }
    ]
  },
  {
    id: "codecraft-digital",
    name: "CodeCraft Digital Agency",
    category: "client",
    version: null,
    description: "The official agency portal for CodeCraft Digital — my web design & software studio helping local businesses across Jharkhand establish a high-converting digital presence.",
    highlights: [
      "Tiered transparent pricing packages for local businesses",
      "Interactive live portfolio showcase across 7+ industries",
      "Fast WhatsApp & direct lead capture workflow",
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
    version: null,
    description: "A modern web platform for a Jharkhand-based social organization. Built with Next.js and React to showcase community drives, volunteer onboarding, and transparent impact reports.",
    highlights: [
      "Server-side SEO optimization with Next.js App architecture",
      "Community initiative gallery & volunteer registration flow",
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
      { title: "Aranyak Resort — Hero & Booking", url: "assets/images/project-resort.jpg" },
      { title: "Deluxe Rooms & Luxury Suites Showcase", url: "assets/images/resort-rooms.jpg" },
      { title: "Resort Villas & Landscape Grounds", url: "assets/images/resort-amenities.jpg" },
      { title: "Explore Neighbourhood & Sightseeing", url: "assets/images/resort-neighbourhood.jpg" }
    ],
    category: "client",
    version: null,
    description: "An elegant hospitality website featuring luxury room showcases, tariff comparisons, interactive photo gallery, and direct WhatsApp/phone reservation inquiries.",
    highlights: [
      "Room suite cards with amenity badges & seasonal pricing",
      "Immersive visual gallery with lightbox viewing",
      "Direct booking inquiry integration for higher guest conversion",
      "Responsive layout across mobile, tablet, and desktop"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "tour-travels",
    name: "Tour & Travels Agency",
    category: "client",
    version: null,
    description: "A travel agency website featuring curated domestic tour packages, itinerary highlights, fleet options, and instant cab/tour inquiry forms.",
    highlights: [
      "Filterable destination packages with day-by-day itineraries",
      "Vehicle fleet showcase with per-km & package rates",
      "Customer testimonial carousel & trust badges",
      "1-tap call and WhatsApp booking triggers"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "wedding-photography",
    name: "Wedding & Photography Studio",
    category: "client",
    version: null,
    description: "A visual-first portfolio website for a wedding photography and cinematography studio, showcasing pre-wedding shoots, bridal stories, and customizable event packages.",
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
    version: null,
    description: "A mobile-first restaurant and cloud kitchen web app featuring dynamic category menus, quick cart summary, and direct order dispatch.",
    highlights: [
      "Instant category filtering (Starters, Mains, Beverages)",
      "Interactive item customization & live bill calculation",
      "Thumb-friendly mobile UI designed for hungry customers",
      "Zero-commission direct ordering flow for local restaurants"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  },
  {
    id: "parlour-saloon",
    name: "Parlour & Salon Studio",
    category: "client",
    version: null,
    description: "A sleek beauty parlour and unisex salon website with transparent service menus, bridal makeover packages, and appointment slot requests.",
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
    version: null,
    description: "A playful interactive web experience built to prank and tease friends with dodging buttons, personalized roast messages, and celebratory confetti.",
    highlights: [
      "Dodging 'No' button physics that responds to cursor/touch",
      "Custom URL query support for personalized friend names",
      "Playful sound-free CSS keyframe animations",
      "Viral shareability in college WhatsApp groups"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null, downloadUrl: null, apkSize: null, changelog: null
  }
];
