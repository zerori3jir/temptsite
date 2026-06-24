"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { projects } from "../projects/data";

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-projects-nav", handler);
    return () => window.removeEventListener("open-projects-nav", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open && !hasAnimated.current) {
      hasAnimated.current = true;
      setTimeout(() => setItemsVisible(true), 250);
    }
  }, [open]);

  return (
    <>
      <header onMouseLeave={() => setOpen(false)} className={`border-b sticky top-0 z-50 ${open ? "transition-all duration-[630ms]" : "transition-all duration-500"} ${
        open
          ? "bg-white border-transparent"
          : scrolled || !transparent
            ? "bg-white/95 backdrop-blur-sm border-neutral-200 shadow-sm"
            : "bg-transparent border-transparent"
      }`}>
        <nav className="w-full px-8 h-14 flex items-center relative z-10">
          <Link onMouseEnter={() => setOpen(false)} href="/" className={`text-sm font-semibold tracking-tight ${open ? "text-neutral-900" : `transition-colors duration-500 ${scrolled || !transparent ? "text-neutral-900" : "text-white"}`}`}>
            TEMPT
          </Link>

          {/* Desktop links */}
          <ul className={`hidden md:flex gap-2 text-sm font-semibold absolute left-1/2 -translate-x-1/2 ${open ? "text-neutral-900" : `transition-colors duration-500 ${scrolled || !transparent ? "text-neutral-900" : "text-white"}`}`}>
            <li>
              <button
                onMouseEnter={() => setOpen(true)}
                onClick={() => setOpen((o) => !o)}
                className={`px-4 py-1.5 [transition:background-color_300ms_ease] rounded-sm block ${scrolled || !transparent || open ? "hover:bg-[#efefef]" : "hover:bg-white/15"}`}
              >
                My Projects
              </button>
            </li>
            <li onMouseEnter={() => setOpen(false)}>
              <Link
                href="/contact"
                className={`px-4 py-1.5 [transition:background-color_300ms_ease] rounded-sm block ${scrolled || !transparent || open ? "hover:bg-[#efefef]" : "hover:bg-white/15"}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-5 h-px bg-neutral-900 block" />
            <span className="w-5 h-px bg-neutral-900 block" />
            <span className="w-5 h-px bg-neutral-900 block" />
          </button>
        </nav>

        {/* Desktop mega menu */}
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className={`hidden md:grid absolute left-0 right-0 bg-white border-b border-neutral-200 shadow-sm transition-all duration-[630ms] ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 pointer-events-auto" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-6xl mx-auto px-8 py-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
                {projects.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group"
                    onClick={() => setOpen(false)}
                    style={{
                      opacity: itemsVisible ? 1 : 0,
                      transform: itemsVisible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.7s ease ${i * 90}ms, transform 0.7s ease ${i * 90}ms`,
                    }}
                  >
                    <div className="relative w-full aspect-video bg-neutral-900 mb-3 overflow-hidden">
                      {p.thumbnail && (
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 group-hover:opacity-60 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">{p.description}</p>
                  </Link>
                ))}
            </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex flex-col transition-all duration-500 ease-in-out md:hidden ${
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-8 h-14 border-b border-neutral-100">
          <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900" onClick={() => setMobileOpen(false)}>
            TEMPT
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-2xl text-neutral-900 leading-none"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-8 pt-10">
          <button
            className="text-3xl font-semibold text-neutral-900 text-left py-5 border-b border-neutral-100"
            onClick={() => { setMobileOpen(false); }}
          >
            My Projects
          </button>
          <Link
            href="/contact"
            className="text-3xl font-semibold text-neutral-900 py-5 border-b border-neutral-100 block"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Project thumbnails */}
        <div className="px-8 pt-10">
          <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">Projects</p>
          <div className="grid grid-cols-2 gap-6">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group"
                onClick={() => setMobileOpen(false)}
              >
                <div className="relative w-full aspect-video bg-neutral-100 mb-2 overflow-hidden">
                  {p.thumbnail && (
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-neutral-900">{p.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
