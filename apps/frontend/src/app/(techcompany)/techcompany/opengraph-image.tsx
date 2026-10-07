import { ImageResponse } from 'next/og';

import { getSite } from '@/content';

// The link preview (WhatsApp, LinkedIn, X): a company card drawn from the CMS,
// so a share never shows a personal photo.
export const alt = 'Software development company';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAVY = '#071c28';
const TEAL = '#09bc9c';

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
            {site.title.slice(0, 2).toUpperCase()}
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {services.map((service) => (
            <div
              key={service}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                border: '2px solid rgba(238,238,242,0.25)',
                fontSize: 24,
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
