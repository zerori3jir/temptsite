import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import ProjectCarousel from "../../components/ProjectCarousel";
import { projects } from "../data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Nav />

      <div className="animate-fade-up">
        <div className="max-w-4xl mx-auto px-8 pt-20 pb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-semibold mb-6" style={{ letterSpacing: "-0.03em" }}>
            {project.title}
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 border border-neutral-200 text-neutral-500 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {project.stats && (
            <div className="flex flex-wrap justify-center gap-12 mt-14 pt-12 border-t border-neutral-100">
              {project.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl sm:text-5xl font-semibold" style={{ letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 sm:px-16 md:px-32 lg:px-52 pb-16">
          <ProjectCarousel media={project.media ?? []} />
        </div>

        <div className="text-xl text-center">
          <p>{project.overview}</p>
        </div>
      </div>
    </>
  );
}
