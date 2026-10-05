/** Content types for the studio sites: creatives (personal) and Voxelate (company). */

export type ServiceIcon = "megaphone" | "palette" | "chart" | "camera" | "video" | "pen" | "search" | "globe";

export interface Service {
  id: string;
  title: string;
  icon: ServiceIcon;
  description: string;
  /** Longer copy revealed on hover/focus. */
  details?: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  company?: string;
  text: string;
  /** 1–5. */
  rating: number;
  avatarUrl?: string;
  link?: string;
}

/** A person on a company site's team. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  linkedin?: string;
}

/** A brand the company has worked for, shown in the logo strip. */
export interface Client {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
}

/** Company details a company site's global carries. */
export interface CompanyInfo {
  legalName?: string;
  founded?: string;
}
