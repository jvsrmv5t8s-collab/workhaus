"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Locations", href: "/#locations" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  // Default to scrolled (dark) — the hero observer flips it off on the homepage
  const [scrolled, setScrolled] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    setScrolled(false);
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const pillBg = scrolled
    ? "bg-white/90 backdrop-blur-md shadow-md shadow-black/10"
    : "bg-white/15 backdrop-blur-md border border-white/25";

  const linkColor = scrolled
    ? "text-ink-soft hover:text-ink hover:bg-black/5"
    : "text-white/90 hover:text-white hover:bg-white/15";

  const ctaBg = scrolled
    ? "bg-ink text-white hover:bg-teal"
    : "bg-white text-ink hover:bg-teal hover:text-white";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-5">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center max-w-[1280px] mx-auto px-6 lg:px-10 gap-8">
        {/* Logo */}
        <a href="/">
          <Image
            src={scrolled ? "/Logo_Web_workhaus_dark.svg" : "/Logo_Web_workhaus_light.svg"}
            alt="Workhaus"
            width={120}
            height={64}
            priority
          />
        </a>

        {/* Pill — centered */}
        <nav className="flex justify-center">
          <ul className={`flex items-center gap-0.5 rounded-full px-2 py-2 transition-all duration-300 ${pillBg}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-[15px] font-medium transition-colors ${linkColor}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <a
          href="/tour"
          className={`inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${ctaBg}`}
        >
          Book a Tour
        </a>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-6">
        <a href="/">
          <Image
            src={scrolled ? "/Logo_Web_workhaus_dark.svg" : "/Logo_Web_workhaus_light.svg"}
            alt="Workhaus"
            width={90}
            height={48}
            priority
          />
        </a>
        <button
          className={`p-2 rounded-full ${scrolled ? "text-ink" : "text-white"}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-white shadow-xl border border-hairline overflow-hidden">
          <ul className="flex flex-col p-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-[15px] font-medium text-ink-soft hover:bg-canvas hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1 p-1">
              <a
                href="/tour"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 rounded-xl bg-ink text-white text-[15px] font-semibold"
              >
                Book a Tour
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
