export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string };

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  github?: string;
  demo?: string;
  thumbnail?: string;
  media?: MediaItem[];
  overview: string;
  whatIBuilt: string;
  whatILearned: string;
};

export const projects: Project[] = [
  {
    slug: "leonwebsite",
    title: "This Website",
    description: "A personal website designed to showcase my projects.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    thumbnail: "/websitemedia/thumbnail.jpg",
    media: [{type: "video", src: "/websitemedia/sitevideo.mp4"}, {type:"image", src: "/websitemedia/thumbnail.jpg"}, {type:"image", src: "/websitemedia/tech.png"}],
    year: "2025",
    github: "https://github.com/yourusername/leonsite",
    demo: "https://yoursite.com",
    overview:
      "",
    whatIBuilt:
      "Walk through the main features. What were the interesting technical challenges and decisions?",
    whatILearned:
      "What did you take away? New technologies, better patterns, things you'd do differently?",
  },
];
