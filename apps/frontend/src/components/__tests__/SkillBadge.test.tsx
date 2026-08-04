import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillBadge from '../SkillBadge';

describe('SkillBadge component', () => {
  it('renders skill name and numeric rating', () => {
    render(<SkillBadge name="TypeScript" rating={9} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('9/10')).toBeInTheDocument();
  });

  it('renders text rating when rating is a string', () => {
    render(<SkillBadge name="System Architecture" rating="Expert" />);
    expect(screen.getByText('System Architecture')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  it('applies learning styles when isLearning is true', () => {
    const { container } = render(<SkillBadge name="Rust" rating={6} isLearning={true} />);
    const badgeDiv = container.firstChild as HTMLElement;
    expect(badgeDiv.className).toContain('border-dashed');
  });
});
