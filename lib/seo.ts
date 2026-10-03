import { AUTHOR_NAME, SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import type { App, Book } from "./types";

/**
 * schema.org builders. Every node references the `#website` / `#person`
 * entities declared in the root layout so the graph resolves into one thing.
 */

type JsonLd = Record<string, unknown>;

export function appJsonLd(app: App): JsonLd {
  const url = absoluteUrl(`/apps/${app.slug}`);

  const node: JsonLd = {
    "@type": "SoftwareApplication",
    "@id": `${url}#app`,
    name: app.name,
    description: app.description,
    url,
    applicationCategory: `${app.category || "Utilities"}Application`,
    operatingSystem: "Android",
    softwareVersion: app.version,
    downloadUrl: app.downloadUrl || undefined,
    installUrl: app.downloadUrl || undefined,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    image: app.icon || `${SITE_URL}/og-image.png`,
    datePublished: app.releaseDate || app.createdAt.toISOString(),
    dateModified: app.updatedAt.toISOString(),
  };

  if (app.features?.length) {
    node.featureList = app.features;
  }
  if (typeof app.downloads === "number" && app.downloads > 0) {
    node.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/DownloadAction",
      userInteractionCount: app.downloads,
    };
  }
  if (app.githubRepo) {
    node.codeRepository = app.githubRepo;
  }
  if (typeof app.rating === "number" && app.rating > 0) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: app.rating,
      // No review count is stored, so omit it rather than emit an invalid one.
      bestRating: 5,
      worstRating: 1,
    };
  }
  node.offers = {
    "@type": "Offer",
    price: app.price ?? 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [node, breadcrumbJsonLd([["Home", "/"], ["Apps", "/apps"], [app.name, `/apps/${app.slug}`]])],
  };
}

export function bookJsonLd(book: Book): JsonLd {
  const url = absoluteUrl(`/books/${book.slug}`);

  const node: JsonLd = {
    "@type": "Book",
    "@id": `${url}#book`,
    name: book.title,
    description: book.excerpt || book.description,
    url,
    author: { "@type": "Person", name: book.author || AUTHOR_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: book.language || "en",
    image: book.cover || `${SITE_URL}/og-image.png`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    genre: book.genre || undefined,
    keywords: book.tags?.join(", ") || undefined,
    datePublished: book.publishedDate || book.createdAt.toISOString(),
    dateModified: book.updatedAt.toISOString(),
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  if (book.pages) node.numberOfPages = book.pages;
  if (typeof book.downloads === "number" && book.downloads > 0) {
    node.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/DownloadAction",
      userInteractionCount: book.downloads,
    };
  }
  if (book.pdfUrl) {
    node.encoding = {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      contentUrl: book.pdfUrl,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [node, breadcrumbJsonLd([["Home", "/"], ["Books", "/books"], [book.title, `/books/${book.slug}`]])],
  };
}

/** `items` is an ordered list of `[name, path]` pairs. */
export function breadcrumbJsonLd(items: [string, string][]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export function collectionJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(opts.path)}#collection`,
        url: absoluteUrl(opts.path),
        name: opts.name,
        description: opts.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        hasPart: opts.items.map((item) => ({
          "@type": "CreativeWork",
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
      breadcrumbJsonLd([["Home", "/"], [opts.name, opts.path]]),
    ],
  };
}

export const SITE_REF = {
  website: { "@id": `${SITE_URL}/#website` },
  organization: { "@id": `${SITE_URL}/#organization` },
  person: { "@id": `${SITE_URL}/#person` },
} as const;

export { SITE_NAME, AUTHOR_NAME };