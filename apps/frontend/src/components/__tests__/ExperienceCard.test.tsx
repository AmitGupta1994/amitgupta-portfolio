import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceCard from '../ExperienceCard';

describe('ExperienceCard component', () => {
  it('renders role, company, date, and description', () => {
    render(
      <ExperienceCard
        role="Lead Engineer"
        company="Tech Corp"
        date="2022 - Present"
        description="Architected scalable cloud backend systems and led a team of developers."
      />
    );

    expect(screen.getByText('Lead Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2022 - Present')).toBeInTheDocument();
    expect(
      screen.getByText('Architected scalable cloud backend systems and led a team of developers.')
    ).toBeInTheDocument();
  });
});