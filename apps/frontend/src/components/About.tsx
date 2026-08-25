import ScrollReveal from "./ScrollReveal";

interface AboutProps {
  summary: string;
}

export default function About({ summary }: AboutProps) {
  return (
    <ScrollReveal id="about" direction="up" distance={25} className="scroll-mt-24">
      <section className="flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1 dark:text-neutral-400">
          About
        </h3>
        <p 
          className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </section>
    </ScrollReveal>
  );
}