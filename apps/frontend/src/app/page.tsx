import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-12">
      <Hero />
      <Projects />
    </main>
  );
}