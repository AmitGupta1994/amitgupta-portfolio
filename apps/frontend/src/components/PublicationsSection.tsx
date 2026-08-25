"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicationCard from './PublicationCard';
import { Publication } from '@/types/publication';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PublicationsSectionProps {
  publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".pub-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="publications" ref={containerRef} className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold dark:text-neutral-400">
          Research & Publications
        </h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {publications.map((pub) => (
          <PublicationCard 
            key={pub.id}
            title={pub.title}
            authors={pub.authors}
            date={pub.date}
            publisher={pub.publisher}
          />
        ))}
      </div>
    </section>
  );
}