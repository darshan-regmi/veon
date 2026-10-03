"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface Props {
  downloadUrl: string;
  /**
   * Firestore collection + doc id to bump a `downloads` counter on click.
   * Accepting ids instead of an `onTrack` callback keeps this usable from
   * Server Components, which cannot pass functions across the boundary.
   */
  track?: { kind: "app" | "book"; id: string };
  className?: string;
  label?: string;
  variant?: "primary" | "secondary";
}

async function recordDownload(track: NonNullable<Props["track"]>) {
  const { incrementBookDownloads, incrementDownloads } = await import(
    "@/lib/firestore"
  );
  if (track.kind === "app") await incrementDownloads(track.id);
  else await incrementBookDownloads(track.id);
}

export default function DownloadButton({
  downloadUrl,
  track,
  className = "",
  label = "Download",
  variant = "primary",
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!downloadUrl) return;
    setLoading(true);
    try {
      if (track) await recordDownload(track);
    } catch {
      // don't block download if tracking fails
    } finally {
      setLoading(false);
    }
    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  };

  const base =
    variant === "primary"
      ? "bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95"
      : "bg-transparent text-[#0066cc] border border-[#0066cc] hover:bg-[#0066cc]/5 active:scale-95";

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !downloadUrl}
      className={`inline-flex items-center gap-2 rounded-full px-[22px] py-[11px] font-normal transition-all disabled:opacity-40 disabled:cursor-not-allowed ${base} ${className}`}
      style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
    >
      {loading ? (
        <Loader2 className="w-[18px] h-[18px] animate-spin" />
      ) : (
        <Download className="w-[18px] h-[18px]" />
      )}
      {label}
    </button>
  );
}