import React from 'react';

interface ExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function ExperienceCard({ role, company, date, description }: ExperienceCardProps) {
  return (
    <article className="exp-card flex flex-col gap-3 p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-xs transition-all hover:border-neutral-300 hover:shadow-md dark:bg-neutral-900/60 dark:border-neutral-800 dark:hover:border-neutral-700">
      <div>
        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">{date}</p>
        <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{role}</h4>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{company}</p>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed mt-1">
        {description}
      </p>
    </article>
  );
}