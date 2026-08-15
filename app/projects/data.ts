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
  stats?: { value: string; label: string }[];
  platforms?: string[];
};

export const projects: Project[] = [
  {
    slug: "chopstickhouse",
    title: "Chopstick House London",
    description: "Restaurant website and order management system for a London Chinese restaurant",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "React Native", "Vercel", "Google API"],
    thumbnail: "/chopstick/chopstickmenu.png",
    media: [
      { type: "image", src: "/chopstick/chopstickmainpage.png" },
      { type: "image", src: "/chopstick/chopstickmenu.png" },
      { type: "image", src: "/chopstick/chopsticksignin.png" },
      { type: "image", src: "/chopstick/chopstickcart.png" },
      { type: "image", src: "/chopstick/chopstickcheckout.png" },
      { type: "image", src: "/chopstick/chopstickconfirmorder.png" },
      { type: "image", src: "/chopstick/chopstickincoming.png" },
      { type: "image", src: "/chopstick/chopstickaccepted.png" },
    ],
    year: "2025",
    demo: "https://chopstickhouselondon.com",
    overview: "",
    whatIBuilt: "",
    whatILearned: "",
    stats: [
      { value: "500+", label: "Orders Processed" },
      { value: "Live", label: "In Production" },
      { value: "Ongoing", label: "Maintenance" },
    ],
    platforms: ["Customer Website", "Employee App"],
  },
  {
    slug: "splittrip",
    title: "Split Trip",
    description: "An application designed to split finances with friends during trips",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "C#", "ASP.Net", "MongoDB", "Electron", "Vercel"],
    thumbnail: "/splittrip/landingpage.png",
    media: [{type: "image", src: "/splittrip/landingpage.png"}, {type:"image", src: "/splittrip/trippage.png"}, {type:"image", src: "/splittrip/Join.png"}, {type:"image", src: "/splittrip/edittransaction.png"}, {type:"image", src: "/splittrip/Settings.png"}, {type:"image", src: "/splittrip/settlesection.png"}],
    year: "2025",
    github: "https://github.com/yourusername/leonsite",
    demo: "https://yoursite.com",
    overview: "",
    whatIBuilt: "Walk through the main features. What were the interesting technical challenges and decisions?",
    whatILearned: "What did you take away? New technologies, better patterns, things you'd do differently?",
  },
  {
    slug: "treebot",
    title: "Tree Plant Bot",
    description: "A Discord bot with a resource production and progression system",
    tags: ["C#", "MongoDB", "Discord API"],
    thumbnail: "/treeimage/plant.png",
    media: [{ type: "image", src: "/treeimage/plant.png" }, { type: "image", src: "/treeimage/unsealing.png" },
      { type: "image", src: "/treeimage/tree.png" }, { type: "image", src: "/treeimage/collected.png" }, { type: "image", src: "/treeimage/anotherunsealing.png" },
    ],
    year: "2025",
    overview: "",
    whatIBuilt: "",
    whatILearned: "",
    stats: [
      { value: "1,500+", label: "Total Players" },
      { value: "400–500", label: "Peak Daily Active Users" },
      { value: "1 Year", label: "Active Maintenance" },
    ],
  },
  {
    slug: "website",
    title: "This Website",
    description: "A personal website designed to showcase my projects.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    thumbnail: "/websitemedia/thumbnail.jpg",
    media: [{type: "video", src: "/websitemedia/sitevideo.mp4"}, {type:"image", src: "/websitemedia/thumbnail.jpg"}, {type:"image", src: "/websitemedia/tech.png"}],
    year: "2025",
    github: "https://github.com/yourusername/leonsite",
    demo: "https://yoursite.com",
    overview: "",
    whatIBuilt: "Walk through the main features. What were the interesting technical challenges and decisions?",
    whatILearned: "What did you take away? New technologies, better patterns, things you'd do differently?",
  },
];
