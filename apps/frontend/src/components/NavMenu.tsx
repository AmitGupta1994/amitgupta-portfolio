"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/data/navigation";
import { profileData } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import ScrollProgress from "./ScrollProgress";
import ArrowIcon from "./ArrowIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const { cta } = profileData.hero;
const { email } = profileData.contact;

// Fixed page chrome rather than a header bar: portrait top-left, CTA + theme
// toggle top-right, email bottom-right. Section links live in the side nav on
// desktop and in the full-screen menu below lg.
export default function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  // The hero carries its own CTA, so the fixed one only slides in after it.
  const showCta = pathname !== "/" || isPastHero;

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom 60%",
      onEnter: () => setIsPastHero(true),
      onLeaveBack: () => setIsPastHero(false),
    });

    return () => trigger.kill();
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 print:hidden">
      <ScrollProgress />
      <nav
        className="flex items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-[2.5vw] lg:py-[2vw]"
        aria-label="Primary"
      >
        <Link
          href="/#hero"
          aria-label={`${profileData.name}, back to top`}
          onClick={() => setIsOpen(false)}
          className="group pointer-events-auto relative block h-12 w-12 rounded-full md:h-14 md:w-14"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-deep to-brand opacity-40 blur-sm transition duration-500 group-hover:opacity-80"
          />
          <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-brand/60 bg-background shadow-sm transition-colors group-hover:border-brand">
            <Image
              src={profileData.imageUrl}
              alt=""
              fill
              priority
              sizes="56px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-3">
          <div
            inert={!showCta}
            className={`hidden transition-[grid-template-columns,opacity] duration-500 ease-out md:grid ${
              showCta ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden p-1">
              <MagneticButton strength={0.2}>
                <Link
                  href={cta.href}
                  className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-brand-deep py-2 pl-5 pr-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-colors hover:bg-brand"
                >
                  {cta.label}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowIcon />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </div>

          <MagneticButton strength={0.25}>
            <ThemeToggle />
          </MagneticButton>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground backdrop-blur-md transition hover:border-brand hover:text-brand lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="pointer-events-auto fixed inset-0 -z-10 overflow-y-auto bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl sm:px-10 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl"
                >
                  <span className="text-sm font-bold tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="transition-colors group-hover:text-brand">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${email}`} className="mt-10 block break-all text-lg font-bold text-brand">
            {email}
          </a>
        </div>
      )}

      <a
        href={`mailto:${email}`}
        className="pointer-events-auto fixed bottom-8 right-[2.5vw] hidden text-[clamp(1rem,1.3vw,1.4rem)] font-bold leading-none text-brand transition-opacity hover:opacity-80 lg:block"
      >
        {email}
      </a>
    </header>
  );
}
