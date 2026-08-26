"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Max tilt degrees (default 6)
  spotlight?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxRotation = 6,
  spotlight = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;

    const rotateXTo = gsap.quickTo(card, "rotateX", {
      duration: 0.5,
      ease: "power2.out",
    });
    const rotateYTo = gsap.quickTo(card, "rotateY", {
      duration: 0.5,
      ease: "power2.out",
    });
    const scaleTo = gsap.quickTo(card, "scale", {
      duration: 0.4,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxRotation;
      const rotateX = -((y - centerY) / centerY) * maxRotation;

      rotateXTo(rotateX);
      rotateYTo(rotateY);
      scaleTo(1.02);

      if (spotlight) {
        setMousePos({ x, y, opacity: 1 });
      }
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      scaleTo(1);
      if (spotlight) {
        setMousePos((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, spotlight]);

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        className={`relative overflow-hidden transition-shadow duration-300 transform-gpu ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}

        {/* Dynamic Cursor Spotlight Overlay */}
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-inherit z-10"
            style={{
              opacity: mousePos.opacity,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
