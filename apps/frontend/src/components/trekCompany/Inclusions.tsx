import { Icon } from "@/components/studio/icons";

/** What the price covers and what it doesn't, side by side. */
export default function Inclusions({ includes, excludes }: { includes: string[]; excludes: string[] }) {
  const columns = [
    { title: "Included", items: includes, icon: "check" as const, tone: "text-brand" },
    { title: "Not included", items: excludes, icon: "close" as const, tone: "text-muted" },
  ].filter((column) => column.items.length > 0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {columns.map((column) => (
        <div key={column.title} className="rounded-3xl border border-foreground/10 bg-background/60 p-6 backdrop-blur">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted">{column.title}</h3>
          <ul className="flex flex-col gap-3">
            {column.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Icon name={column.icon} size={16} className={`mt-0.5 shrink-0 ${column.tone}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
