
export function PowerCard({
  tech,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onActivate
}) {
  const isLeft = tech.side === 'left';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate?.(tech.id);
    }
  };

  return (
    <div
      className={`tech-power-card floating-tech-icon ${isLeft ? 'side-left' : 'side-right'} ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
      data-tech={tech.id}
      tabIndex={0}
      role="button"
      aria-label={`${tech.name} - ${tech.subtitle}. Click or press Enter to channel power.`}
      onMouseEnter={() => onHover?.(tech.id)}
      onMouseLeave={() => onLeave?.(tech.id)}
      onClick={() => onActivate?.(tech.id)}
      onKeyDown={handleKeyDown}
      style={{
        '--icon-glow': tech.glowColor,
        '--icon-grad': tech.gradient,
        animationDelay: `${(tech.streamDelay || 0) * 1.5}s`
      }}
    >
      {/* Outer energy beacon node connecting to stream */}
      <span className="power-node" aria-hidden="true">
        <span className="power-node-core" />
        <span className="power-node-pulse" />
      </span>

      {/* Floating Glowing Icon Orb */}
      <div className="floating-icon-orb" aria-hidden="true">
        <div className="floating-icon-halo" />
        <div className="floating-icon-svg-wrapper">
          {tech.svg}
        </div>
      </div>

      {/* Compact Floating Label */}
      <span className="power-icon-label">{tech.name}</span>

      {/* Hover/Focus Tooltip with category info */}
      <div className="power-icon-tooltip" aria-hidden="true">
        <span className="tooltip-sub">{tech.subtitle}</span>
      </div>
    </div>
  );
}
