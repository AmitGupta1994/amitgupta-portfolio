import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AmbientBackground from '@/components/AmbientBackground';
import PhotoGallery from '@/components/PhotoGallery';
import BookingForm from '@/components/trekCompany/BookingForm';
import Departures from '@/components/trekCompany/Departures';
import Inclusions from '@/components/trekCompany/Inclusions';
import Itinerary from '@/components/trekCompany/Itinerary';
import TrekFacts from '@/components/trekCompany/TrekFacts';
import { TREKS_HREF } from '@/components/trekCompany/format';
import { getTrekPackage } from '@/content';

import { submitBooking } from '../../../actions';
import { SITE, loadMokshyaTrails } from '../../../_content';

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { treks } = await loadMokshyaTrails();
  return treks.map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [trek, { site }] = await Promise.all([getTrekPackage(SITE, slug), loadMokshyaTrails()]);
  if (!trek) return {};

  const title = `${trek.title} trek | ${site.title}`;
  const images = trek.heroImageUrl ? [{ url: trek.heroImageUrl, alt: trek.title }] : undefined;
  return {
    title,
    description: trek.summary,
    openGraph: { title, description: trek.summary, type: 'article', images },
    twitter: { card: 'summary_large_image', title, description: trek.summary, images: images?.map((image) => image.url) },
  };
}

/** One bookable trek: the numbers, the plan, what's included, dates and the booking form. */
export default async function MokshyaTrailsTrek({ params }: TrekPageProps) {
  const { slug } = await params;
  const [trek, { site }] = await Promise.all([getTrekPackage(SITE, slug), loadMokshyaTrails()]);
  if (!trek) notFound();

  // Past departures drop off on their own as the page regenerates.
  const today = new Date().toISOString().slice(0, 10);
  const departures = trek.departures.filter((departure) => departure.startDate.slice(0, 10) >= today);

  const heading = 'text-xs font-bold uppercase tracking-[0.3em] text-brand';

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-300">
      <AmbientBackground />

      <header className="relative z-10 flex h-[70svh] min-h-[460px] w-full items-end overflow-hidden bg-black text-white">
        {trek.heroImageUrl && <Image src={trek.heroImageUrl} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 pb-14">
          <Link href={TREKS_HREF} className="text-sm font-semibold uppercase tracking-widest text-brand hover:underline">
            ← All treks
          </Link>
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight">{trek.title}</h1>
          <p className="max-w-2xl text-lg font-medium text-white/85">{trek.summary}</p>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-14 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-14">
          <TrekFacts trek={trek} />

          {trek.body && (
            <section className="flex flex-col gap-4">
              <h2 className={heading}>Overview</h2>
              <div
                className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: trek.body }}
              />
            </section>
          )}

          {trek.itinerary.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className={heading}>Itinerary</h2>
              <Itinerary days={trek.itinerary} />
            </section>
          )}

          {(trek.includes.length > 0 || trek.excludes.length > 0) && (
            <section className="flex flex-col gap-4">
              <h2 className={heading}>What&apos;s included</h2>
              <Inclusions includes={trek.includes} excludes={trek.excludes} />
            </section>
          )}

          <section className="flex flex-col gap-4">
            <h2 className={heading}>Departures</h2>
            {departures.length > 0 ? (
              <Departures departures={departures} priceFrom={trek.priceFrom} />
            ) : (
              <p className="rounded-3xl border border-dashed border-foreground/15 p-6 text-sm text-muted">
                No fixed group dates are scheduled right now — every {trek.title} trek is arranged privately on the dates
                you choose. Request your date in the booking form.
              </p>
            )}
          </section>

          {trek.gallery.length > 0 && <PhotoGallery photos={trek.gallery} title="From the trail" />}
        </div>

        <aside id="book" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background/80 p-6 shadow-xl shadow-black/5 backdrop-blur">
            <div className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-muted">From</span>
              <span className="text-3xl font-black text-brand">{trek.priceFrom ?? 'On request'}</span>
            </div>
            <BookingForm
              action={submitBooking}
              contact={site.profile.contact}
              trek={{ slug: trek.slug, title: trek.title, priceFrom: trek.priceFrom }}
              departures={departures}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
