export const runtime = "edge";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppsBrowser from "@/components/AppsBrowser";
import { getAllApps } from "@/lib/firestore-server";
import { collectionJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "Browse handcrafted Android apps by Darshan Regmi. Productivity, utilities and more — free APK downloads, no Play Store required.";

export const metadata: Metadata = {
  title: "Android Apps — Free APK Downloads",
  description: DESCRIPTION,
  alternates: { canonical: "/apps" },
  keywords: [
    "Android apps",
    "APK download",
    "free APK",
    "sideload apps",
    "Darshan Regmi apps",
    "productivity apps",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/apps"),
    title: "Android Apps — Free APK Downloads",
    description: DESCRIPTION,
    siteName: "Veon",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Android apps on Veon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Android Apps — Free APK Downloads",
    description: DESCRIPTION,
    site: "@darshanregmi_np",
    images: ["/og-image.png"],
  },
};

export default async function AppsPage() {
  // Never throw: an empty grid is better for SEO than a 500. Firestore outage
  // degrades to a bare page instead of taking the section out of the index.
  const apps = await getAllApps().catch((err) => {
    console.error("Failed to load apps for /apps:", err);
    return [];
  });

  const jsonLd = collectionJsonLd({
    name: "Android Apps",
    description: DESCRIPTION,
    path: "/apps",
    items: apps.map((a) => ({ name: a.name, path: `/apps/${a.slug}` })),
  });

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header tile. No bottom padding — AppsBrowser renders its own matching
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
            Apps
          </h1>
          <p
            className="text-[#7a7a7a]"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Handcrafted Android apps, designed with care.
          </p>
        </div>
      </div>

      <AppsBrowser apps={apps} />

      <Footer />
    </div>
  );
}