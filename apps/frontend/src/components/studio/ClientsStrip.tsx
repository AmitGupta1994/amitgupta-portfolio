import type { Client } from "@/types/studio";

/** "Trusted by": client logos (or names) in a quiet row under the hero. */
export default function ClientsStrip({ clients, title }: { clients: Client[]; title: string }) {
  return (
    <section aria-label={title} className="border-b border-line py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">{title}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {clients.map((client) => {
            const mark = client.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- uploads or arbitrary external hosts
              <img
                src={client.logoUrl}
                alt={client.name}
                loading="lazy"
                className="h-10 w-auto max-w-[140px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="text-xl font-bold text-muted transition-colors hover:text-foreground">{client.name}</span>
            );
            return (
              <li key={client.id}>
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer">
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
