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
        {/* Glow Filters */}
        <filter id="stream-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="stream-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Comet Head Filter */}
        <filter id="comet-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="comet-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stream Gradients */}
        <linearGradient id="stream-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="stream-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* LEFT Mobile Streams (Cyan / Teal) */}
      <g className="streams-group-left">
        {LEFT_ANCHORS.map((anchor, idx) => {
          const tech = TECH_POWER_LEFT.find((t) => t.id === anchor.id);
          const isHighlighted = hoveredTech === anchor.id || activeTech === anchor.id;
          const pathD = generateBezier(anchor, LEFT_HAND, true);
          const braidD = generateBezier(anchor, LEFT_HAND, true, 18);
          const animDur = `${1.1 + (idx % 3) * 0.25}s`;

          return (
            <g
              key={anchor.id}
              className={`energy-stream-item stream-${anchor.id} ${isHighlighted ? 'is-boosted' : ''}`}
            >
              {/* Outer atmospheric aura beam */}
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#00e5ff'}
                strokeWidth={isHighlighted ? '10' : '5'}
                strokeOpacity={isHighlighted ? '0.75' : '0.35'}
                filter="url(#stream-glow-cyan)"
                className="stream-path-ambient"
              />

              {/* Core laser beam */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#stream-cyan-grad)"
                strokeWidth={isHighlighted ? '3.5' : '2.2'}
                strokeOpacity="0.85"
                className="stream-path-core"
              />

              {/* Secondary braided harmonic stream */}
              <path
                d={braidD}
                fill="none"
                stroke={tech?.glowColor || '#00e5ff'}
                strokeWidth="1.2"
                strokeOpacity="0.45"
                strokeDasharray="16 32"
                className="stream-path-braid stream-inward-left"
                style={{ animationDuration: '1.4s' }}
              />

              {/* High-velocity plasma stream pulses flowing inward into hand */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth={isHighlighted ? '4' : '2.8'}
                strokeDasharray="40 100"
                strokeLinecap="round"
                className="stream-path-pulse stream-inward-left"
                style={{ animationDelay: `${idx * 0.2}s`, animationDuration: '0.95s' }}
              />

              {/* Rapid electrical sparks */}
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#00e5ff'}
                strokeWidth="2.5"
                strokeDasharray="8 60"
                strokeLinecap="round"
                className="stream-path-particles stream-inward-left"
                style={{ animationDelay: `${idx * 0.2 + 0.3}s`, animationDuration: '0.75s' }}
              />

              {/* Physical Flying Energy Photons / Comets into Hand */}
              <circle r="4.5" fill="#ffffff" filter="url(#comet-glow-cyan)">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
              <circle r="3" fill="#67e8f9" opacity="0.9">
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

      {/* RIGHT Web Streams (Purple / Magenta) */}
      <g className="streams-group-right">
        {RIGHT_ANCHORS.map((anchor, idx) => {
          const tech = TECH_POWER_RIGHT.find((t) => t.id === anchor.id);
          const isHighlighted = hoveredTech === anchor.id || activeTech === anchor.id;
          const pathD = generateBezier(anchor, RIGHT_HAND, false);
          const braidD = generateBezier(anchor, RIGHT_HAND, false, -18);
          const animDur = `${1.05 + (idx % 3) * 0.25}s`;

          return (
            <g
              key={anchor.id}
              className={`energy-stream-item stream-${anchor.id} ${isHighlighted ? 'is-boosted' : ''}`}
            >
              {/* Outer atmospheric aura beam */}
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#c084fc'}
                strokeWidth={isHighlighted ? '10' : '5'}
                strokeOpacity={isHighlighted ? '0.75' : '0.35'}
                filter="url(#stream-glow-purple)"
                className="stream-path-ambient"
              />

              {/* Core laser beam */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#stream-purple-grad)"
                strokeWidth={isHighlighted ? '3.5' : '2.2'}
                strokeOpacity="0.85"
                className="stream-path-core"
              />

              {/* Secondary braided harmonic stream */}
              <path
                d={braidD}
                fill="none"
                stroke={tech?.glowColor || '#c084fc'}
                strokeWidth="1.2"
                strokeOpacity="0.45"
                strokeDasharray="16 32"
                className="stream-path-braid stream-inward-right"
                style={{ animationDuration: '1.4s' }}
              />

              {/* High-velocity plasma stream pulses flowing inward into hand */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth={isHighlighted ? '4' : '2.8'}
                strokeDasharray="40 100"
                strokeLinecap="round"
                className="stream-path-pulse stream-inward-right"
                style={{ animationDelay: `${idx * 0.18}s`, animationDuration: '0.95s' }}
              />

              {/* Rapid electrical sparks */}
              <path
                d={pathD}
                fill="none"
                stroke={tech?.glowColor || '#c084fc'}
                strokeWidth="2.5"
                strokeDasharray="8 60"
                strokeLinecap="round"
                className="stream-path-particles stream-inward-right"
                style={{ animationDelay: `${idx * 0.18 + 0.3}s`, animationDuration: '0.75s' }}
              />

              {/* Physical Flying Energy Photons / Comets into Hand */}
              <circle r="4.5" fill="#ffffff" filter="url(#comet-glow-purple)">
                <animateMotion
                  path={pathD}
                  dur={animDur}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  keyPoints="0;1"
                />
              </circle>
              <circle r="3" fill="#e879f9" opacity="0.9">
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

      {/* Hand Convergence Vortices in SVG */}
      <g className="hand-convergence-vortex-left">
        <circle cx={LEFT_HAND.x} cy={LEFT_HAND.y} r="18" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="6 6" className="vortex-spin-left" />
        <circle cx={LEFT_HAND.x} cy={LEFT_HAND.y} r="8" fill="#ffffff" filter="url(#comet-glow-cyan)" />
      </g>

      <g className="hand-convergence-vortex-right">
        <circle cx={RIGHT_HAND.x} cy={RIGHT_HAND.y} r="18" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="6 6" className="vortex-spin-right" />
        <circle cx={RIGHT_HAND.x} cy={RIGHT_HAND.y} r="8" fill="#ffffff" filter="url(#comet-glow-purple)" />
      </g>
    </svg>
  );
}
