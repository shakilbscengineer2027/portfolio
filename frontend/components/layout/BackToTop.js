"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Scroll progress bar at the top plus a back-to-top button.
export default function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-0.5 bg-gradient-to-r from-neon-blue to-neon-pink" style={{ width: `${progress}%` }} />
      {progress > 10 && (
        <a href="#home" aria-label="Back to top" className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple p-3 shadow-lg">
          <ArrowUp className="h-5 w-5" />
        </a>
      )}
    </>
  );
}
