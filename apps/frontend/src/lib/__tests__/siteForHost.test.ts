import { describe, expect, it } from 'vitest';
import { siteForHost } from '../siteForHost';

describe('siteForHost', () => {
  it('routes production subdomains', () => {
    expect(siteForHost('research.guptaamit.com.np')).toBe('/research');
    expect(siteForHost('trek.guptaamit.com.np')).toBe('/trek');
  });

  it('routes staging hosts to the same site', () => {
    expect(siteForHost('staging.research.guptaamit.com.np')).toBe('/research');
    expect(siteForHost('research-staging.guptaamit.com.np')).toBe('/research');
    expect(siteForHost('staging-trek.guptaamit.com.np')).toBe('/trek');
    expect(siteForHost('preview.trek.guptaamit.com.np')).toBe('/trek');
  });

  it('ignores the port', () => {
    expect(siteForHost('research.localtest.me:3000')).toBe('/research');
  });

  it('leaves the main portfolio and unknown hosts alone', () => {
    expect(siteForHost('guptaamit.com.np')).toBeUndefined();
    expect(siteForHost('www.guptaamit.com.np')).toBeUndefined();
    expect(siteForHost('tech.guptaamit.com.np')).toBeUndefined();
    expect(siteForHost('portfolio-git-staging-amit.vercel.app')).toBeUndefined();
    expect(siteForHost('localhost:3000')).toBeUndefined();
    expect(siteForHost(null)).toBeUndefined();
  });
});
