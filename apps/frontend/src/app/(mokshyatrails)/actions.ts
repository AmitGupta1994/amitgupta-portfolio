'use server';

import type { BookingState } from '@/components/trekCompany/bookingState';
import { CUSTOM_DATE } from '@/components/trekCompany/bookingState';
import { requestBooking } from '@/content';

const SITE = 'mokshyatrails';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (formData: FormData, name: string, max = 200) =>
  String(formData.get(name) ?? '')
    .trim()
    .slice(0, max);

/** Validates a booking request and saves it under Booking requests in the admin. */
export async function submitBooking(_previous: BookingState, formData: FormData): Promise<BookingState> {
  // A filled honeypot is a bot: pretend success, store nothing.
  if (text(formData, 'website')) {
    return { status: 'success', message: 'Thank you — we will be in touch.', summary: '' };
  }

  const trekSlug = text(formData, 'trek', 100) || undefined;
  const departureChoice = text(formData, 'departure', 100);
  const preferredDate = text(formData, 'preferredDate', 10);
  const travellers = Number(formData.get('travellers'));
  const name = text(formData, 'name', 120);
  const email = text(formData, 'email', 200);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please tell us your name.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.';
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 20) errors.travellers = 'Between 1 and 20 travellers.';
  if (departureChoice === CUSTOM_DATE && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    errors.preferredDate = 'Pick the date you would like to start.';
  }
  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please check the highlighted fields.', errors };
  }

  const departure = departureChoice === CUSTOM_DATE ? `Private trek from ${preferredDate}` : departureChoice;

  let trekTitle: string;
  try {
    ({ trekTitle } = await requestBooking(SITE, {
      trekSlug,
      departure,
      travellers,
      name,
      email,
      phone: text(formData, 'phone', 60) || undefined,
      country: text(formData, 'country', 80) || undefined,
      message: text(formData, 'message', 2000) || undefined,
    }));
  } catch {
    return { status: 'error', message: 'We could not save your request. Please try again, or message us on WhatsApp.' };
  }

  return {
    status: 'success',
    message: 'Thank you — our team will confirm availability and the price by email.',
    summary: `${trekTitle} — ${departure}, ${travellers} ${travellers === 1 ? 'traveller' : 'travellers'}, ${name}`,
  };
}
