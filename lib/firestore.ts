import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { App, AppInput, Book, BookInput } from "./types";

function docToApp(id: string, data: Record<string, unknown>): App {
  return {
    id,
    name: (data.name as string) ?? "",
    slug: (data.slug as string) ?? id,
    description: (data.description as string) ?? "",
    icon: (data.icon as string) ?? "",
    features: (data.features as string[]) ?? [],
    version: (data.version as string) ?? "1.0.0",
    releaseDate: (data.releaseDate as string) ?? "",
    // support legacy "apkUrl" field
    downloadUrl:
      (data.downloadUrl as string) ?? (data.apkUrl as string) ?? "",
    screenshots: (data.screenshots as string[]) ?? [],
    category: (data.category as string) ?? "",
    downloads: (data.downloads as number) ?? 0,
    changelog: (data.changelog as Record<string, string>) ?? {},
    featured: (data.featured as boolean) ?? false,
    developer: data.developer as string | undefined,
    rating: data.rating as number | undefined,
    price: data.price as number | undefined,
    isFree: data.isFree as boolean | undefined,
    githubRepo: data.githubRepo as string | undefined,
    createdAt:
      (data.createdAt as { toDate?: () => Date } | null)?.toDate?.() ??
      new Date(),
    updatedAt:
      (data.updatedAt as { toDate?: () => Date } | null)?.toDate?.() ??
      new Date(),
  };
}

export async function getAllApps(): Promise<App[]> {
  const snap = await getDocs(
    query(collection(db, "apps"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => docToApp(d.id, d.data()));
}

// Requires Firestore composite index: featured ASC + createdAt DESC
// Firebase will log a link to create it on first use.
export async function getFeaturedApps(): Promise<App[]> {
  const snap = await getDocs(
    query(
      collection(db, "apps"),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => docToApp(d.id, d.data()));
}

export async function getAppBySlug(slug: string): Promise<App | null> {
  const snap = await getDocs(
    query(collection(db, "apps"), where("slug", "==", slug))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return docToApp(d.id, d.data());
}

export async function getAppById(id: string): Promise<App | null> {
  const snap = await getDoc(doc(db, "apps", id));
  if (!snap.exists()) return null;
  return docToApp(snap.id, snap.data());
}

export async function incrementDownloads(appId: string): Promise<void> {
  await updateDoc(doc(db, "apps", appId), { downloads: increment(1) });
}

export async function addApp(data: AppInput): Promise<string> {
  const ref = await addDoc(collection(db, "apps"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateApp(
  id: string,
  data: Partial<AppInput>
): Promise<void> {
  await updateDoc(doc(db, "apps", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteApp(id: string): Promise<void> {
  await deleteDoc(doc(db, "apps", id));
}

// ─── Books ────────────────────────────────────────────────────────────────────

function docToBook(id: string, data: Record<string, unknown>): Book {
  return {
    id,
    title: (data.title as string) ?? "",
    slug: (data.slug as string) ?? id,
    author: (data.author as string) ?? "",
    description: (data.description as string) ?? "",
    cover: (data.cover as string) ?? "",
    pdfUrl: (data.pdfUrl as string) ?? "",
    genre: (data.genre as string) ?? "",
    language: (data.language as string) ?? "English",
    publishedDate: (data.publishedDate as string) ?? "",
    pages: data.pages as number | undefined,
    excerpt: data.excerpt as string | undefined,
    tags: (data.tags as string[]) ?? [],
    featured: (data.featured as boolean) ?? false,
    downloads: (data.downloads as number) ?? 0,
    createdAt:
      (data.createdAt as { toDate?: () => Date } | null)?.toDate?.() ??
      new Date(),
    updatedAt:
      (data.updatedAt as { toDate?: () => Date } | null)?.toDate?.() ??
      new Date(),
  };
}

export async function getAllBooks(): Promise<Book[]> {
  const snap = await getDocs(
    query(collection(db, "books"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => docToBook(d.id, d.data()));
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const snap = await getDocs(
    query(
      collection(db, "books"),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => docToBook(d.id, d.data()));
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const snap = await getDocs(
    query(collection(db, "books"), where("slug", "==", slug))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return docToBook(d.id, d.data());
}

export async function getBookById(id: string): Promise<Book | null> {
  const snap = await getDoc(doc(db, "books", id));
  if (!snap.exists()) return null;
  return docToBook(snap.id, snap.data());
}

export async function incrementBookDownloads(bookId: string): Promise<void> {
  await updateDoc(doc(db, "books", bookId), { downloads: increment(1) });
}

export async function addBook(data: BookInput): Promise<string> {
  const ref = await addDoc(collection(db, "books"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBook(
  id: string,
  data: Partial<BookInput>
): Promise<void> {
  await updateDoc(doc(db, "books", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBook(id: string): Promise<void> {
  await deleteDoc(doc(db, "books", id));
}
