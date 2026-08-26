"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import ScrollProgress from "./ScrollProgress";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-neutral-50/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80 print:hidden transition-colors duration-300">
      <ScrollProgress />
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5"
        aria-label="Primary"
      >
        <MagneticButton strength={0.2}>
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Amit Gupta
          </Link>
        </MagneticButton>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-2 border-l border-neutral-200 pl-4 dark:border-neutral-800">
            <MagneticButton strength={0.25}>
              <ThemeToggle />
            </MagneticButton>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
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
        <div className="border-t border-neutral-200/80 bg-neutral-50/95 px-6 py-4 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-950/95 md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
