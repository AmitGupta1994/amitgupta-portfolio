import ScrollReveal from "@/components/ScrollReveal";
import type { Review } from "@/types/studio";
import { Icon } from "./icons";
import SectionHeading from "./SectionHeading";
import type { VoiceCopy } from "./voice";

export default function ReviewsSection({ reviews, copy }: { reviews: Review[]; copy: VoiceCopy }) {
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading lead="Client" accent="Reviews" description={copy.reviewsDescription} />

        <ScrollReveal stagger={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const byline = [review.role, review.company].filter(Boolean).join(" at ");
            return (
              <figure
                key={review.id}
                className="flex flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:border-brand hover:shadow-lg hover:shadow-brand/20"
              >
                <Icon name="quote" size={32} className="mb-4 text-brand" />
                <div className="mb-4 flex text-brand" aria-label={`${review.rating} out of 5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Icon key={index} name="star" size={18} />
                  ))}
                </div>
                <blockquote className="mb-6 flex-1 italic text-muted">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-4">
                  {review.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary external hosts
                    <img src={review.avatarUrl} alt="" className="h-12 w-12 rounded-full bg-line object-cover" loading="lazy" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 font-bold text-brand">
                      {review.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-bold">
                      {review.link ? (
                        <a href={review.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                          {review.name}
                        </a>
                      ) : (
                        review.name
                      )}
                    </p>
                    {byline && <p className="text-sm text-muted">{byline}</p>}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </ScrollReveal>

        <div className="mt-12 text-center">
          <p className="inline-flex items-center rounded-full border border-brand bg-surface px-6 py-3">
            <Icon name="star" className="mr-2 text-brand" />
            <span className="text-2xl font-bold text-brand">{average.toFixed(1)}/5</span>
            <span className="ml-2 text-muted">average rating</span>
          </p>
        </div>
      </div>
    </section>
  );
}
