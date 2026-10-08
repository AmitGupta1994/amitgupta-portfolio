"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

import ArrowIcon from "@/components/ArrowIcon";
import MagneticButton from "@/components/MagneticButton";
import { onPageLoaded } from "@/components/PageLoader";
import type { HeroSlide } from "@/types/trekCompany";

const INTERVAL_MS = 7000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

interface HeroSliderProps {
  slides: HeroSlide[];
  /** The company name, shown above every slide. */
  brand: string;
}

/**
 * Full-screen hero slider: slides crossfade with a slow zoom, their copy rises in,
 * and the indicators fill as the timer runs. Autoplay pauses on hover, focus and a
 * hidden tab; under reduced motion it neither autoplays nor animates.
 */
export default function HeroSlider({ slides, brand }: HeroSliderProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  // Server render assumes motion; the client reads the real preference.
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);

  // Start once the page loader lifts, like the portfolio hero.
  useEffect(() => {
    if (reduced) return;
    return onPageLoaded(() => setPlaying(true));
  }, [reduced]);

  // Advance on a timer; the indicator's fill is a CSS animation of the same length.
  useEffect(() => {
    if (!playing || paused || count < 2) return;
    const timer = window.setTimeout(() => go(active + 1), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, paused, count, go]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Each time a slide becomes active: zoom its image out slowly and lift its copy in.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      const slide = `[data-slide="${active}"]`;
      gsap.fromTo(`${slide} [data-slide-image]`, { scale: 1.12 }, { scale: 1, duration: INTERVAL_MS / 1000 + 1.5, ease: "none" });
      gsap.fromTo(
        `${slide} [data-slide-copy] > *`,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out", delay: 0.25 }
      );
    }, root);
    return () => ctx.revert();
  }, [active, reduced]);

  if (count === 0) return null;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={`${brand} highlights`}
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(active + 1);
        if (event.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) go(active + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={index}
            data-slide={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <div data-slide-image className="absolute inset-0 will-change-transform">
              <Image
                src={slide.imageUrl}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Legibility: darken the left and bottom where the copy sits. */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="relative flex h-full items-center px-6 pb-24 pt-28 sm:px-10 lg:px-[calc(6vw+12px)]">
              <div data-slide-copy className="flex max-w-3xl flex-col gap-6">
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-brand">
                  {slide.eyebrow ?? brand}
                </p>
                {/* One h1 for the page: the first slide's title; the rest are h2. */}
                {index === 0 ? (
                  <h1 className="text-[clamp(2.75rem,7.5vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="text-[clamp(2.75rem,7.5vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]">
                    {slide.title}
                  </h2>
                )}
                {slide.description && (
                  <p className="max-w-xl text-[clamp(1.05rem,1.5vw,1.4rem)] font-medium leading-snug text-white/80">
                    {slide.description}
                  </p>
                )}
                {slide.cta && (
                  <div className="flex">
                    <MagneticButton strength={0.2}>
                      <Link
                        href={slide.cta.href}
                        tabIndex={isActive ? undefined : -1}
                        className="group inline-flex items-center gap-4 rounded-full bg-brand-deep py-2.5 pl-7 pr-2.5 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-black/30 transition-colors hover:bg-brand"
                      >
                        {slide.cta.label}
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                          <ArrowIcon className="h-5 w-5" />
                        </span>
                      </Link>
                    </MagneticButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 px-6 pb-8 sm:px-10 lg:px-[calc(6vw+12px)]">
          <div className="flex flex-1 gap-3" role="tablist" aria-label="Choose slide">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Slide ${index + 1}: ${slide.title}`}
                onClick={() => go(index)}
                className="group flex max-w-[220px] flex-1 flex-col gap-2 text-left"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                  <span
                    key={`${active}-${paused}-${playing}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-brand"
                    style={{
                      width: index < active || (index === active && (!playing || reduced)) ? "100%" : "0%",
                      animation:
                        index === active && playing && !reduced
                          ? `slider-fill ${INTERVAL_MS}ms linear forwards${paused ? " paused" : ""}`
                          : undefined,
                    }}
                  />
                </span>
                <span
                  className={`hidden truncate text-xs font-semibold uppercase tracking-widest transition-colors sm:block ${
                    index === active ? "text-white" : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")} · {slide.title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {[
              { label: "Previous slide", step: -1, flip: true },
              { label: "Next slide", step: 1, flip: false },
            ].map(({ label, step, flip }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => go(active + step)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:border-brand hover:bg-brand"
              >
                <span className={flip ? "-scale-x-100" : undefined}>
                  <ArrowIcon className="h-5 w-5 rotate-45" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
