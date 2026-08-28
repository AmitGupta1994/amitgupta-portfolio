"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { projects } from "@/data/projects";

export default function HeroMarquee() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // Duplicate items for continuous infinite marquee loop
  const column1Images = [...projects.slice(0, 3), ...projects.slice(0, 3)];
  const column2Images = [...projects.slice(3, 6), ...projects.slice(3, 6)];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Column 1 infinite scroll up
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          yPercent: -50,
          repeat: -1,
          duration: 25,
          ease: "none",
        });
      }

      // Column 2 infinite scroll down
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { yPercent: -50 },
          {
            yPercent: 0,
            repeat: -1,
            duration: 28,
            ease: "none",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative hidden lg:flex gap-4 h-[420px] overflow-hidden rounded-3xl p-2 pointer-events-none select-none">
      {/* Top & Bottom Soft Fade Gradients */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent z-10" />

      {/* Column 1 - Upwards Marquee */}
      <div className="w-36 flex flex-col gap-4">
        <div ref={col1Ref} className="flex flex-col gap-4">
          {column1Images.map((project, idx) => (
            <div
              key={`col1-${idx}`}
              className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="144px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Column 2 - Downwards Marquee */}
      <div className="w-36 flex flex-col gap-4">
        <div ref={col2Ref} className="flex flex-col gap-4">
          {column2Images.map((project, idx) => (
            <div
              key={`col2-${idx}`}
              className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="144px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
