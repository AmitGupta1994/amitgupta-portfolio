import AmbientBackground from '@/components/AmbientBackground';
import ContactSection from '@/components/ContactSection';
import DigitalMantrasSideNav from '@/components/DigitalMantrasSideNav';
import ExperienceSection from '@/components/ExperienceSection';
import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';
import SiteAbout from '@/components/SiteAbout';
import SkillsSection from '@/components/SkillsSection';
import VideoGallery from '@/components/VideoGallery';

import { heroForSite } from '@/lib/siteHero';
import {
  getExperiences,
  getPhotos,
  getProfile,
  getSitePage,
  getSkillCategories,
  getVideos,
} from '@/content';

// The trekking site: photos and films lead, then the treks themselves and the
// skills behind them. Sections with no content yet simply don't render.
export default async function TrekHome() {
  const [profile, site, photos, videos, experiences, skills] = await Promise.all([
    getProfile(),
    getSitePage('trek'),
    getPhotos('trek'),
    getVideos('trek'),
    getExperiences('trek'),
    getSkillCategories('trek'),
  ]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-brand/30 transition-colors duration-300">
      <AmbientBackground />
      <DigitalMantrasSideNav links={site.navLinks} />

      <div id="hero">
        <Hero
          name={profile.name}
          headline={site.tagline ?? profile.headline}
          contact={profile.contact}
          hero={heroForSite(profile.hero, site.hero)}
          projects={[]}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">

        <div id="about" className="scroll-mt-28">
          <SiteAbout title={site.title} tagline={site.tagline} about={site.about} />
        </div>

        {photos.length > 0 && (
          <div id="photos" className="scroll-mt-28">
            <PhotoGallery photos={photos} title="Photos" description="From the trails, in the order I walked them." />
          </div>
        )}

        {videos.length > 0 && (
          <div id="videos" className="scroll-mt-28">
            <VideoGallery videos={videos} title="Films" description="Longer cuts, hosted on YouTube." />
          </div>
        )}

        {experiences.length > 0 && (
          <div id="experience" className="scroll-mt-28">
            <ExperienceSection experiences={experiences} />
          </div>
        )}

        {skills.length > 0 && (
          <div id="skills" className="scroll-mt-28">
            <SkillsSection skills={skills} />
          </div>
        )}

        <div id="contact" className="scroll-mt-28 pb-12">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}
