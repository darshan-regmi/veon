"use client";

import { useMemo, useState } from "react";
import { Search, Package } from "lucide-react";
import AppCard from "@/components/AppCard";
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

/**
 * Client island for the /apps grid.
 *
 * The app list is fetched on the server and passed in, so every `/apps/:slug`
 * link is present in the initial HTML for crawlers. Only the search box and
 * category chips need state.
 */
export default function AppsBrowser({ apps }: { apps: App[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Surface categories that actually exist, after the seeded defaults.
  const categories = useMemo(() => {
    const present = new Set(apps.map((a) => a.category).filter(Boolean));
    return ["all", ...CATEGORIES.filter((c) => c !== "all" && present.has(c))];
  }, [apps]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apps.filter((app) => {
      const matchSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q);
      const matchCat = category === "all" || app.category === category;
      return matchSearch && matchCat;
    });
  }, [apps, search, category]);

  return (
    <>
      {/* Search band. Same background as the header tile above, so the two
          blocks read as one continuous tile. */}
      <div style={{ backgroundColor: "#f5f5f7", paddingTop: 48, paddingBottom: 64 }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
        {categories.length > 1 && (
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => (
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
                {cat === "all"
                  ? "All Apps"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div
              className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f5f5f7", borderRadius: 9999 }}
            >
              <Package className="w-7 h-7 text-[#7a7a7a]" />
            </div>
            <p
              className="text-[#1d1d1f] font-semibold mb-1"
              style={{ fontSize: 17 }}
            >
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
    </>
  );
}