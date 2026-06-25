"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { name: "Início", href: "#" },
  { name: "Sobre", href: "#sobre" },
  { name: "Estratégia", href: "#estrategia" },
  { name: "Serviços", href: "#servicos" },
  { name: "Autoridade", href: "#autoridade" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-deep/90 backdrop-blur-md border-b border-brand-light/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo variant="horizontal" tone="negative" size={40} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm text-ink-200 hover:text-white transition-colors font-semibold"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="bg-accent-lime text-brand-deep px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 hover:bg-lime-400 transition-all duration-200"
          >
            Falar com Gabriella
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-deep border-b border-brand-light/30 p-6 flex flex-col gap-6 lg:hidden shadow-lg"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-lg text-ink-200 hover:text-white transition-colors font-semibold block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="bg-accent-lime text-brand-deep px-5 py-3 rounded-full text-center text-sm font-bold hover:bg-lime-400 transition-colors"
            >
              Falar com Gabriella
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
