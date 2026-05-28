import Link from "next/link";
import { Download, BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="block group h-full">
      <div
        className="bg-white h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
      >
        {/* Cover */}
        <div className="relative flex justify-center py-8 px-6" style={{ backgroundColor: "#f5f5f7" }}>
          <div
            className="w-28 overflow-hidden"
            style={{
              aspectRatio: "2/3",
              borderRadius: 8,
              boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)",
            }}
          >
            {book.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.cover}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ backgroundColor: "#1d1d1f" }}
              >
                <BookOpen className="w-7 h-7 text-white/60" />
                <span
                  className="text-white/60 text-center px-2 leading-tight"
                  style={{ fontSize: 10 }}
                >
                  {book.title}
                </span>
              </div>
            )}
          </div>
          {book.featured && (
            <span
              className="absolute top-3 right-3 text-white"
              style={{
                fontSize: 11,
                letterSpacing: "-0.12px",
                backgroundColor: "#0066cc",
                borderRadius: 9999,
                padding: "3px 10px",
              }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3
            className="text-[#1d1d1f] font-semibold group-hover:text-[#0066cc] transition-colors leading-tight mb-1"
            style={{ fontSize: 17, letterSpacing: "-0.374px" }}
          >
            {book.title}
          </h3>
          <p
            className="text-[#7a7a7a] mb-2"
            style={{ fontSize: 14, letterSpacing: "-0.224px" }}
          >
            {book.author}
          </p>
          <p
            className="text-[#7a7a7a] line-clamp-2 mb-4 flex-1"
            style={{ fontSize: 14, lineHeight: 1.43, letterSpacing: "-0.224px" }}
          >
            {book.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span
              className="text-[#0066cc] capitalize"
              style={{ fontSize: 14, letterSpacing: "-0.224px" }}
            >
              {book.genre}
            </span>
            <span
              className="text-[#7a7a7a] flex items-center gap-1"
              style={{ fontSize: 12 }}
            >
              <Download className="w-3 h-3" />
              {book.downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
