import { describe, it, expect } from 'vitest';
import { profileData } from '../profile';

describe('profileData', () => {
  it('contains valid basic profile details', () => {
    expect(profileData.name).toBe('Amit Gupta');
    expect(profileData.headline).toContain('Lead Engineer');
    expect(profileData.imageUrl).toMatch(/^https?:\/\//);
  });

  it('contains essential contact links', () => {
    expect(profileData.contact.email).toContain('@');
    expect(profileData.contact.linkedin).toContain('linkedin.com');
    expect(profileData.contact.github).toContain('github.com');
    expect(profileData.contact.googleScholar).toContain('scholar.google.com');
  });

  it('has a comprehensive professional summary with years of experience', () => {
    expect(profileData.summary.length).toBeGreaterThan(50);
    expect(profileData.summary).toContain('Tech Lead');
    expect(profileData.summary).toMatch(/\b7\+?\s*years\b/i);
  });
});
