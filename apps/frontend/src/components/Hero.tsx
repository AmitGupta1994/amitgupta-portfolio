"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Profile } from '@/types/profile';
import MagneticButton from './MagneticButton';

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
    <path d="M12.04 2a9.95 9.95 0 0 0-8.56 15.2L2 22l4.9-1.28A9.95 9.95 0 1 0 12.04 2Zm0 18.11a8.16 8.16 0 0 1-4.15-1.13l-.3-.18-2.9.76.77-2.82-.2-.29A8.16 8.16 0 1 1 12.04 20.11Zm4.5-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.56.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.39.11-.51.11-.11.24-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01 0 1.19.86 2.32.98 2.48.12.16 1.7 2.59 4.12 3.63.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

const FreelancerIcon = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
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
    <path d="M12 .5a12 12 0 0 0-3.79 23.04c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.44-4.04-1.44-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.06 1.82 2.78 1.29 3.46.99.11-.77.42-1.29.76-1.59-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
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

// --- Component ---

type HeroProps = Omit<Profile, 'summary'>;

export default function Hero({ name, headline, imageUrl, contact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(avatarRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.9,
      })
      .from(".hero-title-text", {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(".hero-headline-text", {
        y: 25,
        opacity: 0,
        duration: 0.7,
      }, "-=0.5")
      .from(".hero-action-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
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

  return (
    <section ref={containerRef} className="flex flex-col items-start gap-6 max-w-3xl pt-4 relative z-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div ref={avatarRef} className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neutral-300 to-neutral-500 opacity-30 blur-sm group-hover:opacity-60 transition duration-500 dark:from-neutral-700 dark:to-neutral-500" />
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:h-28 md:w-28">
            <Image
              src={imageUrl}
              alt={`${name} portrait`}
              fill
              priority
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="hero-title-text text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {name}
          </h1>
          <h2 className="hero-headline-text text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {headline}
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-2">
        <MagneticButton className="hero-action-item">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 print:hidden cursor-pointer"
          >
            Save as PDF
          </button>
        </MagneticButton>

        {contact.location && (
          <div className="hero-action-item">
            <span className="flex items-center gap-1.5 border border-neutral-200 rounded-full px-4 py-1.5 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {contact.location}
            </span>
          </div>
        )}

        {contact.phone && (
          <MagneticButton className="hero-action-item">
            <a
              href={`tel:${contact.phone}`}
              className="print-link inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 print:inline print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0"
            >
              <PhoneIcon />
              <span className="print:inline print:text-black print:underline print:underline-offset-2">
                {contact.phone}
              </span>
            </a>
          </MagneticButton>
        )}

        {socialItems.map((item) => (
          <MagneticButton key={item.ariaLabel} className="hero-action-item">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noreferrer" : undefined}
              className="print-link inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 print:inline-block print:h-auto print:w-auto print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0"
            >
              <span className="print:hidden">
                {item.icon}
              </span>
              <span className="hidden print:inline break-all print:text-black print:underline print:underline-offset-2">
                {item.printText}
              </span>
            </a>
          </MagneticButton>
        ))}
      </div>
    </section>
  );
}
