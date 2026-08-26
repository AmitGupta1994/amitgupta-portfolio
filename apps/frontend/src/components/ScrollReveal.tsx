"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  id?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 30,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  className = "",
  id,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        y = distance;
        break;
      case "down":
        y = -distance;
        break;
      case "left":
        x = distance;
        break;
      case "right":
        x = -distance;
        break;
      case "none":
        break;
    }

    const ctx = gsap.context(() => {
      const targets =
        elementRef.current?.children.length && stagger > 0
          ? Array.from(elementRef.current.children)
          : elementRef.current;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger]);

  return (
    <div id={id} ref={elementRef} className={className}>
      {children}
    </div>
  );
}
