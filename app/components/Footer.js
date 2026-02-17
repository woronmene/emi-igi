"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function Logo() {
  return (
    <div className="relative h-10 w-auto">
      <Image
        src="/images/emi-logo.svg"
        alt="Emi-igi"
        width={120}
        height={40}
        className="h-10 w-auto object-contain object-left"
      />
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setEmail("");
        setStatus("success");
        setMessage("Thanks for subscribing.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <footer
      className="min-h-[1px]"
      style={{
        background:
          "linear-gradient(to bottom right, #E1D7C6 0%,rgba(160, 139, 109, 0.6) 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Newsletter */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-xl font-semibold text-[var(--text-dark)] md:text-2xl">
            Join our newsletter
          </h2>
          <form
            className="flex w-full max-w-md flex-col gap-3"
            onSubmit={handleNewsletterSubmit}
          >
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="min-w-0 flex-1 rounded-l-lg border border-[#b8b4ae] bg-[var(--surface-cream)] px-4 py-3 text-[var(--text-dark)] placeholder:text-[var(--text-dark)]/60 focus:border-[var(--text-dark)]/40 focus:outline-none disabled:opacity-70"
                aria-label="Email for newsletter"
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-r-lg bg-[var(--button-bg)] px-6 py-3 font-medium text-[var(--button-text)] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[var(--accent-brown-light)] disabled:opacity-70"
              >
                {status === "loading" ? "…" : "Subscribe"}
              </button>
            </div>
            {message && (
              <p
                role="alert"
                className={`text-sm ${
                  status === "success"
                    ? "text-[var(--text-dark)]"
                    : "text-red-700"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </motion.div>

        {/* Separator */}
        <div className="my-12 border-t border-[#b8b4ae] md:my-16" />

        {/* Contact & Follow */}
        <motion.div
          className="grid grid-cols-[1fr_auto_1fr] gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-dark)]">
              Contact
            </p>
            <a
              href="mailto:Info@emi-igi.co.site"
              className="mt-2 block text-[var(--text-dark)] hover:underline"
            >
              Info@emi-igi.co.site
            </a>
          </div>
          <div className="border-l border-[#b8b4ae]" aria-hidden />
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-dark)]">
              Follow
            </p>
            <a
              href="https://instagram.com/emi_igi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-[var(--text-dark)] hover:underline"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded overflow-hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="url(#ig-gradient)"
                  aria-hidden
                >
                  <defs>
                    <linearGradient
                      id="ig-gradient"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f9ce34" />
                      <stop offset="50%" stopColor="#ee2a7b" />
                      <stop offset="100%" stopColor="#6228d7" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span>@emi_igi</span>
            </a>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="my-12 border-t border-[#b8b4ae] md:my-16" />

        {/* Copyright & legal */}
        <motion.div
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Logo />
          <p className="text-sm text-[var(--text-dark)]/70">
            2025 EMI-IGI. All rights reserved.{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            ..{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
