import { useState, useCallback, useEffect } from 'react';
import { terminalCommands } from '../data/terminalCommands';

export function useTerminal(toggleTheme) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 'init-1',
      cmd: '',
      content: 'Antigravity / Web-CLI v2.4.0 (x86_64-pc-none)\nType help to list available commands or click a chip below.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const openTerminal = useCallback(() => setIsOpen(true), []);
  const closeTerminal = useCallback(() => setIsOpen(false), []);

  const executeCommand = useCallback((rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([
        {
          id: 'cleared-' + Date.now(),
          cmd: '',
          content: 'Terminal cleared. Type help or click a chip above.'
        }
      ]);
      setInputVal('');
      return;
    }

    if (cmd === 'theme') {
      if (toggleTheme) toggleTheme();
      setHistory(prev => [
        ...prev,
        {
          id: 'cmd-' + Date.now(),
          cmd: rawCmd,
          content: 'Toggled portfolio theme mode (Dark / Daylight Glass).'
        }
      ]);
      setInputVal('');
      return;
    }

    let response;
    if (terminalCommands[cmd]) {
      response = terminalCommands[cmd]();
    } else {
      response = {
        content: `Command not recognized: "${rawCmd}". Try help, projects, or skills.`
      };
    }

    setHistory(prev => [
      ...prev,
      {
        id: 'cmd-' + Date.now(),
        cmd: rawCmd,
        content: response.content,
        type: 'text'
      }
    ]);
    setInputVal('');
  }, [toggleTheme]);

  // Global Ctrl+K hotkey
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        closeTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTerminal]);

  return {
    isOpen,
    history,
    inputVal,
    setInputVal,
    openTerminal,
    closeTerminal,
    executeCommand
  };
}
