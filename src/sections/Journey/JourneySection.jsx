import React from 'react';
import { timelineData } from '../../data/timelineData';

export function JourneySection() {
  return (
    <section id="journey">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">04 • Milestones</span>
          <h2 className="section-title">My Builder Journey</h2>
          <p className="section-subtitle">
            Every pivot and project that shaped how I engineer software today
          </p>
        </div>

        <div className="editorial-timeline">
          <div className="timeline-rail" aria-hidden="true" />
          {timelineData.map((item, idx) => (
            <div key={idx} className={`timeline-entry reveal ${idx === 0 ? 'is-current' : ''}`}>
              <div className="timeline-marker" aria-hidden="true">
                <span className="marker-dot" />
                {idx === 0 && <span className="marker-pulse" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                  {item.tag && <span className="timeline-tag">{item.tag}</span>}
                </div>
                <h3 className="timeline-heading">{item.title}</h3>
                <p className="timeline-text">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
