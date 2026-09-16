"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ReelColumn({
  items,
  columnRef,
  prefix,
}: {
  items: Project[];
  columnRef: React.RefObject<HTMLDivElement | null>;
  prefix: string;
}) {
  return (
    <div className="h-full flex-1">
      {/* Items use margin rather than flex gap so the doubled list is exactly twice
          one set, keeping the -50% loop seamless. */}
      <div ref={columnRef} className="flex flex-col will-change-transform">
        {items.map((project, idx) => (
          <div
            key={`${prefix}-${idx}`}
            className="relative mb-4 aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-foreground/10"
          >
            <Image src={project.imageUrl} alt="" fill sizes="16vw" className="object-cover" />
            <div className="absolute inset-0 bg-background/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface HeroMarqueeProps {
  projects: Project[];
}

export default function HeroMarquee({ projects }: HeroMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // CMS projects may have no image; next/image can't render an empty src.
  const withImages = projects.filter((project) => project.imageUrl);

  // Each column shows every project so one set is taller than the viewport; the list
  // is doubled so a -50% loop is seamless.
  const column1Images = [...withImages, ...withImages];
  const column2Images = [...[...withImages].reverse(), ...[...withImages].reverse()];

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
        gsap.to(col1, { yPercent: -50, duration: 40, ease: "none", repeat: -1 }),
        gsap.fromTo(
          col2,
          { yPercent: -50 },
          { yPercent: 0, duration: 44, ease: "none", repeat: -1 }
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
      aria-hidden="true"
      className="hero-marquee pointer-events-none absolute inset-y-0 right-0 hidden w-[32%] select-none gap-4 pr-[2.5vw] lg:flex print:hidden"
    >
      {/* Top & bottom fades melt the reels into the page ground. */}
      <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      <ReelColumn items={column1Images} columnRef={col1Ref} prefix="col1" />
      <ReelColumn items={column2Images} columnRef={col2Ref} prefix="col2" />
    </div>
  );
}
