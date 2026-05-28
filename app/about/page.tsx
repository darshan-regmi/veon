"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      {/* Header tile */}
      <section style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-[#1d1d1f] mb-4"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.28px",
            }}
          >
            About
          </h1>
          <p
            className="text-[#7a7a7a] max-w-xl mx-auto"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Crafting digital experiences with emotion, clarity, and intention.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2
              className="text-[#1d1d1f] mb-5"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              Who I Am
            </h2>
            <p
              className="text-[#1d1d1f] mb-5"
              style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
            >
              I&apos;m Darshan, a developer and poet who loves building products
              that feel warm, human, and meaningful. Whether it&apos;s an app, a
              poem, or a personal project, my goal is simple — combine creativity
              with intention, and make something worth remembering.
            </p>
            <p
              className="text-[#1d1d1f] mb-12"
              style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
            >
              I design minimal, aesthetic experiences and write poetry that
              connects with people on a deeper level. Every line of code and every
              line of verse comes from the same place — emotion, curiosity, and a
              desire to create something real.
            </p>

            <h2
              className="text-[#1d1d1f] mb-5"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              What I Do
            </h2>
            <ul className="space-y-3">
              {[
                "Build mobile & web apps with smooth, expressive UI",
                "Write poetry that explores love, loss, growth, and story",
                "Create meaningful digital products like Veil",
                "Work on hackathons, freelance projects, and personal tools",
                "Document my journey through writing & design",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#1d1d1f]"
                  style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
                >
                  <span className="text-[#0066cc] shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div
            className="p-8"
            style={{ borderRadius: 18, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
          >
            <h3
              className="text-[#1d1d1f] mb-5"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: "0.231px",
              }}
            >
              A Small Note
            </h3>
            <p
              className="text-[#1d1d1f] mb-4"
              style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
            >
              I believe good design feels like breathing — simple, quiet, and
              effortless. And good code should do the same. My products are built
              to be minimal, lightweight, and helpful.
            </p>
            <p
              className="text-[#7a7a7a] italic mb-8"
              style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
            >
              &ldquo;Every project I build is a love letter to who I used to be,
              and a step toward who I&apos;m becoming.&rdquo;
            </p>

            <div
              className="pt-6"
              style={{ borderTop: "1px solid #e0e0e0" }}
            >
              {[
                { label: "Instagram — @bydarshanregmi", href: "https://instagram.com/bydarshanregmi" },
                { label: "Instagram — @_darshan_regmi", href: "https://instagram.com/_darshan_regmi" },
                { label: "GitHub — @darshan-regmi", href: "https://github.com/darshan-regmi" },
                { label: "Email me", href: "mailto:darshanregmi.official@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 text-[#0066cc] hover:text-[#0071e3] transition-colors"
                  style={{ fontSize: 17, lineHeight: 2.41 }}
                >
                  {label}
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: "#272729", paddingTop: 80, paddingBottom: 80 }}>
        <div className="text-center px-4">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Explore the work.
          </h2>
          <p className="text-[#cccccc] mb-10" style={{ fontSize: 21, lineHeight: 1.19 }}>
            Apps and books — all handcrafted, all free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
              style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
            >
              Browse Apps
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-full border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff]/10 active:scale-95 transition-all"
              style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
