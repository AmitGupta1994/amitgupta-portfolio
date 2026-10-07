import { ImageResponse } from 'next/og';

import { getSite } from '@/content';

// The link preview (WhatsApp, LinkedIn, X): a company card drawn from the CMS,
// so a share never shows a personal photo.
export const alt = 'Software development company';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAVY = '#071c28';
const TEAL = '#09bc9c';

/** "TechCompany" → "TC", "Acme Labs" → "AL": capitals first, else word initials. */
function monogram(name: string) {
  const capitals = name.match(/[A-Z]/g) ?? [];
  const letters = capitals.length >= 2 ? capitals : name.split(/\s+/).map((word) => word.charAt(0));
  return letters.slice(0, 2).join('').toUpperCase();
}

export default async function OpenGraphImage() {
  const site = await getSite('techcompany');
  const services = ['Web apps', 'Mobile apps', 'AI integration', 'AI systems', 'Architecture', 'DevOps'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: `radial-gradient(circle at 100% 0%, #006a6a 0%, ${NAVY} 55%)`,
          color: '#eeeef2',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              border: `5px solid ${TEAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            {monogram(site.title)}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', color: TEAL }}>
            {site.title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: -2 }}>
            {site.profile.hero.title || site.profile.headline}
          </div>
          <div style={{ fontSize: 30, color: '#9fb3bb' }}>{site.tagline ?? site.profile.headline}</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {services.map((service) => (
            <div
              key={service}
              style={{
                display: 'flex',
                padding: '8px 18px',
                borderRadius: 999,
                border: '2px solid rgba(238,238,242,0.25)',
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
