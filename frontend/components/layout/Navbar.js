"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolioData";
import Button from "@/components/ui/Button";

const SECTION_IDS = ["home", "about", "skills", "services", "projects", "testimonials", "contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  // Highlight the link of the section that is currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const linkClass = (id) =>
    `rounded-md px-2 py-1 text-sm transition hover:text-neon-cyan ${activeId === id ? "text-neon-blue" : "text-ink-main"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-neon-blue/30 bg-navy-950/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-lg font-bold text-transparent">
          {profile.brand}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={linkClass(link.id)} aria-current={activeId === link.id ? "true" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="#contact" variant="outline" className="hidden !py-2 md:inline-flex">
          Hire Me
        </Button>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-neon-blue/30 bg-navy-950 px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={() => setMenuOpen(false)} className={`block py-3 ${linkClass(link.id)}`}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block rounded-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 text-center font-semibold">
              Hire Me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
