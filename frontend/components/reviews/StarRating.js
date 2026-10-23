import { Star } from "lucide-react";

// Read-only stars. The text label is for screen readers.
export default function StarRating({ rating }) {
  return (
    <div className="flex justify-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} className={`h-7 w-7 ${value <= rating ? "fill-orange-400 text-orange-400" : "text-ink-soft/40"}`} aria-hidden="true" />
      ))}
    </div>
  );
}
