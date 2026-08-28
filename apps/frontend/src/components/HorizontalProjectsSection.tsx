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

    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isDesktop || prefersReducedMotion) return;

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
            scrub: 0.8,
            end: () => `+=${scrollWidth + 100}`,
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
      className="relative w-full py-8 md:py-16 scroll-mt-24"
    >
      <div className="mb-6 px-1">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight mb-2">
          Featured Work & Projects
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Scroll down to explore case studies and systems engineered across web, mobile, and AI.
        </p>
      </div>

      <div className="relative w-full overflow-x-auto md:overflow-hidden pb-4 md:pb-0 scrollbar-none">
        <div
          ref={targetRef}
          className="flex gap-5 md:gap-8 w-max items-stretch px-1 py-2"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0"
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
