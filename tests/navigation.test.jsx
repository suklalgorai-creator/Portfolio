import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from '../src/components/layout/Navbar';

describe('Navbar', () => {
  it('opens and closes the mobile navigation', async () => {
    const user = userEvent.setup();
    render(<Navbar onOpenStory={vi.fn()} onOpenTerminal={vi.fn()} isLight={false} onToggleTheme={vi.fn()} />);

    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'Projects' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens terminal and toggles theme through callbacks', async () => {
    const user = userEvent.setup();
    const onOpenTerminal = vi.fn();
    const onToggleTheme = vi.fn();
    render(<Navbar onOpenStory={vi.fn()} onOpenTerminal={onOpenTerminal} isLight={false} onToggleTheme={onToggleTheme} />);

    await user.click(screen.getByRole('button', { name: /Terminal: open interactive developer terminal/ }));
    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(onOpenTerminal).toHaveBeenCalledOnce();
    expect(onToggleTheme).toHaveBeenCalledOnce();
  });

  it('opens the story without activating the home link', async () => {
    const user = userEvent.setup();
    const onOpenStory = vi.fn();
    const onNavigate = vi.fn();
    render(
      <Navbar
        onOpenStory={onOpenStory}
        onOpenTerminal={vi.fn()}
        isLight={false}
        onToggleTheme={vi.fn()}
        onNavigate={onNavigate}
      />
    );

    await user.click(screen.getByRole('button', { name: "View Suklal's story" }));

    expect(onOpenStory).toHaveBeenCalledOnce();
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
