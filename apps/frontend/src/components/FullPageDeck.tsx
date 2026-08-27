"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import SectionPagination, { SectionItem } from "./SectionPagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, Observer);
}

const SECTIONS: SectionItem[] = [
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

interface FullPageDeckProps {
  children: React.ReactNode;
}

export default function FullPageDeck({ children }: FullPageDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;

    const targetSection = document.getElementById(SECTIONS[index].id);
    if (!targetSection) return;

    isAnimatingRef.current = true;
    setActiveIndex(index);

    gsap.to(window, {
      scrollTo: { y: targetSection, offsetY: 70 },
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 100);
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let observerInstance: Observer | null = null;

    // Use GSAP Observer for Wheel and Touch Swipe handling
    observerInstance = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 15,
      preventDefault: false,
      onUp: () => {
        if (isAnimatingRef.current) return;
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, SECTIONS.length - 1);
          if (next !== prev) scrollToSection(next);
          return prev;
        });
      },
      onDown: () => {
        if (isAnimatingRef.current) return;
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) scrollToSection(next);
          return prev;
        });
      },
    });

    // Keyboard Arrow navigation handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (["input", "textarea"].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, SECTIONS.length - 1);
          if (next !== prev) scrollToSection(next);
          return prev;
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) scrollToSection(next);
          return prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (observerInstance) observerInstance.kill();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollToSection]);

  // Sync activeIndex on native scroll / intersection fallback
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isAnimatingRef.current) return;

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <SectionPagination
        sections={SECTIONS}
        activeIndex={activeIndex}
        onSelectSection={scrollToSection}
      />
      {children}
    </div>
  );
}
