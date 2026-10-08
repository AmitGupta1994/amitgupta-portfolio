import type { Metadata } from 'next';

import AmbientBackground from '@/components/AmbientBackground';
import SectionHeader from '@/components/company/SectionHeader';
import TrekFinder from '@/components/trekCompany/TrekFinder';

import { loadMokshyaTrails } from '../../_content';

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await loadMokshyaTrails();
  const title = `All treks | ${site.title}`;
  const description = `Every guided trek ${site.title} runs, with days, difficulty, altitude and prices.`;
  return { title, description, openGraph: { title, description } };
}

/** Every trek the company runs, filterable. */
export default async function MokshyaTrailsTreks() {
  const { site, treks } = await loadMokshyaTrails();

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-300">
      <AmbientBackground />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-32 md:pt-40">
        <SectionHeader
          eyebrow={site.title}
          title="All treks"
          description="Classic routes and quieter valleys, all with licensed local guides. Filter by region, difficulty or length."
        />
        <TrekFinder treks={treks} />
      </div>
    </main>
  );
}
