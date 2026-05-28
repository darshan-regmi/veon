"use client";

import { useState, useEffect } from "react";
import { Search, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { getAllApps } from "@/lib/firestore";
import type { App } from "@/lib/types";

const CATEGORIES = [
  "all",
  "productivity",
  "entertainment",
  "education",
  "utilities",
  "lifestyle",
  "social",
  "games",
];

export default function AppsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getAllApps()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  const filtered = apps.filter((app) => {
    const q = search.toLowerCase();
    const matchSearch =
      app.name.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q);
    const matchCat = category === "all" || app.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      {/* Header tile */}
      <div style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 64 }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            Apps
          </h1>
          <p
            className="text-[#7a7a7a] mb-12"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Handcrafted Android apps, designed with care.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a7a]" />
            <input
              type="text"
              placeholder="Search apps…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:outline-none"
              style={{
                fontSize: 17,
                letterSpacing: "-0.374px",
                height: 44,
                borderRadius: 9999,
                border: "1px solid rgba(0,0,0,0.08)",
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category chips */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="whitespace-nowrap capitalize transition-all active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "-0.224px",
                borderRadius: 9999,
                padding: "8px 16px",
                backgroundColor: category === cat ? "#0066cc" : "#ffffff",
                color: category === cat ? "#ffffff" : "#1d1d1f",
                border: `1px solid ${category === cat ? "#0066cc" : "#e0e0e0"}`,
              }}
            >
              {cat === "all" ? "All Apps" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white overflow-hidden"
                style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
              >
                <div className="h-40" style={{ backgroundColor: "#f5f5f7" }} />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#f5f5f7] rounded w-3/4" />
                  <div className="h-3 bg-[#f5f5f7] rounded" />
                  <div className="h-3 bg-[#f5f5f7] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div
              className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f5f5f7", borderRadius: 9999 }}
            >
              <Package className="w-7 h-7 text-[#7a7a7a]" />
            </div>
            <p className="text-[#1d1d1f] font-semibold mb-1" style={{ fontSize: 17 }}>
              {apps.length === 0 ? "No apps yet" : "No apps found"}
            </p>
            <p className="text-[#7a7a7a]" style={{ fontSize: 14 }}>
              {apps.length === 0
                ? "Check back soon."
                : "Try a different search or category."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
