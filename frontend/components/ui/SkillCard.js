import { Code2 } from "lucide-react";
import { iconMap } from "./iconMap";

export default function SkillCard({ name, icon, description }) {
  const Icon = iconMap[icon] || Code2; // fallback if an unknown icon name is used
  return (
    <article className="neon-card flex flex-col items-center p-7 text-center">
      <Icon className="mb-4 h-14 w-14 text-neon-blue" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="mb-2 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-ink-soft">{description}</p>
    </article>
  );
}
