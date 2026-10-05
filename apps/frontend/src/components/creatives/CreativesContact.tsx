"use client";

import { useState, type FormEvent } from "react";

import type { Profile } from "@/types/profile";
import { mailtoHref } from "./contactLinks";
import { Icon, type IconName } from "./icons";
import SectionHeading from "./SectionHeading";

type Contact = Profile["contact"];

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand";

/**
 * No mail backend: the form composes the enquiry and hands it to the visitor's
 * email app, so nothing is stored or sent from the server.
 */
export default function CreativesContact({ contact }: { contact: Contact }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const signature = [`— ${form.name}`, form.email, form.phone].filter(Boolean).join("\n");
    const body = `${form.message}\n\n${signature}`;
    window.location.href = mailtoHref(contact.email, `Project enquiry from ${form.name}`, body);
  };

  const socials: Array<{ name: IconName; label: string; href?: string }> = [
    { name: "instagram", label: "Instagram", href: contact.instagram },
    { name: "youtube", label: "YouTube", href: contact.youtube },
    { name: "facebook", label: "Facebook", href: contact.facebook },
    { name: "whatsapp", label: "WhatsApp", href: contact.whatsapp },
  ];
  const linked = socials.filter((social) => social.href);

  const set = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <section id="contact" className="scroll-mt-20 bg-surface py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          lead="Let's"
          accent="Connect"
          description="Ready to grow your brand? Tell us about your business and we'll get back to you."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <form onSubmit={submit} className="space-y-5 rounded-2xl border border-line bg-background p-8">
            <input required aria-label="Your name" placeholder="Your name *" value={form.name} onChange={set("name")} className={field} />
            <input
              required
              type="email"
              aria-label="Your email"
              placeholder="Your email *"
              value={form.email}
              onChange={set("email")}
              className={field}
            />
            <input type="tel" aria-label="Phone or WhatsApp" placeholder="Phone / WhatsApp" value={form.phone} onChange={set("phone")} className={field} />
            <textarea
              required
              aria-label="Your message"
              placeholder="What do you need help with? *"
              value={form.message}
              onChange={set("message")}
              className={`${field} min-h-[150px]`}
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              Send message
              <Icon name="send" size={18} />
            </button>
          </form>

          <div className="space-y-6">
            {contact.email && <ContactCard icon="mail" title="Email" href={`mailto:${contact.email}`} text={contact.email} />}
            {contact.phone && <ContactCard icon="phone" title="Phone" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} text={contact.phone} />}
            {contact.location && <ContactCard icon="pin" title="Studio" text={contact.location} />}

            {linked.length > 0 && (
              <div>
                <h3 className="mb-4 text-xl font-bold">Follow us</h3>
                <div className="flex gap-4">
                  {linked.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-xl border border-line bg-background p-4 transition-colors hover:border-brand hover:text-brand"
                    >
                      <Icon name={social.name} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6">
              <h3 className="mb-2 text-xl font-bold">Quick response</h3>
              <p className="text-muted">We usually reply within 24 hours. For anything urgent, call or message us directly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, href }: { icon: IconName; title: string; text: string; href?: string }) {
  return (
    <div className="flex items-start rounded-2xl border border-line bg-background p-6 transition-colors hover:border-brand">
      <span className="mr-4 rounded-lg bg-brand/10 p-3 text-brand">
        <Icon name={icon} />
      </span>
      <div>
        <h3 className="mb-1 font-bold">{title}</h3>
        {href ? (
          <a href={href} className="break-all text-muted transition-colors hover:text-brand">
            {text}
          </a>
        ) : (
          <p className="text-muted">{text}</p>
        )}
      </div>
    </div>
  );
}
