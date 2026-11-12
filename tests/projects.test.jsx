import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProjectsSection } from '../src/sections/Projects/ProjectsSection';
import { projectsData } from '../src/data/projectsData';

const samplePublishedProjects = projectsData.map((p, idx) => ({
  ...p,
  published: true,
  featured: idx < 3
}));

describe('ProjectsSection', () => {
  it('renders the premium empty state when all projects are in draft / unpublished', () => {
    render(<ProjectsSection onSelectProject={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Something New Is Taking Shape.' })).toBeInTheDocument();
    expect(
      screen.getByText(/I'm preparing a collection of projects that reflect my work, experiments and ideas/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/In the Workbench/i)).toBeInTheDocument();
  });

  it('renders the coming soon teaser on the home page when no featured projects are published', () => {
    render(<ProjectsSection onSelectProject={vi.fn()} featuredOnly={true} />);

    expect(screen.getByRole('heading', { name: 'Something New Is Taking Shape.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Project Archive/i })).toHaveAttribute('href', '/projects');
  });

  it('renders data-driven project counts and filters when projects are published', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection onSelectProject={vi.fn()} projects={samplePublishedProjects} />);

    expect(screen.getByRole('tab', { name: new RegExp(`All Works ${samplePublishedProjects.length}`) })).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /Web Concepts/ }));

    expect(screen.getByText('Web Concepts')).toBeInTheDocument();
    expect(screen.queryByText('College Attendance Tracker')).not.toBeInTheDocument();
  });

  it('opens a project from the keyboard-accessible inspect control when projects are published', async () => {
    const user = userEvent.setup();
    const onSelectProject = vi.fn();
    render(<ProjectsSection onSelectProject={onSelectProject} projects={samplePublishedProjects} />);

    const card = screen.getByRole('button', { name: /Inspect College Attendance Tracker/ });
    card.focus();
    await user.keyboard('{Enter}');

    expect(onSelectProject).toHaveBeenCalledWith(expect.objectContaining({ name: 'College Attendance Tracker' }));
  });
});
