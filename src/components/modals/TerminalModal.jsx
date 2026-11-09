import { Fragment, useRef, useEffect } from 'react';
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
      <div className="terminal-gemini-container">
        {/* Ambient Bloom Glow moving clockwise along perimeter */}
        <div className="terminal-gemini-bloom" aria-hidden="true">
          <div className="gemini-spin-conic" />
        </div>

        {/* Modal Card with Moving Perimeter Border Beam */}
        <div className="terminal-gemini-wrap">
          <div className="gemini-spin-conic" aria-hidden="true" />
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
                    <Fragment key={`${item.id}-${index}`}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
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
              aria-label="Terminal command input"
              placeholder="Type a command (try: projects, skills, story, clear)..."
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
