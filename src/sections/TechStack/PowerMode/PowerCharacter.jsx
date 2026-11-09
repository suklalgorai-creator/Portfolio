
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
      {/* 1. Ground Cybernetic Energy Platform */}
      <div className="power-platform">
        <svg viewBox="0 0 600 240" className="power-platform-svg" preserveAspectRatio="none">
          <defs>
            <radialGradient id="plat-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="plat-ring-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="plat-ring-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Diffuse radial floor glow */}
          <ellipse cx="300" cy="120" rx="280" ry="90" fill="url(#plat-glow)" />

          {/* Outer dashed tech ring */}
          <ellipse
            cx="300"
            cy="120"
            rx="270"
            ry="75"
            fill="none"
            stroke="url(#plat-ring-left)"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            className="platform-ring-outer"
          />

          {/* Mid solid glowing cyan/purple ring */}
          <ellipse
            cx="300"
            cy="120"
            rx="210"
            ry="58"
            fill="none"
            stroke="url(#plat-ring-right)"
            strokeWidth="2.5"
            className="platform-ring-mid"
          />

          {/* Inner core ring */}
          <ellipse
            cx="300"
            cy="120"
            rx="140"
            ry="38"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="2"
            strokeDasharray="4 8"
            className="platform-ring-inner"
          />

          {/* Center focal beacon */}
          <ellipse cx="300" cy="120" rx="60" ry="16" fill="#00e5ff" fillOpacity="0.4" filter="blur(4px)" />
        </svg>
      </div>

      {/* 2. Character Silhouette with dual rim lights */}
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

        {/* Ambient energy aura overlay on silhouette */}
        <div className="power-silhouette-aura" />

        {/* Glowing cyber code glyph on back of hoodie */}
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
          <div className="hand-sparks cyan-sparks">
            <span className="spark spark-1" />
            <span className="spark spark-2" />
            <span className="spark spark-3" />
          </div>
        </div>

        <div ref={rightHandRef} className="power-hand power-hand-right">
          <div className="hand-core purple-core" />
          <div className="hand-flare purple-flare" />
          <div className="hand-pulse purple-pulse" />
          <div className="hand-sparks purple-sparks">
            <span className="spark spark-1" />
            <span className="spark spark-2" />
            <span className="spark spark-3" />
          </div>
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
