"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const icons = [
  { src: "/icons/csharp.png" },
  { src: "/icons/cpp.png" },
  { src: "/icons/next.png" },
  { src: "/icons/js.png" },
  { src: "/icons/ts.png" },
  { src: "/icons/java.png" },
  { src: "/icons/tailwind.png" },
  { src: "/icons/mongo.png" },
];

export default function AnimatedIcons({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap gap-10 sm:gap-16 md:gap-20 items-center justify-center">
      {icons.map((icon, i) => (
        <div
          key={icon.src}
          className="transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transitionDelay: `${i * 80}ms`,
          }}
        >
          <div
            className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 ${dark ? "p-4 rounded-2xl bg-white/[0.06]" : ""}`}
          >
            <Image src={icon.src} alt="" fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
