"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/firestore";
import type { Book } from "@/lib/types";
import { Search, BookOpen } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    getAllBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  const genres = [
    "all",
    ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean))),
  ];

  const filtered = books.filter((b) => {
    const matchSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "all" || b.genre === genre;
    return matchSearch && matchGenre;
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
            Books
          </h1>
          <p
            className="text-[#7a7a7a] mb-12"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Free PDF ebooks — download and read at your pace.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a7a]" />
            <input
              type="text"
              placeholder="Search books or authors…"
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
        {/* Genre chips */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className="whitespace-nowrap capitalize transition-all active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "-0.224px",
                borderRadius: 9999,
                padding: "8px 16px",
                backgroundColor: genre === g ? "#0066cc" : "#ffffff",
                color: genre === g ? "#ffffff" : "#1d1d1f",
                border: `1px solid ${genre === g ? "#0066cc" : "#e0e0e0"}`,
              }}
            >
              {g === "all" ? "All Genres" : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden"
                style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
              >
                <div className="h-52" style={{ backgroundColor: "#f5f5f7" }} />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-[#f5f5f7] rounded w-3/4" />
                  <div className="h-3 bg-[#f5f5f7] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
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
              <BookOpen className="w-7 h-7 text-[#7a7a7a]" />
            </div>
            <p className="text-[#1d1d1f] font-semibold mb-1" style={{ fontSize: 17 }}>
              {books.length === 0 ? "No books yet" : "No books found"}
            </p>
            <p className="text-[#7a7a7a]" style={{ fontSize: 14 }}>
              {books.length === 0
                ? "Check back soon."
                : "Try a different search or genre."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
