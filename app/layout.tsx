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
  title: "Veon - Premium Apps & eBooks | Handcrafted Digital Products",
  description: "Discover premium Android APKs and expert eBooks crafted with passion. Veon offers carefully designed apps and guides to enhance your digital life.",
  keywords: ["premium apps", "android apk", "ebooks", "digital products", "productivity apps", "expert guides"],
  authors: [{ name: "Darshan Regmi" }],
  creator: "Veon",
  publisher: "Veon",
  metadataBase: new URL("https://veon.darshanregmi.com.np"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veon.darshanregmi.com.np",
    title: "Veon - Premium Apps & eBooks",
    description: "Handcrafted digital products built with passion. Premium Android apps and expert guides.",
    siteName: "Veon",
    images: [
      {
        url: "/og-image.jpg", // Add this image to your /public folder
        width: 1200,
        height: 630,
        alt: "Veon - Premium Digital Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veon - Premium Apps & eBooks",
    description: "Handcrafted digital products built with passion.",
    images: ["/og-image.jpg"], // Same image as OG
    creator: "@darshanregmi_np", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://veon.darshanregmi.con.np" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}