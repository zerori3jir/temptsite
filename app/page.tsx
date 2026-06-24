import Link from "next/link";
import Nav from "./components/Nav";
import ScrollHint from "./components/ScrollHint";
import AnimatedIcons from "./components/AnimatedIcons";
import OpenProjectsButton from "./components/OpenProjectsButton";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <>
      <Nav transparent />
      <main>

        {/* Section is 56px taller than the viewport so the white content below is always off-screen at scroll=0 */}
        <section className="relative -mt-14" style={{ height: "calc(100dvh + 56px)" }}>
          <video
            src="/queensvidcut2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-top animate-slide-up"
            style={{ animationDelay: "0s" }}
          />
          <div className="absolute inset-0 bg-black/45" />
          {/* Content centred in the visible viewport area, not the extended section */}
          <div className="relative z-10 h-dvh flex flex-col items-center justify-center mt-[-8vh] text-center px-6">
            <h1
              className="text-6xl sm:text-8xl font-semibold text-white leading-none mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              Leo
            </h1>
            <p className="text-xs tracking-[0.2em] text-white/85 mb-10 font-light uppercase">
              Student at Queens University &nbsp;·&nbsp; Computing
            </p>
            <div className="flex gap-4">
              <OpenProjectsButton />
              <Link
                href="/contact"
                className="inline-flex px-15 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-200 [transition:background-color_500ms_ease] rounded-sm"
              >
                Contact Me
              </Link>
            </div>
          </div>
          <ScrollHint />
        </section>

        <div className="relative bg-white">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 1000"
          >
            <defs>
              <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0" />
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

          <section id="stack" className="border-t border-neutral-100 h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-6xl mx-auto px-8 w-full">
                <FadeIn>
                  <h2
                    className="text-5xl sm:text-6xl font-semibold text-black mb-20 text-center"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    My Tech Stack
                  </h2>
                  <AnimatedIcons />
                  <p className="text-sm text-neutral-400 text-center pt-14">and many more...</p>
                  <p className="text-center pt-10">
                    <Link href="/contact" className="text-sm font-medium text-neutral-900 hover:opacity-60 [transition:opacity_300ms_ease]">
                      Get in touch →
                    </Link>
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}
