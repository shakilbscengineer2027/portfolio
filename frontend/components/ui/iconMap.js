import { Atom, Braces, Bug, Cloud, Code2, Database, Gauge, Globe, Hexagon, Palette, Plug, Server, Wind } from "lucide-react";

// Maps the "icon" names used in portfolioData.js to Lucide icons.
// These are generic icons, not official brand logos. See README to swap in brand SVGs.
export const iconMap = {
  tailwind: Wind,
  javascript: Braces,
  react: Atom,
  node: Hexagon,
  mongodb: Database,
  html: Code2,
  web: Globe,
  backend: Server,
  design: Palette,
  api: Plug,
  database: Database,
  bug: Bug,
  performance: Gauge,
  deploy: Cloud,
};
