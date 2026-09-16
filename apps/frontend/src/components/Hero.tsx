"use client";

import Link from 'next/link';
import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Profile } from '@/types/profile';
import { Project } from '@/types/project';
import MagneticButton from './MagneticButton';
import HeroMarquee from './HeroMarquee';
import ScrollCue from './ScrollCue';
import ArrowIcon from './ArrowIcon';
import { onPageLoaded } from './PageLoader';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// --- SVG Icon Components ---

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 print:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.87.33 1.72.63 2.54a2 2 0 0 1-.45 2.11L7.6 8.6a16 16 0 0 0 6.8 6.8l.23-.23a2 2 0 0 1 2.11-.45c.82.3 1.67.51 2.54.63A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16v12H4z" />
    <path d="m4 8 8 6 8-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12.04 2a9.95 9.95 0 0 0-8.56 15.2L2 22l4.9-1.28A9.950 9.950 0 1 0 12.04 2Zm0 18.11a8.16 8.16 0 0 1-4.15-1.13l-.3-.18-2.9.76.77-2.82-.2-.29A8.16 8.16 0 1 1 12.04 20.11Zm4.5-6.12c-.25-.12-1.46-.72-1.690-.8-.23-.08-.4-.12-.56.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.39.11-.51.11-.11.24-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01 0 1.19.86 2.32.98 2.48.12.16 1.7 2.59 4.12 3.63.58.25 1.03.4 1.38.51.58.19 1.110.16 1.53.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

const FreelancerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 91.38"
    className="h-5 w-5 shrink-0"
    fill="currentColor"
  >
    <path d="M72.19,0l8.37,11.74L122.88,0Zm-44,91.38L51.08,69,37.3,54.19,28.18,91.38ZM68.7,0,56.46,11l20.59.77L68.7,0ZM21.11,0l4.42,9,24.23,1.51L21.11,0Zm13,46.73L52,13.33,0,10.52,34.09,46.73Zm2.08,2.11L53.08,67,71.73,48.72l5.79-34L54.79,13.51,36.17,48.84Zm0,0Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 .5a12 12 0 0 0-3.79 23.04c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.44-4.04-1.44-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.06 1.82 2.78 1.29 3.46.99.11-.77.42-1.29.76-1.59-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.230a11.4 11.4 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 10v6" />
    <path d="M8 8.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" />
    <path d="M12 16v-3.2a2.2 2.2 0 0 1 4.4 0V16" />
  </svg>
);

const ScholarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 2 7l10 4 10-4-10-4Z" />
    <path d="M5 10v4c0 2.2 3.1 4 7 4s7-1.8 7-4v-4" />
    <path d="M5 14v4c0 2.2 3.1 4 7 4s7-1.8 7-4v-4" />
  </svg>
);

const pillClass =
  "rounded-full border border-foreground/15 bg-background/40 text-foreground backdrop-blur transition-colors hover:border-brand hover:text-brand";

type HeroProps = Omit<Profile, 'summary' | 'imageUrl'> & {
  projects: Project[];
};

export default function Hero({ name, headline, contact, hero, projects }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === "undefined" || !container) return;

    // Reduced motion: globals.css doesn't pre-hide anything, so the static hero stays.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let offLoaded = () => {};

    const ctx = gsap.context(() => {
      const titleSplit = SplitText.create(".hero-title-text", {
        type: "words,chars",
        mask: "words",
      });
      const descriptionSplit = SplitText.create(".hero-description", {
        type: "words",
        mask: "words",
      });

      // Built paused and played once the page loader lifts, so the reveal isn't
      // spent behind the curtain.
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        // Masks clip descenders at rest, so hand back the original text nodes.
        onComplete: () => {
          titleSplit.revert();
          descriptionSplit.revert();
        },
      });

      tl.from(".hero-eyebrow", { yPercent: 100, opacity: 0, duration: 0.8 }, 0)
        .from(titleSplit.chars, { yPercent: 110, duration: 1.1, stagger: 0.025 }, 0.1)
        .from(
          descriptionSplit.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.015, ease: "power3.out" },
          "-=0.8"
        )
        .from(
          ".hero-action-item",
          { y: 20, scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.04, ease: "back.out(1.7)" },
          "-=0.6"
        )
        .from(".hero-marquee", { yPercent: 15, opacity: 0, duration: 1.6, ease: "power3.out" }, 0.1)
        .from(".hero-scroll-cue", { scale: 0, rotate: -180, duration: 1.2, ease: "back.out(1.4)" }, "-=1");

      // Every tween above has already rendered its start state; lift the CSS pre-hide.
      gsap.set("[data-hero-reveal]", { visibility: "visible" });
      offLoaded = onPageLoaded(() => tl.play());

      // Scroll-out depth: copy drifts up and dims while the reels sink the other way.
      const scrollOut = {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };
      gsap.to(contentRef.current, { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: scrollOut });
      gsap.to(".hero-marquee", { y: 120, ease: "none", scrollTrigger: { ...scrollOut } });
    }, container);

    return () => {
      offLoaded();
      ctx.revert();
    };
  }, []);

  const socialItems = [
    contact.email && {
      href: `mailto:${contact.email}`,
      ariaLabel: "Email",
      icon: <MailIcon />,
      printText: contact.email,
    },
    contact.whatsapp && {
      href: contact.whatsapp,
      ariaLabel: "WhatsApp",
      icon: <WhatsAppIcon />,
      printText: `WhatsApp: ${contact.whatsapp}`,
      isExternal: true,
    },
    contact.freelancer && {
      href: contact.freelancer,
      ariaLabel: "Freelancer",
      icon: <FreelancerIcon />,
      printText: `Freelancer: ${contact.freelancer}`,
      isExternal: true,
    },
    contact.github && {
      href: contact.github,
      ariaLabel: "GitHub",
      icon: <GitHubIcon />,
      printText: `GitHub: ${contact.github}`,
      isExternal: true,
    },
    contact.linkedin && {
      href: contact.linkedin,
      ariaLabel: "LinkedIn",
      icon: <LinkedInIcon />,
      printText: `LinkedIn: ${contact.linkedin}`,
      isExternal: true,
    },
    contact.googleScholar && {
      href: contact.googleScholar,
      ariaLabel: "Google Scholar",
      icon: <ScholarIcon />,
      printText: `Google Scholar: ${contact.googleScholar}`,
      isExternal: true,
    },
  ].filter(Boolean) as Array<{
    href: string;
    ariaLabel: string;
    icon: React.ReactNode;
    printText: string;
    isExternal?: boolean;
  }>;

  // Entrance tweens run on these wrappers, never on MagneticButton itself, so the
  // entrance `y` and the magnetic `y` never fight over the same element.
  return (
    <section
      ref={containerRef}
      aria-label="Introduction"
      className="relative z-10 flex min-h-svh w-full overflow-hidden print:min-h-0"
    >
      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col justify-center gap-7 pb-20 pl-9 pr-6 pt-28 sm:pl-[52px] sm:pr-10 lg:w-[68%] lg:pl-[calc(6vw+12px)] lg:pr-12 print:px-0 print:pt-0"
      >
        <h1 data-hero-reveal className="flex flex-col gap-4">
          <span className="hero-eyebrow block text-sm font-bold uppercase tracking-[0.4em] text-brand sm:text-base">
            {name}
          </span>
          <span className="hero-title-text block text-[clamp(3rem,8.5vw,8.5rem)] font-black uppercase leading-[0.88] tracking-[-0.02em] text-foreground print:text-4xl">
            {hero.title}
          </span>
        </h1>

        <p
          data-hero-reveal
          className="hero-description max-w-2xl text-[clamp(1.125rem,1.7vw,1.75rem)] font-medium leading-snug text-muted"
        >
          {hero.description.map((segment, index) =>
            segment.highlight ? (
              <span key={index} className="font-bold text-brand">
                {segment.text}
              </span>
            ) : (
              <Fragment key={index}>{segment.text}</Fragment>
            )
          )}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div data-hero-reveal className="hero-action-item flex">
            <MagneticButton strength={0.2}>
              <Link
                href={hero.cta.href}
                className="group inline-flex items-center gap-4 rounded-full bg-brand-deep py-2.5 pl-7 pr-2.5 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-black/20 transition-colors hover:bg-brand sm:text-lg print:hidden"
              >
                {hero.cta.label}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowIcon className="h-5 w-5" />
                </span>
              </Link>
            </MagneticButton>
          </div>

          <div data-hero-reveal className="hero-action-item flex">
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={() => window.print()}
                className={`${pillClass} cursor-pointer px-6 py-3.5 text-sm font-bold uppercase tracking-wide print:hidden`}
              >
                Save as PDF
              </button>
            </MagneticButton>
          </div>
        </div>

        <p
          data-hero-reveal
          className="hero-action-item flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted"
        >
          <span aria-hidden="true" className="h-px w-10 bg-brand" />
          {headline}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          {contact.location && (
            <div data-hero-reveal className="hero-action-item">
              <span className={`${pillClass} flex items-center gap-2 px-4 py-2 hover:border-foreground/15 hover:text-foreground`}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                {contact.location}
              </span>
            </div>
          )}

          {contact.phone && (
            <div data-hero-reveal className="hero-action-item flex">
              <MagneticButton>
                <a
                  href={`tel:${contact.phone}`}
                  className={`${pillClass} print-link inline-flex items-center gap-2 px-4 py-2 print:inline print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0`}
                >
                  <PhoneIcon />
                  <span className="print:inline print:text-black print:underline print:underline-offset-2">
                    {contact.phone}
                  </span>
                </a>
              </MagneticButton>
            </div>
          )}

          {socialItems.map((item) => (
            <div key={item.ariaLabel} data-hero-reveal className="hero-action-item flex">
              <MagneticButton>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noreferrer" : undefined}
                  className={`${pillClass} print-link inline-flex h-10 w-10 items-center justify-center overflow-hidden print:inline-block print:h-auto print:w-auto print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0`}
                >
                  <span className="print:hidden">{item.icon}</span>
                  <span className="hidden break-all print:inline print:text-black print:underline print:underline-offset-2">
                    {item.printText}
                  </span>
                </a>
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>

      <div
        data-hero-reveal
        className="absolute bottom-10 right-[calc(32%+3rem)] z-10 hidden lg:block print:hidden"
      >
        <div className="hero-scroll-cue">
          <ScrollCue href="/#about" />
        </div>
      </div>

      <HeroMarquee projects={projects} />
    </section>
  );
}
