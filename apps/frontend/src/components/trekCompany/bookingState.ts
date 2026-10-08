/** What the booking server action returns to the form. */
export interface BookingState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name → what's wrong with it. */
  errors?: Record<string, string>;
  /** Echoed back on success, for the confirmation and the WhatsApp follow-up. */
  summary?: string;
}

export const initialBookingState: BookingState = { status: "idle" };

/** Fired by a departure's "Book" button to preselect that date in the form. */
export const BOOK_EVENT = "mokshyatrails:book";

/** The departure value meaning "the client will give their own date". */
export const CUSTOM_DATE = "custom";
