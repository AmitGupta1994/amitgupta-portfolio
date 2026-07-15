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
      <h4 className="text-neutral-900 font-medium border-b border-neutral-100 pb-2">
        <b>{title}</b>
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
