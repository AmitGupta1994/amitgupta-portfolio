import type { Metadata } from "next";
import "../globals.css";

import { getProfile, getResearchPage } from "@/content";
import SiteShell from "@/components/SiteShell";

// Same caching model as the main site: prerendered, cleared on save, daily fallback.
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [profile, research] = await Promise.all([getProfile(), getResearchPage()]);
  const title = research.seo.title ?? `${profile.name} | ${research.title}`;
  const description =
    research.seo.description ?? research.tagline ?? `Research work by ${profile.name}`;

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

export default async function ResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, research] = await Promise.all([getProfile(), getResearchPage()]);

  return (
    <SiteShell
      navLinks={research.navLinks}
      name={profile.name}
      imageUrl={profile.imageUrl}
      email={profile.contact.email}
      cta={profile.hero.cta}
    >
      {children}
    </SiteShell>
  );
}
