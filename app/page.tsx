import Link from "next/link";
import Nav from "./components/Nav";
import AnimatedIcons from "./components/AnimatedIcons";

export default function Home() {
  return (
    <>
      <Nav />

      <main>

        <section className="relative h-[80vh]">
          <video
            src="/queensvidcut2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-top animate-slide-up"
            style={{ animationDelay: "0s" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 sm:pb-60 md:pb-140 text-center px-6">
            <h1 className="text-6xl sm:text-8xl font-semibold tracking-tight text-white leading-none mb-4">
              Leo - Tempt
            </h1>
            <p className="text-sm tracking-widest uppercase text-white/70 mb-10">
              Student at Queens University &nbsp;·&nbsp; Computing
            </p>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="inline-flex px-15 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 duration-500 [transition:background-color_500ms_ease] rounded-sm"
              >
                My Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex px-15 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-300 transition-colors duration-500 rounded-sm"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 1000"
          >
            <defs>
              <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="fadeMask">
                <rect width="1440" height="1000" fill="url(#fade)" />
              </mask>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g mask="url(#fadeMask)" opacity="0.55">
              <line x1="0" y1="0" x2="560" y2="1000" stroke="hsl(0, 60%, 60%)" strokeWidth="1.5" filter="url(#glow)" className="animate-rgb" />
              <line x1="1440" y1="0" x2="880" y2="1000" stroke="hsl(180, 60%, 60%)" strokeWidth="1.5" filter="url(#glow)" className="animate-rgb-complement" />
              <line x1="0" y1="0" x2="560" y2="1000" stroke="hsl(0, 60%, 60%)" strokeWidth="1.5" filter="url(#glow)" className="animate-rgb" opacity="0.5" />
              <line x1="1440" y1="0" x2="880" y2="1000" stroke="hsl(180, 60%, 60%)" strokeWidth="1.5" filter="url(#glow)" className="animate-rgb-complement" opacity="0.5" />
            </g>
          </svg>

          <section className="border-t border-neutral-100 py-16">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-6xl font-semibold tracking-tight text-black mb-12 text-center">My Tech Stack</h2>
              <AnimatedIcons />
              <p className="text-s text-neutral-400 text-center pt-15">And many more...</p>
            </div>
          </section>

          <section id="contact" className="border-t border-neutral-100 py-24">
          </section>
        </div>

      </main>
    </>
  );
}
