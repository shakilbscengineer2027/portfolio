import { skills } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-gradient px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills & Technologies" subtitle="I work with modern tools and technologies to build fast, scalable and efficient web applications." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
