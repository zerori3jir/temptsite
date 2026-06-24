"use client";

export default function OpenProjectsButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("open-projects-nav"));
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex px-15 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-black [transition:background-color_500ms_ease] rounded-sm"
    >
      My Projects
    </button>
  );
}
