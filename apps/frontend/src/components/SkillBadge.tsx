import React from 'react';
import { Skill } from '@/types/skill';

interface SkillBadgeProps extends Skill {
  isLearning?: boolean;
}

export default function SkillBadge({ name, rating, isLearning = false }: SkillBadgeProps) {
  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full transition-all duration-200 shadow-sm ${
        isLearning 
          ? 'bg-neutral-50/50 border-dashed border-neutral-200 text-neutral-500 hover:border-neutral-300' 
          : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300 hover:shadow-md'
      }`}
    >
      <span>{name}</span>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
        isLearning
          ? 'bg-neutral-100 text-neutral-400'
          : 'bg-neutral-50 text-neutral-500 border border-neutral-200/50'
      }`}>
        {typeof rating === 'number' ? `${rating}/10` : rating}
      </span>
    </div>
  );
}

