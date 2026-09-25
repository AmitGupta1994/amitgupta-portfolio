import type { Metadata } from "next";
import "../globals.css";

import { getProfile, getSitePage } from "@/content";
import SiteShell from "@/components/SiteShell";

// Same caching model as the other sites: prerendered, cleared on save, daily fallback.
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [profile, site] = await Promise.all([getProfile(), getSitePage("trek")]);
  const title = site.seo.title ?? `${profile.name} | ${site.title}`;
  const description = site.seo.description ?? site.tagline ?? `Trekking journal of ${profile.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: profile.imageUrl, width: 460, height: 460, alt: profile.name }],
    },
    twitter: { card: "summary", title, description, images: [profile.imageUrl] },
  };
}

export default async function TrekLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, site] = await Promise.all([getProfile(), getSitePage("trek")]);

  return (
    <SiteShell
      navLinks={site.navLinks}
      name={profile.name}
      imageUrl={profile.imageUrl}
      email={profile.contact.email}
      cta={profile.hero.cta}
    >
      {children}
    </SiteShell>
  );
}
