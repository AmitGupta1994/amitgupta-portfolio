import LabelledList from '@/components/research/LabelledList';
import PublicationEntry from '@/components/research/PublicationEntry';
import ResearchFooter from '@/components/research/ResearchFooter';
import ResearchMasthead from '@/components/research/ResearchMasthead';
import RoleEntry from '@/components/research/RoleEntry';
import YearSection from '@/components/research/YearSection';

import { groupByYear } from '@/lib/year';
import {
  getExperiences,
  getExpertise,
  getProfile,
  getPublications,
  getSitePage,
  getSkillCategories,
} from '@/content';

// An academic page: masthead, then year-grouped publications and posts, then the
// research skills. Same CMS tables as the portfolio, different presentation.
export default async function ResearchHome() {
  const [profile, site, publications, experiences, skills, expertise] = await Promise.all([
    getProfile(),
    getSitePage('research'),
    getPublications('research'),
    getExperiences('research'),
    getSkillCategories('research'),
    getExpertise('research'),
  ]);

  const publicationGroups = groupByYear(publications, (publication) => publication.date).map((group) => ({
    year: group.year,
    items: group.items.map((publication) => (
      <PublicationEntry key={publication.id} publication={publication} authorName={profile.name} />
    )),
  }));

  const roleGroups = groupByYear(experiences, (experience) => experience.date).map((group) => ({
    year: group.year,
    items: group.items.map((experience) => <RoleEntry key={experience.id} experience={experience} />),
  }));

  return (
    <main className="flex flex-col gap-16 pb-4 md:gap-20">
      <ResearchMasthead
        name={profile.name}
        about={site.about}
        tagline={site.tagline}
        contact={profile.contact}
      />

      <YearSection title="Publications" groups={publicationGroups} />
      <YearSection title="Experience" groups={roleGroups} />

      <LabelledList
        title="Research skills"
        rows={skills.map((category) => ({
          label: category.title,
          body: category.items.map((skill) => skill.name).join(' · '),
        }))}
      />

      <LabelledList
        title="Expertise"
        rows={expertise.map((item) => ({
          label: item.domain,
          detail: item.years,
          body: item.description,
        }))}
      />

      <ResearchFooter name={profile.name} contact={profile.contact} mainSiteUrl={profile.mainSiteUrl} />
    </main>
  );
}
