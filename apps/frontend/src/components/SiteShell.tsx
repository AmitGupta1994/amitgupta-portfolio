import { Outfit } from "next/font/google";
import type { NavLink } from "@/types/navigation";
import type { HeroCopy } from "@/types/profile";
import { ThemeProvider } from "./ThemeProvider";
import NavMenu from "./NavMenu";
import PageLoader from "./PageLoader";
import SmoothScroll from "./SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

interface SiteShellProps {
  navLinks: NavLink[];
  name: string;
  imageUrl: string;
  email: string;
  cta: HeroCopy["cta"];
  children: React.ReactNode;
}

/**
 * The document shell every site shares: fonts, the pre-paint theme script,
 * smooth scrolling, the intro loader and the fixed chrome. Each site supplies
 * its own navigation, so they stay visually independent.
 */
export default function SiteShell({ navLinks, name, imageUrl, email, cta, children }: SiteShellProps) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      {/* App Router document shell: <head> is correct here. The lint rule targets
          next/head, which is Pages Router only. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
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
          <PageLoader name={name} />
          <SmoothScroll />
          <NavMenu links={navLinks} name={name} imageUrl={imageUrl} email={email} cta={cta} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
