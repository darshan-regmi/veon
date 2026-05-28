export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get("repo");

  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return NextResponse.json({ error: "Invalid repo format" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers }
  );

  if (!res.ok) {
    const status = res.status === 404 ? 404 : 502;
    return NextResponse.json(
      { error: `GitHub returned ${res.status}` },
      { status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
