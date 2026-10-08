import { Icon } from "@/components/studio/icons";
import type { Profile } from "@/types/profile";

type Row = { icon: "mail" | "phone" | "whatsapp" | "pin"; label: string; text: string; href?: string };

/** The company's direct lines, beside the trek request form. */
export default function ContactRows({ contact }: { contact: Profile["contact"] }) {
  const rows: Row[] = [];
  if (contact.email) rows.push({ icon: "mail", label: "Email", text: contact.email, href: `mailto:${contact.email}` });
  if (contact.phone) rows.push({ icon: "phone", label: "Phone", text: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` });
  if (contact.whatsapp) rows.push({ icon: "whatsapp", label: "WhatsApp", text: "Chat with a trek leader", href: contact.whatsapp });
  if (contact.location) rows.push({ icon: "pin", label: "Office", text: contact.location });

  const className =
    "group flex items-center gap-4 rounded-3xl border border-foreground/10 bg-background/60 p-4 backdrop-blur transition-colors hover:border-brand";

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => {
        const body = (
          <>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-foreground/15 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <Icon name={row.icon} size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-widest text-muted">{row.label}</span>
              <span className="block break-all font-semibold text-foreground">{row.text}</span>
            </span>
          </>
        );
        const external = row.href?.startsWith("http");
        return row.href ? (
          <a key={row.label} href={row.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className}>
            {body}
          </a>
        ) : (
          <div key={row.label} className={className}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
