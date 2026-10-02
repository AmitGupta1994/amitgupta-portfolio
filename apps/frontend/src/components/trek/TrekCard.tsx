import Image from "next/image";
import Link from "next/link";
import type { Trek } from "@/types/trek";
import ArrowIcon from "../ArrowIcon";
import TrekStats from "./TrekStats";

/** Card on the trek home page, linking to that trek's own page. */
export default function TrekCard({ trek }: { trek: Trek }) {
  return (
    <Link
      href={`/trek/${trek.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background/40 p-4 transition-colors hover:border-brand"
    >
      {trek.heroImageUrl && (
        <span className="relative block aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={trek.heroImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>
      )}

      <span className="flex items-start justify-between gap-3">
        <span className="text-xl font-black uppercase tracking-tight text-foreground group-hover:text-brand">
          {trek.title}
        </span>
        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-hover:rotate-45">
          <ArrowIcon />
        </span>
      </span>

      <TrekStats trek={trek} />

      <span className="text-sm leading-relaxed text-muted">{trek.summary}</span>
    </Link>
  );
}
