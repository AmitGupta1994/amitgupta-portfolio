import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import About from '@/components/About';
import ExpertiseSection from '@/components/ExpertiseSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import MediumArticlesSection from '@/components/MediumArticlesSection';
import AmbientBackground from '@/components/AmbientBackground';

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
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20 flex flex-col gap-20">

        <Hero
          name={profileData.name}
          headline={profileData.headline}
          imageUrl={profileData.imageUrl}
          contact={profileData.contact}
        />

        <About summary={profileData.summary} />

        <ExpertiseSection />

        <ProjectsSection projects={projects} />

        <SkillsSection skills={skillsData} />

        <ExperienceSection experiences={experienceData} />

        <PublicationsSection publications={publicationsData} />

        <MediumArticlesSection />

        <ContactSection />

      </div>
    </main>
  );
}