export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-xl text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm text-ink-main sm:text-base">{subtitle}</p>}
    </div>
  );
}
