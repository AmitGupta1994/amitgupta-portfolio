import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <main id="home" className="mx-auto max-w-5xl px-6 py-6 sm:px-12">
        <section className="flex min-h-[70vh] flex-col justify-center py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Software Engineer
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
            Building thoughtful digital experiences.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            I create modern web applications with clean architecture, thoughtful UX, and polished interactions.
          </p>
        </section>
      </main>
    </>
  );
}
