"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  name: string;
  headline: string;
  contact: { location: string; email: string };
}

export default function Hero({ name, headline, contact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup for React strict mode
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col items-start gap-6 max-w-3xl">
      <h1 className="hero-element text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900">
        {name}
      </h1>
      <h2 className="hero-element text-xl md:text-2xl font-medium text-neutral-500 leading-relaxed">
        {headline}
      </h2>
      <div className="hero-element flex flex-wrap gap-4 text-sm font-medium text-neutral-400 mt-2">
        <span className="flex items-center gap-1.5 border border-neutral-200 rounded-full px-4 py-1.5 bg-white">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {contact.location}
        </span>
        <a 
          href={`mailto:${contact.email}`}
          className="flex items-center gap-1.5 border border-neutral-200 rounded-full px-4 py-1.5 bg-white hover:bg-neutral-100 transition-colors"
        >
          {contact.email}
        </a>
      </div>
    </section>
  );
}