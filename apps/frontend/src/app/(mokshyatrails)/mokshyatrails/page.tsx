import About from '@/components/About';
import AmbientBackground from '@/components/AmbientBackground';
import DigitalMantrasSideNav from '@/components/DigitalMantrasSideNav';
import Hero from '@/components/Hero';
import ReviewsSection from '@/components/company/ReviewsSection';
import SectionHeader from '@/components/company/SectionHeader';
import StatsBand from '@/components/company/StatsBand';
import BookingForm from '@/components/trekCompany/BookingForm';
import FeaturedTreks from '@/components/trekCompany/FeaturedTreks';
import HeroSlider from '@/components/trekCompany/HeroSlider';
import ContactRows from '@/components/trekCompany/ContactRows';

import { submitBooking } from '../actions';
import { loadMokshyaTrails } from '../_content';

// The trekking company's landing page: a full-screen slider, then who we are,
// featured treks, reviews and a trek request form. Empty sections don't render.
export default async function MokshyaTrailsHome() {
  const { site, treks, featured, reviews, visible, navLinks } = await loadMokshyaTrails();
  const { profile } = site;
  const contact = profile.contact;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-brand/30 transition-colors duration-300">
      <AmbientBackground />
      {/* Section dots only: page links (All treks) live in the menu. */}
      <DigitalMantrasSideNav links={navLinks.filter((link) => link.href.includes('#'))} />

      <div id="hero" className="relative z-10">
        {site.slides.length > 0 ? (
          <HeroSlider slides={site.slides} brand={site.title} />
        ) : (
          <Hero name={profile.name} headline={profile.headline} contact={contact} hero={profile.hero} projects={[]} />
        )}
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16 md:gap-32 md:py-24">
        {visible.about && (
          <div id="about" className="scroll-mt-28">
            <About summary={profile.summary} />
          </div>
        )}

        {visible.stats && (
          <div id="stats" className="scroll-mt-28">
            <StatsBand stats={site.stats} />
          </div>
        )}

        {visible.treks && (
          <div id="treks" className="scroll-mt-28">
            <FeaturedTreks treks={featured} total={treks.length} />
          </div>
        )}

        {visible.reviews && (
          <div id="reviews" className="scroll-mt-28">
            <ReviewsSection reviews={reviews} />
          </div>
        )}

        <div id="contact" className="scroll-mt-28 pb-12">
          <section className="flex flex-col gap-10">
            <SectionHeader
              eyebrow="Plan your trek"
              title="Start your journey"
              description="Tell us where and when — or that you're not sure yet. A trek leader will reply with dates, a plan and a price."
            />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-foreground/10 bg-background/60 p-6 backdrop-blur md:p-8">
                <BookingForm action={submitBooking} contact={contact} treks={treks.map(({ slug, title }) => ({ slug, title }))} />
              </div>
              <aside>
                <ContactRows contact={contact} />
              </aside>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
