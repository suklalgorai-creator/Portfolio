
export const TECH_POWER_LEFT = [
  {
    id: 'flutter',
    name: 'Flutter',
    subtitle: 'Cross-Platform',
    category: 'Mobile Framework',
    glowColor: '#54C5F8',
    gradient: 'linear-gradient(135deg, #02569B 0%, #54C5F8 100%)',
    side: 'left',
    handTarget: 'left',
    streamDelay: 0.1,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M14.314 2L4 12.314l3.143 3.143 10.314-10.314H14.314z" fill="#54C5F8" />
        <path d="M14.314 10.314l-5.171 5.172 3.143 3.143 5.171-5.172H14.314z" fill="#29B6F6" />
        <path d="M12.286 18.629l2.028 2.028 5.686-5.686h-3.143l-4.571 3.658z" fill="#01579B" />
        <path d="M17.457 22l4.543-4.543h-3.143l-3.429 2.515 2.029 2.028z" fill="#02569B" />
      </svg>
    )
  },
  {
    id: 'dart',
    name: 'Dart',
    subtitle: 'Language',
    category: 'Client-Optimized',
    glowColor: '#00D2C4',
    gradient: 'linear-gradient(135deg, #01579B 0%, #00B4AB 100%)',
    side: 'left',
    handTarget: 'left',
    streamDelay: 0.25,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M4.1 3.5h7.3l8.5 8.5-4.4 7.6L4.1 8.2V3.5z" fill="#0175C2" />
        <path d="M11.4 3.5l8.5 8.5-5.1 5.1-8.5-8.5L11.4 3.5z" fill="#00B4AB" />
        <path d="M4.1 8.2l11.4 11.4-3.6 3.6H4.1V8.2z" fill="#54C5F8" />
      </svg>
    )
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    subtitle: 'Android Development',
    category: 'Modern Native',
    glowColor: '#C711E1',
    gradient: 'linear-gradient(135deg, #7F52FF 0%, #E24462 100%)',
    side: 'left',
    handTarget: 'left',
    streamDelay: 0.4,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <defs>
          <linearGradient id="kotlin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7F52FF" />
            <stop offset="50%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#E24462" />
          </linearGradient>
        </defs>
        <path d="M22 2H2v20h20L12 12 22 2z" fill="url(#kotlin-grad)" />
      </svg>
    )
  },
  {
    id: 'android',
    name: 'Android SDK',
    subtitle: 'Native & Tools',
    category: 'Platform Core',
    glowColor: '#3DDC84',
    gradient: 'linear-gradient(135deg, #073042 0%, #3DDC84 100%)',
    side: 'left',
    handTarget: 'left',
    streamDelay: 0.55,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M5.5 10.5C4.7 10.5 4 11.2 4 12v6c0 .8.7 1.5 1.5 1.5S7 18.8 7 18v-6c0-.8-.7-1.5-1.5-1.5zm13 0c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-6c0-.8-.7-1.5-1.5-1.5z" fill="#3DDC84" />
        <path d="M7.7 9h8.6c.4 0 .7-.3.7-.7 0-2.4-1.9-4.3-4.3-4.3h-1.4c-2.4 0-4.3 1.9-4.3 4.3 0 .4.3.7.7.7zm2.3-2.5c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8zm4 0c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8z" fill="#3DDC84" />
        <path d="M7.5 10v9.5c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V10H7.5zm2.5 10.5c0 .8-.7 1.5-1.5 1.5S7 21.3 7 20.5V20h3v.5zm7 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V20h3v.5z" fill="#3DDC84" />
        <path d="M8.2 4.2L6.8 2.8c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l1.4 1.4c.3.3.8.3 1.1 0s.3-.8 0-1.1zm7.6 0l1.4-1.4c.3-.3.3-.8 0-1.1s-.8-.3-1.1 0l-1.4 1.4c-.3.3-.3.8 0 1.1s.8.3 1.1 0z" fill="#3DDC84" />
      </svg>
    )
  }
];

export const TECH_POWER_RIGHT = [
  {
    id: 'react',
    name: 'React',
    subtitle: 'UI Library',
    category: 'Component Engine',
    glowColor: '#61DAFB',
    gradient: 'linear-gradient(135deg, #1A365D 0%, #61DAFB 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.15,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    subtitle: 'Full-Stack',
    category: 'React Framework',
    glowColor: '#D8B4FE',
    gradient: 'linear-gradient(135deg, #000000 0%, #7C3AED 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.25,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#050508" stroke="#A855F7" strokeWidth="1.2" />
        <path d="M7.8 7.5h2.2v9H7.8v-9zm8.4 0H14L9.5 14v2.5L16.2 7.5z" fill="#F3F4F6" />
        <path d="M14 7.5h2.2v9H14v-9z" fill="#A855F7" />
      </svg>
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    subtitle: 'Core Language',
    category: 'Dynamic Runtime',
    glowColor: '#F7DF1E',
    gradient: 'linear-gradient(135deg, #B45309 0%, #F59E0B 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.35,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
        <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.8-.6 1.8-1.5 0-1.1-.9-1.5-2.2-2.1-1.6-.7-2.6-1.5-2.6-3.2 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.6.5 3.3 1.8l-1.8 1.1c-.4-.7-.9-1-1.5-1-.7 0-1.2.4-1.2 1 0 .7.5 1.1 1.6 1.6 1.8.8 3.2 1.6 3.2 3.6 0 2.1-1.6 3.3-3.8 3.3-2.1 0-3.4-1-4.1-2.4L7 16.5zm7.8-8.3h2.3v7.4c0 1.4.8 2 1.9 2 .5 0 1-.1 1.3-.3v1.9c-.6.3-1.4.4-2.2.4-2.2 0-3.3-1.2-3.3-3.3V8.2z" fill="#000000" />
      </svg>
    )
  },
  {
    id: 'vite',
    name: 'Vite',
    subtitle: 'Build Tool',
    category: 'Fast Dev Server',
    glowColor: '#A855F7',
    gradient: 'linear-gradient(135deg, #41D1FF 0%, #BD34FE 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.45,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M19.4 4.5L12.5 21l-1.1-2.6L8.8 13 4.6 4.5l6.9 1.4 7.9-1.4z" fill="#41D1FF" />
        <path d="M12.5 21L19.4 4.5l-7.9 1.4v15.1z" fill="#BD34FE" />
        <path d="M13.2 3.8l-5.6 7.6h3.4l-1.5 5.5 5.8-7.6h-3.4l1.3-5.5z" fill="#FFE838" />
      </svg>
    )
  },
  {
    id: 'html',
    name: 'HTML5',
    subtitle: 'Markup',
    category: 'Semantic Web',
    glowColor: '#E44D26',
    gradient: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.55,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M3.5 2l1.6 18 6.9 1.9 6.9-1.9L20.5 2H3.5z" fill="#E44D26" />
        <path d="M12 3.6v16.7l5.4-1.5L18.7 3.6H12z" fill="#F16529" />
        <path d="M12 7.7H7.7l.3 3.3H12v-3.3zm0 6.6H9.7l-.2-2.3H7.5l.4 4.6 4.1 1.1v-3.4z" fill="#EBEBEB" />
        <path d="M12 7.7h4.3l-.4 3.3H12v-3.3zm0 6.6v3.4l4.1-1.1.4-4.6H14.3l-.2 2.3z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'css',
    name: 'CSS3',
    subtitle: 'Styling',
    category: 'Modern Layouts',
    glowColor: '#38BDF8',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
    side: 'right',
    handTarget: 'right',
    streamDelay: 0.65,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-power-svg" aria-hidden="true">
        <path d="M3.5 2l1.6 18 6.9 1.9 6.9-1.9L20.5 2H3.5z" fill="#1572B6" />
        <path d="M12 3.6v16.7l5.4-1.5L18.7 3.6H12z" fill="#33A9DC" />
        <path d="M12 7.7H7.7l.3 3.3H12v-3.3zm0 6.6H9.7l-.2-2.3H7.5l.4 4.6 4.1 1.1v-3.4z" fill="#EBEBEB" />
        <path d="M12 7.7h4.3l-.4 3.3H12v-3.3zm0 6.6v3.4l4.1-1.1.4-4.6H14.3l-.2 2.3z" fill="#FFFFFF" />
      </svg>
    )
  }
];
