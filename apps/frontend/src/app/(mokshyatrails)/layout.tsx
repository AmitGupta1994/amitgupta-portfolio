import type { Metadata } from "next";
import "../globals.css";

import SiteShell from "@/components/SiteShell";
import { loadMokshyaTrails } from "./_content";

// Same caching model as the other sites: prerendered, cleared on save, daily fallback.
export const revalidate = 86400;

// Link previews use the first hero slide (a landscape), never a personal photo;
// trek pages override it with their own picture.
export async function generateMetadata(): Promise<Metadata> {
  const { site } = await loadMokshyaTrails();
  const title = site.seo.title ?? `${site.title} | ${site.profile.headline}`;
  const description = site.seo.description ?? site.tagline ?? site.profile.headline;
  const image = site.slides[0]?.imageUrl ?? site.profile.imageUrl;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: site.title, images: [{ url: image, alt: site.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** The trekking company wears the trek site's Digital Mantras chrome, with its own logo and menu. */
export default async function MokshyaTrailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    site: { profile },
    navLinks,
  } = await loadMokshyaTrails();

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
