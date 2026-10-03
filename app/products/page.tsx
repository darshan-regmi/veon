import { redirect } from "next/navigation";

export const runtime = "edge";

/**
 * /products was a standalone page with hardcoded placeholder data. Nothing
 * linked to it, and it competed with /apps and /books for the same search
 * intent. Permanently redirect so any bookmarked or externally-shared URL
 * keeps working without leaving a duplicate page in the index.
 */
export default function ProductsPage() {
  redirect("/apps");
}