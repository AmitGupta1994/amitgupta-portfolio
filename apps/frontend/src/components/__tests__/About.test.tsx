import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';
import { profileData } from '@/data/profile';

describe('About component', () => {
  it('renders section title and summary HTML content correctly', () => {
    const summaryText = 'Full Stack Engineer with <strong>7 years</strong> of experience.';
    render(<About summary={summaryText} />);
    
    expect(screen.getByRole('heading', { level: 3, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Engineer with/i)).toBeInTheDocument();
    expect(screen.getByText('7 years')).toBeInTheDocument();
  });

  it('renders actual profile summary from profileData', () => {
    render(<About summary={profileData.summary} />);
    
    expect(screen.getByRole('heading', { level: 3, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument();
  });
});
