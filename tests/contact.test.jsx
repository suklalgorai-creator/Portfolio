import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactSection } from '../src/sections/Contact/ContactSection';

describe('ContactSection', () => {
  it('copies the configured email and reports success', async () => {
    const user = userEvent.setup();
    const onToast = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) }
    });
    render(<ContactSection onToast={onToast} />);

    await user.click(screen.getByRole('button', { name: /Copy Email Address/ }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('suklalgorai@gmail.com');
    expect(onToast).toHaveBeenCalledWith(expect.stringContaining('Copied'));
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('applies inquiry context passed by the project flow', () => {
    render(
      <ContactSection
        selectedTopic="Website / App Inquiry"
        prefilledMessage="Build a booking portal"
        onToast={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Scope / Inquiry Type')).toHaveValue('Website / App Inquiry');
    expect(screen.getByLabelText('Details / Message')).toHaveValue('Build a booking portal');
  });

  it('shows actionable validation feedback for incomplete inquiries', async () => {
    const user = userEvent.setup();
    render(<ContactSection onToast={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Compose Message' }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter your name/i);

    await user.type(screen.getByLabelText('Your Name'), 'AB');
    await user.type(screen.getByLabelText('Details / Message'), 'Short');
    await user.click(screen.getByRole('button', { name: 'Compose Message' }));

    expect(screen.getByRole('alert')).toHaveTextContent(/more detail/i);
  });
});
