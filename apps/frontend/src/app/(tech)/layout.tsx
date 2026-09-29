import type { Metadata } from "next";
import "../globals.css";

import { getNavLinks, getProfile } from "@/content";
import SiteShell from "@/components/SiteShell";

// Pages are prerendered and served from the CDN; saving in the admin drops that
// cache (src/cms/payload/hooks/revalidateSite.ts), so this daily refresh is only a
// safety net. Kept long on purpose: each scheduled regeneration wakes Neon's compute
// for its idle window, which is what burns the free compute-hours budget.
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `${profile.name} | Portfolio`;
  const description = `${profile.name} - ${profile.headline}`;

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

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, navLinks] = await Promise.all([getProfile(), getNavLinks()]);

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
