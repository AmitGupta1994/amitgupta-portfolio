import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PhotoGallery from '@/components/PhotoGallery';
import TrekStats from '@/components/trek/TrekStats';
import { getSite, getTrek, getTreks } from '@/content';

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const treks = await getTreks('trek');
  return treks.map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [trek, site] = await Promise.all([getTrek('trek', slug), getSite('trek')]);
  if (!trek) return {};

  const title = `${trek.title} | ${site.title}`;
  return {
    title,
    description: trek.summary,
    openGraph: {
      title,
      description: trek.summary,
      type: 'article',
      images: trek.heroImageUrl ? [{ url: trek.heroImageUrl }] : undefined,
    },
  };
}

/** One trek: the route's numbers, the account of it, and its photographs. */
export default async function TrekDetail({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = await getTrek('trek', slug);
  if (!trek) notFound();

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {trek.heroImageUrl && (
        <div className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
          <Image src={trek.heroImageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      <div
        className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-6 pb-20 ${
          trek.heroImageUrl ? '-mt-24 pt-0' : 'pt-28'
        }`}
      >
        <header className="flex flex-col gap-5">
          <Link href="/trek" className="text-sm font-semibold uppercase tracking-widest text-brand hover:underline">
            ← All treks
          </Link>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            {trek.title}
          </h1>
          <TrekStats trek={trek} className="border-y border-foreground/10 py-4" />
        </header>

        <p className="max-w-3xl text-lg leading-relaxed text-muted">{trek.summary}</p>

        {trek.body && (
          <div
            className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: trek.body }}
          />
        )}

        {trek.gallery.length > 0 && <PhotoGallery photos={trek.gallery} title="From the trail" />}
      </div>
    </main>
  );
}
