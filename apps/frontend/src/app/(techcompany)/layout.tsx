import type { Metadata } from "next";
import "../globals.css";

import { getSite } from "@/content";
import SiteShell from "@/components/SiteShell";

// Same caching model as the other sites: prerendered, cleared on save, daily fallback.
export const revalidate = 86400;

// Share images come from techcompany/opengraph-image.tsx (the company card), not
// the global's image, so links never preview with a personal photo.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite("techcompany");
  const title = site.seo.title ?? `${site.title} | ${site.profile.headline}`;
  const description = site.seo.description ?? site.tagline ?? site.profile.headline;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: site.title },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * The software company wears the tech portfolio's Digital Mantras chrome — loader,
 * logo nav, theme toggle, smooth scroll — with its own navigation and logo.
 */
export default async function TechCompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, navLinks } = await getSite("techcompany");

  return (
    <SiteShell
      navLinks={navLinks}
      name={profile.name}
      imageUrl={profile.imageUrl}
      email={profile.contact.email}
      cta={profile.hero.cta}
    >
      {children}
    </SiteShell>
  );
}
