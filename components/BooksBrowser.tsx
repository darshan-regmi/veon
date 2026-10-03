"use client";

import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BookCard from "@/components/BookCard";
import type { Book } from "@/lib/types";

/**
 * Client island for the /books grid.
 *
 * The book list is fetched on the server and passed in, so every `/books/:slug`
 * link is present in the initial HTML for crawlers. Only the search box and
 * genre chips need state.
 */
export default function BooksBrowser({ books }: { books: Book[] }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  const genres = useMemo(
    () => ["all", ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean)))],
    [books]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((book) => {
      const matchSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q);
      const matchGenre = genre === "all" || book.genre === genre;
      return matchSearch && matchGenre;
    });
  }, [books, search, genre]);

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
        {genres.length > 1 && (
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
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div
              className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f5f5f7", borderRadius: 9999 }}
            >
              <BookOpen className="w-7 h-7 text-[#7a7a7a]" />
            </div>
            <p
              className="text-[#1d1d1f] font-semibold mb-1"
              style={{ fontSize: 17 }}
            >
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
    </>
  );
}