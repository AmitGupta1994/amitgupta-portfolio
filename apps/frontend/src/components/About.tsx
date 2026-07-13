interface AboutProps {
  summary: string;
}

export default function About({ summary }: AboutProps) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold mb-2">
        About
      </h3>
      <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-4xl">
        {summary}
      </p>
    </section>
  );
}