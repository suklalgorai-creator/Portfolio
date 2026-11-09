import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TECH_POWER_LEFT, TECH_POWER_RIGHT } from './techStackPowerData';
import { PowerCard } from './PowerCard';
import { PowerCharacter } from './PowerCharacter';
import { EnergyStreamNetwork } from './EnergyStreamNetwork';
import { AmbientParticleField } from './AmbientParticleField';
import './tech-power-mode.css';

export function TechPowerMode() {
  const [phase, setPhase] = useState('powered'); // 'awakening' | 'activating' | 'converging' | 'absorbing' | 'powered'
  const [activeTech, setActiveTech] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isShockwaveActive, setIsShockwaveActive] = useState(false);
  const [isOvercharged, setIsOvercharged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const powerSequenceRef = useRef(null);
  const activeTechTimerRef = useRef(null);
  const shockwaveTimerRef = useRef(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => () => {
    powerSequenceRef.current?.revert();
    if (activeTechTimerRef.current) clearTimeout(activeTechTimerRef.current);
    if (shockwaveTimerRef.current) clearTimeout(shockwaveTimerRef.current);
  }, []);

  // GSAP 5-Phase Sequence & Interactive Overcharge
  const triggerPowerSequence = () => {
    if (reducedMotion) {
      powerSequenceRef.current?.revert();
      powerSequenceRef.current = null;
      setPhase('powered');
      setIsOvercharged(true);
      return;
    }

    powerSequenceRef.current?.revert();
    powerSequenceRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onStart: () => {
          setPhase('awakening');
          setIsOvercharged(true);
        }
      });

      // Phase 1: Awakening (Character & Platform illuminate)
      tl.to('.power-character-container', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to('.power-platform', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')

      // Phase 2: Technology Activation (Cards pulse sequentially)
      .call(() => setPhase('activating'))
      .fromTo('.tech-power-card', {
        opacity: 0.6,
        scale: 0.96
      }, {
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'back.out(1.4)'
      })

      // Phase 3: Power Convergence (Streams intensify)
      .call(() => setPhase('converging'))
      .fromTo('.stream-path-pulse', {
        strokeDashoffset: 400,
        opacity: 0
      }, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power1.inOut'
      })

      // Phase 4: Power Absorption (Hand flares, shockwave burst)
      .call(() => {
        setPhase('absorbing');
        setIsShockwaveActive(true);
      })
      .fromTo(['.hand-flare', '.power-hoodie-glyph'], {
        scale: 0.8,
        opacity: 0.4
      }, {
        scale: 1.5,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      })

      // Phase 5: Fully Powered State
      .call(() => {
        setPhase('powered');
        if (shockwaveTimerRef.current) clearTimeout(shockwaveTimerRef.current);
        shockwaveTimerRef.current = setTimeout(() => {
          setIsShockwaveActive(false);
          shockwaveTimerRef.current = null;
        }, 800);
      }, null, '+=0.2');

    }, containerRef);
  };

  // Initial Awakening on Mount (GSAP Context with strict cleanup)
  useEffect(() => {
    if (reducedMotion) {
      setPhase('powered');
      return;
    }

    const ctx = gsap.context(() => {
      // Gentle initial reveal of cards and character
      gsap.fromTo(
        ['.power-header', '.power-character-container', '.power-cards-column'],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleCardHover = (id) => {
    setHoveredTech(id);
  };

  const handleCardLeave = () => {
    setHoveredTech(null);
  };

  const handleCardActivate = (id) => {
    setActiveTech(id);
    // Surge animation
    if (!reducedMotion) {
      const isLeft = TECH_POWER_LEFT.some((t) => t.id === id);
      const handEl = isLeft ? leftHandRef.current : rightHandRef.current;
      if (handEl) {
        gsap.fromTo(
          handEl.querySelector('.hand-core'),
          { scale: 1 },
          { scale: 2.2, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }
        );
      }
    }
    if (activeTechTimerRef.current) clearTimeout(activeTechTimerRef.current);
    activeTechTimerRef.current = setTimeout(() => {
      setActiveTech(null);
      activeTechTimerRef.current = null;
    }, 1200);
  };

  const activeHand = hoveredTech || activeTech
    ? (TECH_POWER_LEFT.some((t) => t.id === (hoveredTech || activeTech)) ? 'left' : 'right')
    : null;

  return (
    <section
      ref={containerRef}
      className={`tech-power-mode-section ${reducedMotion ? 'reduced-motion' : ''}`}
      aria-labelledby="tech-power-title"
    >
      {/* Ambient Cosmic Atmosphere */}
      <AmbientParticleField />

      <div className="container power-mode-container">
        {/* Header Section */}
        <header className="power-header page-intro reveal">
          <span className="power-eyebrow">MY TECH STACK</span>
          <h1 id="tech-power-title" className="power-title">
            Technologies That <span className="power-gradient-text">Power Me</span>
          </h1>
          <p className="power-subtitle">
            A blend of tools and technologies that fuel my development journey — from mobile apps to modern web experiences.
          </p>

          {/* Interactive Power Controls */}
          <div className="power-controls-bar">
            <button
              type="button"
              className={`power-activate-btn ${isOvercharged ? 'is-charged' : ''}`}
              onClick={triggerPowerSequence}
              aria-label="Activate Power Mode absorption animation"
            >
              <span className="btn-lightning-icon" aria-hidden="true">⚡</span>
              <span className="btn-text">{isOvercharged ? 'Re-Energize Core' : 'Activate Power Mode'}</span>
              <span className="btn-pulse-glow" aria-hidden="true" />
            </button>

            <div className="power-status-indicator" role="status" aria-live="polite">
              <span className="status-dot-pulse" />
              <span className="status-label">
                {phase === 'absorbing'
                  ? 'ABSORBING TECH ENERGY'
                  : phase === 'converging'
                  ? 'CONVERGING POWER'
                  : 'CORE ONLINE · 100%'}
              </span>
            </div>
          </div>
        </header>

        {/* Master Power Stage */}
        <div className="power-stage-wrapper">
          {/* SVG Energy Stream Network connecting cards to character */}
          <EnergyStreamNetwork
            activeTech={activeTech}
            hoveredTech={hoveredTech}
          />

          {/* LEFT Column: Mobile Development Floating Icons */}
          <aside className="power-cards-column column-left floating-icons-side" aria-label="Mobile development technologies">
            <span className="sr-only">Mobile Ecosystem Technologies</span>
            <div className="floating-icons-cluster">
              {TECH_POWER_LEFT.map((tech) => (
                <PowerCard
                  key={tech.id}
                  tech={tech}
                  isActive={activeTech === tech.id}
                  isHovered={hoveredTech === tech.id}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                  onActivate={handleCardActivate}
                />
              ))}
            </div>
          </aside>

          {/* CENTER: Developer Character viewed from behind */}
          <div className="power-center-stage">
            <PowerCharacter
              powerLevel={isOvercharged ? 1.5 : 1}
              phase={phase}
              activeHand={activeHand}
              isShockwaveActive={isShockwaveActive}
              leftHandRef={leftHandRef}
              rightHandRef={rightHandRef}
            />
          </div>

          {/* RIGHT Column: Web Development Floating Icons */}
          <aside className="power-cards-column column-right floating-icons-side" aria-label="Web development technologies">
            <span className="sr-only">Web Architecture Technologies</span>
            <div className="floating-icons-cluster">
              {TECH_POWER_RIGHT.map((tech) => (
                <PowerCard
                  key={tech.id}
                  tech={tech}
                  isActive={activeTech === tech.id}
                  isHovered={hoveredTech === tech.id}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                  onActivate={handleCardActivate}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
