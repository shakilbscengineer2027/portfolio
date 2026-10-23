import { services } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { iconMap } from "@/components/ui/iconMap";

export default function ServicesSection() {
  return (
    <section id="services" className="section-dark px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Services I Provide" subtitle="I offer design and development services focused on building fast, modern, and user-friendly digital experiences." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, icon, description }) => {
            const Icon = iconMap[icon];
            return (
              <article key={title} className="neon-card p-5 text-center">
                <Icon className="mx-auto mb-3 h-9 w-9 text-neon-blue" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-xs text-ink-soft">{description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
