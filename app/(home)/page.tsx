"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  BookOpen,
  Download,
  ChevronRight,
  Settings,
  FileCheck,
  Shield,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { getFeaturedApps } from "@/lib/firestore";
import type { App } from "@/lib/types";
import Link from "next/link";

export default function HomePage() {
  const [showGuide, setShowGuide] = useState(false);
  const [featuredApps, setFeaturedApps] = useState<App[]>([]);

  useEffect(() => {
    getFeaturedApps()
      .then(setFeaturedApps)
      .catch(() => {});
  }, []);

  const heroApp = featuredApps[0] ?? null;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      {/* ── Hero tile (light) ── */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "#ffffff",
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Wordmark */}
        <div className="flex items-center justify-center mb-10">
          <span
            className="text-[#1d1d1f]"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.28px",
            }}
          >
            ve
          </span>
          <span
            className="text-[#1d1d1f] border-2 border-[#1d1d1f] px-2 mx-0.5"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.28px",
            }}
          >
            on
          </span>
        </div>

        <h1
          className="text-[#1d1d1f] mb-4 max-w-2xl"
          style={{
            fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
            fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: 600,
            lineHeight: 1.07,
            letterSpacing: "-0.28px",
          }}
        >
          Your Personal App Store
        </h1>
        <p
          className="text-[#7a7a7a] mb-10 max-w-xl"
          style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.14, letterSpacing: "0.196px" }}
        >
          Handcrafted apps and books, downloaded directly — no middleman.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px", padding: "11px 22px" }}
          >
            Browse Apps
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/5 active:scale-95 transition-all"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px", padding: "11px 22px" }}
          >
            Browse Books
          </Link>
        </div>
      </section>

      {/* ── Dark tile: featured app ── */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "#272729",
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {heroApp ? (
          <>
            <p
              className="mb-6 uppercase tracking-widest"
              style={{ fontSize: 14, fontWeight: 600, color: "#cccccc", letterSpacing: "0.1em" }}
            >
              Featured Release
            </p>
            {heroApp.icon && (
              <div
                className="w-24 h-24 overflow-hidden mb-8 mx-auto"
                style={{ borderRadius: 22, boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroApp.icon} alt={heroApp.name} className="w-full h-full object-cover" />
              </div>
            )}
            <h2
              className="text-white mb-3 max-w-xl"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: 0,
              }}
            >
              {heroApp.name}
            </h2>
            <p
              className="mb-10 max-w-lg"
              style={{ fontSize: 21, fontWeight: 400, lineHeight: 1.19, color: "#cccccc" }}
            >
              {heroApp.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/apps/${heroApp.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
                style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
              >
                <Download className="w-[18px] h-[18px]" />
                Download APK
              </Link>
              <Link
                href={`/apps/${heroApp.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff]/10 active:scale-95 transition-all"
                style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
              >
                Learn more
              </Link>
            </div>
          </>
        ) : (
          <>
            <p
              className="mb-6 uppercase tracking-widest"
              style={{ fontSize: 14, fontWeight: 600, color: "#cccccc", letterSpacing: "0.1em" }}
            >
              Featured Release
            </p>
            <h2
              className="text-white mb-3"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Veil Poetry App
            </h2>
            <p
              className="mb-10 max-w-lg"
              style={{ fontSize: 21, fontWeight: 400, lineHeight: 1.19, color: "#cccccc" }}
            >
              A minimal poetry reading app with curated verses and dark mode.
            </p>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
              style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
            >
              Browse Apps
            </Link>
          </>
        )}
      </section>

      {/* ── More featured apps ── */}
      {featuredApps.length > 1 && (
        <section style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 80 }}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-center text-[#1d1d1f] mb-12"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              More Apps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {featuredApps.slice(1).map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/apps"
                className="inline-flex items-center gap-1 text-[#0066cc] hover:text-[#0071e3] transition-colors"
                style={{ fontSize: 17, letterSpacing: "-0.374px" }}
              >
                View all apps <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── What's on Veon (light tile) ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-[#1d1d1f] mb-4"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            What You&apos;ll Find on Veon
          </h2>
          <p
            className="text-center text-[#7a7a7a] mb-16 max-w-xl mx-auto"
            style={{ fontSize: 21, lineHeight: 1.19 }}
          >
            Apps and books made with care, delivered directly.
          </p>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: Smartphone,
                title: "Mobile Apps",
                body: "Thoughtfully crafted Android applications with offline-first design, minimal interfaces, and smooth user experiences.",
                href: "/apps",
              },
              {
                icon: BookOpen,
                title: "Books & Poetry",
                body: "Original poetry collections and written works available as free PDF downloads — straight from the creator.",
                href: "/books",
              },
            ].map(({ icon: Icon, title, body, href }) => (
              <Link key={href} href={href} className="block group">
                <div
                  className="bg-white transition-shadow duration-300 hover:shadow-lg p-8"
                  style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6"
                    style={{ borderRadius: 11, backgroundColor: "#f5f5f7" }}
                  >
                    <Icon className="w-6 h-6 text-[#1d1d1f]" />
                  </div>
                  <h3
                    className="text-[#1d1d1f] font-semibold mb-3 group-hover:text-[#0066cc] transition-colors"
                    style={{ fontSize: 21, letterSpacing: "0.231px" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#7a7a7a]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                    {body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Install guide (dark tile) ── */}
      <section style={{ backgroundColor: "#272729", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full text-left active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ borderRadius: 11, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <Shield className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                      fontSize: 21,
                      fontWeight: 600,
                      letterSpacing: "0.231px",
                    }}
                  >
                    How to Install Apps from Veon
                  </h3>
                  <p className="text-[#cccccc]" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                    Step-by-step guide for Android users
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/60 transition-transform shrink-0 ${showGuide ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {showGuide && (
            <div className="mt-8 space-y-8">
              <p className="text-[#cccccc]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                Since Veon apps are distributed as APK files (not through
                Google Play Store), you&apos;ll need to enable installation from
                unknown sources. It&apos;s safe and simple.
              </p>

              {[
                {
                  n: 1,
                  icon: Download,
                  title: "Download the APK File",
                  body: 'Click the download button on the product page. The APK file will be saved to your device\'s Downloads folder.',
                },
                {
                  n: 2,
                  icon: Settings,
                  title: 'Enable "Install Unknown Apps"',
                  body: 'Android 8.0+: Settings → Apps → Special app access → Install unknown apps → Allow from this source.',
                },
                {
                  n: 3,
                  icon: FileCheck,
                  title: "Install & Open",
                  body: 'Open your file manager, find the APK, tap to install, then tap "Open" to launch.',
                },
              ].map(({ n, icon: Icon, title, body }) => (
                <div key={n} className="flex gap-5">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0 text-white font-semibold"
                    style={{ borderRadius: 9999, border: "1px solid rgba(255,255,255,0.2)", fontSize: 14 }}
                  >
                    {n}
                  </div>
                  <div>
                    <h4
                      className="text-white flex items-center gap-2 mb-1"
                      style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.374px" }}
                    >
                      <Icon className="w-4 h-4 text-[#2997ff]" />
                      {title}
                    </h4>
                    <p className="text-[#cccccc]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}

              <div
                className="p-5"
                style={{ borderRadius: 11, backgroundColor: "rgba(41,151,255,0.1)", border: "1px solid rgba(41,151,255,0.2)" }}
              >
                <p className="text-[#2997ff]" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                  <strong className="text-white">Security note —</strong>{" "}
                  Only download apps from Veon. After installation, you can
                  optionally disable &quot;Install unknown apps&quot; for extra security.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer CTA (parchment) ── */}
      <section style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 80 }}>
        <div className="text-center px-4">
          <h2
            className="text-[#1d1d1f] mb-3"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Built by one developer from Nepal.
          </h2>
          <p className="text-[#7a7a7a] mb-10" style={{ fontSize: 21, lineHeight: 1.19 }}>
            Everything here is handcrafted and free to download.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-1 text-[#0066cc] hover:text-[#0071e3] transition-colors"
            style={{ fontSize: 17, letterSpacing: "-0.374px" }}
          >
            Explore all apps <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
