export default function ProjectFilters({ categories, activeCategory, onChange }) {
  return (
    <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={category === activeCategory}
          onClick={() => onChange(category)}
          className={`rounded-full border px-5 py-2 text-sm transition ${
            category === activeCategory ? "border-transparent bg-gradient-to-r from-neon-blue to-neon-purple" : "border-neon-blue/40 hover:border-neon-cyan"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
