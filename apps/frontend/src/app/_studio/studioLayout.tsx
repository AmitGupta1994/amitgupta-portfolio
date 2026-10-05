import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { getSite } from '@/content';
import type { SiteKey } from '@/types/sites';

// A variable font, requested as one entry (Turbopack's dev loader rejects multi-weight requests).
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export async function studioMetadata(key: SiteKey): Promise<Metadata> {
  const site = await getSite(key);
  const { profile } = site;
  const title = site.seo.title ?? `${site.title} | ${profile.headline}`;
  const description = site.seo.description ?? site.tagline ?? profile.headline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: site.title,
      images: [{ url: profile.imageUrl, width: 460, height: 460, alt: site.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [profile.imageUrl] },
  };
}

/**
 * A studio site is its own document, like the research site: dark only, its own
 * type and palette (scoped under data-site in globals.css), and no shared
 * portfolio chrome — no loader, theme toggle or Lenis.
 */
export function StudioDocument({ site, children }: { site: SiteKey; children: React.ReactNode }) {
  return (
    <html lang="en" data-site={site} className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-brand/40">{children}</body>
    </html>
  );
}
