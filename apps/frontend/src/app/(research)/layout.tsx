import type { Metadata } from "next";
import { Crimson_Text, Hanken_Grotesk } from "next/font/google";
import "../globals.css";

import { getProfile, getSitePage } from "@/content";

// Prerendered and cleared on save, like the other sites; daily fallback.
export const revalidate = 86400;

// Its own type pairing: a variable sans for structure (200–800 all available from
// one file), and a serif for the italic accents. Both are requested as single
// entries — Turbopack's dev font loader rejects multi-weight/style requests.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-crimson",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [profile, site] = await Promise.all([getProfile(), getSitePage("research")]);
  const title = site.seo.title ?? `${profile.name} | ${site.title}`;
  const description = site.seo.description ?? site.tagline ?? `Research work by ${profile.name}`;

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

/**
 * The research site is deliberately its own document: light only, no theme
 * toggle, no loader, no smooth-scroll hijacking — an academic page that prints
 * and reads plainly. It shares no chrome with the main portfolio.
 */
export default function ResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-site="research"
      className={`${hanken.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
