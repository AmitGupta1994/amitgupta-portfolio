import React from 'react';
import { Skill } from '@/types/skill';

interface SkillBadgeProps extends Skill {
  isLearning?: boolean;
}

export default function SkillBadge({ name, rating, isLearning = false }: SkillBadgeProps) {
  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full transition-all duration-200 shadow-xs ${
        isLearning 
          ? 'bg-neutral-50/50 border-dashed border-neutral-200 text-neutral-500 hover:border-neutral-300 dark:bg-neutral-900/40 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700' 
          : 'bg-white border-neutral-200/80 text-neutral-800 hover:border-neutral-300 hover:shadow-sm dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-700'
      }`}
    >
      <span>{name}</span>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
        isLearning
          ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
          : 'bg-neutral-100 text-neutral-600 border border-neutral-200/50 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700/50'
      }`}>
        {typeof rating === 'number' ? `${rating}/10` : rating}
      </span>
    </div>
  );
}
