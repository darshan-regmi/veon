"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-[12px] leading-none tracking-[-0.12px] text-white/80 hover:text-white transition-colors";

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#000000", height: 44 }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <span
            className="text-white text-lg font-semibold tracking-tight"
            style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
          >
            ve
          </span>
          <span
            className="text-white text-lg font-semibold tracking-tight border border-white/70 px-1 mx-0.5 group-hover:border-white transition-colors"
            style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
          >
            on
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/apps" className={linkClass}>Apps</Link>
          <Link href="/books" className={linkClass}>Books</Link>
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/contact" className={linkClass}>Contact</Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1.5 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-white/10"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-4">
            {[
              { href: "/", label: "Home" },
              { href: "/apps", label: "Apps" },
              { href: "/books", label: "Books" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
