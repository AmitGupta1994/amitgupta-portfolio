import React from 'react';
import TiltCard from './TiltCard';

interface ExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function ExperienceCard({ role, company, date, description }: ExperienceCardProps) {
  return (
    <TiltCard maxRotation={4} className="exp-card rounded-2xl border border-neutral-200/80 bg-white dark:bg-neutral-900/60 dark:border-neutral-800 p-6 shadow-xs transition-all hover:shadow-md">
      <article className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">{date}</p>
          <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{role}</h4>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{company}</p>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed mt-1">
          {description}
        </p>
      </article>
    </TiltCard>
  );
}