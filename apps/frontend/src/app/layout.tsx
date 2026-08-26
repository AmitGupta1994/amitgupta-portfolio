import type { Metadata } from "next";
import "./globals.css";

import { profileData } from "@/data/profile";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavMenu from "@/components/NavMenu";

export const metadata: Metadata = {
  title: `${profileData.name} | Portfolio`,
  description: `${profileData.name} - ${profileData.headline}`,
  openGraph: {
    title: `${profileData.name} | Portfolio`,
    description: `${profileData.name} - ${profileData.headline}`,
    type: "website",
    images: [
      {
        url: profileData.imageUrl,
        width: 460,
        height: 460,
        alt: profileData.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${profileData.name} | Portfolio`,
    description: `${profileData.name} - ${profileData.headline}`,
    images: [profileData.imageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
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
          <NavMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
