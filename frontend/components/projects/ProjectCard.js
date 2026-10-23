import Image from "next/image";
import { ArrowUpRight, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ProjectCard({ project }) {
  const { title, description, image, tags, githubUrl, demoUrl } = project;

  return (
    <article className="neon-card group overflow-hidden border-neon-pink/40 p-4">
      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-purple/30">
        {image ? (
          <Image src={image} alt={`${title} screenshot`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-neon-cyan/70">
            <Monitor className="h-16 w-16" aria-hidden="true" />
            <span className="sr-only">No screenshot yet</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-neon-blue/15 px-3 py-1 text-xs text-neon-blue">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-3">
        <Button href={githubUrl} external className="!px-5 !py-2">
          GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button href={demoUrl} external className="!px-5 !py-2">
          Live Demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
