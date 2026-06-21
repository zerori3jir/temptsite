import { notFound } from "next/navigation";
import Link from "next/link";
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

      {/* Title + description + stack */}
      <div className="max-w-4xl mx-auto px-8 pt-20 pb-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Carousel with padding */}
      <div className="px-4 sm:px-16 md:px-32 lg:px-52 pb-16">
        <ProjectCarousel media={project.media ?? []} />
      </div>

        <div className="text-xl text-center">
            <p>{project.overview}</p>
        </div>
    </>
  );
}
