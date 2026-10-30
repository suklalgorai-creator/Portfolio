/* ============================================================
   SUKLAL GORAI — Portfolio Interactive Logic (Vanilla ES6+)
   Includes: Constellation Particle Canvas, Spotlight Cursor,
   Persona Switcher, Interactive Terminal, Live Attendance Demo
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── TOAST HELPER ─────────────────────────────────────────
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--ink-green)">●</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // ─── CURSOR SPOTLIGHT TRACKER ─────────────────────────────
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // ─── INTERACTIVE CONSTELLATION PARTICLE CANVAS ────────────
  const canvas = document.getElementById('bgConstellation');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const nodeCount = Math.min(48, Math.floor(width / 28));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 1
    }));

    function drawConstellation() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const dotColor = isLight ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.55)';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            const alpha = (1 - dist / 135) * (isLight ? 0.14 : 0.18);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 170) {
          const alpha = (1 - mDist / 170) * 0.32;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      requestAnimationFrame(drawConstellation);
    }
    drawConstellation();
  }

  // ─── SAFE LOCALSTORAGE & THEME TOGGLE ─────────────────────
  function getStoredTheme() {
    try { return localStorage.getItem('portfolio-theme') || 'dark'; }
    catch (e) { return 'dark'; }
  }
  function setStoredTheme(val) {
    try { localStorage.setItem('portfolio-theme', val); }
    catch (e) {}
  }

  const themeToggle = document.getElementById('themeToggle');
  if (getStoredTheme() === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        setStoredTheme('dark');
        showToast('Switched to Cyber-Emerald Dark theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
        setStoredTheme('light');
        showToast('Switched to Daylight Glass theme');
      }
    });
  }

  // ─── PERSONA SWITCHER (Developer Mode vs Founder Mode) ────
  const personaBtns = document.querySelectorAll('.persona-btn');
  const heroTagline = document.getElementById('heroTaglineText');
  const heroPrimaryCta = document.getElementById('heroPrimaryCta');

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const persona = btn.getAttribute('data-persona');

      if (persona === 'founder') {
        if (heroTagline) {
          heroTagline.innerHTML = `As the founder of <strong>CodeCraft Digital</strong>, I design and ship <strong>high-converting websites, booking portals, and custom mobile apps</strong> for businesses, resorts, clinics, and NGOs across Jharkhand and beyond.`;
        }
        if (heroPrimaryCta) {
          heroPrimaryCta.innerHTML = `🏢 View 8+ Client Websites`;
          heroPrimaryCta.setAttribute('href', '#agency');
        }
        showToast('Founder Mode: Highlighting CodeCraft Digital Agency');
      } else {
        if (heroTagline) {
          heroTagline.innerHTML = `I build <strong>real software products that solve everyday problems</strong> — from offline-first college PWAs and native Kotlin wellbeing apps to high-converting websites for businesses through <strong>CodeCraft Digital</strong>.`;
        }
        if (heroPrimaryCta) {
          heroPrimaryCta.innerHTML = `⚡ Explore 12+ Shipped Projects`;
          heroPrimaryCta.setAttribute('href', '#projects');
        }
        showToast('Developer Mode: Highlighting Apps & Engineering');
      }
    });
  });

  // ─── HERO WORKBENCH TABS & LIVE ATTENDANCE SIMULATOR ──────
  const workbenchTabs = document.querySelectorAll('.workbench-tab');
  const workbenchPanes = document.querySelectorAll('.workbench-pane');

  workbenchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      workbenchTabs.forEach(t => t.classList.remove('active'));
      workbenchPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-pane');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });

  const simSubjects = [
    { id: 'dsa', name: 'Data Structures & C', attended: 22, total: 25 },
    { id: 'flutter', name: 'Mobile App Dev Lab', attended: 19, total: 20 },
    { id: 'math', name: 'Engineering Mathematics', attended: 16, total: 21 }
  ];

  function renderAttendanceSim() {
    const listEl = document.getElementById('simSubjectList');
    const overallEl = document.getElementById('simOverallBadge');
    if (!listEl || !overallEl) return;

    let totalAttended = 0;
    let totalClasses = 0;

    listEl.innerHTML = simSubjects.map((sub, idx) => {
      totalAttended += sub.attended;
      totalClasses += sub.total;
      const pct = Math.round((sub.attended / sub.total) * 100);
      const statusText = pct >= 75
        ? `Safe • Can bunk ${Math.max(0, Math.floor((sub.attended - 0.75 * sub.total) / 0.75))} class(es)`
        : `Attend next ${Math.ceil((0.75 * sub.total - sub.attended) / 0.25)} class(es) for 75%`;
      return `
        <div class="sim-subject">
          <div class="sim-subject-top">
            <span class="sim-subject-name">${sub.name}</span>
            <span class="sim-subject-stats">${sub.attended}/${sub.total} (${pct}%)</span>
          </div>
          <div class="sim-bar-track">
            <div class="sim-bar-fill" style="width:${Math.min(100, pct)}%; background:${pct >= 75 ? 'linear-gradient(90deg, var(--ink-green), var(--blue))' : 'var(--pen-red)'}"></div>
          </div>
          <div class="sim-controls">
            <span class="sim-status-hint">${statusText}</span>
            <div class="sim-btn-group">
              <button type="button" class="sim-btn present" data-sim-idx="${idx}" data-sim-act="present">+ Present</button>
              <button type="button" class="sim-btn absent" data-sim-idx="${idx}" data-sim-act="absent">- Absent</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const overallPct = Math.round((totalAttended / totalClasses) * 100);
    overallEl.textContent = `${overallPct}% Overall`;

    listEl.querySelectorAll('.sim-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-sim-idx'), 10);
        const act = btn.getAttribute('data-sim-act');
        if (act === 'present') {
          simSubjects[idx].attended += 1;
          simSubjects[idx].total += 1;
        } else {
          simSubjects[idx].total += 1;
        }
        renderAttendanceSim();
      });
    });
  }

  renderAttendanceSim();

  // ─── INTERACTIVE 2026 SHIPPING HEATMAP ────────────────────
  const heatmapGrid = document.getElementById('shippingHeatmapGrid');
  const simulateCommitBtn = document.getElementById('simulateCommitBtn');
  const commitCountSpan = document.getElementById('commitCountSpan');
  let totalCommits = 842;

  if (heatmapGrid) {
    const pattern = [
      2,3,4,3,2,4,4, 1,3,4,4,2,3,4, 3,4,2,4,4,3,4, 2,4,3,4,4,
      3,2,4,4,3,4,2, 4,3,4,2,4,4,3, 1,4,4,3,4,2,4, 3,4,4,4,4
    ];
    heatmapGrid.innerHTML = pattern.map((lvl, i) => {
      return `<div class="heat-cell heat-lvl-${lvl}" data-week="${i + 1}" data-lvl="${lvl}" title="Week ${i + 1}: ${lvl * 6} contributions"></div>`;
    }).join('');

    heatmapGrid.querySelectorAll('.heat-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const wk = cell.getAttribute('data-week');
        const currentLvl = parseInt(cell.getAttribute('data-lvl'), 10);
        const nextLvl = currentLvl < 4 ? currentLvl + 1 : 4;
        cell.className = `heat-cell heat-lvl-${nextLvl}`;
        cell.setAttribute('data-lvl', nextLvl);
        totalCommits += 3;
        if (commitCountSpan) commitCountSpan.textContent = totalCommits;
        showToast(`Week ${wk}: Logged +3 new commits (${totalCommits} total in 2026)`);
      });
    });
  }

  if (simulateCommitBtn) {
    simulateCommitBtn.addEventListener('click', () => {
      totalCommits += 5;
      if (commitCountSpan) commitCountSpan.textContent = totalCommits;
      showToast(`⚡ Pushed +5 commits to main (${totalCommits} in 2026)`);
    });
  }

  // ─── PROJECT DATA (With Visual Banner Images) ─────────────
  const projects = [
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
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
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
      githubUrl: null,
      downloadUrl: null,
      apkSize: null,
      changelog: null
    }
  ];

  // ─── NAVBAR SCROLL & ACTIVE SECTION SPY ───────────────────
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ─── MOBILE HAMBURGER MENU ────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── TYPING ANIMATION ─────────────────────────────────────
  const typingElement = document.querySelector('.typing-text');
  const words = [
    'Flutter & Kotlin App Builder',
    'Full-Stack Web Developer',
    'Founder @ CodeCraft Digital',
    'B.Tech CSE Student & Problem Solver'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 85;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2100;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 280;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ─── SCROLL REVEAL ────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── STAT COUNTER ANIMATION ───────────────────────────────
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = el.dataset.plus ? `${target}<span class="plus">+</span>` : `${target}`;
      }
    }
    requestAnimationFrame(update);
  }

  // ─── PROJECT FILTERING + SEARCH ───────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearchInput');
  const emptyState = document.getElementById('emptyFilterState');
  let activeFilter = 'all';

  function applyProjectFilters() {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const textContent = card.textContent.toLowerCase();
      const matchesTab = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || textContent.includes(query);

      if (matchesTab && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyProjectFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyProjectFilters);
  }

  // ─── PROJECT DETAIL MODAL (WITH VISUAL BANNER) ────────────
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalBody = document.getElementById('projectModalBody');
  const modalClose = document.getElementById('projectModalClose');
  const modalBannerImg = document.getElementById('projectModalBannerImg');

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const projectId = card.getAttribute('data-project-id');
      const cardImg = card.querySelector('.project-thumb-img');
      const project = projects.find(p => p.id === projectId);
      if (project) {
        if (modalBannerImg && cardImg) {
          modalBannerImg.src = cardImg.src;
          modalBannerImg.alt = project.name;
        }
        openModal(project);
      }
    });
  });

  function openModal(project) {
    let html = `
      <div class="modal-header">
        <h2 class="modal-project-name">${project.name}</h2>
        ${project.version ? `<span class="modal-version-badge">v${project.version}</span>` : `<span class="project-category-badge badge-client">CodeCraft Digital</span>`}
      </div>
      <p class="modal-description">${project.description}</p>
    `;

    if (project.screenshots && project.screenshots.length > 0) {
      html += `
        <div class="modal-gallery-section">
          <div class="modal-gallery-header">
            <span class="modal-gallery-title">📸 Verified App Screenshots (${project.screenshots.length})</span>
            <span class="modal-gallery-hint">Tap any thumbnail to preview full screen</span>
          </div>
          <div class="modal-gallery-grid">
            ${project.screenshots.map((s, idx) => `
              <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" data-full-url="${s.url}" data-title="${s.title}">
                <img src="${s.url}" alt="${s.title}" loading="lazy">
                <span class="gallery-thumb-caption">${s.title}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (project.highlights && project.highlights.length > 0) {
      html += `
        <div class="modal-highlights-box">
          <h4>⚡ Key Architecture & Features</h4>
          <ul class="modal-highlights-list">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    html += `
      <div class="modal-tech-stack">
        ${project.techStack.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
      </div>
    `;

    if (project.downloadUrl) {
      html += `
        <div class="modal-download-section">
          <div class="download-info">
            <h4>📦 Direct Android APK Package</h4>
            <p>Release v${project.version} • ${project.apkSize} • Verified Build</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm modal-apk-trigger" data-apk-name="${project.name}" data-apk-path="${project.downloadUrl}">
            ⬇ Download APK (${project.apkSize})
          </button>
        </div>
      `;
    }

    if (project.changelog && project.changelog.length > 0) {
      html += `
        <div class="modal-changelog">
          <h3>📋 Release Changelog</h3>
          ${project.changelog.map(entry => `
            <div class="changelog-entry">
              <div class="changelog-version">
                <strong>v${entry.version}</strong>
                <span>— ${entry.date}</span>
              </div>
              <ul>
                ${entry.changes.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    }

    html += `<div class="modal-actions">`;
    if (project.githubUrl) {
      html += `
        <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
          🐙 View Source on GitHub
        </a>
      `;
    }
    html += `
      <button type="button" class="btn btn-purple btn-sm modal-inquire-btn" data-project-name="${project.name}">
        💬 Request Similar Project / Demo
      </button>
    </div>`;

    modalBody.innerHTML = html;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Thumbnail switcher for modal gallery
    const thumbItems = modalBody.querySelectorAll('.gallery-thumb-item');
    thumbItems.forEach(item => {
      item.addEventListener('click', () => {
        thumbItems.forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        const newUrl = item.getAttribute('data-full-url');
        const newTitle = item.getAttribute('data-title');
        if (modalBannerImg && newUrl) {
          modalBannerImg.style.opacity = '0.4';
          setTimeout(() => {
            modalBannerImg.src = newUrl;
            modalBannerImg.alt = newTitle || project.name;
            modalBannerImg.style.opacity = '1';
          }, 150);
        }
      });
    });

    const apkBtn = modalBody.querySelector('.modal-apk-trigger');
    if (apkBtn) {
      apkBtn.addEventListener('click', () => {
        const name = apkBtn.getAttribute('data-apk-name');
        const path = apkBtn.getAttribute('data-apk-path');
        showToast(`Starting APK download for ${name} (${path})`);
      });
    }

    const inquireBtn = modalBody.querySelector('.modal-inquire-btn');
    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        const pName = inquireBtn.getAttribute('data-project-name');
        closeModal();
        const subjectSelect = document.getElementById('contactTopic');
        const msgBox = document.getElementById('contactMessage');
        if (subjectSelect) subjectSelect.value = 'Client Website / App Inquiry';
        if (msgBox) msgBox.value = `Hi Suklal, I checked out "${pName}" on your portfolio and would love to discuss a similar project or see a live walkthrough.`;
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        showToast(`Pre-filled inquiry for ${pName}`);
      });
    }
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ─── INTERACTIVE DEV TERMINAL (Ctrl+K or Navbar Button) ───
  const cmdTerminalBtn = document.getElementById('cmdTerminalBtn');
  const terminalOverlay = document.getElementById('terminalModalOverlay');
  const terminalClose = document.getElementById('terminalModalClose');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const termChips = document.querySelectorAll('.term-chip');

  function openTerminal() {
    if (!terminalOverlay) return;
    terminalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (terminalInput) terminalInput.focus(); }, 120);
  }

  function closeTerminal() {
    if (!terminalOverlay) return;
    terminalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cmdTerminalBtn) cmdTerminalBtn.addEventListener('click', openTerminal);
  if (terminalClose) terminalClose.addEventListener('click', closeTerminal);
  if (terminalOverlay) {
    terminalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) closeTerminal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalOverlay && terminalOverlay.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape') {
      closeModal();
      closeTerminal();
    }
  });

  function runTerminalCommand(rawCmd) {
    if (!terminalOutput) return;
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalOutput.innerHTML = `<div class="term-line" style="color:var(--muted)">Terminal cleared. Type <strong>help</strong> or click a chip above.</div>`;
      return;
    }

    let responseHtml = '';
    if (cmd === 'help') {
      responseHtml = `Available commands: <span style="color:var(--ink-green)">projects</span>, <span style="color:var(--ink-green)">skills</span>, <span style="color:var(--ink-green)">story</span>, <span style="color:var(--ink-green)">agency</span>, <span style="color:var(--ink-green)">socials</span>, <span style="color:var(--ink-green)">theme</span>, <span style="color:var(--ink-green)">clear</span>`;
    } else if (cmd === 'projects') {
      responseHtml = `📦 <strong>Flagship Apps:</strong> College Attendance Tracker (v2.1.1), Focus Guard (Kotlin), ReelCount (Kotlin), Scientific Calculator (Flutter)<br>🏢 <strong>Client Sites (8+):</strong> CodeCraft Digital, Sahyog Jharkhand NGO, Luxury Resort, Tour & Travels, Wedding Studio, Food Ordering, Parlour & Salon.`;
    } else if (cmd === 'skills') {
      responseHtml = `🎯 <strong>Languages:</strong> Dart, Kotlin, JavaScript, Python, C, HTML/CSS<br>⚡ <strong>Stack:</strong> Flutter, Android SDK, React, Next.js, Firebase, Supabase, Git, Docker, Vercel.`;
    } else if (cmd === 'story') {
      responseHtml = `🚀 <strong>Suklal's Journey:</strong> After intense NEET preparation (2024–2025), pivoted to B.Tech CSE @ Netaji Subhas University, Jamshedpur — founded CodeCraft Digital and shipped 12+ real-world apps & client websites.`;
    } else if (cmd === 'agency') {
      responseHtml = `🏢 <strong>CodeCraft Digital:</strong> Web & App Studio for businesses in Jharkhand. Fast mobile-first websites, SEO, and WhatsApp lead generation.`;
    } else if (cmd === 'socials') {
      responseHtml = `🔗 GitHub: <a href="https://github.com/suklalgorai-creator" target="_blank">github.com/suklalgorai-creator</a> | LinkedIn: <a href="https://www.linkedin.com/in/suklal-gorai-7ab4533b0" target="_blank">suklal-gorai</a> | Email: suklalgorai@gmail.com`;
    } else if (cmd === 'theme') {
      if (themeToggle) themeToggle.click();
      responseHtml = `🎨 Toggled portfolio color theme!`;
    } else {
      responseHtml = `Command not recognized: "${rawCmd}". Try <span style="color:var(--ink-green)">help</span>, <span style="color:var(--ink-green)">projects</span>, or <span style="color:var(--ink-green)">skills</span>.`;
    }

    terminalOutput.innerHTML += `
      <div class="term-line"><span class="term-cmd-echo">suklal@dev:~$</span> ${rawCmd}</div>
      <div class="term-line" style="color:var(--paper-secondary);padding-left:10px;border-left:2px solid var(--ink-green);margin-bottom:14px;">${responseHtml}</div>
    `;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      runTerminalCommand(cmd);
    });
  });

  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!terminalInput) return;
      runTerminalCommand(terminalInput.value);
      terminalInput.value = '';
    });
  }

  // ─── AGENCY CTA BUTTON ────────────────────────────────────
  const agencyCtaBtn = document.getElementById('agencyInquireBtn');
  if (agencyCtaBtn) {
    agencyCtaBtn.addEventListener('click', () => {
      const subjectSelect = document.getElementById('contactTopic');
      const msgBox = document.getElementById('contactMessage');
      if (subjectSelect) subjectSelect.value = 'CodeCraft Digital Website Package';
      if (msgBox) msgBox.value = 'Hi Suklal, I want to build a professional website for my business with CodeCraft Digital. Let us discuss pricing and timeline.';
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      showToast('Scrolled to project inquiry composer');
    });
  }

  // ─── COPY EMAIL BUTTON ────────────────────────────────────
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'suklalgorai@gmail.com';
      const tempInput = document.createElement('textarea');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        showToast('Copied suklalgorai@gmail.com to clipboard!');
      } catch (err) {
        showToast('Email: suklalgorai@gmail.com');
      }
      tempInput.remove();
    });
  }

  // ─── CONTACT MESSAGE COMPOSER ─────────────────────────────
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const topic = document.getElementById('contactTopic').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !message) {
        showToast('Please enter your name and message first');
        return;
      }

      const subject = encodeURIComponent(`[Portfolio] ${topic} — from ${name}`);
      const body = encodeURIComponent(`Hi Suklal,\n\n${message}\n\nBest regards,\n${name}`);
      window.open(`mailto:suklalgorai@gmail.com?subject=${subject}&body=${body}`, '_blank');
      showToast('Opened email draft to suklalgorai@gmail.com!');
      contactForm.reset();
    });
  }


  // ─── INSTAGRAM STORY VIEWER INTERACTIVITY ────────────────
  const storyOverlay = document.getElementById('storyModalOverlay');
  const heroStoryTrigger = document.getElementById('heroStoryTrigger');
  const navStoryTrigger = document.getElementById('navStoryTrigger');
  const storyCloseBtn = document.getElementById('storyCloseBtn');
  const storySlideBody = document.getElementById('storySlideBody');
  const storySlideBadge = document.getElementById('storySlideBadge');
  const storySlideTitle = document.getElementById('storySlideTitle');
  const storySlideDesc = document.getElementById('storySlideDesc');
  const storyHeaderTime = document.getElementById('storyHeaderTime');
  const storyContactBtn = document.getElementById('storyContactBtn');

  const storySlides = [
    {
      badge: "Founder & Developer",
      title: "Building Real Tech in Jamshedpur",
      desc: "1st Year B.Tech CSE student at Netaji Subhas University. Specialized in Flutter, Android Kotlin, and full-stack web applications.",
      time: "2h ago",
      bg: "assets/images/avatar.jpg"
    },
    {
      badge: "Agency • CodeCraft Digital",
      title: "8+ Client Websites Shipped",
      desc: "Founded CodeCraft Digital — crafting fast, responsive websites for local businesses, resorts, salons, clinics, and NGOs across Jharkhand.",
      time: "1h ago",
      bg: "assets/images/project-codecraft-digital.jpg"
    },
    {
      badge: "Flagship Products",
      title: "12+ Live Apps & Utilities",
      desc: "Created College Attendance Tracker (v2.1.1), Focus Guard, ReelCount, and Scientific Calculator. Solving real student problems with clean code.",
      time: "Just now",
      bg: "assets/images/project-attendance-tracker.jpg"
    }
  ];

  let currentStoryIdx = 0;
  let storyInterval = null;
  let storyProgress = 0;
  const slideDuration = 4500; // 4.5 seconds per slide
  const progressStepTime = 50;

  function updateStorySlide(idx) {
    if (!storySlides[idx]) return;
    const slide = storySlides[idx];
    currentStoryIdx = idx;
    storyProgress = 0;

    storySlideBadge.textContent = slide.badge;
    storySlideTitle.textContent = slide.title;
    storySlideDesc.textContent = slide.desc;
    storyHeaderTime.textContent = slide.time;
    storySlideBody.style.backgroundImage = `url('${slide.bg}')`;

    // Reset fills
    for (let i = 0; i < 3; i++) {
      const fill = document.getElementById(`storyFill${i}`);
      if (fill) {
        if (i < idx) fill.style.width = '100%';
        else if (i === idx) fill.style.width = '0%';
        else fill.style.width = '0%';
      }
    }
  }

  function startStoryTimer() {
    clearInterval(storyInterval);
    storyInterval = setInterval(() => {
      storyProgress += (progressStepTime / slideDuration) * 100;
      const currentFill = document.getElementById(`storyFill${currentStoryIdx}`);
      if (currentFill) {
        currentFill.style.width = `${Math.min(100, storyProgress)}%`;
      }

      if (storyProgress >= 100) {
        if (currentStoryIdx < storySlides.length - 1) {
          updateStorySlide(currentStoryIdx + 1);
        } else {
          closeStory();
        }
      }
    }, progressStepTime);
  }

  function openStory() {
    if (!storyOverlay) return;
    currentStoryIdx = 0;
    updateStorySlide(0);
    storyOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    startStoryTimer();
  }

  function closeStory() {
    if (!storyOverlay) return;
    clearInterval(storyInterval);
    storyOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (heroStoryTrigger) heroStoryTrigger.addEventListener('click', openStory);
  if (navStoryTrigger) navStoryTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    openStory();
  });

  if (storyCloseBtn) storyCloseBtn.addEventListener('click', closeStory);

  if (storyOverlay) {
    storyOverlay.addEventListener('click', (e) => {
      if (e.target === storyOverlay) {
        closeStory();
      } else if (e.target.closest('.story-slide-body')) {
        // Tap right to advance, tap left to go back
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX;
        if (clickX > window.innerWidth / 2) {
          if (currentStoryIdx < storySlides.length - 1) {
            updateStorySlide(currentStoryIdx + 1);
          } else {
            closeStory();
          }
        } else {
          if (currentStoryIdx > 0) {
            updateStorySlide(currentStoryIdx - 1);
          }
        }
      }
    });
  }

  if (storyContactBtn) {
    storyContactBtn.addEventListener('click', () => {
      closeStory();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyOverlay && storyOverlay.classList.contains('active')) {
      closeStory();
    }
  });

});
