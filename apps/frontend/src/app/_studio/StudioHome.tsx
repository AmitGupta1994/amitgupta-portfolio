import ClientsStrip from '@/components/studio/ClientsStrip';
import PackagesSection from '@/components/studio/PackagesSection';
import ReviewsSection from '@/components/studio/ReviewsSection';
import ServicesSection from '@/components/studio/ServicesSection';
import StudioContact from '@/components/studio/StudioContact';
import StudioFooter from '@/components/studio/StudioFooter';
import StudioHero from '@/components/studio/StudioHero';
import StudioNav from '@/components/studio/StudioNav';
import TeamSection from '@/components/studio/TeamSection';
import WorkSection from '@/components/studio/WorkSection';
import { sectionHref } from '@/components/studio/contactLinks';
import { VOICE, type Voice } from '@/components/studio/voice';

import { getClients, getPackages, getReviews, getServices, getSite, getTeam, getVideos } from '@/content';
import type { SiteKey } from '@/types/sites';

/**
 * One page of services, packages, work and reviews, shared by the personal
 * practice (creatives) and the company (Voxelate). A company also gets its team
 * and a client logo strip. Sections with no rows don't render, nor do their nav links.
 */
export default async function StudioHome({ site: key, voice }: { site: SiteKey; voice: Voice }) {
  const isCompany = voice === 'company';
  const [site, services, packages, videos, reviews, team, clients] = await Promise.all([
    getSite(key),
    getServices(key),
    getPackages(key),
    getVideos(key),
    getReviews(key),
    isCompany ? getTeam(key) : [],
    isCompany ? getClients(key) : [],
  ]);
  const { profile } = site;
  const copy = VOICE[voice];
  // A company presents its logo; the personal site leads with the words alone.
  const logoUrl = isCompany && profile.imageUrl ? profile.imageUrl : undefined;

  const rendered = new Set(['home', 'contact']);
  if (services.length > 0) rendered.add('services');
  if (packages.length > 0) rendered.add('packages');
  if (videos.length > 0) rendered.add('work');
  if (team.length > 0) rendered.add('team');
  if (reviews.length > 0) rendered.add('reviews');

  const navLinks = site.navLinks.filter((link) => {
    const href = sectionHref(link.href);
    return !href.startsWith('#') || rendered.has(href.slice(1));
  });

  return (
    <>
      <StudioNav
        brand={site.title}
        logoUrl={logoUrl}
        links={navLinks}
        contact={profile.contact}
        ctaLabel={profile.hero.cta.label}
        prompt={copy.dialogPrompt}
      />
      <main className="overflow-x-clip">
        <StudioHero
          profile={profile}
          tagline={site.tagline}
          stats={site.stats}
          showWorkLink={videos.length > 0}
          copy={copy}
          logoUrl={logoUrl}
          brand={site.title}
        />
        {clients.length > 0 && <ClientsStrip clients={clients} title={copy.clientsTitle} />}
        {services.length > 0 && <ServicesSection services={services} about={profile.summary} copy={copy} />}
        {packages.length > 0 && <PackagesSection packages={packages} contact={profile.contact} copy={copy} />}
        {videos.length > 0 && <WorkSection videos={videos} copy={copy} />}
        {team.length > 0 && <TeamSection team={team} copy={copy} />}
        {reviews.length > 0 && <ReviewsSection reviews={reviews} copy={copy} />}
        <StudioContact contact={profile.contact} copy={copy} />
      </main>
      <StudioFooter
        brand={site.company?.legalName || (isCompany ? site.title : profile.name)}
        founded={site.company?.founded}
        location={profile.contact.location}
        mainSiteUrl={profile.mainSiteUrl}
      />
    </>
  );
}
