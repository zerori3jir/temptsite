"use client";

import { useState } from "react";

const EMAIL = "leo.chet1028@email.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 px-6 py-3 border border-neutral-200 hover:border-neutral-400 transition-colors duration-300"
    >
      <span className="text-sm text-neutral-600">{EMAIL}</span>
      <span
        className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-all duration-300"
        style={{ opacity: 1 }}
      >
        <span
          style={{
            display: "inline-block",
            opacity: copied ? 0 : 1,
            transition: "opacity 0.2s ease",
            position: copied ? "absolute" : "relative",
          }}
        >
          Copy
        </span>
        <span
          style={{
            display: "inline-block",
            opacity: copied ? 1 : 0,
            transition: "opacity 0.2s ease",
            position: copied ? "relative" : "absolute",
          }}
        >
          Copied!
        </span>
      </span>
    </button>
  );
}
