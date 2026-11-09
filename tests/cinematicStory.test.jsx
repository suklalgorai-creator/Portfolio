import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { refresh: vi.fn() },
}));

import { CinematicStorySection } from '../src/sections/CinematicStory/CinematicStorySection';

describe('CinematicStorySection', () => {
  it('keeps the story stages available as semantic content', () => {
    render(<CinematicStorySection />);

    expect(screen.getByRole('heading', { name: /builder.*journey/i, level: 2 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText(/Scroll to move through the story/i)).toBeInTheDocument();
  });

  it('renders all stages immediately when reduced motion is requested', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(<CinematicStorySection />);
    expect(container.querySelector('.cinematic-story')).toHaveAttribute('data-motion-mode', 'static');
    expect(screen.getByText(/Discipline became/i)).toBeVisible();
    expect(screen.getByText(/Now the work is measured/i)).toBeVisible();

    window.matchMedia = originalMatchMedia;
  });
});
