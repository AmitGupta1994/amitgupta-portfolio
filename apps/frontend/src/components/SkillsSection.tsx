"use client"; // Required for interactivity (useState, onClick)

import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { SkillCategoryData } from '@/types/skill';

interface SkillsSectionProps {
  skills: SkillCategoryData[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Create a state variable to track the sorting direction
  const [sortAscending, setSortAscending] = useState(true);

  // Recalculate the array every time the state changes
  const displaySkills = [...skills]
    .filter((category) => category.show)
    .sort((a, b) => 
      sortAscending 
        ? a.priority - b.priority // 1, 2, 3...
        : b.priority - a.priority // 9, 8, 7...
    );

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
          Core Expertise
        </h3>
        
        {/* The button that flips the state and forces a redraw */}
        <button 
          onClick={() => setSortAscending(!sortAscending)}
          className="px-3 py-1 text-sm bg-neutral-200 rounded hover:bg-neutral-300"
        >
          Sort: {sortAscending ? 'Highest Priority' : 'Lowest Priority'}
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
  );
}