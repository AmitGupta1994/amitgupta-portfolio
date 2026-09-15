import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { profileData } from "@/data/profile";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavMenu from "@/components/NavMenu";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

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
          <PageLoader name={profileData.name} />
          <SmoothScroll />
          <NavMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
