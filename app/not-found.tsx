import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <div className="max-w-[980px] mx-auto px-4 py-32 text-center">
        <div
          className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#f5f5f7", borderRadius: 9999 }}
        >
          <Package className="w-8 h-8 text-[#7a7a7a]" />
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
          Page not found
        </h1>
        <p className="text-[#7a7a7a] mb-8" style={{ fontSize: 17 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all"
            style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Apps
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/5 active:scale-95 transition-all"
            style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px" }}
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}