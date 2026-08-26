import React from 'react';
import SkillBadge from './SkillBadge';
import { Skill } from '@/types/skill';

interface SkillCategoryProps {
  title: string;
  items: Skill[];
  categoryKey: string;
}

export default function SkillCategory({ title, items, categoryKey }: SkillCategoryProps) {
  const isLearning = categoryKey === 'learning';

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-neutral-800 font-semibold border-b border-neutral-200/80 pb-2 dark:text-neutral-200 dark:border-neutral-800">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <SkillBadge 
            key={skill.name} 
            name={skill.name} 
            rating={skill.rating} 
            isLearning={isLearning} 
          />
        ))}
      </div>
    </div>
  );
}
