import { Download } from "lucide-react";
import { about, profile } from "@/data/portfolioData";
import Button from "@/components/ui/Button";
import Portrait from "@/components/ui/Portrait";

export default function AboutSection() {
  return (
    <section id="about" className="section-dark px-5 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Portrait className="aspect-[4/5] w-full max-w-md justify-self-center rounded-3xl border-2 border-neon-purple shadow-[0_0_40px_rgba(139,92,255,0.35)]" />

        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">About Me</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-main">
            {about.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label} className="neon-card p-4">
                <dt className="text-xs text-ink-soft">{fact.label}</dt>
                <dd className="mt-1 text-sm font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {profile.resumePath && (
            <Button href={profile.resumePath} external className="mt-8">
              Download Resume <Download className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
