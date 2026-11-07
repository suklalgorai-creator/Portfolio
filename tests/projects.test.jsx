import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProjectsSection } from '../src/sections/Projects/ProjectsSection';
import { projectsData } from '../src/data/projectsData';

describe('ProjectsSection', () => {
  it('renders data-driven project counts and filters by category', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection onSelectProject={vi.fn()} />);

    expect(screen.getByRole('tab', { name: new RegExp(`All Works ${projectsData.length}`) })).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /Client Platforms/ }));

    expect(screen.getByText('Client Platforms')).toBeInTheDocument();
    expect(screen.queryByText('College Attendance Tracker')).not.toBeInTheDocument();
  });

  it('opens a project from the keyboard-accessible inspect control', async () => {
    const user = userEvent.setup();
    const onSelectProject = vi.fn();
    render(<ProjectsSection onSelectProject={onSelectProject} />);

    const card = screen.getByRole('button', { name: /Inspect College Attendance Tracker/ });
    card.focus();
    await user.keyboard('{Enter}');

    expect(onSelectProject).toHaveBeenCalledWith(expect.objectContaining({ name: 'College Attendance Tracker' }));
  });
});
