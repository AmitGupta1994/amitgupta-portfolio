import { Publication } from "@/types/publication";

// Derive the props from the single source of truth, omitting 'id' since it's just for the React key
type PublicationCardProps = Omit<Publication, 'id'>;

export default function PublicationCard({ title, authors, date, publisher }: PublicationCardProps) {
  return (
    <article className="pub-card flex flex-col gap-3 p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-neutral-400 mb-2">{date}</p>
        <h4 className="text-lg font-semibold text-neutral-900 leading-snug">{title}</h4>
      </div>
      
      <div className="mt-2 flex flex-col gap-1 text-sm text-neutral-600">
        <p>
          <span className="font-semibold text-neutral-700">Authors:</span> {authors}
        </p>
        <p>
          <span className="font-semibold text-neutral-700">Published in:</span> {publisher}
        </p>
      </div>
    </article>
  );
}