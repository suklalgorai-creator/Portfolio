import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechPowerMode } from '../src/sections/TechStack/PowerMode/TechPowerMode';

describe('TechPowerMode Component', () => {
  it('renders the power mode header and title correctly', () => {
    render(<TechPowerMode />);
    expect(screen.getByText('MY TECH STACK')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Technologies That/i })).toBeInTheDocument();
    expect(screen.getByText(/Power Me/i)).toBeInTheDocument();
  });

  it('renders all 4 mobile ecosystem technology cards on the left', () => {
    render(<TechPowerMode />);
    expect(screen.getByText('Flutter')).toBeInTheDocument();
    expect(screen.getByText('Dart')).toBeInTheDocument();
    expect(screen.getByText('Kotlin')).toBeInTheDocument();
    expect(screen.getByText('Android SDK')).toBeInTheDocument();
  });

  it('renders all 6 web architecture technology cards on the right', () => {
    render(<TechPowerMode />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('CSS3')).toBeInTheDocument();
  });

  it('provides an accessible button to activate power absorption', () => {
    render(<TechPowerMode />);
    const activateBtn = screen.getByRole('button', { name: /activate power mode/i });
    expect(activateBtn).toBeInTheDocument();

    fireEvent.click(activateBtn);
    expect(screen.getByText(/CORE ONLINE|ABSORBING|CONVERGING/i)).toBeInTheDocument();
  });

  it('allows keyboard interaction on tech cards', () => {
    render(<TechPowerMode />);
    const reactCard = screen.getByRole('button', { name: /react/i });
    expect(reactCard).toBeInTheDocument();

    // Trigger Enter key
    fireEvent.keyDown(reactCard, { key: 'Enter', code: 'Enter' });
    expect(reactCard).toHaveClass('tech-power-card');
  });
});
