"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string };

const AUTO_SCROLL_INTERVAL = 6000;

export default function ProjectCarousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % media.length);
    }, AUTO_SCROLL_INTERVAL);
  }, [media.length]);

  useEffect(() => {
    if (media.length <= 1 || paused) return;
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [media.length, paused, startAutoScroll]);

  // Sample left/right edge brightness of the current image to pick button color.
  // Uses a cancelled flag to discard stale onload callbacks from previous slides.
  useEffect(() => {
    let cancelled = false;
    const current = media[index];

    if (!current || current.type === "video") {
      setIsDark(true);
      return;
    }

    const img = new window.Image();
    img.src = current.src;
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        const size = 30;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let brightness = 0;
        let count = 0;

        ctx.drawImage(img, 0, img.naturalHeight * 0.35, img.naturalWidth * 0.08, img.naturalHeight * 0.3, 0, 0, size, size);
        const left = ctx.getImageData(0, 0, size, size).data;
        for (let i = 0; i < left.length; i += 4) {
          brightness += 0.299 * left[i] + 0.587 * left[i + 1] + 0.114 * left[i + 2];
          count++;
        }

        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, img.naturalWidth * 0.92, img.naturalHeight * 0.35, img.naturalWidth * 0.08, img.naturalHeight * 0.3, 0, 0, size, size);
        const right = ctx.getImageData(0, 0, size, size).data;
        for (let i = 0; i < right.length; i += 4) {
          brightness += 0.299 * right[i] + 0.587 * right[i + 1] + 0.114 * right[i + 2];
          count++;
        }

        if (!cancelled) setIsDark(brightness / count < 128);
      } catch {
        // Canvas tainted or unavailable — leave isDark as-is
      }
    };

    return () => { cancelled = true; };
  }, [media, index]);

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-[55vh] bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm mb-16">
        No media yet
      </div>
    );
  }

  const prev = () => { setIndex((i) => (i - 1 + media.length) % media.length); startAutoScroll(); };
  const next = () => { setIndex((i) => (i + 1) % media.length); startAutoScroll(); };

  const btnClass = isDark
    ? "bg-black/60 hover:bg-black text-white"
    : "bg-white/80 hover:bg-white text-neutral-900";

  return (
    <div className="mb-16">
      <div
        className="relative w-full h-[55vh] bg-neutral-100 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {media.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1000ms]"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {item.type === "image" ? (
              <Image src={item.src} alt={item.alt ?? ""} fill className="object-contain" />
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

        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-500 w-8 h-8 flex items-center justify-center text-sm z-10 ${btnClass}`}
            >
              ‹
            </button>
            <button
              onClick={next}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-500 w-8 h-8 flex items-center justify-center text-sm z-10 ${btnClass}`}
            >
              ›
            </button>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); startAutoScroll(); }}
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
