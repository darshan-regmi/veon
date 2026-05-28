"use client";

export const runtime = "edge";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadButton from "@/components/DownloadButton";
import { getBookBySlug, incrementBookDownloads } from "@/lib/firestore";
import type { Book } from "@/lib/types";
import {
  ArrowLeft,
  Calendar,
  Download,
  Tag,
  BookOpen,
  FileText,
  Globe,
} from "lucide-react";

export default function BookDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBookBySlug(slug as string)
      .then((data) => {
        if (!data) setNotFound(true);
        else setBook(data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        <Navbar />
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-12 animate-pulse">
          <div className="h-4 bg-[#f5f5f7] rounded w-24 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-start gap-5">
                <div className="w-28 h-40 bg-[#f5f5f7] rounded-[8px] shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-7 bg-[#f5f5f7] rounded w-3/4" />
                  <div className="h-4 bg-[#f5f5f7] rounded w-1/2" />
                </div>
              </div>
              <div className="h-12 bg-[#f5f5f7] rounded-full w-48 mt-4" />
            </div>
            <div className="h-72 bg-[#f5f5f7] rounded-[18px]" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        <Navbar />
        <div className="max-w-[980px] mx-auto px-4 py-24 text-center">
          <div
            className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#f5f5f7", borderRadius: 9999 }}
          >
            <BookOpen className="w-8 h-8 text-[#7a7a7a]" />
          </div>
          <h1
            className="text-[#1d1d1f] mb-3"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-0.374px",
            }}
          >
            Book not found
          </h1>
          <p className="text-[#7a7a7a] mb-8" style={{ fontSize: 17 }}>
            The book you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
            style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Books
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Back */}
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-[#0066cc] hover:text-[#0071e3] transition-colors mb-10"
          style={{ fontSize: 17, letterSpacing: "-0.374px" }}
        >
          <ArrowLeft className="w-4 h-4" />
          All Books
        </Link>

        {/* Hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Left */}
          <div>
            <div className="flex items-start gap-5 mb-6">
              <div
                className="shrink-0 overflow-hidden"
                style={{
                  width: 96,
                  aspectRatio: "2/3",
                  borderRadius: 8,
                  boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)",
                }}
              >
                {book.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "#1d1d1f" }}
                  >
                    <BookOpen className="w-6 h-6 text-white/40" />
                  </div>
                )}
              </div>
              <div>
                <h1
                  className="text-[#1d1d1f] leading-tight"
                  style={{
                    fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                    fontSize: 34,
                    fontWeight: 600,
                    letterSpacing: "-0.374px",
                  }}
                >
                  {book.title}
                </h1>
                <p className="text-[#7a7a7a] mt-1" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                  by {book.author}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Tag, label: book.genre, blue: true },
                { icon: Globe, label: book.language },
                ...(book.publishedDate ? [{ icon: Calendar, label: book.publishedDate }] : []),
                ...(book.pages ? [{ icon: FileText, label: `${book.pages} pages` }] : []),
                { icon: Download, label: `${book.downloads.toLocaleString()} downloads` },
              ].map(({ icon: Icon, label, blue }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 capitalize"
                  style={{
                    fontSize: 14,
                    letterSpacing: "-0.224px",
                    borderRadius: 9999,
                    padding: "6px 14px",
                    backgroundColor: "#f5f5f7",
                    color: blue ? "#0066cc" : "#7a7a7a",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              className="text-[#1d1d1f] mb-8"
              style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
            >
              {book.description}
            </p>

            {/* CTA */}
            <DownloadButton
              onTrack={() => incrementBookDownloads(book.id)}
              downloadUrl={book.pdfUrl}
              label="Download PDF"
            />
            <p className="text-[#7a7a7a] mt-2" style={{ fontSize: 12 }}>
              Free · PDF format · No account required
            </p>
          </div>

          {/* Right: Large cover */}
          <div className="flex justify-center items-start">
            {book.cover ? (
              <div
                className="overflow-hidden"
                style={{
                  width: 220,
                  borderRadius: 11,
                  boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.cover} alt={book.title} className="w-full h-auto" />
              </div>
            ) : (
              <div
                className="w-52 aspect-[2/3] flex items-center justify-center"
                style={{ borderRadius: 11, backgroundColor: "#f5f5f7" }}
              >
                <BookOpen className="w-10 h-10 text-[#cccccc]" />
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {book.excerpt && (
          <section className="mb-16">
            <h2
              className="text-[#1d1d1f] mb-6"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              Excerpt
            </h2>
            <div className="p-6" style={{ borderRadius: 11, border: "1px solid #e0e0e0" }}>
              <p
                className="text-[#1d1d1f] italic whitespace-pre-line"
                style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
              >
                &ldquo;{book.excerpt}&rdquo;
              </p>
            </div>
          </section>
        )}

        {/* Tags */}
        {book.tags && book.tags.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-[#1d1d1f] mb-4"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[#7a7a7a]"
                  style={{
                    fontSize: 14,
                    letterSpacing: "-0.224px",
                    borderRadius: 9999,
                    padding: "6px 14px",
                    backgroundColor: "#f5f5f7",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div
          className="text-center py-16 px-8"
          style={{ borderRadius: 18, backgroundColor: "#f5f5f7" }}
        >
          <h3
            className="text-[#1d1d1f] mb-3"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-0.374px",
            }}
          >
            Ready to read {book.title}?
          </h3>
          <p className="text-[#7a7a7a] mb-8" style={{ fontSize: 17 }}>
            Free PDF · No account required
          </p>
          <DownloadButton
            onTrack={() => incrementBookDownloads(book.id)}
            downloadUrl={book.pdfUrl}
            label="Download PDF"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
