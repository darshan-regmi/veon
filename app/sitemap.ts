import type { MetadataRoute } from "next";
import { getAllApps, getAllBooks } from "@/lib/firestore-server";
import { SITE_URL } from "@/lib/site";

// Regenerate hourly rather than freezing the URL list at build time, so a
// newly published app or book is discoverable without a redeploy.
export const revalidate = 3600;
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No `lastModified` on the static routes: stamping them with `new Date()` on
  // every hourly regeneration tells crawlers the page changed every hour when
  // it did not, which erodes the signal. Omit it rather than lie.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/apps`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/books`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // A Firestore outage must not blank the sitemap — keep the static routes and
  // log, rather than 500 and drop every URL from the index.
  let itemRoutes: MetadataRoute.Sitemap = [];

  try {
    const [apps, books] = await Promise.all([getAllApps(), getAllBooks()]);

    itemRoutes = [
      ...apps.map((app) => ({
        url: `${SITE_URL}/apps/${app.slug}`,
        // A real edit time when we have one; otherwise leave it off.
        ...(app.updatedAt ? { lastModified: app.updatedAt } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...books.map((book) => ({
        url: `${SITE_URL}/books/${book.slug}`,
        ...(book.updatedAt ? { lastModified: book.updatedAt } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch (error) {
    console.error("sitemap: failed to load apps/books", error);
  }

  return [...staticRoutes, ...itemRoutes];
}