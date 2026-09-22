"use client";

import React, { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "@/types/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DigitalMantrasSideNavProps {
  links: NavLink[];
}

// Fixed bottom-left section index: a dot per section, with the active section's
// label expanded. Clicks are plain hash links that SmoothScroll glides to.
export default function DigitalMantrasSideNav({ links }: DigitalMantrasSideNavProps) {
  const sections = useMemo(
    () => links.map((link) => ({ ...link, id: link.href.split("#")[1] })),
    [links]
  );
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveId(id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-8 left-6 z-40 hidden flex-col items-start gap-3 lg:flex print:hidden"
    >
      {sections.map(({ id, name, href }) => {
        const isActive = id === activeId;
        return (
          <a
            key={href}
            href={href}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2.5 text-foreground outline-none"
          >
            <span
              aria-hidden="true"
              className={`block h-2.5 w-2.5 shrink-0 rounded-full bg-brand transition-all duration-300 ${
                isActive
                  ? "scale-125 shadow-[0_0_0_4px] shadow-brand/25"
                  : "scale-75 opacity-60 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
              }`}
            />
            {/* 0fr → 1fr grid track animates the label open without measuring it. */}
            <span
              className={`grid transition-[grid-template-columns,opacity] duration-500 ease-out ${
                isActive
                  ? "grid-cols-[1fr] opacity-100"
                  : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100 group-focus-visible:grid-cols-[1fr] group-focus-visible:opacity-100"
              }`}
            >
              <span className="overflow-hidden whitespace-nowrap text-[clamp(1rem,1.3vw,1.4rem)] font-bold uppercase leading-none tracking-tight">
                {name}
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
