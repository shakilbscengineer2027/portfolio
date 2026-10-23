import { navLinks, profile, socialLinks } from "@/data/portfolioData";

export default function Footer() {
  const visibleSocials = socialLinks.filter((social) => social.url);

  return (
    <footer className="border-t border-neon-blue/30 bg-navy-950 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-lg font-bold text-transparent">
          {profile.brand}
        </span>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-5 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="hover:text-neon-cyan">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3 text-sm">
          {visibleSocials.map((social) => (
            <li key={social.name}>
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="rounded-md bg-neon-blue/20 px-3 py-1 hover:bg-neon-blue/40">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-ink-soft">
        Copyright {new Date().getFullYear()} {profile.name} | All Rights Reserved
      </p>
    </footer>
  );
}
