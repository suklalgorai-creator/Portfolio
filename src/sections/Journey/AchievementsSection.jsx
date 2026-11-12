import { JOURNEY_CATEGORIES } from '../../data/journeyCmsSeed';
import { useJourneyCms } from '../../hooks/useJourneyCms';
import { RevealHeading } from '../../components/common/RevealHeading';

function CategoryGlyph({ colorKey }) {
  switch (colorKey) {
    case 'coral':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case 'yellow':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'lavender':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'blue':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case 'ink':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export function AchievementsSection({ onSelectCategory }) {
  const { publishedEntries, categoryCounts } = useJourneyCms({ onlyPublished: true });

  const featuredHighlights = publishedEntries.filter((item) => item.featured).slice(0, 3);

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">// ACHIEVEMENTS &amp; CREDENTIALS</span>
          <RevealHeading className="section-title">Milestones measured in shipped craft.</RevealHeading>
          <p className="section-subtitle">
            Every entry is dynamically managed through the Journey CMS—covering launches, campus growth, competitions, awards, certifications, and engineering breakthroughs.
          </p>
        </div>

        <div className="achievements-category-grid">
          {JOURNEY_CATEGORIES.map((category) => {
            const count = categoryCounts[category.id] || 0;
            return (
              <button
                key={category.id}
                type="button"
                className={`achievement-cat-card cat-${category.colorKey} reveal`}
                onClick={() => onSelectCategory?.(category.id)}
              >
                <div className="achievement-cat-top">
                  <span className="achievement-cat-icon">
                    <CategoryGlyph colorKey={category.colorKey} />
                  </span>
                  <span className="achievement-cat-count">{count}</span>
                </div>
                <h3 className="achievement-cat-title">{category.label}</h3>
                <p className="achievement-cat-desc">{category.description}</p>
              </button>
            );
          })}
        </div>

        {featuredHighlights.length > 0 && (
          <div className="achievements-spotlight-row reveal">
            {featuredHighlights.map((item) => {
              const cat = JOURNEY_CATEGORIES.find((c) => c.id === item.category);
              const colorKey = cat?.colorKey || 'blue';
              return (
                <article key={item.id} className={`achievement-spotlight-card cat-${colorKey}`}>
                  <div className="spotlight-meta">
                    <span className="spotlight-pill">{item.category}</span>
                    <span className="spotlight-date">{item.displayDate}</span>
                  </div>
                  <h3>{item.title}</h3>
                  {item.organization && <p className="spotlight-org">{item.organization}</p>}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
