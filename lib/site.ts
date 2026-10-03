export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://veon.darshanregmi.com.np"
).replace(/\/$/, "");

export const SITE_NAME = "Veon";
export const AUTHOR_NAME = "Darshan Regmi";
export const TWITTER_HANDLE = "@darshanregmi_np";

/** Builds an absolute URL for canonical/OG tags. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Trims text to a meta-description length without cutting mid-word.
 * ~155 chars is the practical Google snippet limit.
 */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:—-]+$/, "")}…`;
}