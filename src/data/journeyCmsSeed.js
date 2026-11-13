export const JOURNEY_CATEGORIES = [
  {
    id: 'Competitions',
    label: 'Competitions',
    shortLabel: 'Competitions',
    colorKey: 'coral',
    description: 'Hackathons, coding contests, and technical challenges.'
  },
  {
    id: 'Awards',
    label: 'Awards',
    shortLabel: 'Awards',
    colorKey: 'yellow',
    description: 'Recognitions, honors, and standout achievements.'
  },
  {
    id: 'College activities',
    label: 'College activities',
    shortLabel: 'Campus',
    colorKey: 'lavender',
    description: 'University clubs, seminars, peer initiatives, and campus milestones.'
  },
  {
    id: 'Certifications',
    label: 'Certifications',
    shortLabel: 'Certifications',
    colorKey: 'blue',
    description: 'Verified coursework, credentials, and specialized training.'
  },
  {
    id: 'Project launches',
    label: 'Project launches',
    shortLabel: 'Launches',
    colorKey: 'ink',
    description: 'Production app releases, PWAs, and public web launches.'
  },
  {
    id: 'Technical milestones',
    label: 'Technical milestones',
    shortLabel: 'Milestones',
    colorKey: 'teal',
    description: 'Architecture breakthroughs, core stack mastery, and engineering growth.'
  }
];

export const journeyCmsSeed = [
  {
    id: 'launch-attendance-tracker-v211',
    title: 'Shipped College Attendance Tracker v2.1.1',
    category: 'Project launches',
    displayDate: 'Oct 2026 — Present',
    sortDate: '2026-10-18',
    organization: 'Personal Product • Vercel PWA',
    badge: 'Live Release v2.1.1',
    description:
      'Released an offline-first progressive web app for college students featuring real-time Firebase sync, a 75% safe-bunk predictor, sticky notes, and fast mobile transitions.',
    link: 'https://github.com/suklalgorai-creator/college-attendance-tracker',
    status: 'published',
    featured: true,
    updatedAt: '2026-10-18T10:00:00.000Z'
  },
  {
    id: 'launch-reelcount-and-calc',
    title: 'Launched ReelCount & Flutter Scientific Calculator',
    category: 'Project launches',
    displayDate: 'Aug — Oct 2026',
    sortDate: '2026-10-02',
    organization: 'Android & Cross-Platform Builds',
    badge: '2 Mobile Apps',
    description:
      'Built ReelCount in Kotlin for mindful short-form video tracking with local privacy-first storage, followed by a 60fps Material 3 scientific calculator in Flutter & Dart.',
    link: 'https://github.com/suklalgorai-creator/scientific-calculator',
    status: 'published',
    featured: true,
    updatedAt: '2026-10-02T10:00:00.000Z'
  },
  {
    id: 'campus-btech-cse-nsu',
    title: 'Started B.Tech CSE @ Netaji Subhas University',
    category: 'College activities',
    displayDate: 'Jul 2026',
    sortDate: '2026-07-15',
    organization: 'Netaji Subhas University, Jamshedpur',
    badge: 'B.Tech CSE',
    description:
      'Enrolled in Computer Science & Engineering in Jamshedpur, diving into C programming, Data Structures & Algorithms, and student-focused software creation.',
    link: '',
    status: 'published',
    featured: true,
    updatedAt: '2026-07-15T10:00:00.000Z'
  },
  {
    id: 'milestone-studio-direction',
    title: 'Shaped Curious Minds Studio & Regional Web Concepts',
    category: 'Technical milestones',
    displayDate: 'Mid 2026',
    sortDate: '2026-06-01',
    organization: 'Curious Minds Studio',
    badge: 'Creative Tech',
    description:
      'Architected responsive web concepts across hospitality, NGOs, and local business templates while refining SEO, accessibility, and modular frontend craft.',
    link: 'https://github.com/suklalgorai-creator',
    status: 'published',
    featured: false,
    updatedAt: '2026-06-01T10:00:00.000Z'
  },
  {
    id: 'milestone-first-flutter-kotlin',
    title: 'Built First Flutter & Kotlin Apps on Real Hardware',
    category: 'Technical milestones',
    displayDate: 'Early 2026',
    sortDate: '2026-02-14',
    organization: 'Self-Directed Engineering',
    badge: 'Mobile Stack',
    description:
      'Transitioned from learning syntax to compiling native Android APKs and cross-platform Flutter interfaces running directly on personal devices.',
    link: '',
    status: 'published',
    featured: false,
    updatedAt: '2026-02-14T10:00:00.000Z'
  },
  {
    id: 'milestone-academic-discipline',
    title: 'Intense Academic Preparation & First-Principles Problem Solving',
    category: 'Technical milestones',
    displayDate: '2024 — 2025',
    sortDate: '2025-05-01',
    organization: 'Independent Analytical Study',
    badge: 'Core Discipline',
    description:
      'Rigorous daily analytical study cycles built deep concentration, systematic problem decomposition, and calm execution under demanding problem-solving constraints.',
    link: '',
    status: 'published',
    featured: false,
    updatedAt: '2025-05-01T10:00:00.000Z'
  },
  {
    id: 'draft-template-competition',
    title: 'Next Campus Hackathon Entry (Draft Template)',
    category: 'Competitions',
    displayDate: 'Upcoming 2026',
    sortDate: '2026-11-20',
    organization: 'NSU Tech Fest / Hackathon',
    badge: 'Draft',
    description:
      'Use the Admin Dashboard to publish hackathon submissions, competition rankings, or coding contest results directly to the public timeline.',
    link: '',
    status: 'draft',
    featured: false,
    updatedAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'draft-template-award',
    title: 'Recognition / Award Entry (Draft Template)',
    category: 'Awards',
    displayDate: 'Upcoming',
    sortDate: '2026-11-18',
    organization: 'Award Issuer',
    badge: 'Draft',
    description:
      'Publish verified awards, merit scholarships, or project honors from the CMS dashboard when received.',
    link: '',
    status: 'draft',
    featured: false,
    updatedAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'draft-template-certification',
    title: 'Certification Entry (Draft Template)',
    category: 'Certifications',
    displayDate: 'Upcoming',
    sortDate: '2026-11-15',
    organization: 'Certification Provider',
    badge: 'Draft',
    description:
      'Publish completed technical certifications with credential links directly from the Admin Dashboard.',
    link: '',
    status: 'draft',
    featured: false,
    updatedAt: '2026-11-01T10:00:00.000Z'
  }
];
