/** Content types only the software company (techcompany) uses. */

export type ProductStatus = "live" | "beta" | "building";

/** A product the company builds and runs itself. */
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  techStack: string[];
  url?: string;
  imageUrl?: string;
}

/** One step of how a project runs. */
export interface ProcessStep {
  title: string;
  description: string;
}
