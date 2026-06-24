import Nav from "@/app/components/Nav";
import CopyEmail from "@/app/components/CopyEmail";

export default function ContactPage() {
    return (
        <>
            <Nav />

            <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden">

                {/* RGB lines */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 1000"
                >
                    <defs>
                        <linearGradient id="fade-contact" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="50%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                        <mask id="fadeMask-contact">
                            <rect width="1440" height="1000" fill="url(#fade-contact)" />
                        </mask>
                        <filter id="glow-contact" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <g mask="url(#fadeMask-contact)" opacity="0.55">
                        <line x1="0" y1="0" x2="560" y2="1000" stroke="hsl(0, 60%, 60%)" strokeWidth="1.5" filter="url(#glow-contact)" className="animate-rgb" />
                        <line x1="1440" y1="0" x2="880" y2="1000" stroke="hsl(180, 60%, 60%)" strokeWidth="1.5" filter="url(#glow-contact)" className="animate-rgb-complement" />
                        <line x1="0" y1="0" x2="560" y2="1000" stroke="hsl(0, 60%, 60%)" strokeWidth="1.5" filter="url(#glow-contact)" className="animate-rgb" opacity="0.5" />
                        <line x1="1440" y1="0" x2="880" y2="1000" stroke="hsl(180, 60%, 60%)" strokeWidth="1.5" filter="url(#glow-contact)" className="animate-rgb-complement" opacity="0.5" />
                    </g>
                </svg>

                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8 animate-fade-up">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                        <span className="text-xs text-neutral-400 tracking-[0.06em]">Open to internships · Summer 2026</span>
                    </div>
                    <h1 className="text-5xl font-semibold mb-8" style={{ letterSpacing: "-0.03em" }}>Let's get in touch.</h1>
                    <a
                        href="https://mail.google.com/mail/?view=cm&to=leo.chet1028@email.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-15 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 duration-500 [transition:background-color_500ms_ease] rounded-sm"
                    >
                        Send me an Email
                    </a>
                    <p className="text-xs text-neutral-400 tracking-widest uppercase mt-2">or copy my email</p>
                    <CopyEmail />
                </div>
            </div>
        </>
    );
}
