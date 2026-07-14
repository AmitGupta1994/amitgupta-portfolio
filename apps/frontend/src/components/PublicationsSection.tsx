"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicationCard from './PublicationCard';

gsap.registerPlugin(ScrollTrigger);

interface Publication {
  id: string;
  title: string;
  authors: string;
  date: string;
  publisher: string;
}

interface PublicationsSectionProps {
  publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pub-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
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