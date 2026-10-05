import ScrollReveal from "@/components/ScrollReveal";
import type { TeamMember } from "@/types/studio";
import { Icon } from "./icons";
import SectionHeading from "./SectionHeading";
import type { VoiceCopy } from "./voice";

/** A company site's people: photo (or initials), role, a line of bio. */
export default function TeamSection({ team, copy }: { team: TeamMember[]; copy: VoiceCopy }) {
  return (
    <section id="team" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading lead="Meet the" accent="Team" description={copy.teamDescription} />

        <ScrollReveal stagger={0.08} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:border-brand hover:shadow-lg hover:shadow-brand/20"
            >
              <div className="relative aspect-square overflow-hidden bg-background">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- uploads or arbitrary external hosts
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-5xl font-black text-brand/60">
                    {member.name
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold transition-colors group-hover:text-brand">{member.name}</h3>
                    <p className="text-sm text-brand">{member.role}</p>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-muted transition-colors hover:text-brand"
                    >
                      <Icon name="linkedin" size={20} />
                    </a>
                  )}
                </div>
                {member.bio && <p className="mt-3 text-sm text-muted">{member.bio}</p>}
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
