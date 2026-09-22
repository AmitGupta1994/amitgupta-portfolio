import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DigitalMantrasSideNav from '../DigitalMantrasSideNav';

const navLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn() },
}));

describe('DigitalMantrasSideNav', () => {
  it('renders a link for every navigation item', () => {
    render(<DigitalMantrasSideNav links={navLinks} />);

    navLinks.forEach((link) => {
      expect(screen.getByRole('link', { name: link.name })).toHaveAttribute('href', link.href);
    });
  });

  it('marks the first section as current before any scrolling', () => {
    render(<DigitalMantrasSideNav links={navLinks} />);

    expect(screen.getByRole('link', { name: navLinks[0].name })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: navLinks[1].name })).not.toHaveAttribute('aria-current');
  });
});
