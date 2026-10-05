/**
 * The studio layout serves two sites: a person's own practice (creatives) and a
 * company (Voxelate). Everything the CMS doesn't hold but that changes with who
 * is speaking — "I" or "we" — lives here.
 */
export type Voice = "personal" | "company";

export interface VoiceCopy {
  servicesLead: string;
  packagesDescription: string;
  workLead: string;
  workDescription: string;
  workLink: string;
  reviewsDescription: string;
  teamDescription: string;
  clientsTitle: string;
  dialogPrompt: string;
  contactDescription: string;
  responseNote: string;
  followTitle: string;
  locationTitle: string;
}

export const VOICE: Record<Voice, VoiceCopy> = {
  personal: {
    servicesLead: "What I",
    packagesDescription: "Pick a starting point — I tailor every plan once we talk.",
    workLead: "My",
    workDescription: "Campaigns, reels and films I've made — explore by category.",
    workLink: "View my work",
    reviewsDescription: "What clients say about working with me.",
    teamDescription: "",
    clientsTitle: "Brands I've worked with",
    dialogPrompt: "choose how you'd like to reach me.",
    contactDescription: "Tell me about your business and I'll get back to you.",
    responseNote: "I usually reply within 24 hours. For anything urgent, call or message me directly.",
    followTitle: "Follow me",
    locationTitle: "Based in",
  },
  company: {
    servicesLead: "What we",
    packagesDescription: "Pick a starting point — every plan is tailored once we talk.",
    workLead: "Our",
    workDescription: "Campaigns, reels and films from our studio — explore by category.",
    workLink: "View our work",
    reviewsDescription: "Our results, in our clients' words.",
    teamDescription: "The strategists, designers and creators behind the work.",
    clientsTitle: "Trusted by",
    dialogPrompt: "choose how you'd like to reach our team.",
    contactDescription: "Tell us about your business and our team will get back to you.",
    responseNote: "Our team replies within one business day. For anything urgent, call or message us directly.",
    followTitle: "Follow us",
    locationTitle: "Office",
  },
};
