"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/about", label: "About" },
];

const navItem = {
  hidden: { opacity: 0, y: -12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 left-0 right-0 z-50 border-b border-[var(--text-dark)]/10 bg-[var(--background)]/95 shadow-[0_1px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-end gap-10 px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Desktop: horizontal links, right-aligned, underlined */}
        <div className="hidden md:flex md:items-center md:gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              variants={navItem}
              initial="hidden"
              animate="show"
              custom={i}
            >
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide text-[var(--text-dark)] underline decoration-[var(--text-dark)]/60 underline-offset-4 transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <div className="flex h-5 w-6 flex-col justify-center gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-[var(--text-dark)] transition-transform ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--text-dark)] transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--text-dark)] transition-transform ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`border-t border-[var(--text-dark)]/10 bg-[var(--background)] px-6 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium tracking-wide text-[var(--text-dark)] underline decoration-[var(--text-dark)]/60 underline-offset-4 transition-opacity hover:opacity-80"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
