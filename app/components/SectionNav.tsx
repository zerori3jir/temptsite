"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Projects", href: "#", action: "projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "/contact" },
];

export default function SectionNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.75;
      setVisible(window.scrollY > heroHeight);

      const stack = document.getElementById("stack");
      if (stack && window.scrollY >= stack.offsetTop - 100) {
        setActive("stack");
      } else {
        setActive("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (action?: string) => {
    if (action === "projects") {
      window.dispatchEvent(new CustomEvent("open-projects-nav"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-14 left-0 right-0 z-40 flex justify-center transition-all duration-500 pointer-events-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <nav className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full px-2 py-1.5 shadow-sm">
        {links.map((link) => {
          const isActive = active === link.href?.replace("#", "");
          return link.action ? (
            <button
              key={link.label}
              onClick={() => handleClick(link.action)}
              className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
