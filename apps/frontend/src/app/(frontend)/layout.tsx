import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

import { getNavLinks, getProfile } from '@/content';
import { ThemeProvider } from "@/components/ThemeProvider";
import NavMenu from "@/components/NavMenu";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

// Pages are prerendered and served from the CDN; saving in the admin drops that
// cache (src/cms/payload/hooks/revalidateSite.ts), so this daily refresh is only a
// safety net. Kept long on purpose: each scheduled regeneration wakes Neon's compute
// for its idle window, which is what burns the free compute-hours budget.
export const revalidate = 86400;

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

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
      images: [
        {
          url: profile.imageUrl,
          width: 460,
          height: 460,
          alt: profile.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [profile.imageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, navLinks] = await Promise.all([getProfile(), getNavLinks()]);

  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('js');
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <PageLoader name={profile.name} />
          <SmoothScroll />
          <NavMenu
            links={navLinks}
            name={profile.name}
            imageUrl={profile.imageUrl}
            email={profile.contact.email}
            cta={profile.hero.cta}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
