"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalProjectsSectionProps {
  projects: Project[];
}

export default function HorizontalProjectsSection({
  projects,
}: HorizontalProjectsSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !targetRef.current)
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const target = targetRef.current;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const scrollWidth = target.scrollWidth - container.clientWidth;

      if (scrollWidth > 0) {
        gsap.to(target, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth + 300}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 md:py-20 scroll-mt-24"
    >
      <div className="mb-8 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight mb-2">
          Featured Work & Projects
        </h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Scroll down to explore case studies and systems engineered across web, mobile, and AI.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={targetRef}
          className="flex gap-6 md:gap-8 w-max items-stretch px-2 py-4"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[310px] sm:w-[380px] md:w-[420px] shrink-0"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                imageUrl={project.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
