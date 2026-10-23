import Image from "next/image";
import { profile } from "@/data/portfolioData";

// Shows the configured portrait, or a clearly replaceable placeholder with initials.
export default function Portrait({ className = "" }) {
  if (profile.portrait) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 768px) 80vw, 480px" className="object-cover" priority />
      </div>
    );
  }
  const initials = profile.name.split(" ").map((word) => word[0]).join("");
  return (
    <div role="img" aria-label="Portrait placeholder. Set profile.portrait in portfolioData.js" className={`flex items-center justify-center bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 text-6xl font-bold ${className}`}>
      {initials}
    </div>
  );
}
