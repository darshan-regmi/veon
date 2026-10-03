import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Veon - Download Premium Android Apps & eBooks | Darshan Regmi",
    template: "%s | Veon",
  },

  description:
    "Download premium Android APKs and eBooks by Darshan Regmi. Discover handcrafted productivity apps, poetry collections from Nepal.",

  authors: [{ name: "Darshan Regmi", url: "https://darshanregmi.com.np" }],
  creator: "Darshan Regmi",
  publisher: "Darshan Regmi",

  metadataBase: new URL(SITE_URL),

  // NOTE: no `alternates.canonical` here on purpose. Root-layout metadata is
  // inherited by every route, so a canonical of "/" declared up here told
  // Google that /about, /contact, /privacy and /terms were all duplicates of
  // the homepage. Each route now declares its own canonical (or omits it).
  // The root layout also owns `openGraph`/`twitter` defaults; individual pages
  // override them where they have specific imagery.

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Veon - Download Premium Android Apps & eBooks | Darshan Regmi",
    description:
      "Download premium Android APKs and eBooks by Darshan Regmi. Handcrafted productivity apps, poetry collections from Nepal.",
    siteName: "Veon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veon - Premium Android Apps and eBooks by Darshan Regmi",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@darshanregmi_np",
    creator: "@darshanregmi_np",
    title: "Veon - Download Premium Android Apps & eBooks",
    description:
      "Download premium Android APKs and eBooks by Darshan Regmi. Handcrafted productivity apps from Nepal.",
    images: ["/og-image.png"],
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.png",
      },
    ],
  },

  manifest: "/manifest.json",

  applicationName: "Veon",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Veon",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  referrer: "origin-when-cross-origin",

  verification: {
    google: "IT7yL2FkZ4D6Ep4nyU7Zsw7nz0AdLir1Q3OebrXlCsc",
    other: {
      "msvalidate.01": "0B86B78537E16F1AC2EC76F6919D2CEA",
    },
  },

  other: {
    // Legacy ICBM geo-targeting and non-standard directives removed. Google's
    // geo signals come from the JSON-LD PostalAddress below and from
    // Search Console's country targeting — these meta tags were ignored.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}`,
        name: "Veon",
        description:
          "Premium Android apps and eBooks crafted with passion by Darshan Regmi",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              `${SITE_URL}/apps?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Veon",
        url: `${SITE_URL}`,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          contentUrl: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
          caption: "Veon Logo",
        },
        image: {
          "@id": `${SITE_URL}/#logo`,
        },
        founder: {
          "@id": "https://darshanregmi.com.np/#person",
        },
        sameAs: [
          "https://twitter.com/darshanregmi_np",
          "https://github.com/darshanregmi",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          availableLanguage: ["English", "Nepali"],
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "Person",
        "@id": "https://darshanregmi.com.np/#person",
        name: "Darshan Regmi",
        url: "https://darshanregmi.com.np",
        image: `${SITE_URL}/logo.png`,
        jobTitle: "Software Developer & Author",
        worksFor: {
          "@id": `${SITE_URL}/#organization`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pokhara",
          addressRegion: "Province 4",
          addressCountry: "NP",
        },
        sameAs: ["https://twitter.com/darshanregmi_np"],
        knowsAbout: [
          "Android Development",
          "Mobile Applications",
          "Software Engineering",
          "Technical Writing",
          "eBook Publishing",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}`,
        name: "Veon - Download Premium Android Apps & eBooks",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        primaryImageOfPage: {
          "@id": `${SITE_URL}/#primaryimage`,
        },
        image: {
          "@id": `${SITE_URL}/#primaryimage`,
        },
        thumbnailUrl: `${SITE_URL}/og-image.png`,
        datePublished: "2024-01-01T00:00:00+00:00",
        dateModified: new Date().toISOString(),
        description:
          "Download premium Android APKs and expert eBooks by Darshan Regmi. Handcrafted productivity apps, poetry collections, and digital guides.",
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [`${SITE_URL}`],
          },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#primaryimage`,
        inLanguage: "en-US",
        url: `${SITE_URL}/og-image.png`,
        contentUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        caption: "Veon - Premium Android Apps and eBooks",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}`,
          },
        ],
      },
    ],
  };

  // No `prefix="og: https://ogp.me/ns#"` on <html> — that RDFa attribute is
  // long deprecated. Next emits spec-compliant `property="og:*"` tags itself.
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
