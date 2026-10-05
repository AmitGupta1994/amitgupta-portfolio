import CreativesContact from '@/components/creatives/CreativesContact';
import CreativesFooter from '@/components/creatives/CreativesFooter';
import CreativesHero from '@/components/creatives/CreativesHero';
import CreativesNav from '@/components/creatives/CreativesNav';
import PackagesSection from '@/components/creatives/PackagesSection';
import ReviewsSection from '@/components/creatives/ReviewsSection';
import ServicesSection from '@/components/creatives/ServicesSection';
import WorkSection from '@/components/creatives/WorkSection';
import { sectionHref } from '@/components/creatives/contactLinks';

import { getPackages, getReviews, getServices, getSite, getVideos } from '@/content';

// The digital marketing & branding studio: one page of services, packages, work
// and reviews. Sections with no content yet don't render, and neither do their nav links.
export default async function CreativesHome() {
  const [site, services, packages, videos, reviews] = await Promise.all([
    getSite('creatives'),
    getServices('creatives'),
    getPackages('creatives'),
    getVideos('creatives'),
    getReviews('creatives'),
  ]);
  const { profile } = site;

  const rendered = new Set(['home', 'contact']);
  if (services.length > 0) rendered.add('services');
  if (packages.length > 0) rendered.add('packages');
  if (videos.length > 0) rendered.add('work');
  if (reviews.length > 0) rendered.add('reviews');

  const navLinks = site.navLinks.filter((link) => {
    const href = sectionHref(link.href);
    return !href.startsWith('#') || rendered.has(href.slice(1));
  });

  return (
    <>
      <CreativesNav brand={site.title} links={navLinks} contact={profile.contact} ctaLabel={profile.hero.cta.label} />
      <main className="overflow-x-clip">
        <CreativesHero profile={profile} tagline={site.tagline} stats={site.stats} showWorkLink={videos.length > 0} />
        {services.length > 0 && <ServicesSection services={services} about={profile.summary} />}
        {packages.length > 0 && <PackagesSection packages={packages} contact={profile.contact} />}
        {videos.length > 0 && <WorkSection videos={videos} />}
        {reviews.length > 0 && <ReviewsSection reviews={reviews} />}
        <CreativesContact contact={profile.contact} />
      </main>
      <CreativesFooter brand={site.title} location={profile.contact.location} mainSiteUrl={profile.mainSiteUrl} />
    </>
  );
}
