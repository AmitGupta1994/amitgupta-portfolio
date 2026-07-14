import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';

import { profileData } from '@/data/profile';
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
          contact={profileData.contact} 
        />
        
        <About summary={profileData.summary} />
        
        <SkillsSection skills={skillsData} />
        
        <ExperienceSection experiences={experienceData} />

        <PublicationsSection publications={publicationsData} />
        
      </div>
    </main>
  );
}