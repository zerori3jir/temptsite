"use client";

import { useState } from "react";
import Image from "next/image";

type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string };

export default function ProjectCarousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-[55vh] bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm mb-16">
        No media yet
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const next = () => setIndex((i) => (i + 1) % media.length);

  return (
    <div className="mb-16">
      <div className="relative w-full h-[55vh] bg-neutral-100 overflow-hidden">

        {/* Render all items stacked — active one is opacity 1, rest are 0 */}
        {media.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-600"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                className="object-contain"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ))}

        {/* Prev / Next */}
        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-colors w-8 h-8 flex items-center justify-center text-neutral-900 text-sm z-10"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-colors w-8 h-8 flex items-center justify-center text-neutral-900 text-sm z-10"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {media.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i === index ? "bg-neutral-900" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
