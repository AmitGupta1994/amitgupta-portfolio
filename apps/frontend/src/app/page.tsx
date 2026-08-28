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

import { profileData } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experience';
import { publicationsData } from '@/data/publications';
import PublicationsSection from '@/components/PublicationsSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-100 dark:selection:bg-neutral-800 transition-colors duration-300 overflow-x-hidden">
      <AmbientBackground />
      <DigitalMantrasSideNav />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">

        <div id="hero" className="scroll-mt-28">
          <Hero
            name={profileData.name}
            headline={profileData.headline}
            imageUrl={profileData.imageUrl}
            contact={profileData.contact}
          />
        </div>

        <div id="about" className="scroll-mt-28">
          <About summary={profileData.summary} />
        </div>

        <div id="expertise" className="scroll-mt-28">
          <ExpertiseSection />
        </div>

        <div id="projects" className="scroll-mt-28 w-full">
          <HorizontalProjectsSection projects={projects} />
        </div>

        <div id="skills" className="scroll-mt-28">
          <SkillsSection skills={skillsData} />
        </div>

        <div id="experience" className="scroll-mt-28">
          <ExperienceSection experiences={experienceData} />
        </div>

        <div id="publications" className="scroll-mt-28">
          <PublicationsSection publications={publicationsData} />
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