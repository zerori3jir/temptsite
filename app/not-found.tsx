import Link from "next/link";
import Nav from "./components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-8">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-4">404</p>
        <h1 className="text-5xl font-semibold mb-6" style={{ letterSpacing: "-0.03em" }}>
          Page not found.
        </h1>
        <Link
          href="/"
          className="inline-flex px-10 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 [transition:background-color_500ms_ease] rounded-sm"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
