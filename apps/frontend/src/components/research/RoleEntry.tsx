import type { Experience } from "@/types/experience";

/** A research post or job: role, where, and what it involved. */
export default function RoleEntry({ experience }: { experience: Experience }) {
  return (
    <article className="flex flex-col gap-1">
      <p className="text-xs uppercase tracking-wide text-muted">{experience.date}</p>
      <h3 className="text-lg font-bold leading-snug text-foreground">{experience.role}</h3>
      <p className="font-serif text-base italic text-muted">{experience.company}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{experience.description}</p>
    </article>
  );
}
