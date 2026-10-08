import type { Trek } from "./trek";

/** Content types only the trekking company (mokshyatrails) uses. */

export type Difficulty = "easy" | "moderate" | "challenging" | "strenuous";
export type DepartureStatus = "available" | "limited" | "full";

export interface Departure {
  /** ISO date. */
  startDate: string;
  endDate?: string;
  price?: string;
  status: DepartureStatus;
}

export interface ItineraryDay {
  day: string;
  title: string;
  description?: string;
}

/** A bookable trek: the personal trek's facts plus price, plan and dates. */
export interface TrekPackage extends Trek {
  difficulty: Difficulty;
  priceFrom?: string;
  groupSize?: string;
  featured: boolean;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  departures: Departure[];
}

export interface HeroSlide {
  imageUrl: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
}

/** What a client submits from a trek page. */
export interface BookingRequest {
  /** Empty when the client wants help choosing. */
  trekSlug?: string;
  departure: string;
  travellers: number;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
}
