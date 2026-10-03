import { cache } from "react";
import { decodeFirestoreFields, docToApp, docToBook } from "./mappers";
import type { App, Book } from "./types";

/**
 * Server-side Firestore reads for React Server Components.
 *
 * Uses the Firestore REST API over `fetch` rather than the Admin SDK so this
 * module works on the edge runtime (Cloudflare Pages). Reads are
 * unauthenticated — the same public data the browser SDK already fetches today.
 *
 * Never import this from a client component; use `@/lib/firestore` for that.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const DOCS_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * `RunQuery` hangs off the `documents` collection, NOT off a document:
 * `documents:runQuery`. Putting the collection id in the path
 * (`documents/apps:runQuery`) makes the API parse it as a *document* named
 * "apps" and reject the payload. The target collection goes in
 * `structuredQuery.from` instead.
 */
const RUN_QUERY_URL = `${DOCS_BASE}:runQuery`;

/**
 * These reads are unauthenticated: the web API key travels as a query param
 * and Firestore evaluates security rules against the anonymous identity.
 *
 * Do NOT send `Authorization: Bearer owner` — Firestore's REST API rejects it
 * with 401 CREDENTIALS_MISSING (it expects a real OAuth2 token there).
 *
 * `path` may already carry a query string (e.g. `apps?pageSize=300`), so the
 * key is merged via URL rather than concatenated.
 */
function authedUrl(pathOrUrl: string): string {
  const url = new URL(pathOrUrl);
  if (API_KEY) url.searchParams.set("key", API_KEY);
  return url.toString();
}

/** Firestore caps pageSize at 300; these collections are far smaller. */
const MAX_DOCS = 300;

type FirestoreDoc = { name?: string; fields?: Record<string, unknown> };

/** Firestore resource names look like `projects/p/databases/(default)/documents/apps/abc123`. */
function docId(doc: FirestoreDoc): string {
  return doc.name?.split("/").pop() ?? "";
}

type Row = { id: string; fields: Record<string, unknown> };

function assertProject(): void {
  if (!PROJECT_ID) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID is required for server-side Firestore reads."
    );
  }
}

/**
 * Lists a whole collection. Uses the document-list GET endpoint because Next
 * only caches GET fetches, so this is the path that actually benefits from
 * `revalidate`. Ordering is applied in JS to avoid needing a composite index.
 */
async function listCollection(collectionId: string): Promise<Row[]> {
  assertProject();
  const res = await fetch(authedUrl(`${DOCS_BASE}/${collectionId}?pageSize=${MAX_DOCS}`), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(
      `Firestore list failed for "${collectionId}": ${res.status} ${await res.text()}`
    );
  }

  const { documents }: { documents?: FirestoreDoc[] } = await res.json();
  // REST returns encoded values; decode before mapping.
  return (documents ?? []).map((d) => ({
    id: docId(d),
    fields: decodeFirestoreFields(d.fields ?? {}),
  }));
}

/** Equality lookup by slug. Wrapped in `cache()` so generateMetadata and the
 *  page body share a single round trip within one render. */
async function findBySlug(collectionId: string, slug: string): Promise<Row | null> {
  assertProject();

  const res = await fetch(authedUrl(RUN_QUERY_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId }],
        where: {
          compositeFilter: {
            op: "AND",
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: "slug" },
                  op: "EQUAL",
                  value: { stringValue: slug },
                },
              },
            ],
          },
        },
        limit: 1,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Firestore query failed for "${collectionId}": ${res.status} ${await res.text()}`
    );
  }

  const rows: { document?: FirestoreDoc }[] = await res.json();
  const doc = rows.find((r) => r.document)?.document;
  // The document id (not the slug) is what download counters key off, so it
  // has to come from the resource name rather than the query parameter.
  return doc
    ? { id: docId(doc), fields: decodeFirestoreFields(doc.fields ?? {}) }
    : null;
}

const byNewest = <T extends { createdAt: Date }>(a: T, b: T) =>
  b.createdAt.getTime() - a.createdAt.getTime();

// ─── Apps ─────────────────────────────────────────────────────────────────────

export async function getAllApps(): Promise<App[]> {
  const rows = await listCollection("apps");
  return rows.map((r) => docToApp(r.id, r.fields)).sort(byNewest);
}

export async function getFeaturedApps(): Promise<App[]> {
  return (await getAllApps()).filter((a) => a.featured);
}

export const getAppBySlug = cache(async (slug: string): Promise<App | null> => {
  const row = await findBySlug("apps", slug);
  return row ? docToApp(row.id, row.fields) : null;
});

// ─── Books ─────────────────────────────────────────────────────────────────────

export async function getAllBooks(): Promise<Book[]> {
  const rows = await listCollection("books");
  return rows.map((r) => docToBook(r.id, r.fields)).sort(byNewest);
}

export async function getFeaturedBooks(): Promise<Book[]> {
  return (await getAllBooks()).filter((b) => b.featured);
}

export const getBookBySlug = cache(async (slug: string): Promise<Book | null> => {
  const row = await findBySlug("books", slug);
  return row ? docToBook(row.id, row.fields) : null;
});

// ─── Slugs (for the sitemap) ───────────────────────────────────────────────────

export async function getAllAppSlugs(): Promise<string[]> {
  return (await getAllApps()).map((a) => a.slug).filter(Boolean);
}

export async function getAllBookSlugs(): Promise<string[]> {
  return (await getAllBooks()).map((b) => b.slug).filter(Boolean);
}