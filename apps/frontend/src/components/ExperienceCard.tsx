import React from 'react';

interface ExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function ExperienceCard({ role, company, date, description }: ExperienceCardProps) {
  return (
    <article className="exp-card flex flex-col gap-3 p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-neutral-400 mb-1">{date}</p>
        <h4 className="text-lg font-semibold text-neutral-900">{role}</h4>
        <p className="text-neutral-600 font-medium">{company}</p>
      </div>
      <p className="text-neutral-500 text-sm leading-relaxed mt-2">
        {description}
      </p>
    </article>
  );
}