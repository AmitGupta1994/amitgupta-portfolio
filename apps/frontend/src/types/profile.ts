export interface HeroCopy {
  title: string;
  /** Rendered in order; `highlight` segments get the accent colour. */
  description: Array<{ text: string; highlight?: boolean }>;
  cta: { label: string; href: string };
}

export interface Profile {
  name: string;
  headline: string;
  imageUrl: string;
  /** Absolute URL of the main portfolio, used by the other sites to link back. */
  mainSiteUrl?: string;
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    location?: string;
    freelancer?: string;
    linkedin?: string;
    github?: string;
    googleScholar?: string;
  };
  hero: HeroCopy;
  summary: string;
}
