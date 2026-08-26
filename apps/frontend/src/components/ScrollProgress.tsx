"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !progressBarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] w-full bg-transparent overflow-hidden z-50 pointer-events-none">
      <div
        ref={progressBarRef}
        className="h-full w-full bg-gradient-to-r from-neutral-400 via-neutral-900 to-neutral-500 dark:from-neutral-600 dark:via-neutral-100 dark:to-neutral-400 origin-left scale-x-0 transition-transform duration-75"
      />
    </div>
  );
}
