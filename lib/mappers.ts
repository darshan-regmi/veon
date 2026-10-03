import type { App, Book } from "./types";

/**
 * Normalizes a single Firestore field into a plain JS value.
 *
 * Handles both shapes we encounter:
 *  - Client SDK objects (Timestamp, arrays, nested maps)
 *  - REST API JSON (stringValue, timestampValue, arrayValue, mapValue, ...)
 */
function decodeValue(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object") return value;

  const v = value as Record<string, unknown>;

  // Timestamp-ish (client SDK Timestamp, or { seconds, nanoseconds })
  if (typeof v.toDate === "function") {
    return (v.toDate as () => Date)();
  }
  if ("seconds" in v && "nanoseconds" in v) {
    return new Date(Number(v.seconds) * 1000);
  }

  // REST API typed values
  if ("stringValue" in v) return v.stringValue as string;
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("integerValue" in v) return Number(v.integerValue);
  if ("booleanValue" in v) return Boolean(v.booleanValue);
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return new Date(String(v.timestampValue));
  if ("referenceValue" in v) return String(v.referenceValue);
  if ("arrayValue" in v) {
    const inner = (v.arrayValue as { values?: unknown[] })?.values ?? [];
    return inner.map(decodeValue);
  }
  if ("mapValue" in v) {
    const fields = (v.mapValue as { fields?: Record<string, unknown> })?.fields ?? {};
    return decodeFields(fields);
  }

  // Plain object / array passthrough (already-decoded client SDK values)
  if (Array.isArray(value)) return value.map(decodeValue);
  return decodeFields(v as Record<string, unknown>);
}

function decodeFields(fields: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    out[key] = decodeValue(value);
  }
  return out;
}

/**
 * Normalizes a raw Firestore document body into plain values.
 *
 * The browser SDK hands back already-decoded data, but the REST API returns
 * encoded values (`{ stringValue: "x" }`, `{ timestampValue: "..." }`), so
 * server-side reads must run the document fields through this first.
 */
export function decodeFirestoreFields(
  fields: Record<string, unknown>
): Record<string, unknown> {
  return decodeFields(fields);
}

const asString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : v == null ? fallback : String(v);

const asNumber = (v: unknown, fallback = 0): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const asDate = (v: unknown): Date => {
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? new Date() : v;
  const d = new Date(v as string);
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

/** Firestore stores numbers sometimes as integers that arrive as strings over REST. */
const asRecord = (v: unknown): Record<string, string> => {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>)
        .filter(([, val]) => typeof val === "string")
        .map(([k, val]) => [k, val as string])
    );
  }
  return {};
};

export function docToApp(id: string, data: Record<string, unknown>): App {
  return {
    id,
    name: asString(data.name),
    slug: asString(data.slug, id),
    description: asString(data.description),
    icon: asString(data.icon),
    features: asStringArray(data.features),
    version: asString(data.version, "1.0.0"),
    releaseDate: asString(data.releaseDate),
    // support legacy "apkUrl" field
    downloadUrl: asString(data.downloadUrl) || asString(data.apkUrl),
    screenshots: asStringArray(data.screenshots),
    category: asString(data.category),
    downloads: asNumber(data.downloads),
    changelog: asRecord(data.changelog),
    featured: Boolean(data.featured),
    developer: data.developer as string | undefined,
    rating: data.rating as number | undefined,
    price: data.price as number | undefined,
    isFree: data.isFree as boolean | undefined,
    githubRepo: data.githubRepo as string | undefined,
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function docToBook(id: string, data: Record<string, unknown>): Book {
  return {
    id,
    title: asString(data.title),
    slug: asString(data.slug, id),
    author: asString(data.author),
    description: asString(data.description),
    cover: asString(data.cover),
    pdfUrl: asString(data.pdfUrl),
    genre: asString(data.genre),
    language: asString(data.language, "English"),
    publishedDate: asString(data.publishedDate),
    pages: data.pages as number | undefined,
    excerpt: data.excerpt as string | undefined,
    tags: asStringArray(data.tags),
    featured: Boolean(data.featured),
    downloads: asNumber(data.downloads),
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}