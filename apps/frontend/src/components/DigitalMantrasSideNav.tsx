"use client";

import React, { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "articles", label: "Articles" },
  { id: "contact", label: "Contact" },
];

export default function DigitalMantrasSideNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const elem = document.getElementById(NAV_ITEMS[i].id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Digital Mantras Side Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 print:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            aria-label={`Navigate to ${item.label} section`}
            className="group relative flex items-center justify-end focus:outline-none cursor-pointer"
          >
            {/* Label Pill */}
            <span
              className={`mr-3 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 opacity-100 translate-x-0 shadow-sm"
                  : "bg-neutral-200/80 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {item.label}
            </span>

            {/* Circular Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3.5 w-3.5 bg-neutral-900 dark:bg-neutral-100 ring-4 ring-neutral-300/60 dark:ring-neutral-700/60"
                  : "h-2.5 w-2.5 bg-neutral-400 dark:bg-neutral-600 group-hover:bg-neutral-800 dark:group-hover:bg-neutral-200 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
