"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // Duplicate items for continuous infinite marquee loop
  const column1Images = [...projects.slice(0, 3), ...projects.slice(0, 3)];
  const column2Images = [...projects.slice(3, 6), ...projects.slice(3, 6)];

  useEffect(() => {
    const root = rootRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (typeof window === "undefined" || !root || !col1 || !col2) return;

    // The marquee is only displayed at lg+, so only run the loops there; matchMedia
    // also starts/stops them when the viewport crosses the breakpoint.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const loops = [
        gsap.to(col1, { yPercent: -50, duration: 25, ease: "none", repeat: -1 }),
        gsap.fromTo(
          col2,
          { yPercent: -50 },
          { yPercent: 0, duration: 28, ease: "none", repeat: -1 }
        ),
      ];

      const speed = { value: 1 };
      const applySpeed = () => loops.forEach((loop) => loop.timeScale(speed.value));

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        // Don't spend frames on reels nobody can see.
        onToggle: (self) =>
          loops.forEach((loop) => (self.isActive ? loop.resume() : loop.pause())),
        // Scrolling kicks the reels faster, then they coast back to cruising speed.
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 300);
          gsap.to(speed, {
            value: boost,
            duration: 0.2,
            overwrite: true,
            onUpdate: applySpeed,
            onComplete: () => {
              gsap.to(speed, { value: 1, duration: 1.2, ease: "power2.out", onUpdate: applySpeed });
            },
          });
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      data-hero-reveal
      className="hero-marquee relative hidden lg:flex gap-4 h-[420px] overflow-hidden rounded-3xl p-2 pointer-events-none select-none"
    >
      {/* Top & Bottom Soft Fade Gradients */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent z-10" />

      {/* Column 1 - Upwards Marquee. Items use margin rather than flex gap so the
          doubled list is exactly twice one set, keeping the -50% loop seamless. */}
      <div className="w-36">
        <div ref={col1Ref} className="flex flex-col">
          {column1Images.map((project, idx) => (
            <div
              key={`col1-${idx}`}
              className="relative mb-4 h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
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
      <div className="w-36">
        <div ref={col2Ref} className="flex flex-col">
          {column2Images.map((project, idx) => (
            <div
              key={`col2-${idx}`}
              className="relative mb-4 h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
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
