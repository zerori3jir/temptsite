"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { projects } from "../projects/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-neutral-100 relative z-50">
        <nav className="w-full px-8 h-14 flex items-center">
          <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900">
            TEMPT
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-2 text-sm font-bold text-neutral-900 absolute left-1/2 -translate-x-1/2">
            <li
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link
                href="/projects"
                className="px-4 py-1.5 rounded hover:bg-neutral-100 transition-colors duration-300 block"
              >
                My Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="px-4 py-1.5 rounded hover:bg-neutral-100 transition-colors duration-300 block"
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
          className={`hidden md:grid absolute left-0 right-0 bg-white border-b border-neutral-200 shadow-lg transition-all duration-630 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-6xl mx-auto px-8 py-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group"
                    onClick={() => setOpen(false)}
                  >
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
                    <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-500 transition-colors">
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
        className={`fixed inset-0 bg-white z-[100] flex flex-col transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
        <nav className="flex flex-col px-8 pt-10 gap-6">
          <Link
            href="/projects"
            className="text-3xl font-semibold text-neutral-900"
            onClick={() => setMobileOpen(false)}
          >
            My Projects
          </Link>
          <Link
            href="/contact"
            className="text-3xl font-semibold text-neutral-900"
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
