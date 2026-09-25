import Image from "next/image";
import type { Video } from "@/types/video";
import ScrollReveal from "./ScrollReveal";

interface VideoGalleryProps {
  videos: Video[];
  title?: string;
  description?: string;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/** Thumbnails that open YouTube, rather than embedded iframes: no third-party
 *  scripts on first load, and nothing to slow the page down. */
export default function VideoGallery({ videos, title = "Films", description }: VideoGalleryProps) {
  if (videos.length === 0) return null;

  return (
    <ScrollReveal direction="up" distance={30} stagger={0.1} className="w-full scroll-mt-24">
      <section className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {description && <p className="max-w-2xl text-sm text-muted md:text-base">{description}</p>}
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background/40 p-3 transition-colors hover:border-brand"
              >
                <span className="relative block aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={video.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-background shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon />
                    </span>
                  </span>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-foreground group-hover:text-brand">
                    {video.title}
                  </span>
                  {video.description && (
                    <span className="text-sm leading-relaxed text-muted">{video.description}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </ScrollReveal>
  );
}
