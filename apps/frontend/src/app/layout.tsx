import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amit Gupta",
  description: "Lead Engineer | AI | Full Stack  (Backend-Focused) | Mobile",
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
