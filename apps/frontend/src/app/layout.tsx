import type { Metadata } from "next";
import "./globals.css";

import { getProfile } from "@/data/profile";
import { getNavLinks } from "@/data/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavMenu from "@/components/NavMenu";

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
  const navLinks = await getNavLinks();

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
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
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <NavMenu links={navLinks} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
