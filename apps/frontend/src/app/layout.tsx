import type { Metadata } from "next";
import "./globals.css";

import { profileData } from "@/data/profile";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* <NavMenu /> */}
        {children}
      </body>
    </html>
  );
}
