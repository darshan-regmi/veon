import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * app/contact/page.tsx is a client component (it owns the form state), so it
 * cannot export metadata. A layout can, and its metadata still applies.
 */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Darshan Regmi about Veon — app downloads, eBooks, feedback, or collaborations.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/contact`,
    title: "Contact | Veon",
    description: "Get in touch about Veon apps and eBooks.",
    siteName: "Veon",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Contact Veon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Veon",
    description: "Get in touch about Veon apps and eBooks.",
    site: "@darshanregmi_np",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}