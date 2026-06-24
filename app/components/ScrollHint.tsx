"use client";

import { useState } from "react";

export default function ScrollHint() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll down"
      className="absolute bottom-[calc(2.5rem+56px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint cursor-pointer z-20"
    >
      <div
        style={{
          width: "1.5px",
          height: "40px",
          background: `linear-gradient(to bottom, transparent, ${hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)"})`,
          transition: "background 300ms ease",
        }}
      />
      <svg
        width="14" height="8" viewBox="0 0 14 8" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: hovered ? "scale(1.3)" : "scale(1)",
          transition: "transform 300ms ease",
        }}
      >
        <path d="M1 1L7 7L13 1" stroke="white" strokeOpacity={hovered ? 1 : 0.9} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
