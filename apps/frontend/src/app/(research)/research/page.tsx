import AmbientBackground from '@/components/AmbientBackground';
import ContactSection from '@/components/ContactSection';
import DigitalMantrasSideNav from '@/components/DigitalMantrasSideNav';
import ExperienceSection from '@/components/ExperienceSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import Hero from '@/components/Hero';
import PublicationsSection from '@/components/PublicationsSection';
import ResearchAbout from '@/components/ResearchAbout';
import SkillsSection from '@/components/SkillsSection';

import {
  getExperiences,
  getExpertise,
  getProfile,
  getProjects,
  getPublications,
  getResearchPage,
  getSkillCategories,
} from '@/content';

// Research-only view of the same content: publications lead, research roles and
// skills come first, and the About copy is this site's own.
export default async function ResearchHome() {
  const [profile, research, publications, experiences, skills, expertise, projects] = await Promise.all([
    getProfile(),
    getResearchPage(),
    getPublications('research'),
    getExperiences('research'),
    getSkillCategories('research'),
    getExpertise('research'),
    getProjects('research'),
  ]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-brand/30 transition-colors duration-300">
      <AmbientBackground />
      <DigitalMantrasSideNav links={research.navLinks} />

      <div id="hero">
        <Hero
          name={profile.name}
          headline={profile.headline}
          contact={profile.contact}
          hero={profile.hero}
          projects={projects}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">

        <div id="about" className="scroll-mt-28">
          <ResearchAbout title={research.title} tagline={research.tagline} about={research.about} />
        </div>

        <div id="publications" className="scroll-mt-28">
          <PublicationsSection publications={publications} />
        </div>

        <div id="experience" className="scroll-mt-28">
          <ExperienceSection experiences={experiences} />
        </div>

        <div id="skills" className="scroll-mt-28">
          <SkillsSection skills={skills} />
        </div>

        <div id="expertise" className="scroll-mt-28">
          <ExpertiseSection expertise={expertise} />
        </div>

        <div id="contact" className="scroll-mt-28 pb-12">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}
