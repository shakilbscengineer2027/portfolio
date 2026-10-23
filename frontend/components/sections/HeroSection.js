import { Atom, Braces, Code2, Database, Hexagon } from "lucide-react";
import { profile } from "@/data/portfolioData";
import Button from "@/components/ui/Button";
import Portrait from "@/components/ui/Portrait";

// Floating technology icons around the portrait. Positions are Tailwind classes.
const floatingIcons = [
  { Icon: Atom, label: "React", position: "left-2 top-6 sm:left-8", delay: "0s" },
  { Icon: Braces, label: "JavaScript", position: "left-0 top-1/2", delay: "1s" },
  { Icon: Hexagon, label: "Node.js", position: "right-2 top-1/3", delay: "2s" },
  { Icon: Database, label: "MongoDB", position: "bottom-8 left-10", delay: "3s" },
  { Icon: Code2, label: "HTML5", position: "bottom-4 right-10", delay: "4s" },
];

export default function HeroSection() {
  return (
    <section id="home" className="section-gradient overflow-hidden px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full border border-neon-blue/50 px-4 py-1 text-xs font-semibold tracking-widest text-neon-cyan">
            {profile.badge}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Hi, I&apos;m
            <span className="block bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">{profile.name}</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-neon-cyan">{profile.title}</p>
          <p className="mt-5 max-w-md text-ink-main">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#contact">Hire Me</Button>
            <Button href="#projects" variant="outline">
              View Projects
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div aria-hidden="true" className="absolute inset-0 animate-spinSlow rounded-full border-2 border-dashed border-neon-blue/50" />
          <div aria-hidden="true" className="absolute inset-6 rounded-full border-2 border-neon-purple/60 shadow-[0_0_40px_rgba(139,92,255,0.5)]" />
          <Portrait className="absolute inset-10 rounded-full border-4 border-neon-blue shadow-[0_0_40px_rgba(22,139,255,0.5)]" />
          {floatingIcons.map(({ Icon, label, position, delay }) => (
            <span key={label} title={label} style={{ animationDelay: delay }} className={`absolute ${position} animate-float rounded-xl border border-neon-blue/50 bg-navy-900 p-2.5 text-neon-blue`}>
              <Icon className="h-6 w-6" aria-label={label} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
