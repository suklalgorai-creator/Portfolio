import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JourneySection } from '../src/sections/Journey/JourneySection';
import { AdminJourneyPage } from '../src/pages/AdminJourneyPage';

describe('Professional Journey CMS', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('supports filtering across all 6 journey categories and hides draft items publicly', async () => {
    const user = userEvent.setup();
    render(<JourneySection />);

    expect(screen.getByText('Shipped College Attendance Tracker v2.1.1')).toBeInTheDocument();
    expect(screen.queryByText(/Draft Template/i)).not.toBeInTheDocument();

    for (const label of [
      'Competitions',
      'Awards',
      'College activities',
      'Certifications',
      'Project launches',
      'Technical milestones'
    ]) {
      expect(screen.getByRole('tab', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    }

    await user.click(screen.getByRole('tab', { name: /College activities/i }));
    expect(screen.getByText('Started B.Tech CSE @ Netaji Subhas University')).toBeInTheDocument();
    expect(screen.queryByText('Shipped College Attendance Tracker v2.1.1')).not.toBeInTheDocument();
  });

  it('publishes a new award from the admin dashboard and automatically displays it on the public timeline', async () => {
    const user = userEvent.setup();
    const onToast = vi.fn();

    render(
      <>
        <AdminJourneyPage onToast={onToast} onNavigate={vi.fn()} />
        <JourneySection />
      </>
    );

    // Sign in to CMS admin gate
    fireEvent.change(screen.getByLabelText('Admin Passcode'), { target: { value: 'studio2026' } });
    await user.click(screen.getByRole('button', { name: /Unlock CMS Dashboard/i }));

    expect(screen.getByRole('heading', { name: /Journey & Achievements Studio/i })).toBeInTheDocument();

    // Publish a new Award entry
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Best Student Product Award 2026' } });
    await user.selectOptions(screen.getByLabelText('Category'), 'Awards');
    fireEvent.change(screen.getByLabelText('Display Date'), { target: { value: 'Nov 2026' } });
    fireEvent.change(screen.getByLabelText('Organization / Platform'), { target: { value: 'NSU Annual Tech Showcase' } });
    fireEvent.change(screen.getByLabelText('Story / Achievement Details'), {
      target: { value: 'Recognized for building an offline-first attendance utility used across campus.' }
    });
    await user.click(screen.getByRole('button', { name: /Publish to Public Timeline/i }));

    await waitFor(() => {
      const publicTimeline = document.getElementById('journey');
      expect(publicTimeline).toHaveTextContent('Best Student Product Award 2026');
    });
  }, 15000);
});
