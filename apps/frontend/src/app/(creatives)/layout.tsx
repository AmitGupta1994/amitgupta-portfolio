import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

import { getSite } from "@/content";

// Prerendered and cleared on save, like the other sites; daily fallback.
export const revalidate = 86400;

// A variable font, requested as one entry (Turbopack's dev loader rejects multi-weight requests).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite("creatives");
  const { profile } = site;
  const title = site.seo.title ?? `${site.title} | ${profile.headline}`;
  const description = site.seo.description ?? site.tagline ?? profile.headline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: profile.imageUrl, width: 460, height: 460, alt: site.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [profile.imageUrl] },
  };
}

/**
 * The marketing & branding studio is its own document, like the research site:
 * dark only, its own type and palette (scoped under data-site in globals.css),
 * and no shared portfolio chrome — no loader, theme toggle or Lenis.
 */
export default function CreativesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-site="creatives" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-brand/40">{children}</body>
    </html>
  );
}
