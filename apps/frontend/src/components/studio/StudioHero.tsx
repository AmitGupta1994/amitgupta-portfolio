import type { Profile } from "@/types/profile";
import type { SiteContent } from "@/types/siteContent";
import GetStartedButton from "./GetStartedButton";
import { Icon } from "./icons";
import type { VoiceCopy } from "./voice";

interface StudioHeroProps {
  profile: Profile;
  tagline?: string;
  stats: SiteContent["stats"];
  /** Shown only when there is work to scroll to. */
  showWorkLink: boolean;
  copy: VoiceCopy;
  /** A company's logo mark, shown above the headline. */
  logoUrl?: string;
  brand: string;
}

export default function StudioHero({ profile, tagline, stats, showWorkLink, copy, logoUrl, brand }: StudioHeroProps) {
  const { hero } = profile;

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Orange bloom behind the headline, and a hairline at the bottom edge. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(255_106_0/0.14),transparent_60%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="studio-rise">
          {logoUrl && (
            <div className="mb-8 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- a small static mark or CMS upload */}
              <img
                src={logoUrl}
                alt={`${brand} logo`}
                width={176}
                height={176}
                className="h-32 w-32 rounded-3xl object-cover shadow-2xl shadow-brand/25 ring-1 ring-white/10 md:h-44 md:w-44"
              />
            </div>
          )}
          {tagline && (
            <p className="mx-auto mb-8 inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {tagline}
            </p>
          )}

          <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            <span className="block">{hero.title}</span>
            <span className="block text-brand">{profile.headline}</span>
          </h1>

          {hero.description.length > 0 && (
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted md:text-xl">
              {hero.description.map((segment, index) =>
                segment.highlight ? (
                  <span key={index} className="font-semibold text-foreground">
                    {segment.text}
                  </span>
                ) : (
                  <span key={index}>{segment.text}</span>
                )
              )}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {showWorkLink && (
              <a
                href="#work"
                className="group inline-flex items-center rounded-xl bg-brand px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                {copy.workLink}
                <Icon name="arrow" size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            )}
            <GetStartedButton
              contact={profile.contact}
              prompt={copy.dialogPrompt}
              className="group inline-flex items-center rounded-xl border border-brand px-8 py-4 text-lg font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <Icon name="play" size={18} className="mr-2 transition-transform group-hover:scale-110" />
              {hero.cta.label}
            </GetStartedButton>
          </div>
        </div>

        {stats.length > 0 && (
          <dl className="studio-rise mt-20 grid grid-cols-2 gap-8 [animation-delay:250ms] md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mb-2 text-4xl font-bold text-brand md:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
