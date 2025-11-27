import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span
              className="text-stone-900 text-2xl font-serif tracking-wide transition-colors"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
            >
              ve
            </span>
            <div className="relative inline-flex items-center justify-center border-2 border-stone-900 w-8 h-8 mx-0.5 transition-transform group-hover:scale-105">
              <span
                className="text-stone-900 text-2xl font-serif"
                style={{ fontFamily: "Georgia, serif" }}
              >
                on
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-stone-900" />
            ) : (
              <Menu className="w-5 h-5 text-stone-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
              >
                Products
              </Link>
              <Link
                href="/apps"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
              >
                Apps
              </Link>
              <Link
                href="/ebooks"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
              >
                Ebooks
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-stone-600 hover:text-amber-900 transition"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
