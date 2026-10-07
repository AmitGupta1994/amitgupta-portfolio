import Image from "next/image";

import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import type { Product, ProductStatus } from "@/types/company";
import SectionHeader from "./SectionHeader";

const STATUS: Record<ProductStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  beta: { label: "Beta", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  building: { label: "In development", className: "bg-foreground/10 text-muted" },
};

/** What the company builds for itself, beside the client work. */
export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="In-house"
        title="Our products"
        description="Between client projects we build and run products of our own — the same engineering, with our own name on it."
      />

      <ScrollReveal stagger={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.map((product) => {
          const status = STATUS[product.status] ?? STATUS.building;
          return (
            <TiltCard key={product.id} maxRotation={4} className="h-full rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl">
                {product.imageUrl && (
                  <div className="relative h-52 w-full overflow-hidden bg-foreground/5">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">{product.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="font-semibold text-brand">{product.tagline}</p>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{product.description}</p>
                  {product.techStack.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5">
                      {product.techStack.map((tech) => (
                        <li key={tech} className="rounded-full border border-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start text-sm font-bold uppercase tracking-wide text-foreground underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand"
                    >
                      Visit {product.name}
                    </a>
                  )}
                </div>
              </article>
            </TiltCard>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
