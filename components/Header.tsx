"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sectionIds = [
        "#home",
        "#about",
        "#services",
        "#pricing",
        "#projects",
        "#skills",
        "#experience",
        "#certifications",
        "#contact",
      ];

      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let current = "#home";

      for (const id of sectionIds) {
        const el = document.querySelector(id) as HTMLElement | null;
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= viewportMid) current = id;
      }

      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="#home" className="text-2xl font-bold">
          <span className="text-gradient">KK</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                aria-current={activeSection === link.href ? "page" : undefined}
                className={`text-slate-300 hover:text-primary-300 transition-colors duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-sm ${
                  activeSection === link.href ? "text-slate-100" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary-400 transition-all duration-300 ${
                    activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:block px-6 py-2.5 rounded-full font-semibold bg-primary-500 text-slate-950 hover:bg-primary-400 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Let&apos;s Work Together
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-primary-400 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 animate-slide-down">
          <ul className="flex flex-col space-y-4 py-6 px-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-slate-300 hover:text-primary-300 transition-colors text-lg ${
                    activeSection === link.href ? "text-slate-100" : ""
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-6 py-2.5 rounded-full font-semibold bg-primary-500 text-slate-950 hover:bg-primary-400 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
              >
                Let&apos;s Work Together
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
