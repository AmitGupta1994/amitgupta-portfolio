"use client";

import React from "react";

export interface SectionItem {
  id: string;
  label: string;
}

interface SectionPaginationProps {
  sections: SectionItem[];
  activeIndex: number;
  onSelectSection: (index: number) => void;
}

export default function SectionPagination({
  sections,
  activeIndex,
  onSelectSection,
}: SectionPaginationProps) {
  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 print:hidden"
    >
      {sections.map((section, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(idx)}
            aria-label={`Go to ${section.label} section`}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
          >
            {/* Tooltip Label */}
            <span className="pointer-events-none absolute right-8 rounded-md bg-neutral-900 dark:bg-neutral-100 px-2 py-1 text-[11px] font-medium text-white dark:text-neutral-900 opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap shadow-sm">
              {section.label}
            </span>

            {/* Dot Indicator */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3.5 w-3.5 bg-neutral-900 dark:bg-neutral-100 shadow-xs ring-2 ring-neutral-400 dark:ring-neutral-600 ring-offset-2 ring-offset-neutral-50 dark:ring-offset-neutral-950"
                  : "h-2 w-2 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-500 dark:group-hover:bg-neutral-400 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
