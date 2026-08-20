import { expertiseData } from "@/data/expertise";

export default function ExpertiseSection() {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
        Domain Expertise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {expertiseData.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h4 className="text-lg text-neutral-900 flex items-center gap-2 flex-wrap">
              {item.domain}
              {item.years && (
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  ({item.years})
                </span>
              )}
            </h4>
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

