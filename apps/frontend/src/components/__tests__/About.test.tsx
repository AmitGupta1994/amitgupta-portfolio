import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';

describe('About component', () => {
  it('renders section title and summary HTML content correctly', () => {
    const summaryText = 'Full Stack Engineer with <strong>7 years</strong> of experience.';
    render(<About summary={summaryText} />);
    
    expect(screen.getByRole('heading', { level: 3, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Engineer with/i)).toBeInTheDocument();
    expect(screen.getByText('7 years')).toBeInTheDocument();
  });

  it('renders a multi-paragraph summary as delivered by the CMS', () => {
    render(<About summary={'As a Tech Lead and engineer. \n \n I am a pragmatic builder.'} />);

    expect(screen.getByRole('heading', { level: 3, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument();
  });
});
