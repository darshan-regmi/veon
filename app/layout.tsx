import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Optimized title with template support
  title: {
    default: "Veon - Premium Apps & eBooks by Darshan Regmi",
    template: "%s | Veon",
  },

  // SEO-optimized description (150-160 chars)
  description:
    "Download handcrafted Android APKs and expert eBooks by Darshan Regmi. Premium productivity apps, poetry collections, and digital guides built with passion in Nepal.",

  // Keywords removed - deprecated by Google

  authors: [{ name: "Darshan Regmi", url: "https://darshanregmi.com.np" }],
  creator: "Darshan Regmi",
  publisher: "Veon",

  metadataBase: new URL("https://veon.darshanregmi.com.np"),

  // Canonical URL using Metadata API (not manual <head> tag)
  alternates: {
    canonical: "https://veon.darshanregmi.com.np",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veon.darshanregmi.com.np",
    title: "Veon - Premium Apps & eBooks by Darshan Regmi",
    description:
      "Download handcrafted Android APKs and expert eBooks. Premium productivity apps and digital guides built with passion.",
    siteName: "Veon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veon - Premium Android Apps and eBooks",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@darshanregmi_np",
    creator: "@darshanregmi_np",
    title: "Veon - Premium Apps & eBooks",
    description:
      "Download handcrafted Android APKs and expert eBooks built with passion.",
    images: {
      url: "/og-image.png",
      alt: "Veon - Premium Android Apps and eBooks",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Veon",
    url: "https://veon.darshanregmi.com.np",
    author: {
      "@type": "Person",
      name: "Darshan Regmi",
      url: "https://darshanregmi.com.np",
    },
    description: "Premium Android apps and eBooks crafted with passion",
    publisher: {
      "@type": "Organization",
      name: "Veon",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
