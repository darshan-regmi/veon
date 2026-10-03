export const runtime = "edge";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BooksBrowser from "@/components/BooksBrowser";
import { getAllBooks } from "@/lib/firestore-server";
import { collectionJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "Download free PDF ebooks by Darshan Regmi — poetry collections and practical guides, free to read and keep.";

export const metadata: Metadata = {
  title: "Free PDF Ebooks",
  description: DESCRIPTION,
  alternates: { canonical: "/books" },
  keywords: [
    "free ebooks",
    "PDF download",
    "Darshan Regmi books",
    "poetry collection",
    "ebook reader",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/books"),
    title: "Free PDF Ebooks",
    description: DESCRIPTION,
    siteName: "Veon",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Free PDF ebooks on Veon" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Ebooks",
    description: DESCRIPTION,
    site: "@darshanregmi_np",
    images: ["/og-image.png"],
  },
};

export default async function BooksPage() {
  // Never throw: an empty grid is better for SEO than a 500. Firestore outage
  // degrades to a bare page instead of taking the section out of the index.
  const books = await getAllBooks().catch((err) => {
    console.error("Failed to load books for /books:", err);
    return [];
  });

  const jsonLd = collectionJsonLd({
    name: "Books",
    description: DESCRIPTION,
    path: "/books",
    items: books.map((b) => ({ name: b.title, path: `/books/${b.slug}` })),
  });

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header tile. No bottom padding — BooksBrowser renders its own matching
          gray search band directly beneath, so the two read as one tile. */}
      <div style={{ backgroundColor: "#f5f5f7", paddingTop: 80 }}>
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
            className="text-[#7a7a7a]"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Free PDF ebooks — download and read at your pace.
          </p>
        </div>
      </div>

      <BooksBrowser books={books} />

      <Footer />
    </div>
  );
}