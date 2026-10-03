import type { Metadata } from "next";

/**
 * The admin UI is client-gated (ProtectedRoute) and renders a 200 for anyone,
 * crawler included — the gate only runs after hydration. robots.txt asks
 * crawlers not to request /admin/, but Disallow does not de-index a URL that
 * has already been discovered. noindex is the signal that actually removes it.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
