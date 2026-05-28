"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/lib/storage";
import { addBook } from "@/lib/firestore";
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
import { ArrowLeft, Upload, Loader2, ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

const BOOK_GENRES = [
  "fiction",
  "non-fiction",
  "poetry",
  "biography",
  "history",
  "science",
  "philosophy",
  "self-help",
  "technology",
  "other",
];

const LANGUAGES = ["English", "Nepali", "Hindi", "Other"];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AddBookPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "Darshan Regmi",
    description: "",
    genre: "",
    language: "English",
    publishedDate: new Date().toISOString().split("T")[0],
    pages: "",
    excerpt: "",
    tags: "",
    featured: false,
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === toSlug(prev.title) ? toSlug(title) : prev.slug,
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }
    setLoading(true);

    try {
      const tempId = `${Date.now()}`;

      let coverUrl = "";
      if (coverFile) {
        setProgress("Uploading cover image...");
        coverUrl = await uploadFile(
          coverFile,
          `books/${tempId}/cover_${coverFile.name}`
        );
      }

      setProgress("Uploading PDF...");
      const pdfUrl = await uploadFile(
        pdfFile,
        `books/${tempId}/pdf_${pdfFile.name}`
      );

      setProgress("Saving to Firestore...");

      const slug = form.slug || toSlug(form.title);
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await addBook({
        title: form.title,
        slug,
        author: form.author,
        description: form.description,
        cover: coverUrl,
        pdfUrl,
        genre: form.genre,
        language: form.language,
        publishedDate: form.publishedDate,
        pages: form.pages ? parseInt(form.pages) : undefined,
        excerpt: form.excerpt || undefined,
        tags: tags.length ? tags : undefined,
        featured: form.featured,
        downloads: 0,
      });

      router.push("/admin?tab=books");
    } catch (error) {
      console.error(error);
      alert(
        `Failed to add book: ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

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
            Add New Book
          </h1>
          <p className="text-[#7a7a7a] mb-6" style={{ fontSize: 14 }}>
            Add a book to your library
          </p>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="The Great Gatsby"
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
                    placeholder="the-great-gatsby"
                    disabled={loading}
                  />
                  <p className="text-xs text-[#7a7a7a]">
                    URL: /books/{form.slug || "…"}
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="space-y-1.5">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  required
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="F. Scott Fitzgerald"
                  disabled={loading}
                />
              </div>

              {/* Genre & Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Genre *</Label>
                  <Select
                    value={form.genre}
                    onValueChange={(v) => set("genre", v)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {BOOK_GENRES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Language *</Label>
                  <Select
                    value={form.language}
                    onValueChange={(v) => set("language", v)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="A brief description of the book…"
                  className="min-h-[100px]"
                  disabled={loading}
                />
              </div>

              {/* Published Date & Pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="publishedDate">Published Date</Label>
                  <Input
                    id="publishedDate"
                    type="date"
                    value={form.publishedDate}
                    onChange={(e) => set("publishedDate", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    min="1"
                    value={form.pages}
                    onChange={(e) => set("pages", e.target.value)}
                    placeholder="248"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-1.5">
                <Label htmlFor="cover">Cover Image</Label>
                <div className="flex items-start gap-4">
                  {coverPreview ? (
                    <div className="w-24 h-32 rounded-lg overflow-hidden shrink-0" style={{ border: "1px solid #e0e0e0" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverPreview} alt="Cover preview" className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-32 rounded-lg border-2 border-dashed flex items-center justify-center shrink-0" style={{ borderColor: "#e0e0e0", backgroundColor: "#f5f5f7" }}>
                      <ImageIcon className="w-8 h-8 text-[#cccccc]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      id="cover"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      disabled={loading}
                    />
                    <p className="text-xs text-stone-400 mt-1.5">
                      Recommended: portrait ratio (2:3). Uploaded to Supabase
                      Storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* PDF Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="pdf">PDF File *</Label>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: pdfFile ? "rgba(0,102,204,0.06)" : "#f5f5f7",
                      border: pdfFile ? "1px solid rgba(0,102,204,0.2)" : "2px dashed #e0e0e0",
                    }}
                  >
                    <FileText className="w-6 h-6" style={{ color: pdfFile ? "#0066cc" : "#cccccc" }} />
                  </div>
                  <div className="flex-1">
                    <Input
                      id="pdf"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                      disabled={loading}
                      required
                    />
                    {pdfFile && (
                      <p className="text-xs mt-1.5" style={{ color: "#0066cc" }}>
                        {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(1)} MB)
                      </p>
                    )}
                    <p className="text-xs text-stone-400 mt-1">
                      PDF uploaded to Supabase Storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  placeholder="A short passage from the book shown on the detail page…"
                  className="min-h-[100px]"
                  disabled={loading}
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label htmlFor="tags">Tags (Optional)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => set("tags", e.target.value)}
                  placeholder="classic, literature, 20th-century"
                  disabled={loading}
                />
                <p className="text-xs text-[#7a7a7a]">
                  Comma-separated tags.
                </p>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(v) => set("featured", v)}
                  disabled={loading}
                  className="data-[state=checked]:bg-[#0066cc] data-[state=unchecked]:bg-[#d1d1d6]"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Feature this book on the homepage
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
                      Adding…
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Add Book
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
