/** Content types only the creatives (marketing & branding) site uses. */

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
