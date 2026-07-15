import React from 'react';
import SkillCategory from './SkillCategory';
import { SkillCategoryData } from '@/types/skill';

interface SkillsSectionProps {
  skills: SkillCategoryData[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const displaySkills = [...skills]
    .filter((category) => category.show)
    .sort((a, b) => a.priority - b.priority);

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
        Core Expertise
      </h3>
      
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
