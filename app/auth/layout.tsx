import type { Metadata } from "next";

/**
 * Login/register are public URLs that render fine to a crawler, so they need
 * an explicit noindex. This also matches the /auth/ entry in robots.txt.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
