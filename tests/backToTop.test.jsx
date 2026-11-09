import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BackToTop } from '../src/components/common/BackToTop';

describe('BackToTop', () => {
  it('appears after scrolling and returns the viewport to the top', () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 600, writable: true });

    render(<BackToTop />);
    fireEvent.scroll(window);

    const button = screen.getByRole('button', { name: 'Back to top' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
