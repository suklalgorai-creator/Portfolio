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
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
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
      onClick={(e) => {
        if (e.target.id === 'terminalModalOverlay') onClose();
      }}
    >
      <div className="terminal-window">
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot-red" onClick={onClose} style={{ cursor: 'pointer' }} />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <span className="terminal-title">suklal@portfolio: ~/interactive-cli</span>
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
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
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
  );
}
