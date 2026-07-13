import React from 'react';

interface SkillBadgeProps {
  name: string;
  rating: number | string;
  isLearning?: boolean;
}

export default function SkillBadge({ name, rating, isLearning = false }: SkillBadgeProps) {
  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm ${
        isLearning 
          ? 'bg-neutral-50 border-dashed border-neutral-300 text-neutral-600' 
          : 'bg-white border-neutral-200 text-neutral-700'
      }`}
    >
      <span>{name}</span>
      <span className="text-neutral-300 font-light">|</span>
      <span className="text-neutral-500 tabular-nums">
        {typeof rating === 'number' ? `${rating}/10` : rating}
      </span>
    </div>
  );
}
