import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';
import { profileData } from '@/data/profile';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    matchMedia: vi.fn(() => ({ add: vi.fn(), revert: vi.fn() })),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
vi.mock('gsap/SplitText', () => ({ SplitText: {} }));

describe('Hero component', () => {
  beforeAll(() => {
    // happy-dom has no usable matchMedia; report reduced motion so effects bail.
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as unknown as typeof window.matchMedia;
  });

  it('renders the name and hero title in the page heading', () => {
    const { name, headline, contact, hero } = profileData;
    render(<Hero name={name} headline={headline} contact={contact} hero={hero} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(name);
    expect(heading).toHaveTextContent(hero.title);
  });

  it('links the primary call to action and the scroll cue', () => {
    const { name, headline, contact, hero } = profileData;
    render(<Hero name={name} headline={headline} contact={contact} hero={hero} />);

    expect(screen.getByRole('link', { name: hero.cta.label })).toHaveAttribute('href', hero.cta.href);
    expect(screen.getByRole('link', { name: /scroll to explore/i })).toHaveAttribute('href', '/#about');
  });
});
