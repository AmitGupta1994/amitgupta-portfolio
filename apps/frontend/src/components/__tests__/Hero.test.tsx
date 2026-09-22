import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    matchMedia: vi.fn(() => ({ add: vi.fn(), revert: vi.fn() })),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
vi.mock('gsap/SplitText', () => ({ SplitText: {} }));

const props = {
  name: 'Amit Gupta',
  headline: 'Lead Engineer | Full Stack Engineer (Backend-Focused)',
  contact: { email: 'jamitgupta1994@gmail.com', phone: '(+977) 9843944663' },
  hero: {
    title: 'Engineering systems that scale',
    description: [
      { text: 'Lead engineer building ' },
      { text: 'resilient backends', highlight: true },
    ],
    cta: { label: "Let's build together", href: '/#contact' },
  },
  projects: [],
};

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
    render(<Hero {...props} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(props.name);
    expect(heading).toHaveTextContent(props.hero.title);
  });

  it('links the primary call to action and the scroll cue', () => {
    render(<Hero {...props} />);

    expect(screen.getByRole('link', { name: props.hero.cta.label })).toHaveAttribute('href', props.hero.cta.href);
    expect(screen.getByRole('link', { name: /scroll to explore/i })).toHaveAttribute('href', '/#about');
  });
});
