import React from "react";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span
                className="text-stone-900 text-2xl font-serif tracking-wide"
                style={{
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.02em",
                }}
              >
                ve
              </span>
              <div className="relative inline-flex items-center justify-center border-2 border-stone-900 w-8 h-8 mx-0.5">
                <span
                  className="text-stone-900 text-2xl font-serif"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  on
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              A curated collection of handcrafted apps and ebooks. Built by one
              creator, for everyone.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/products"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  Apps
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  All Products
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-stone-600 hover:text-amber-900 transition"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500">
            © 2024 Veon. Crafted with care.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@veon.com"
              className="w-9 h-9 rounded-full bg-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-900 transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-900 transition"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-900 transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-900 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
