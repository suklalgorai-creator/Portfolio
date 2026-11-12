import { TECH_POWER_LEFT, TECH_POWER_RIGHT } from './techStackPowerData';

// Coordinated anchor points in a normalized 1200x700 viewBox
const LEFT_HAND = { x: 470, y: 380 };
const RIGHT_HAND = { x: 730, y: 380 };

const LEFT_ANCHORS = [
  { id: 'flutter', x: 220, y: 155 },
  { id: 'dart', x: 250, y: 285 },
  { id: 'kotlin', x: 250, y: 425 },
  { id: 'android', x: 220, y: 565 }
];

const RIGHT_ANCHORS = [
  { id: 'react', x: 980, y: 125 },
  { id: 'nextjs', x: 950, y: 225 },
  { id: 'javascript', x: 935, y: 325 },
  { id: 'vite', x: 935, y: 425 },
  { id: 'html', x: 950, y: 525 },
  { id: 'css', x: 980, y: 620 }
];

function generateBezier(start, end, isLeft, curveOffset = 0) {
  const dx = end.x - start.x;
  const cp1x = start.x + dx * 0.42;
  const cp1y = start.y + (end.y - start.y) * 0.1 + curveOffset;
  const cp2x = isLeft ? end.x - 75 : end.x + 75;
  const cp2y = end.y - (end.y - start.y) * 0.35 - curveOffset * 0.5;

  return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
}

export function EnergyStreamNetwork({
  activeTech = null,
  hoveredTech = null
}) {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="energy-streams-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="stream-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="stream-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="comet-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="comet-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="stream-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4169F5" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#254EDB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B8A5F5" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="stream-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF735C" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#B8A5F5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4169F5" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* LEFT Mobile Streams (Electric Blue) */}
      <g className="streams-group-left">
        {LEFT_ANCHORS.map((anchor, idx) => {
          const tech = TECH_POWER_LEFT.find((t) => t.id === anchor.id);
          const isHighlighted = hoveredTech === anchor.id || activeTech === anchor.id;
          const pathD = generateBezier(anchor, LEFT_HAND, true);
          const braidD = generateBezier(anchor, LEFT_HAND, true, 16);
          const animDur = `${1.15 + (idx % 3) * 0.25}s`;

          return (
            <g
              key={anchor.id}
              className={`energy-stream-item stream-${anchor.id} ${isHighlighted ? 'is-boosted' : ''}`}
            >
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#4169F5'}
                strokeWidth={isHighlighted ? '8' : '4'}
                strokeOpacity={isHighlighted ? '0.45' : '0.18'}
                filter="url(#stream-glow-cyan)"
                className="stream-path-ambient"
              />

              <path
                d={pathD}
                fill="none"
                stroke="url(#stream-cyan-grad)"
                strokeWidth={isHighlighted ? '3.2' : '2'}
                strokeOpacity="0.85"
                className="stream-path-core"
              />

              <path
                d={braidD}
                fill="none"
                stroke="#4169F5"
                strokeWidth="1.2"
                strokeOpacity="0.35"
                strokeDasharray="14 28"
                className="stream-path-braid stream-inward-left"
                style={{ animationDuration: '1.5s' }}
              />

              <path
                d={pathD}
                fill="none"
                stroke="#F8D95B"
                strokeWidth={isHighlighted ? '3.5' : '2.4'}
                strokeDasharray="36 110"
                strokeLinecap="round"
                className="stream-path-pulse stream-inward-left"
                style={{ animationDelay: `${idx * 0.2}s`, animationDuration: '1.05s' }}
              />

              <circle r="4" fill="#4169F5" filter="url(#comet-glow-cyan)">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
              <circle r="2.8" fill="#F8D95B" opacity="0.95">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  begin="0.55s"
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
            </g>
          );
        })}
      </g>

      {/* RIGHT Web Streams (Coral & Lavender) */}
      <g className="streams-group-right">
        {RIGHT_ANCHORS.map((anchor, idx) => {
          const tech = TECH_POWER_RIGHT.find((t) => t.id === anchor.id);
          const isHighlighted = hoveredTech === anchor.id || activeTech === anchor.id;
          const pathD = generateBezier(anchor, RIGHT_HAND, false);
          const braidD = generateBezier(anchor, RIGHT_HAND, false, -16);
          const animDur = `${1.1 + (idx % 3) * 0.25}s`;

          return (
            <g
              key={anchor.id}
              className={`energy-stream-item stream-${anchor.id} ${isHighlighted ? 'is-boosted' : ''}`}
            >
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#FF735C'}
                strokeWidth={isHighlighted ? '8' : '4'}
                strokeOpacity={isHighlighted ? '0.45' : '0.18'}
                filter="url(#stream-glow-purple)"
                className="stream-path-ambient"
              />

              <path
                d={pathD}
                fill="none"
                stroke="url(#stream-purple-grad)"
                strokeWidth={isHighlighted ? '3.2' : '2'}
                strokeOpacity="0.85"
                className="stream-path-core"
              />

              <path
                d={braidD}
                fill="none"
                stroke="#B8A5F5"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                strokeDasharray="14 28"
                className="stream-path-braid stream-inward-right"
                style={{ animationDuration: '1.5s' }}
              />

              <path
                d={pathD}
                fill="none"
                stroke="#FF735C"
                strokeWidth={isHighlighted ? '3.5' : '2.4'}
                strokeDasharray="36 110"
                strokeLinecap="round"
                className="stream-path-pulse stream-inward-right"
                style={{ animationDelay: `${idx * 0.18}s`, animationDuration: '1.05s' }}
              />

              <circle r="4" fill="#FF735C" filter="url(#comet-glow-purple)">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
              <circle r="2.8" fill="#B8A5F5" opacity="0.95">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  begin="0.55s"
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
            </g>
          );
        })}
      </g>

      {/* Hand Convergence Vortices */}
      <g className="hand-convergence-vortex-left">
        <circle cx={LEFT_HAND.x} cy={LEFT_HAND.y} r="18" fill="none" stroke="#4169F5" strokeWidth="1.8" strokeDasharray="6 6" className="vortex-spin-left" />
        <circle cx={LEFT_HAND.x} cy={LEFT_HAND.y} r="7" fill="#F8D95B" stroke="#4169F5" strokeWidth="2" />
      </g>

      <g className="hand-convergence-vortex-right">
        <circle cx={RIGHT_HAND.x} cy={RIGHT_HAND.y} r="18" fill="none" stroke="#FF735C" strokeWidth="1.8" strokeDasharray="6 6" className="vortex-spin-right" />
        <circle cx={RIGHT_HAND.x} cy={RIGHT_HAND.y} r="7" fill="#B8A5F5" stroke="#FF735C" strokeWidth="2" />
      </g>
    </svg>
  );
}
