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
import { docToApp, docToBook } from "./mappers";
import type { App, AppInput, Book, BookInput } from "./types";

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
