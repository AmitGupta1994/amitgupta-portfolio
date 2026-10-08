"use client";

import { useActionState, useEffect, useState } from "react";

import ArrowIcon from "@/components/ArrowIcon";
import { Icon } from "@/components/studio/icons";
import { whatsappHref } from "@/components/studio/contactLinks";
import type { Profile } from "@/types/profile";
import type { Departure } from "@/types/trekCompany";
import { BOOK_EVENT, CUSTOM_DATE, initialBookingState, type BookingState } from "./bookingState";
import { departureLabel } from "./format";

const field =
  "w-full rounded-xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand aria-[invalid=true]:border-rose-500";
const labelClass = "text-xs font-bold uppercase tracking-widest text-muted";

interface BookingFormProps {
  action: (state: BookingState, formData: FormData) => Promise<BookingState>;
  contact: Profile["contact"];
  /** Booking one trek (its page) — or, without it, choosing from `treks` (the home page). */
  trek?: { slug: string; title: string; priceFrom?: string };
  treks?: Array<{ slug: string; title: string }>;
  departures?: Departure[];
}

/**
 * The booking request: a fixed departure or the client's own date, group size and
 * contact details. It is saved for the team (Booking requests in the admin); the
 * confirmation offers WhatsApp to speed things up.
 */
export default function BookingForm({ action, contact, trek, treks = [], departures = [] }: BookingFormProps) {
  const [state, formAction, pending] = useActionState(action, initialBookingState);
  const open = departures.filter((departure) => departure.status !== "full");
  const [departure, setDeparture] = useState(open[0] ? departureLabel(open[0]) : CUSTOM_DATE);

  useEffect(() => {
    const onBook = (event: Event) => setDeparture((event as CustomEvent<string>).detail);
    window.addEventListener(BOOK_EVENT, onBook);
    return () => window.removeEventListener(BOOK_EVENT, onBook);
  }, []);

  const error = (name: string) => state.errors?.[name];
  const invalid = (name: string) => (error(name) ? true : undefined);
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === "success") {
    const followUp = whatsappHref(contact, `Hi! I've just sent a booking request: ${state.summary}`);
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl border border-brand/40 bg-brand/5 p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
          <Icon name="check" size={22} />
        </span>
        <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Request received</h3>
        <p className="text-sm leading-relaxed text-muted">
          {state.message} <span className="font-semibold text-foreground">{state.summary}</span>
        </p>
        {followUp && (
          <a
            href={followUp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#128C7E]"
          >
            <Icon name="whatsapp" size={18} />
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {trek ? (
        <input type="hidden" name="trek" value={trek.slug} />
      ) : (
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Trek</span>
          <select name="trek" defaultValue="" className={field}>
            <option value="">Not sure yet — help me choose</option>
            {treks.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_8rem]">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Departure</span>
          <select name="departure" value={departure} onChange={(event) => setDeparture(event.target.value)} className={field}>
            {open.map((option) => {
              const label = departureLabel(option);
              return (
                <option key={option.startDate} value={label}>
                  {label}
                  {option.status === "limited" ? " — few seats left" : ""}
                </option>
              );
            })}
            <option value={CUSTOM_DATE}>My own date (private trek)</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Travellers</span>
          <input name="travellers" type="number" min={1} max={20} defaultValue={2} required aria-invalid={invalid("travellers")} className={field} />
        </label>
      </div>
      {departure === CUSTOM_DATE && (
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Preferred start date *</span>
          <input name="preferredDate" type="date" min={today} aria-invalid={invalid("preferredDate")} className={field} />
          {error("preferredDate") && <span className="text-xs font-semibold text-rose-500">{error("preferredDate")}</span>}
        </label>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Full name *</span>
          <input name="name" autoComplete="name" required aria-invalid={invalid("name")} className={field} />
          {error("name") && <span className="text-xs font-semibold text-rose-500">{error("name")}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email *</span>
          <input name="email" type="email" autoComplete="email" required aria-invalid={invalid("email")} className={field} />
          {error("email") && <span className="text-xs font-semibold text-rose-500">{error("email")}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Phone / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Country</span>
          <input name="country" autoComplete="country-name" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Anything we should know?</span>
        <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="Fitness, dietary needs, extra days in Kathmandu…" />
      </label>

      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm font-semibold text-rose-500">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center justify-between gap-4 rounded-full bg-brand-deep py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending…" : trek ? `Request to book ${trek.title}` : "Send trek request"}
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </button>
      <p className="text-xs text-muted">No payment now — we confirm availability and the final price by email.</p>
    </form>
  );
}
