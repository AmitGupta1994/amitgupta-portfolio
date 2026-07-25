import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import About from '@/components/About';
import ExpertiseSection from '@/components/ExpertiseSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import MediumArticlesSection from '@/components/MediumArticlesSection';

import { profileData } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experience';
import { publicationsData } from '@/data/publications';
import PublicationsSection from '@/components/PublicationsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-32 flex flex-col gap-24">

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

        {/* @ts-expect-error Async Server Component */}
        <MediumArticlesSection />

        <ContactSection />

      </div>
    </main>
  );
}