import { expertiseData } from "@/data/expertise";

export default function ExpertiseSection() {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-2xl uppercase font-bold tracking-widest text-neutral-900">
        Domain Expertise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {expertiseData.map((item, index) => {
          // Splitting title to make the years subtle
          const titleMatch = item.title.match(/(.*?)\s*(\(.*?\))/);
          const domain = titleMatch ? titleMatch[1] : item.title;
          const years = titleMatch ? titleMatch[2] : "";

          return (
            <div key={index} className="flex flex-col gap-2">
              <h4 className="text-lg  text-neutral-900 flex items-center gap-2 flex-wrap">
                {domain}
                {years && <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{years}</span>}
              </h4>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
