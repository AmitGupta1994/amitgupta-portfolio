import { Publication } from "@/types/publication";

type PublicationCardProps = Omit<Publication, 'id'>;

export default function PublicationCard({ title, authors, date, publisher }: PublicationCardProps) {
  return (
    <article className="pub-card flex flex-col gap-3 p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-xs transition-all hover:border-neutral-300 hover:shadow-md dark:bg-neutral-900/60 dark:border-neutral-800 dark:hover:border-neutral-700">
      <div>
        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">{date}</p>
        <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{title}</h4>
      </div>
      
      <div className="mt-1 flex flex-col gap-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">Authors:</span> {authors}
        </p>
        <p>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">Published in:</span> {publisher}
        </p>
      </div>
    </article>
  );
}