"use client";

import { useState } from "react";
import { projects } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";

const ALL = "All";
const categories = [ALL, ...new Set(projects.map((project) => project.category))];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const visibleProjects = activeCategory === ALL ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="section-gradient px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Recent Projects" subtitle="Sample projects built with the MERN stack. Replace them with your real work in portfolioData.js." />
        <ProjectFilters categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        <div className="grid gap-8 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
