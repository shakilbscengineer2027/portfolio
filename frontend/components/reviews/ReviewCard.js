import StarRating from "./StarRating";

// React escapes text automatically, so review text is never rendered as HTML.
export default function ReviewCard({ review }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-GB"); // dd/mm/yyyy

  return (
    <article className="rounded-3xl border border-neon-blue/60 border-r-neon-pink/70 bg-gradient-to-r from-[#16346b] to-[#4a1f35] px-6 py-8 text-center shadow-[0_0_30px_rgba(139,92,255,0.15)] sm:px-12">
      <StarRating rating={review.rating} />
      {review.reviewTitle && <h3 className="mt-5 text-lg font-bold">{review.reviewTitle}</h3>}
      <p className="mx-auto mt-4 max-w-xl whitespace-pre-line break-words text-base leading-relaxed sm:text-lg">{review.reviewMessage}</p>
      <p className="mt-5 text-lg font-bold text-red-500">{review.clientName}</p>
      <p className="text-xs text-ink-soft">Project: {review.projectName}</p>
      <p className="mt-1 text-sm">{formattedDate}</p>
    </article>
  );
}
