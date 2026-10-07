import About from '@/components/About';
import AmbientBackground from '@/components/AmbientBackground';
import DigitalMantrasSideNav from '@/components/DigitalMantrasSideNav';
import Hero from '@/components/Hero';
import HorizontalProjectsSection from '@/components/HorizontalProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CompanyContact from '@/components/company/CompanyContact';
import EngagementModels from '@/components/company/EngagementModels';
import ProcessSection from '@/components/company/ProcessSection';
import ProductsSection from '@/components/company/ProductsSection';
import ReviewsSection from '@/components/company/ReviewsSection';
import ServicesList from '@/components/company/ServicesList';
import StatsBand from '@/components/company/StatsBand';

import { getPackages, getProducts, getProjects, getReviews, getServices, getSite, getSkillCategories } from '@/content';

const SITE = 'techcompany';

// The software development company, in the tech portfolio's Digital Mantras design:
// full-bleed hero, then services, engagement models, in-house products, client
// work, process, stack and reviews. Sections with no rows don't render, and the
// side nav drops their links.
export default async function TechCompanyHome() {
  const [site, services, models, products, projects, skills, reviews] = await Promise.all([
    getSite(SITE),
    getServices(SITE),
    getPackages(SITE),
    getProducts(SITE),
    getProjects(SITE),
    getSkillCategories(SITE),
    getReviews(SITE),
  ]);
  const { profile } = site;

  const sections = [
    { id: 'about', show: Boolean(profile.summary), node: <About summary={profile.summary} /> },
    { id: 'stats', show: site.stats.length > 0, node: <StatsBand stats={site.stats} /> },
    { id: 'services', show: services.length > 0, node: <ServicesList services={services} /> },
    { id: 'engagement', show: models.length > 0, node: <EngagementModels models={models} /> },
    { id: 'products', show: products.length > 0, node: <ProductsSection products={products} /> },
    { id: 'projects', show: projects.length > 0, node: <HorizontalProjectsSection projects={projects} /> },
    { id: 'process', show: site.process.length > 0, node: <ProcessSection steps={site.process} /> },
    { id: 'skills', show: skills.some((category) => category.show), node: <SkillsSection skills={skills} /> },
    { id: 'reviews', show: reviews.length > 0, node: <ReviewsSection reviews={reviews} /> },
    {
      id: 'contact',
      show: true,
      node: (
        <CompanyContact
          contact={profile.contact}
          models={models.map((model) => model.name)}
          services={services.map((service) => service.title)}
        />
      ),
    },
  ].filter((section) => section.show);

  const rendered = new Set(['hero', ...sections.map((section) => section.id)]);
  const navLinks = site.navLinks.filter((link) => {
    const id = link.href.split('#')[1];
    return !id || rendered.has(id);
  });

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-brand/30 transition-colors duration-300">
      <AmbientBackground />
      <DigitalMantrasSideNav links={navLinks} />

      <div id="hero">
        <Hero
          name={profile.name}
          headline={profile.headline}
          contact={profile.contact}
          hero={profile.hero}
          projects={projects}
          secondaryAction={services.length > 0 ? { label: 'Our services', href: '/#services' } : undefined}
          marqueeLabels={services.map((service) => service.title)}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 py-12 md:gap-32 md:py-24">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className={`scroll-mt-28${section.id === 'contact' ? ' pb-12' : ''}`}>
            {section.node}
          </div>
        ))}
      </div>
    </main>
  );
}
