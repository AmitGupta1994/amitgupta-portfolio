import Image from "next/image";
import type { Photo } from "@/types/photo";
import ScrollReveal from "./ScrollReveal";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  description?: string;
}

/** Groups photos by album, keeping the CMS order inside each group. */
function byAlbum(photos: Photo[]): Array<{ album: string | undefined; photos: Photo[] }> {
  const groups: Array<{ album: string | undefined; photos: Photo[] }> = [];
  for (const photo of photos) {
    const current = groups.find((group) => group.album === photo.album);
    if (current) current.photos.push(photo);
    else groups.push({ album: photo.album, photos: [photo] });
  }
  return groups;
}

export default function PhotoGallery({ photos, title = "Photos", description }: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <ScrollReveal direction="up" distance={30} className="w-full scroll-mt-24">
      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {description && <p className="max-w-2xl text-sm text-muted md:text-base">{description}</p>}
        </div>

        {byAlbum(photos).map((group) => (
          <div key={group.album ?? "ungrouped"} className="flex flex-col gap-4">
            {group.album && (
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand">
                <span aria-hidden="true" className="h-px w-8 bg-brand" />
                {group.album}
              </h3>
            )}
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {group.photos.map((photo) => (
                <li
                  key={photo.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-foreground/10"
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? ""}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {(photo.caption || photo.location) && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {photo.caption}
                      {photo.location && <span className="block text-brand">{photo.location}</span>}
                    </figcaption>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </ScrollReveal>
  );
}
