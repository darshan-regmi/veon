"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, User, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const inputStyle = {
    fontSize: 17,
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    height: 44,
    borderRadius: 9999,
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    color: "#1d1d1f",
    paddingLeft: 48,
    paddingRight: 20,
    width: "100%",
  } as const;

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
            Contact
          </h1>
          <p
            className="text-[#7a7a7a] max-w-xl mx-auto"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Whether it&apos;s an idea, a collaboration, or just a hello — I&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="max-w-[680px] mx-auto px-4 sm:px-6 py-20">
        <div
          className="p-10"
          style={{ borderRadius: 18, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
        >
          <form className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label
                className="block text-[#1d1d1f] font-semibold"
                style={{ fontSize: 14, letterSpacing: "-0.224px" }}
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a7a]" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  className="focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                className="block text-[#1d1d1f] font-semibold"
                style={{ fontSize: 14, letterSpacing: "-0.224px" }}
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a7a]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  className="focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                className="block text-[#1d1d1f] font-semibold"
                style={{ fontSize: 14, letterSpacing: "-0.224px" }}
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#7a7a7a]" />
                <textarea
                  rows={5}
                  placeholder="Write your message…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors resize-none"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.47,
                    letterSpacing: "-0.374px",
                    borderRadius: 11,
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#ffffff",
                    color: "#1d1d1f",
                    paddingLeft: 48,
                    paddingRight: 20,
                    paddingTop: 12,
                    paddingBottom: 12,
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
              style={{ fontSize: 17, padding: "14px 28px", letterSpacing: "-0.374px" }}
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Direct contact */}
        <div className="text-center mt-14">
          <p
            className="text-[#7a7a7a] mb-4"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
          >
            Or reach me directly:
          </p>
          <div className="space-y-1">
            <a
              href="mailto:darshanregmi.official@gmail.com"
              className="block text-[#0066cc] hover:text-[#0071e3] transition-colors"
              style={{ fontSize: 17, lineHeight: 2.41 }}
            >
              darshanregmi.official@gmail.com
            </a>
            <a
              href="https://instagram.com/_darshan_regmi"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#0066cc] hover:text-[#0071e3] transition-colors"
              style={{ fontSize: 17, lineHeight: 2.41 }}
            >
              Instagram — @_darshan_regmi
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
