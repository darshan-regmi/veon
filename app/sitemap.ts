import type { MetadataRoute } from "next";
import { getAllApps, getAllBooks } from "@/lib/firestore-server";
import { SITE_URL } from "@/lib/site";

// Regenerate hourly rather than freezing the URL list at build time, so a
// newly published app or book is discoverable without a redeploy.
export const revalidate = 3600;
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/apps`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/books`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // A Firestore outage must not blank the sitemap — keep the static routes and
  // log, rather than 500 and drop every URL from the index.
  let itemRoutes: MetadataRoute.Sitemap = [];

  try {
    const [apps, books] = await Promise.all([getAllApps(), getAllBooks()]);

    itemRoutes = [
      ...apps.map((app) => ({
        url: `${SITE_URL}/apps/${app.slug}`,
        lastModified: app.updatedAt ?? now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...books.map((book) => ({
        url: `${SITE_URL}/books/${book.slug}`,
        lastModified: book.updatedAt ?? now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch (error) {
    console.error("sitemap: failed to load apps/books", error);
  }

  return [...staticRoutes, ...itemRoutes];
}