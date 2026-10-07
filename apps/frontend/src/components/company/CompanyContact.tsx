"use client";

import { useEffect, useState, type FormEvent } from "react";

import ArrowIcon from "@/components/ArrowIcon";
import ScrollReveal from "@/components/ScrollReveal";
import { mailtoHref } from "@/components/studio/contactLinks";
import { Icon } from "@/components/studio/icons";
import type { Profile } from "@/types/profile";
import SectionHeader from "./SectionHeader";

/** Fired by EngageButton to preselect an engagement model here. */
export const ENGAGE_EVENT = "company:engage";

const OTHER = "Not sure yet";

const field =
  "w-full rounded-xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand";
const label = "text-xs font-bold uppercase tracking-widest text-muted";

interface CompanyContactProps {
  contact: Profile["contact"];
  /** Engagement model names, offered in the "How would you like to work" select. */
  models: string[];
  services: string[];
}

/**
 * No mail backend: the form composes the enquiry and hands it to the visitor's
 * email app, so nothing is stored or sent from the server.
 */
export default function CompanyContact({ contact, models, services }: CompanyContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    model: models[0] ?? OTHER,
    service: services[0] ?? OTHER,
    budget: "",
    message: "",
  });

  useEffect(() => {
    const onEngage = (event: Event) => {
      const model = (event as CustomEvent<string>).detail;
      setForm((current) => ({ ...current, model }));
    };
    window.addEventListener(ENGAGE_EVENT, onEngage);
    return () => window.removeEventListener(ENGAGE_EVENT, onEngage);
  }, []);

  const set = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const details = [
      `Engagement: ${form.model}`,
      `Service: ${form.service}`,
      form.budget ? `Budget / timeline: ${form.budget}` : null,
      "",
      form.message,
      "",
      `— ${form.name}${form.company ? `, ${form.company}` : ""}`,
      form.email,
    ].filter((line) => line !== null);
    window.location.href = mailtoHref(contact.email, `Project enquiry: ${form.service} (${form.model})`, details.join("\n"));
  };

  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="Start a project"
        title="Let's build it"
        description="Tell us what you're building and how you'd like to work. You'll hear back from an engineer, not a sales script."
      />

      <ScrollReveal direction="up" distance={30} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-background/60 p-6 backdrop-blur md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className={label}>Name *</span>
              <input required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>Email *</span>
              <input required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@company.com" />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>Company</span>
              <input value={form.company} onChange={set("company")} className={field} placeholder="Optional" />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>Budget / timeline</span>
              <input value={form.budget} onChange={set("budget")} className={field} placeholder="e.g. 3 months, MVP" />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>How would you like to work?</span>
              <select value={form.model} onChange={set("model")} className={field}>
                {[...models, OTHER].map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>What do you need?</span>
              <select value={form.service} onChange={set("service")} className={field}>
                {[...services, OTHER].map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className={label}>About the project *</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={set("message")}
              className={`${field} resize-none`}
              placeholder="What are you building, who is it for, and where are you today?"
            />
          </label>
          <button
            type="submit"
            className="group inline-flex items-center gap-4 self-start rounded-full bg-brand-deep py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
          >
            Send enquiry
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
              <ArrowIcon className="h-4 w-4" />
            </span>
          </button>
        </form>

        <aside className="flex flex-col gap-4">
          {contact.email && <ContactRow icon="mail" label="Email" href={`mailto:${contact.email}`} text={contact.email} />}
          {contact.phone && (
            <ContactRow icon="phone" label="Phone" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} text={contact.phone} />
          )}
          {contact.whatsapp && <ContactRow icon="whatsapp" label="WhatsApp" href={contact.whatsapp} text="Message us" external />}
          {contact.linkedin && <ContactRow icon="linkedin" label="LinkedIn" href={contact.linkedin} text="Follow the company" external />}
          {contact.location && <ContactRow icon="pin" label="Based in" text={contact.location} />}
          <p className="rounded-3xl border border-brand/30 bg-brand/5 p-6 text-sm leading-relaxed text-muted">
            <strong className="mb-1 block text-foreground">Reply within one business day.</strong>
            Every enquiry is read by an engineer, who will come back with questions or a first estimate.
          </p>
        </aside>
      </ScrollReveal>
    </section>
  );
}

function ContactRow({
  icon,
  label: title,
  text,
  href,
  external,
}: {
  icon: "mail" | "phone" | "whatsapp" | "linkedin" | "pin";
  label: string;
  text: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-foreground/15 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className={`${label} block`}>{title}</span>
        <span className="block break-all font-semibold text-foreground">{text}</span>
      </span>
    </>
  );
  const className = "group flex items-center gap-4 rounded-3xl border border-foreground/10 bg-background/60 p-4 backdrop-blur transition-colors hover:border-brand";
  return href ? (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
