import React, { useRef, useEffect } from 'react';
import { terminalQuickChips } from '../../data/terminalCommands';

export function TerminalModal({
  isOpen,
  history,
  inputVal,
  onInputChange,
  onSubmit,
  onChipClick,
  onClose
}) {
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    let focusTimer;
    if (isOpen) {
      focusTimer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  return (
    <div
      className={`terminal-modal-overlay ${isOpen ? 'active' : ''}`}
      id="terminalModalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminalTitle"
      onClick={(e) => {
        if (e.target.id === 'terminalModalOverlay') onClose();
      }}
    >
      <div className="terminal-gemini-wrap">
        {/* Ambient Bloom Glow SVG moving clockwise along perimeter */}
        <svg className="terminal-gemini-glow-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="geminiGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="25%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect
            className="gemini-beam-path"
            x="20"
            y="20"
            width="960"
            height="960"
            rx="32"
            fill="none"
            stroke="url(#geminiGlowGrad)"
            strokeWidth="48"
            pathLength="1000"
          />
        </svg>

        {/* Sharp Clockwise Perimeter Beam SVG */}
        <svg className="terminal-gemini-border-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="geminiBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="20%" stopColor="#06b6d4" />
              <stop offset="45%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="90%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          {/* Subtle hairline edge guide */}
          <rect
            x="2"
            y="2"
            width="996"
            height="996"
            rx="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Active Clockwise Perimeter Beam */}
          <rect
            className="gemini-beam-path"
            x="2"
            y="2"
            width="996"
            height="996"
            rx="20"
            fill="none"
            stroke="url(#geminiBorderGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="terminal-window">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <button type="button" className="dot-red" onClick={onClose} aria-label="Close terminal" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <span className="terminal-title" id="terminalTitle">suklal@portfolio: ~/interactive-cli</span>
            <button
              type="button"
              className="terminal-close"
              id="terminalModalClose"
              aria-label="Close Terminal"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          <div className="terminal-chips">
            {terminalQuickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="term-chip"
                onClick={() => onChipClick(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="terminal-output" id="terminalOutput" ref={outputRef}>
            {history.map((item) => (
              <div key={item.id} className="term-entry">
                {item.cmd && (
                  <div className="term-line">
                    <span className="term-cmd-echo">suklal@dev:~$</span> {item.cmd}
                  </div>
                )}
                <div
                  className="term-line term-response"
                  style={{
                    color: 'var(--paper-secondary)',
                    paddingLeft: '10px',
                    borderLeft: '2px solid var(--ink-green)',
                    marginBottom: '14px'
                  }}
                >
                  {item.content.split('\n').map((line, index) => (
                    <React.Fragment key={`${item.id}-${index}`}>
                      {index > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form
            className="terminal-input-row"
            id="terminalForm"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(inputVal);
            }}
          >
            <span className="term-prompt">suklal@dev:~$</span>
            <input
              type="text"
              className="terminal-input"
              id="terminalInput"
              ref={inputRef}
              value={inputVal}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type a command (try: projects, skills, story, clear)..."
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
