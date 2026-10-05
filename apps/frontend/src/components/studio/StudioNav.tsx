"use client";

import { useEffect, useState } from "react";

import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";
import { sectionHref } from "./contactLinks";
import GetStartedButton from "./GetStartedButton";
import { Icon } from "./icons";

interface StudioNavProps {
  brand: string;
  links: NavLink[];
  contact: Profile["contact"];
  ctaLabel: string;
  prompt: string;
}

/** Fixed bar: transparent over the hero, solid once scrolled; tracks the section in view. */
export default function StudioNav({ brand, links, contact, ctaLabel, prompt }: StudioNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link whose section crosses the upper third of the viewport.
  useEffect(() => {
    const ids = links.map((link) => sectionHref(link.href)).filter((href) => href.startsWith("#")).map((href) => href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  const solid = scrolled || open;
  const [first, ...rest] = brand.toUpperCase().split(" ");

  const linkClass = (href: string) =>
    `text-sm font-semibold transition-colors ${
      sectionHref(href) === `#${active}` ? "text-brand" : "text-foreground hover:text-brand"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-background/95 shadow-lg shadow-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#home" className="text-2xl font-black tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-brand">{first}</span>
          {rest.length > 0 && <span> {rest.join(" ")}</span>}
          <span className="text-brand">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} className={linkClass(link.href)}>
              {link.name}
            </a>
          ))}
          <GetStartedButton
            contact={contact}
            prompt={prompt}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            {ctaLabel}
          </GetStartedButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="text-foreground transition-colors hover:text-brand md:hidden"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 px-4 pb-6 sm:px-6 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} onClick={() => setOpen(false)} className={linkClass(link.href)}>
              {link.name}
            </a>
          ))}
          <GetStartedButton
            contact={contact}
            prompt={prompt}
            className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            {ctaLabel}
          </GetStartedButton>
        </div>
      )}
    </nav>
  );
}
