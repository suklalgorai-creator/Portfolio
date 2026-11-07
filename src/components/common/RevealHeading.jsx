import React from 'react';

export function RevealHeading({ as: Tag = 'h2', children, className = '' }) {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <Tag className={`split-heading ${className}`.trim()} aria-label={text || undefined}>
      <span className="split-heading-accessible">{children}</span>
      {text && (
        <span className="split-heading-visual" aria-hidden="true">
          {words.map((word, index) => (
            <span className="split-heading-mask" key={`${word}-${index}`}>
              <span className="split-heading-word" style={{ '--split-index': index }}>{word}</span>
            </span>
          ))}
        </span>
      )}
    </Tag>
  );
}
