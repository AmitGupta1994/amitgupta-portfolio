import type { Profile } from "@/types/profile";

interface ResearchMastheadProps {
  name: string;
  /** Short intro, HTML from the CMS. */
  about: string;
  tagline?: string;
  contact: Profile["contact"];
}

const links = (contact: Profile["contact"]) =>
  [
    contact.googleScholar && { label: "Google Scholar", href: contact.googleScholar },
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin },
    contact.github && { label: "Github", href: contact.github },
    { label: "Resume", href: "/cv-amitgupta.pdf" },
    contact.email && { label: "Email", href: `mailto:${contact.email}` },
  ].filter(Boolean) as Array<{ label: string; href: string }>;

/**
 * Academic masthead: a quiet band with the name, and the intro card pulled up
 * over it — small stacked links on the left, the paragraph on the right.
 */
export default function ResearchMasthead({ name, about, tagline, contact }: ResearchMastheadProps) {
  return (
    <header className="relative">
      <div className="relative h-[260px] overflow-hidden bg-brand/5 sm:h-[320px]">
        <div className="dot-grid absolute inset-0 text-brand/25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-4xl items-center px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-none tracking-tight text-foreground">
              {name}
            </h1>
            {tagline && (
              <p className="font-serif text-lg italic text-muted sm:text-xl">{tagline}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-4xl px-6">
        <div className="grid gap-6 md:grid-cols-12">
          <nav aria-label="Profiles" className="md:col-span-4 md:text-right">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:items-end">
              {links(contact).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-sm text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="md:col-span-8 text-base leading-relaxed text-foreground [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </div>
      </div>
    </header>
  );
}
