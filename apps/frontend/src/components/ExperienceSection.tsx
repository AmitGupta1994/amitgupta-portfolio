"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExperienceCard from './ExperienceCard';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The class '.exp-card' is targeted here, which is set in the ExperienceCard component
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Animation triggers when top of section hits 85% of viewport
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Proper cleanup for React Strict Mode
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
          Recent Experience
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard 
            key={exp.id}
            role={exp.role}
            company={exp.company}
            date={exp.date}
            description={exp.description}
          />
        ))}
      </div>
    </section>
  );
}