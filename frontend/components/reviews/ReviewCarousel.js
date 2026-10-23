"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchReviews } from "@/lib/api";
import ReviewCard from "./ReviewCard";

const SWIPE_DISTANCE = 50; // pixels

const arrowClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-pink shadow-lg transition hover:brightness-110";

export default function ReviewCarousel({ refreshKey = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    let isCurrent = true;
    setStatus("loading");
    fetchReviews()
      .then((data) => {
        if (!isCurrent) return;
        setReviews(data.reviews);
        setIndex(0);
        setStatus("ready");
      })
      .catch(() => isCurrent && setStatus("error"));
    return () => {
      isCurrent = false;
    };
  }, [refreshKey]);

  const total = reviews.length;
  const goNext = () => setIndex((current) => (current + 1) % total);
  const goPrevious = () => setIndex((current) => (current - 1 + total) % total);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrevious();
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (distance < -SWIPE_DISTANCE) goNext();
    if (distance > SWIPE_DISTANCE) goPrevious();
    touchStartX.current = null;
  }

  if (status === "loading") {
    return <p className="py-16 text-center text-ink-soft">Loading reviews...</p>;
  }
  if (status === "error") {
    return <p className="py-16 text-center text-ink-soft">Reviews could not be loaded right now. Please try again later.</p>;
  }
  if (total === 0) {
    return <p className="py-16 text-center text-ink-soft">No client reviews yet. Client feedback will appear here after completed projects.</p>;
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client reviews" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="flex items-center gap-3 sm:gap-6" onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
        <button type="button" onClick={goPrevious} aria-label="Previous review" className={arrowClass} disabled={total < 2}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1" aria-live="polite" key={reviews[index]._id}>
          <ReviewCard review={reviews[index]} />
        </div>
        <button type="button" onClick={goNext} aria-label="Next review" className={arrowClass} disabled={total < 2}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((review, dotIndex) => (
          <button
            key={review._id}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show review ${dotIndex + 1} of ${total}`}
            aria-current={dotIndex === index}
            className={`h-3 w-3 rounded-full transition ${dotIndex === index ? "bg-red-500" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
