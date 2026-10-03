import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * app/about/page.tsx is a client component, so it cannot export metadata.
 * A layout can, and its metadata still applies to the page beneath it.
 */
export const metadata: Metadata = {
  title: "About",
  description:
    "Darshan Regmi is a developer and poet from Pokhara, Nepal, building handcrafted Android apps and writing poetry. Learn about the person behind Veon.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_URL}/about`,
    title: "About Darshan Regmi | Veon",
    description:
      "Darshan Regmi is a developer and poet from Pokhara, Nepal, building handcrafted Android apps and writing poetry.",
    siteName: "Veon",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Darshan Regmi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Darshan Regmi | Veon",
    description: "The developer and poet behind Veon.",
    site: "@darshanregmi_np",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}