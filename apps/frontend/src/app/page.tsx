import Hero from '@/components/Hero';
import HorizontalProjectsSection from '@/components/HorizontalProjectsSection';
import About from '@/components/About';
import ExpertiseSection from '@/components/ExpertiseSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import MediumArticlesSection from '@/components/MediumArticlesSection';
import AmbientBackground from '@/components/AmbientBackground';
import DigitalMantrasSideNav from '@/components/DigitalMantrasSideNav';
import PublicationsSection from '@/components/PublicationsSection';

import { getProfile } from '@/data/profile';
import { getNavLinks } from '@/data/navigation';
import { getProjects } from '@/data/projects';
import { getSkillCategories } from '@/data/skills';
import { getExperiences } from '@/data/experience';
import { getPublications } from '@/data/publications';
import { getExpertise } from '@/data/expertise';

// `overflow-x-clip` (not `hidden`) keeps <main> from becoming a scroll container,
// which would break sticky and pinned sections.
export default async function Home() {
  const [profile, navLinks, projects, skills, experiences, publications, expertise] = await Promise.all([
    getProfile(),
    getNavLinks(),
    getProjects(),
    getSkillCategories(),
    getExperiences(),
    getPublications(),
    getExpertise(),
  ]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-brand/30 transition-colors duration-300">
      <AmbientBackground />
      <DigitalMantrasSideNav links={navLinks} />

      {/* Full-bleed sections */}
      <div id="hero">
        <Hero
          name={profile.name}
          headline={profile.headline}
          contact={profile.contact}
          hero={profile.hero}
          projects={projects}
        />
      </div>

      {/* Sections still in the contained layout, pending their redesign */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">

        <div id="about" className="scroll-mt-28">
          <About summary={profile.summary} />
        </div>

        <div id="expertise" className="scroll-mt-28">
          <ExpertiseSection expertise={expertise} />
        </div>

        <div id="projects" className="scroll-mt-28 w-full">
          <HorizontalProjectsSection projects={projects} />
        </div>

        <div id="skills" className="scroll-mt-28">
          <SkillsSection skills={skills} />
        </div>

        <div id="experience" className="scroll-mt-28">
          <ExperienceSection experiences={experiences} />
        </div>

        <div id="publications" className="scroll-mt-28">
          <PublicationsSection publications={publications} />
        </div>

        <div id="articles" className="scroll-mt-28">
          <MediumArticlesSection />
        </div>

        <div id="contact" className="scroll-mt-28 pb-12">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}
