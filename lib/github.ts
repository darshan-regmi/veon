export interface GitHubRelease {
  version: string;
  releaseDate: string;
  downloadUrl: string;
  changelog: string;
  assets: { name: string; downloadUrl: string; size: number }[];
}

export async function getLatestRelease(repo: string): Promise<GitHubRelease | null> {
  try {
    const res = await fetch(
      `/api/github/release?repo=${encodeURIComponent(repo)}`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const apkAsset = data.assets?.find((a: { name: string }) =>
      a.name.endsWith(".apk")
    );

    return {
      version: (data.tag_name ?? "v1.0.0").replace(/^v/, ""),
      releaseDate: (data.published_at ?? new Date().toISOString()).split("T")[0],
      downloadUrl: apkAsset?.browser_download_url ?? "",
      changelog: data.body ?? "",
      assets: (data.assets ?? []).map(
        (a: { name: string; browser_download_url: string; size: number }) => ({
          name: a.name,
          downloadUrl: a.browser_download_url,
          size: a.size,
        })
      ),
    };
  } catch {
    return null;
  }
}
