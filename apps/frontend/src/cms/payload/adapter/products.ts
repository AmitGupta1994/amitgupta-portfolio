import type { Product, ProductStatus } from "@/types/company";
import type { SiteKey } from "@/types/sites";
import { orUndefined, payloadClient } from "../client";
import type { CmsPhoto } from "./photos";

interface CmsProduct {
  id: number | string;
  name: string;
  tagline: string;
  description: string;
  status?: string | null;
  techStack?: Array<{ name: string }> | null;
  url?: string | null;
  image?: CmsPhoto | number | string | null;
  imageUrl?: string | null;
}

export function mapProduct(doc: CmsProduct): Product {
  const image = doc.image;
  return {
    id: String(doc.id),
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    status: (doc.status ?? "building") as ProductStatus,
    techStack: (doc.techStack ?? []).map((tech) => tech.name),
    url: orUndefined(doc.url) || undefined,
    // Depth 1 gives the photo doc; an unresolved upload is just an id.
    imageUrl: (image && typeof image === "object" && image.url) || orUndefined(doc.imageUrl) || undefined,
  };
}

export async function getProducts(site: SiteKey): Promise<Product[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-products` as "techcompany-products",
    limit: 50,
    depth: 1,
    sort: "order",
  });
  return (docs as unknown as CmsProduct[]).map(mapProduct);
}
