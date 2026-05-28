import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "Apps",
    links: [
      { label: "All Apps", href: "/apps" },
      { label: "Featured", href: "/apps" },
    ],
  },
  {
    heading: "Books",
    links: [
      { label: "All Books", href: "/books" },
      { label: "Featured", href: "/books" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f5f5f7" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <span
                className="text-[#1d1d1f] text-xl font-semibold tracking-tight"
                style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
              >
                ve
              </span>
              <span
                className="text-[#1d1d1f] text-xl font-semibold tracking-tight border border-[#1d1d1f] px-1 mx-0.5"
                style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
              >
                on
              </span>
            </Link>
            <p
              className="text-[#333333] max-w-xs"
              style={{ fontSize: 12, lineHeight: 1.5, letterSpacing: "-0.12px" }}
            >
              A curated collection of handcrafted apps and books. Built by one
              creator, for everyone.
            </p>
          </div>

          {/* Link columns */}
          {sections.map((s) => (
            <div key={s.heading}>
              <h3
                className="text-[#1d1d1f] font-semibold mb-4"
                style={{ fontSize: 14, lineHeight: 1.29, letterSpacing: "-0.224px" }}
              >
                {s.heading}
              </h3>
              <ul>
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[#333333] hover:text-[#0066cc] transition-colors"
                      style={{ fontSize: 17, lineHeight: 2.41, letterSpacing: 0 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 border-t border-[#e0e0e0] flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p
            className="text-[#7a7a7a]"
            style={{ fontSize: 12, lineHeight: 1, letterSpacing: "-0.12px" }}
          >
            © {new Date().getFullYear()} Veon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:darshanregmi.official@gmail.com"
              className="text-[#7a7a7a] hover:text-[#0066cc] transition-colors"
              style={{ fontSize: 12, letterSpacing: "-0.12px" }}
            >
              Email
            </a>
            <a
              href="https://x.com/darshanregmi_np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7a7a7a] hover:text-[#0066cc] transition-colors"
              style={{ fontSize: 12, letterSpacing: "-0.12px" }}
            >
              X (Twitter)
            </a>
            <a
              href="https://github.com/darshan-regmi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7a7a7a] hover:text-[#0066cc] transition-colors"
              style={{ fontSize: 12, letterSpacing: "-0.12px" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
