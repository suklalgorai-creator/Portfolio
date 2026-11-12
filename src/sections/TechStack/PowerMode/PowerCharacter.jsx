export function PowerCharacter({
  powerLevel = 1,
  phase = 'powered',
  activeHand = null,
  isShockwaveActive = false,
  leftHandRef,
  rightHandRef
}) {
  return (
    <div
      className={`power-character-container phase-${phase} ${activeHand ? `boost-${activeHand}` : ''}`}
      aria-hidden="true"
    >
      {/* 1. Studio Geometric Stage Platform */}
      <div className="power-platform">
        <svg viewBox="0 0 600 240" className="power-platform-svg" preserveAspectRatio="none">
          <defs>
            <radialGradient id="plat-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4169F5" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#B8A5F5" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="plat-ring-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4169F5" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#B8A5F5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF735C" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="plat-ring-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F8D95B" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FF735C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4169F5" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <ellipse cx="300" cy="120" rx="280" ry="90" fill="url(#plat-glow)" />

          <ellipse
            cx="300"
            cy="120"
            rx="270"
            ry="75"
            fill="none"
            stroke="url(#plat-ring-left)"
            strokeWidth="1.8"
            strokeDasharray="8 12"
            className="platform-ring-outer"
          />

          <ellipse
            cx="300"
            cy="120"
            rx="210"
            ry="58"
            fill="none"
            stroke="url(#plat-ring-right)"
            strokeWidth="2.4"
            className="platform-ring-mid"
          />

          <ellipse
            cx="300"
            cy="120"
            rx="140"
            ry="38"
            fill="none"
            stroke="#4169F5"
            strokeWidth="2"
            strokeDasharray="4 8"
            className="platform-ring-inner"
          />

          <ellipse cx="300" cy="120" rx="60" ry="16" fill="#F8D95B" fillOpacity="0.35" />
        </svg>
      </div>

      {/* 2. Character Silhouette with Architectural Studio Framing */}
      <div className="power-silhouette-wrapper">
        <picture>
          <source srcSet="/assets/images/developer-power-silhouette.webp" type="image/webp" />
          <img
            src="/assets/images/developer-power-silhouette.png"
            alt="Developer absorbing technology energy"
            className="power-silhouette-img"
            loading="eager"
            decoding="async"
          />
        </picture>

        <div className="power-silhouette-aura" />

        <div className="power-hoodie-glyph">
          <span className="glyph-bracket">&lt;</span>
          <span className="glyph-slash">/</span>
          <span className="glyph-bracket">&gt;</span>
        </div>

        {/* 3. Hand Energy Focal Points */}
        <div ref={leftHandRef} className="power-hand power-hand-left">
          <div className="hand-core cyan-core" />
          <div className="hand-flare cyan-flare" />
          <div className="hand-pulse cyan-pulse" />
        </div>

        <div ref={rightHandRef} className="power-hand power-hand-right">
          <div className="hand-core purple-core" />
          <div className="hand-flare purple-flare" />
          <div className="hand-pulse purple-pulse" />
        </div>

        {/* 4. Swirling Waist Energy Rings */}
        <div className="power-torso-rings">
          <div className="torso-ring ring-1" />
          <div className="torso-ring ring-2" />
          <div className="torso-ring ring-3" />
        </div>

        {/* 5. Phase 4 Shockwave Pulse */}
        <div className={`power-shockwave ${isShockwaveActive ? 'is-blasting' : ''}`} />
      </div>
    </div>
  );
}
