import { expertiseData } from "@/data/expertise";
import ScrollReveal from "./ScrollReveal";

export default function ExpertiseSection() {
  return (
    <ScrollReveal id="expertise" direction="up" distance={30} stagger={0.12} className="scroll-mt-24">
      <section className="flex flex-col gap-6">
        <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold dark:text-neutral-400">
          Domain Expertise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-xl border border-neutral-200/80 bg-white p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
            >
              <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 flex-wrap">
                {item.domain}
                {item.years && (
                  <span className="text-xs font-medium text-neutral-600 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                    {item.years}
                  </span>
                )}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
