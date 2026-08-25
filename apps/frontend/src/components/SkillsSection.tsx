"use client";

import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { SkillCategoryData } from '@/types/skill';
import ScrollReveal from './ScrollReveal';

interface SkillsSectionProps {
  skills: SkillCategoryData[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [sortAscending, setSortAscending] = useState(true);

  const displaySkills = [...skills]
    .filter((category) => category.show)
    .sort((a, b) => 
      sortAscending 
        ? a.priority - b.priority
        : b.priority - a.priority
    );

  return (
    <ScrollReveal id="skills" direction="up" distance={30} stagger={0.12} className="flex flex-col gap-8 scroll-mt-24">
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold dark:text-neutral-400">
            Core Expertise & Skills
          </h3>
          
          <button
            onClick={() => setSortAscending(!sortAscending)}
            aria-label={sortAscending ? 'Sort by lowest priority' : 'Sort by highest priority'}
            title={sortAscending ? 'Sort by lowest priority' : 'Sort by highest priority'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-800 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 active:scale-95 cursor-pointer"
          >
            {sortAscending ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m6 11 6-6 6 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displaySkills.map((categoryData) => (
            <SkillCategory 
              key={categoryData.id}
              categoryKey={categoryData.id}
              title={categoryData.title}
              items={categoryData.items}
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}