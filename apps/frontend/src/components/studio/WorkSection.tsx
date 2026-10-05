"use client";

import { useEffect, useState } from "react";

import ScrollReveal from "@/components/ScrollReveal";
import type { Video } from "@/types/video";
import { Icon } from "./icons";
import SectionHeading from "./SectionHeading";
import type { VoiceCopy } from "./voice";

const UNGROUPED = "Featured";

/** Groups videos by album, keeping the CMS order of first appearance. */
export function groupByAlbum(videos: Video[]): Array<{ album: string; videos: Video[] }> {
  const groups = new Map<string, Video[]>();
  for (const video of videos) {
    const album = video.album?.trim() || UNGROUPED;
    groups.set(album, [...(groups.get(album) ?? []), video]);
  }
  return Array.from(groups, ([album, items]) => ({ album, videos: items }));
}

const isVertical = (video: Video) => video.url.includes("/shorts/");

/** Thumbnail first; the YouTube player loads only once someone presses play. */
function VideoTile({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const vertical = isVertical(video);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-brand ${
        vertical ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 h-full w-full" aria-label={`Play ${video.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnails */}
          <img src={video.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 transition-transform group-hover:scale-110">
              <Icon name="play" size={22} />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-sm font-semibold text-white">
            {video.title}
          </span>
        </button>
      )}
    </div>
  );
}

/** One card per album; opening one shows its videos full screen. */
export default function WorkSection({ videos, copy }: { videos: Video[]; copy: VoiceCopy }) {
  const albums = groupByAlbum(videos);
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const current = albums.find((group) => group.album === openAlbum);

  useEffect(() => {
    if (!current) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenAlbum(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [current]);

  const allVertical = current?.videos.every(isVertical);

  return (
    <section id="work" className="scroll-mt-20 bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading lead={copy.workLead} accent="Work" description={copy.workDescription} />

        <ScrollReveal stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((group) => (
            <button
              key={group.album}
              type="button"
              onClick={() => setOpenAlbum(group.album)}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-line bg-background text-left transition-colors hover:border-brand"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnails */}
              <img
                src={group.videos[0].thumbnailUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center">
                <span className="text-3xl font-bold text-white transition-colors group-hover:text-brand">{group.album}</span>
                <span className="mt-1 text-sm text-white/70">
                  {group.videos.length} {group.videos.length === 1 ? "video" : "videos"}
                </span>
              </span>
            </button>
          ))}
        </ScrollReveal>
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={`${current.album} videos`} className="fixed inset-0 z-[60] overflow-y-auto bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-bold">
                {current.album} <span className="text-brand">Videos</span>
              </h3>
              <button
                type="button"
                onClick={() => setOpenAlbum(null)}
                aria-label="Close"
                autoFocus
                className="rounded-full p-2 text-brand transition-colors hover:bg-brand/10"
              >
                <Icon name="close" size={30} />
              </button>
            </div>

            <div
              className={`grid gap-6 ${
                allVertical ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {current.videos.map((video) => (
                <VideoTile key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
