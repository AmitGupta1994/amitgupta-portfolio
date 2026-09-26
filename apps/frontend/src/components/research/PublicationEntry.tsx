import type { Publication } from "@/types/publication";

interface PublicationEntryProps {
  publication: Publication;
  /** Bolded inside the author list. */
  authorName: string;
}

/** Venue above, title as the headline, authors below with your name in bold. */
export default function PublicationEntry({ publication, authorName }: PublicationEntryProps) {
  const surname = authorName.split(" ").slice(-1)[0];
  const authorParts = publication.authors.split(new RegExp(`(${surname},?\\s*[A-Z]\\.?)`, "i"));

  return (
    <article className="flex flex-col gap-1">
      <p className="text-xs uppercase tracking-wide text-muted">{publication.publisher}</p>
      <h3 className="text-lg font-bold leading-snug text-foreground">{publication.title}</h3>
      <p className="text-sm text-muted">
        {authorParts.map((part, index) =>
          new RegExp(`^${surname}`, "i").test(part.trim()) ? (
            <strong key={index} className="font-semibold text-foreground">
              {part}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
      <p className="text-xs text-muted">{publication.date}</p>
    </article>
  );
}
