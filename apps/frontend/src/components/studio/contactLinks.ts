import type { Profile } from "@/types/profile";

type Contact = Profile["contact"];

/** wa.me link with a prefilled message, or undefined when no WhatsApp is set. */
export function whatsappHref(contact: Contact, message: string): string | undefined {
  if (!contact.whatsapp) return undefined;
  const separator = contact.whatsapp.includes("?") ? "&" : "?";
  return `${contact.whatsapp}${separator}text=${encodeURIComponent(message)}`;
}

export function mailtoHref(email: string, subject: string, body = ""): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
}

/** The message that opens a conversation, naming the package when there is one. */
export function enquiryMessage(packageName?: string): string {
  return packageName
    ? `Hi! I'm interested in your ${packageName} package and would like to know more.`
    : "Hi! I'd like to talk about marketing and branding for my business.";
}

/** Same-page anchors: "/#work" → "#work", so nav works on the subdomain and on /creatives. */
export function sectionHref(href: string): string {
  return href.startsWith("/#") ? href.slice(1) : href;
}
