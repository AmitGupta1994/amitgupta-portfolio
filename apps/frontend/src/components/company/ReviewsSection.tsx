import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import { Icon } from "@/components/studio/icons";
import type { Review } from "@/types/studio";
import SectionHeader from "./SectionHeader";

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader eyebrow="Client voices" title="Reviews" />

      <ScrollReveal stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((review) => {
          const byline = [review.role, review.company].filter(Boolean).join(", ");
          return (
            <TiltCard key={review.id} maxRotation={3} className="h-full rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur">
              <figure className="flex h-full flex-col gap-5 p-7">
                <div className="flex text-brand" aria-label={`${review.rating} out of 5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Icon key={index} name="star" size={16} />
                  ))}
                </div>
                <blockquote className="flex-1 text-lg font-medium leading-snug text-foreground">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-foreground/10 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/15 font-black text-brand">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-foreground">
                      {review.link ? (
                        <a href={review.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                          {review.name}
                        </a>
                      ) : (
                        review.name
                      )}
                    </span>
                    {byline && <span className="block text-sm text-muted">{byline}</span>}
                  </span>
                </figcaption>
              </figure>
            </TiltCard>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
