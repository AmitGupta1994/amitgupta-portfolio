import { describe, it, expect } from 'vitest';
import { navLinks } from '../navigation';

describe('navLinks', () => {
  it('defines the expected navigation links', () => {
    expect(Array.isArray(navLinks)).toBe(true);
    expect(navLinks.length).toBeGreaterThan(0);
    
    const names = navLinks.map(link => link.name);
    expect(names).toContain('Home');
    expect(names).toContain('Projects');
    expect(names).toContain('Skills');
    expect(names).toContain('Contact');
  });

  it('has non-empty hrefs for every navigation item', () => {
    navLinks.forEach(link => {
      expect(link.name.length).toBeGreaterThan(0);
      expect(typeof link.href).toBe('string');
    });
  });
});
