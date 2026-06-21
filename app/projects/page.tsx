import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";
import { projects } from "./data";

export default function Projects() {
  return (
    <>
      <Nav />

      <main>
        <div className="max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-semibold tracking-tight mb-16">
          My Side Projects
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group">
              <div className="relative w-full aspect-video bg-neutral-100 mb-3 overflow-hidden">
                {p.thumbnail && (
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-500 transition-colors duration-300">
                {p.title}
              </p>
              <p className="text-xs text-neutral-400 mt-1">{p.description}</p>
            </Link>
          ))}
        </div>
        </div>
      </main>
    </>
  );
}
