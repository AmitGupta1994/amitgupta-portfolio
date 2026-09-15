"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const glowClass =
  "absolute h-[50vw] w-[90vw] rounded-full bg-[radial-gradient(circle_at_100%_0,var(--glow-from),var(--glow-to))] blur-[10vw] will-change-transform";

// Two fixed, heavily blurred radial glows (top-right, bottom-left) that drift
// slowly against the scroll.
export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const scrub = {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
      };

      gsap.to(orb1Ref.current, {
        y: 160,
        x: -80,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { ...scrub, scrub: 1.2 },
      });
      gsap.to(orb2Ref.current, {
        y: -180,
        x: 100,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { ...scrub, scrub: 1.5 },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden"
    >
      <div ref={orb1Ref} className={`${glowClass} -right-[19vw] -top-[16vw]`} />
      <div ref={orb2Ref} className={`${glowClass} -bottom-[12vw] -left-[47vw]`} />
    </div>
  );
}
