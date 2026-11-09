import { useMemo } from 'react';

export function AmbientParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: (i * 31.7) % 100,
      y: (i * 47.3) % 100,
      size: (i % 3) + 1.5,
      opacity: ((i % 5) + 3) / 10,
      duration: 6 + (i % 7) * 2,
      delay: (i % 5) * 1.2,
      isCyan: i % 2 === 0
    }));
  }, []);

  return (
    <div className="power-ambient-field" aria-hidden="true">
      {/* Cosmic Nebulae Backdrops */}
      <div className="power-nebula-left" />
      <div className="power-nebula-right" />
      <div className="power-nebula-center" />

      {/* Atmospheric Star Particles */}
      <div className="power-stars-container">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`power-star-particle ${p.isCyan ? 'star-cyan' : 'star-purple'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
