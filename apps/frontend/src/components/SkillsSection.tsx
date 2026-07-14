import React from 'react';
import SkillCategory from '@/components/SkillsCategory';

interface Skill {
  name: string;
  rating: number | string;
}

interface CategoryData {
  title: string;
  show: boolean;
  items: Skill[];
}

type SkillsData = Record<string, CategoryData>;

interface SkillsSectionProps {
  skills: SkillsData;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
        Core Expertise
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([categoryKey, categoryData]) => {
          if (!categoryData.show) return null;

          return (
            <SkillCategory 
              key={categoryKey}
              categoryKey={categoryKey}
              title={categoryData.title}
              items={categoryData.items}
            />
          );
        })}
      </div>
    </section>
  );
}
