import type { Profile } from "@/types/profile";

/** Quiet close: contact line and a link back to the main portfolio. */
interface ResearchFooterProps {
  name: string;
  contact: Profile["contact"];
  /** Absolute URL: a relative "/" would loop back to this site on its subdomain. */
  mainSiteUrl?: string;
}

export default function ResearchFooter({ name, contact, mainSiteUrl }: ResearchFooterProps) {
  return (
    <footer className="mx-auto max-w-4xl px-6 pb-16">
      <div className="grid gap-3 border-t border-foreground/10 pt-6 md:grid-cols-12 md:gap-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-foreground md:col-span-4 md:text-right">
          Contact
        </h2>
        <div className="flex flex-col gap-2 text-sm text-muted md:col-span-8">
          <a href={`mailto:${contact.email}`} className="text-brand underline underline-offset-4">
            {contact.email}
          </a>
          {contact.location && <p>{contact.location}</p>}
          <p className="pt-4 text-xs">
            © {new Date().getFullYear()} {name}
            {mainSiteUrl && (
              <>
                {" · "}
                <a href={mainSiteUrl} className="underline underline-offset-4 hover:text-brand">
                  Main portfolio
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
