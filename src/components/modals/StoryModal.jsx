
import { useEffect, useRef } from 'react';

export function StoryModal({
  isOpen,
  currentIdx,
  currentSlide,
  stories,
  progress,
  onClose,
  onNext,
  onPrev,
  onPause,
  onResume,
  onContact
}) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || !currentSlide) return null;

  return (
    <div
      className={`story-modal-overlay ${isOpen ? 'active' : ''}`}
      id="storyModalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="storySlideTitle"
      onClick={(e) => {
        if (e.target.id === 'storyModalOverlay') onClose();
      }}
    >
      <div className="story-modal-card">
        {/* Progress Bar Segmented Indicators */}
        <div className="story-progress-bar">
          {stories.map((s, i) => {
            let width = '0%';
            if (i < currentIdx) width = '100%';
            else if (i === currentIdx) width = `${progress}%`;

            return (
              <div key={s.id} className="story-progress-segment">
                <div
                  className="story-progress-fill"
                  id={`storyFill${i}`}
                  style={{ width }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Header */}
        <div className="story-header">
          <div className="story-user-badge">
            <div className="story-avatar-micro">
              <img src="/assets/images/avatar.jpg" alt="Suklal Gorai" />
            </div>
            <div>
              <span className="story-username">suklal_gorai</span>
              <span className="story-time" id="storyHeaderTime">
                {currentSlide.time}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="story-close-btn"
            id="storyCloseBtn"
            ref={closeButtonRef}
            aria-label="Close Story"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Story Slide Body with tap regions */}
        <div
          className="story-slide-body"
          id="storySlideBody"
          style={{ backgroundImage: `url('${currentSlide.bg}')` }}
          onMouseDown={onPause}
          onMouseUp={onResume}
          onTouchStart={onPause}
          onTouchEnd={onResume}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'Enter') onNext();
            if (event.key === 'ArrowLeft') onPrev();
          }}
          role="button"
          tabIndex={0}
          aria-label="Story slide. Use arrow keys to navigate."
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width * 0.4) {
              onNext();
            } else {
              onPrev();
            }
          }}
        >
          <div className="story-overlay-gradient"></div>
          <div className="story-slide-content">
            <span className="story-slide-badge" id="storySlideBadge">
              {currentSlide.badge}
            </span>
            <h3 className="story-slide-title" id="storySlideTitle">
              {currentSlide.title}
            </h3>
            <p className="story-slide-desc" id="storySlideDesc">
              {currentSlide.desc}
            </p>
            <div className="story-actions">
              <a
                href="/contact"
                className="btn btn-sm btn-primary story-contact-btn"
                id="storyContactBtn"
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                  onContact?.();
                }}
              >
                Get In Touch &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
