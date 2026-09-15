"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const PAGE_LOADED_EVENT = "page:loaded";

/** Runs `callback` once the intro loader has lifted (immediately if it already has). */
export function onPageLoaded(callback: () => void) {
  if (document.documentElement.dataset.pageLoaded === "true") {
    callback();
    return () => {};
  }
  window.addEventListener(PAGE_LOADED_EVENT, callback, { once: true });
  return () => window.removeEventListener(PAGE_LOADED_EVENT, callback);
}

function markLoaded() {
  if (document.documentElement.dataset.pageLoaded === "true") return;
  document.documentElement.dataset.pageLoaded = "true";
  window.dispatchEvent(new Event(PAGE_LOADED_EVENT));
}

const MIN_VISIBLE_MS = 900;
const MAX_WAIT_MS = 4000;

interface PageLoaderProps {
  name: string;
}

// Visibility is owned by globals.css (`[data-page-loader]`): hidden without JS or
// with reduced motion, and force-hidden by a delayed keyframe if hydration stalls.
export default function PageLoader({ name }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === "undefined" || !root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markLoaded();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));

    const progress = { value: 0 };
    const render = () => {
      if (countRef.current) countRef.current.textContent = `${Math.round(progress.value)}%`;
      gsap.set(barRef.current, { scaleX: progress.value / 100 });
    };

    const ctx = gsap.context(() => {
      // Creep toward 90% while assets load; the last stretch waits for the page.
      gsap.to(progress, { value: 90, duration: 1.4, ease: "power2.out", onUpdate: render });
    }, root);

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    Promise.all([
      Promise.race([Promise.all([pageReady, document.fonts.ready]), wait(MAX_WAIT_MS)]),
      wait(MIN_VISIBLE_MS),
    ]).then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap
          .timeline()
          .to(progress, { value: 100, duration: 0.4, ease: "power1.out", overwrite: true, onUpdate: render })
          .to(root, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.15")
          // Let the hero start while the curtain is still rising.
          .call(markLoaded, [], "<0.35")
          .set(root, { display: "none" });
      });
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-page-loader
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex-col items-center justify-center gap-8 bg-background text-foreground print:hidden"
    >
      <span className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-none tracking-tight">
        {name}
        <span className="text-brand">.</span>
      </span>
      <div className="h-px w-48 overflow-hidden bg-foreground/15">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-brand" />
      </div>
      <span ref={countRef} className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tabular-nums">
        0%
      </span>
    </div>
  );
}
