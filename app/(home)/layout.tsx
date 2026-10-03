import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The homepage is a client component, so it cannot export metadata itself.
 *
 * This lives in a `(home)` route group rather than the root layout on
 * purpose: the root layout's metadata is inherited by every route, which is
 * how `alternates.canonical: "/"` ended up on /about, /contact, /privacy and
 * /terms. Keeping the homepage canonical scoped to its own group means a
 * future route can never silently inherit it.
 */
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}