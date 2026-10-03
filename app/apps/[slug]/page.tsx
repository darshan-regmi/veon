export const runtime = "edge";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Screenshots from "@/components/Screenshots";
import DownloadButton from "@/components/DownloadButton";
import { getAppBySlug } from "@/lib/firestore-server";
import { appJsonLd } from "@/lib/seo";
import { absoluteUrl, truncate } from "@/lib/site";
import {
  ArrowLeft,
  Calendar,
  Download,
  Tag,
  CheckCircle2,
  Package,
  GitBranch,
} from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug).catch(() => null);

  // A missing app must not be indexed, and must not inherit the root layout's
  // canonical (which points at "/") — that would tell Google /apps/anything is
  // a duplicate of the homepage.
  if (!app) {
    return {
      title: "App not found",
      robots: { index: false, follow: true },
    };
  }

  const url = absoluteUrl(`/apps/${app.slug}`);
  const description = truncate(
    app.description || `${app.name} — a handcrafted Android app by Darshan Regmi. Free APK download, no Play Store required.`
  );
  const image = app.icon || "/og-image.png";

  return {
    title: `${app.name} — Android APK Download`,
    description,
    alternates: { canonical: url },
    keywords: [
      `${app.name} APK`,
      `${app.name} download`,
      `${app.name} Android app`,
      `${app.category} app`,
      "APK download",
      "Darshan Regmi",
    ].filter(Boolean),
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: `${app.name} — Android APK Download`,
      description,
      siteName: "Veon",
      images: [{ url: image, alt: app.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${app.name} — Android APK Download`,
      description,
      site: "@darshanregmi_np",
      images: [image],
    },
  };
}

export default async function AppDetailPage({ params }: Params) {
  const { slug } = await params;
  const app = await getAppBySlug(slug).catch(() => null);

  // Real 404 status instead of a soft "not found" 200 — lets Google drop the
  // URL from the index instead of storing a thin page.
  if (!app) notFound();

  const changelogEntries = Object.entries(app.changelog).sort(([a], [b]) =>
    b.localeCompare(a)
  );

  const jsonLd = appJsonLd(app);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Back */}
        <Link
          href="/apps"
          className="inline-flex items-center gap-1.5 text-[#0066cc] hover:text-[#0071e3] transition-colors mb-10"
          style={{ fontSize: 17, letterSpacing: "-0.374px" }}
        >
          <ArrowLeft className="w-4 h-4" />
          All Apps
        </Link>

        {/* Hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Left */}
          <div>
            <div className="flex items-start gap-5 mb-6">
              <div
                className="w-20 h-20 overflow-hidden shrink-0"
                style={{ borderRadius: 18, boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)" }}
              >
                {app.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={app.icon} alt={app.name} className="object-cover w-full h-full" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "#1d1d1f" }}
                  >
                    <span className="text-2xl font-semibold text-white">{app.name[0]}</span>
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
                  {app.name}
                </h1>
                {app.developer && (
                  <p className="text-[#7a7a7a] mt-1" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                    by {app.developer}
                  </p>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Tag, label: app.category, accent: true },
                { icon: GitBranch, label: `v${app.version}` },
                ...(app.releaseDate ? [{ icon: Calendar, label: app.releaseDate }] : []),
                { icon: Download, label: `${app.downloads.toLocaleString()} downloads` },
              ].map(({ icon: Icon, label, accent }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 capitalize"
                  style={{
                    fontSize: 14,
                    letterSpacing: "-0.224px",
                    borderRadius: 9999,
                    padding: "6px 14px",
                    backgroundColor: accent ? "#f5f5f7" : "#f5f5f7",
                    color: accent ? "#0066cc" : "#7a7a7a",
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
              {app.description}
            </p>

            {/* CTA */}
            <DownloadButton
              track={{ kind: "app", id: app.id }}
              downloadUrl={app.downloadUrl}
              label="Download APK"
            />
            <p className="text-[#7a7a7a] mt-2" style={{ fontSize: 12 }}>
              Free · Android APK · No Play Store required
            </p>
          </div>

          {/* Right: Screenshots */}
          {app.screenshots.length > 0 ? (
            <Screenshots screenshots={app.screenshots} appName={app.name} />
          ) : (
            <div
              className="flex items-center justify-center max-w-[260px] mx-auto w-full aspect-[9/16]"
              style={{ borderRadius: 18, backgroundColor: "#f5f5f7" }}
            >
              <Package className="w-10 h-10 text-[#cccccc]" />
            </div>
          )}
        </div>

        {/* Features */}
        {app.features.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-[#1d1d1f] mb-8"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {app.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5"
                  style={{ borderRadius: 11, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                  <span className="text-[#1d1d1f]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Changelog */}
        {changelogEntries.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-[#1d1d1f] mb-8"
              style={{
                fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.374px",
              }}
            >
              Version History
            </h2>
            <div className="space-y-3">
              {changelogEntries.map(([version, notes]) => (
                <div
                  key={version}
                  className="p-5"
                  style={{ borderRadius: 11, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[#0066cc]"
                      style={{ fontFamily: "monospace", fontSize: 14, letterSpacing: "-0.224px" }}
                    >
                      v{version}
                    </span>
                    {version === app.version && (
                      <span
                        className="text-[#7a7a7a]"
                        style={{ fontSize: 12, backgroundColor: "#f5f5f7", borderRadius: 9999, padding: "2px 8px" }}
                      >
                        Latest
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[#1d1d1f] whitespace-pre-line"
                    style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
                  >
                    {notes}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA tile */}
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
            Ready to try {app.name}?
          </h3>
          <p className="text-[#7a7a7a] mb-8" style={{ fontSize: 17 }}>
            Free to download · No Play Store required
          </p>
          <DownloadButton
            track={{ kind: "app", id: app.id }}
            downloadUrl={app.downloadUrl}
            label="Download APK"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}