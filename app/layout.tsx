import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

  metadataBase: new URL("https://veon.darshanregmi.com.np"),

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veon.darshanregmi.com.np",
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
    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
    "geo.region": "NP-P4",
    "geo.placename": "Pokhara",
    "geo.position": "28.209583;83.991111",
    ICBM: "28.209583, 83.991111",
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
        "@id": "https://veon.darshanregmi.com.np/#website",
        url: "https://veon.darshanregmi.com.np",
        name: "Veon",
        description:
          "Premium Android apps and eBooks crafted with passion by Darshan Regmi",
        publisher: {
          "@id": "https://veon.darshanregmi.com.np/#organization",
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://veon.darshanregmi.com.np/products?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://veon.darshanregmi.com.np/#organization",
        name: "Veon",
        url: "https://veon.darshanregmi.com.np",
        logo: {
          "@type": "ImageObject",
          "@id": "https://veon.darshanregmi.com.np/#logo",
          url: "https://veon.darshanregmi.com.np/logo.png",
          contentUrl: "https://veon.darshanregmi.com.np/logo.png",
          width: 512,
          height: 512,
          caption: "Veon Logo",
        },
        image: {
          "@id": "https://veon.darshanregmi.com.np/#logo",
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
        image: "https://veon.darshanregmi.com.np/logo.png",
        jobTitle: "Software Developer & Author",
        worksFor: {
          "@id": "https://veon.darshanregmi.com.np/#organization",
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
        "@id": "https://veon.darshanregmi.com.np/#webpage",
        url: "https://veon.darshanregmi.com.np",
        name: "Veon - Download Premium Android Apps & eBooks",
        isPartOf: {
          "@id": "https://veon.darshanregmi.com.np/#website",
        },
        about: {
          "@id": "https://veon.darshanregmi.com.np/#organization",
        },
        primaryImageOfPage: {
          "@id": "https://veon.darshanregmi.com.np/#primaryimage",
        },
        image: {
          "@id": "https://veon.darshanregmi.com.np/#primaryimage",
        },
        thumbnailUrl: "https://veon.darshanregmi.com.np/og-image.png",
        datePublished: "2024-01-01T00:00:00+00:00",
        dateModified: new Date().toISOString(),
        description:
          "Download premium Android APKs and expert eBooks by Darshan Regmi. Handcrafted productivity apps, poetry collections, and digital guides.",
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: ["https://veon.darshanregmi.com.np"],
          },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": "https://veon.darshanregmi.com.np/#primaryimage",
        inLanguage: "en-US",
        url: "https://veon.darshanregmi.com.np/og-image.png",
        contentUrl: "https://veon.darshanregmi.com.np/og-image.png",
        width: 1200,
        height: 630,
        caption: "Veon - Premium Android Apps and eBooks",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://veon.darshanregmi.com.np/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://veon.darshanregmi.com.np",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
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
        {children}
      </body>
    </html>
  );
}
