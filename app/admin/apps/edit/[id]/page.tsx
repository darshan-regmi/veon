"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadImage } from "@/lib/storage";
import { getAppById, updateApp } from "@/lib/firestore";
import { getLatestRelease } from "@/lib/github";
import type { App } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Loader2,
  Github,
  RefreshCw,
  X,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

const APP_CATEGORIES = [
  "productivity",
  "entertainment",
  "education",
  "social",
  "utilities",
  "games",
  "health",
  "finance",
  "business",
  "lifestyle",
];

export default function EditAppPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [app, setApp] = useState<App | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    developer: "",
    description: "",
    category: "",
    version: "",
    releaseDate: "",
    downloadUrl: "",
    features: "",
    changelogText: "",
    featured: false,
    githubRepo: "",
    newVersionForChangelog: "",
  });

  // Existing screenshots (URLs already in Firestore)
  const [existingScreenshots, setExistingScreenshots] = useState<string[]>([]);
  // New screenshots to upload
  const [newScreenshotFiles, setNewScreenshotFiles] = useState<File[]>([]);
  const [newScreenshotPreviews, setNewScreenshotPreviews] = useState<string[]>(
    []
  );
  // Icon
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    if (!id) return;
    getAppById(id as string)
      .then((data) => {
        if (!data) return;
        setApp(data);
        setForm({
          name: data.name,
          slug: data.slug,
          developer: data.developer ?? "",
          description: data.description,
          category: data.category,
          version: data.version,
          releaseDate: data.releaseDate,
          downloadUrl: data.downloadUrl,
          features: data.features.join("\n"),
          changelogText: "",
          featured: data.featured,
          githubRepo: data.githubRepo ?? "",
          newVersionForChangelog: data.version,
        });
        setExistingScreenshots(data.screenshots);
        setIconPreview(data.icon);
      })
      .finally(() => setLoadingApp(false));
  }, [id]);

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewScreenshotFiles((prev) => [...prev, ...files]);
    setNewScreenshotPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  };

  const removeExistingScreenshot = (index: number) => {
    setExistingScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewScreenshot = (index: number) => {
    setNewScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setNewScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const syncFromGitHub = async () => {
    if (!form.githubRepo.trim()) return;
    setSyncing(true);
    try {
      const release = await getLatestRelease(form.githubRepo.trim());
      if (!release) {
        alert("No releases found. Check the repo format: owner/repo");
        return;
      }
      setForm((prev) => ({
        ...prev,
        version: release.version,
        releaseDate: release.releaseDate,
        downloadUrl: release.downloadUrl || prev.downloadUrl,
        changelogText: release.changelog || prev.changelogText,
        newVersionForChangelog: release.version,
      }));
    } catch {
      alert("Failed to fetch GitHub release.");
    } finally {
      setSyncing(false);
    }
  };

  const uploadFile = (file: File, path: string): Promise<string> =>
    uploadImage(file, path);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!app) return;
    setLoading(true);

    try {
      const tempId = `${app.id}_${Date.now()}`;

      let iconUrl = iconPreview;
      if (iconFile) {
        setProgress("Uploading icon...");
        iconUrl = await uploadFile(
          iconFile,
          `apps/${tempId}/icon_${iconFile.name}`
        );
      }

      let newUrls: string[] = [];
      if (newScreenshotFiles.length > 0) {
        newUrls = await Promise.all(
          newScreenshotFiles.map((file, i) => {
            setProgress(
              `Uploading screenshots (${i + 1}/${newScreenshotFiles.length})...`
            );
            return uploadFile(
              file,
              `apps/${tempId}/screenshots/${i}_${file.name}`
            );
          })
        );
      }

      setProgress("Saving changes...");

      const features = form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);

      // Merge new changelog entry with existing
      const changelog = { ...app.changelog };
      if (form.changelogText && form.newVersionForChangelog) {
        changelog[form.newVersionForChangelog] = form.changelogText;
      }

      await updateApp(app.id, {
        name: form.name,
        slug: form.slug,
        developer: form.developer,
        description: form.description,
        category: form.category,
        version: form.version,
        releaseDate: form.releaseDate,
        downloadUrl: form.downloadUrl,
        icon: iconUrl,
        screenshots: [...existingScreenshots, ...newUrls],
        features,
        changelog,
        featured: form.featured,
        ...(form.githubRepo && { githubRepo: form.githubRepo }),
      });

      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert(
        `Failed to update app: ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  if (loadingApp) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
          <Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" />
        </div>
      </ProtectedRoute>
    );
  }

  if (!app) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[#7a7a7a] mb-4">App not found.</p>
          <Link href="/admin">
            <Button className="rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white">Back to Admin</Button>
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ fontSize: 14, color: "#0066cc" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
        </div>

        <div
          className="p-8"
          style={{ borderRadius: 18, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
        >
          <h1
            className="text-[#1d1d1f] mb-1"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            Edit App
          </h1>
          <p className="text-[#7a7a7a] mb-6" style={{ fontSize: 14 }}>
            Update {app.name}
          </p>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* GitHub sync */}
              <div className="p-4 space-y-3" style={{ border: "1px solid #e0e0e0", borderRadius: 11, backgroundColor: "#f5f5f7" }}>
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Github className="w-4 h-4" />
                  Sync from GitHub
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="owner/repo"
                    value={form.githubRepo}
                    onChange={(e) => set("githubRepo", e.target.value)}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={syncFromGitHub}
                    disabled={syncing || !form.githubRepo || loading}
                    className="shrink-0"
                  >
                    {syncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Sync
                  </Button>
                </div>
              </div>

              {/* Name & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">App Name *</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    required
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-[#7a7a7a]">
                    URL: /apps/{form.slug}
                  </p>
                </div>
              </div>

              {/* Developer */}
              <div className="space-y-1.5">
                <Label htmlFor="developer">Developer</Label>
                <Input
                  id="developer"
                  value={form.developer}
                  onChange={(e) => set("developer", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => set("category", v)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="min-h-[100px]"
                  disabled={loading}
                />
              </div>

              {/* Version & Release Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="version">Version *</Label>
                  <Input
                    id="version"
                    required
                    value={form.version}
                    onChange={(e) => set("version", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="releaseDate">Release Date *</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    required
                    value={form.releaseDate}
                    onChange={(e) => set("releaseDate", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Download URL */}
              <div className="space-y-1.5">
                <Label htmlFor="downloadUrl">APK Download URL *</Label>
                <Input
                  id="downloadUrl"
                  type="url"
                  required
                  value={form.downloadUrl}
                  onChange={(e) => set("downloadUrl", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* App Icon */}
              <div className="space-y-1.5">
                <Label>App Icon</Label>
                <div className="flex items-start gap-4">
                  {iconPreview ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0" style={{ border: "1px solid #e0e0e0" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={iconPreview} alt="Icon" className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center shrink-0" style={{ borderColor: "#e0e0e0", backgroundColor: "#f5f5f7" }}>
                      <ImageIcon className="w-8 h-8 text-[#cccccc]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIconFile(file);
                        setIconPreview(URL.createObjectURL(file));
                      }}
                      disabled={loading}
                    />
                    <p className="text-xs text-stone-400 mt-1.5">
                      Leave empty to keep current icon.
                    </p>
                  </div>
                </div>
              </div>

              {/* Screenshots */}
              <div className="space-y-2">
                <Label>Screenshots</Label>

                {/* Existing */}
                {existingScreenshots.length > 0 && (
                  <div>
                    <p className="text-xs text-stone-500 mb-2">
                      Current screenshots:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {existingScreenshots.map((src, i) => (
                        <div
                          key={i}
                          className="relative w-14 h-24 rounded-lg overflow-hidden group"
                          style={{ border: "1px solid #e0e0e0" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Screenshot ${i + 1}`} className="object-cover w-full h-full" />
                          <button
                            type="button"
                            onClick={() => removeExistingScreenshot(i)}
                            className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New */}
                {newScreenshotPreviews.length > 0 && (
                  <div>
                    <p className="text-xs text-stone-500 mb-2">
                      New screenshots to upload:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {newScreenshotPreviews.map((src, i) => (
                        <div
                          key={i}
                          className="relative w-14 h-24 rounded-lg overflow-hidden group"
                          style={{ border: "1px solid rgba(0,102,204,0.3)" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`New ${i + 1}`} className="object-cover w-full h-full" />
                          <button
                            type="button"
                            onClick={() => removeNewScreenshot(i)}
                            className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotsChange}
                  disabled={loading}
                />
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  value={form.features}
                  onChange={(e) => set("features", e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                  disabled={loading}
                />
                <p className="text-xs text-[#7a7a7a]">One feature per line.</p>
              </div>

              {/* Add changelog for new version */}
              <div className="p-4 space-y-3" style={{ border: "1px solid #e0e0e0", borderRadius: 11, backgroundColor: "#f5f5f7" }}>
                <Label className="text-sm font-semibold">
                  Add Changelog Entry
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Version (e.g. 1.1.0)"
                    value={form.newVersionForChangelog}
                    onChange={(e) =>
                      set("newVersionForChangelog", e.target.value)
                    }
                    disabled={loading}
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="What's new in this version..."
                      value={form.changelogText}
                      onChange={(e) => set("changelogText", e.target.value)}
                      className="min-h-[80px]"
                      disabled={loading}
                    />
                  </div>
                </div>
                <p className="text-xs text-[#7a7a7a]">
                  Leave empty to keep existing changelog. Adds to version
                  history.
                </p>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(v) => set("featured", v)}
                  disabled={loading}
                  className="data-[state=checked]:bg-[#0066cc] data-[state=unchecked]:bg-[#d1d1d6]"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Feature this app on the homepage
                </Label>
              </div>

              {/* Progress */}
              {progress && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{
                    padding: "12px 14px",
                    borderRadius: 11,
                    backgroundColor: "rgba(0,102,204,0.06)",
                    border: "1px solid rgba(0,102,204,0.2)",
                    color: "#0066cc",
                  }}
                >
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  {progress}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0066cc] hover:bg-[#0071e3] text-white rounded-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline" disabled={loading} className="rounded-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}
