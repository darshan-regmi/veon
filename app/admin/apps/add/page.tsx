"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
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

export default function AddAppPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    developer: "",
    price: "",
    description: "",
    category: "",
    apkUrl: "",
    isFree: true,
    featured: false,
    rating: 4.5,
    downloads: 0,
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileToStorage = async (
    file: File,
    path: string
  ): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress("Starting upload...");

    try {
      // Default icon if none provided
      let iconUrl =
        "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg";

      // Upload app icon (optional to save storage)
      if (iconFile) {
        setUploadProgress("Uploading app icon...");
        const fileName = `icons/${Date.now()}_${iconFile.name}`;
        iconUrl = await uploadFileToStorage(iconFile, fileName);
      }

      setUploadProgress("Creating app entry...");

      // Create app document in Firestore
      const appData = {
        name: formData.name,
        developer: formData.developer,
        price: formData.isFree ? 0 : parseFloat(formData.price),
        isFree: formData.isFree,
        description: formData.description,
        category: formData.category,
        icon: iconUrl,
        apkUrl: formData.apkUrl,
        featured: formData.featured,
        rating: formData.rating,
        downloads: formData.downloads,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "apps"), appData);

      setUploadProgress("Success!");
      router.push("/admin");
    } catch (error) {
      console.error("Error adding app:", error);
      alert(
        `Failed to add app: ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New App</CardTitle>
            <CardDescription>
              Add a new application to your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">App Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter app name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="developer">Developer *</Label>
                  <Input
                    id="developer"
                    name="developer"
                    type="text"
                    required
                    value={formData.developer}
                    onChange={handleInputChange}
                    placeholder="Enter developer name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter app description"
                  className="min-h-32"
                  disabled={loading}
                />
              </div>

              {/* Free or Paid Section */}
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <Label>App Type *</Label>
                <RadioGroup
                  value={formData.isFree ? "free" : "paid"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFree: value === "free",
                    }))
                  }
                  disabled={loading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label
                      htmlFor="free"
                      className="font-normal cursor-pointer"
                    >
                      Free App
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="paid" />
                    <Label
                      htmlFor="paid"
                      className="font-normal cursor-pointer"
                    >
                      Paid App
                    </Label>
                  </div>
                </RadioGroup>

                {!formData.isFree && (
                  <div className="mt-4">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required={!formData.isFree}
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      disabled={loading}
                    />
                  </div>
                )}
              </div>

              {/* APK URL Section */}
              <div>
                <Label htmlFor="apkUrl">APK Download URL *</Label>
                <Input
                  id="apkUrl"
                  name="apkUrl"
                  type="url"
                  required
                  value={formData.apkUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-app.apk"
                  disabled={loading}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Provide a direct URL to the APK file. You can host it on
                  GitHub Releases, Google Drive, Dropbox, or any CDN.
                  <br />
                  <span className="text-amber-600 font-medium">💡 Tip:</span> To
                  save Firebase storage, host your APK externally (e.g., GitHub
                  Releases is free).
                </p>
              </div>

              {/* App Icon - Optional to save storage */}
              <div>
                <Label htmlFor="icon">App Icon (Optional)</Label>
                <div className="mt-2">
                  <Input
                    id="icon"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIconFile(e.target.files?.[0] || null)}
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Upload an icon (recommended: 512x512px). If not provided, a
                    default icon will be used.
                    <br />
                    <span className="text-amber-600 font-medium">
                      💡 Tip:
                    </span>{" "}
                    To save storage, you can also paste an image URL in the icon
                    field after creation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="rating">Initial Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="downloads">Initial Downloads</Label>
                  <Input
                    id="downloads"
                    name="downloads"
                    type="number"
                    min="0"
                    value={formData.downloads}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, featured: checked }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="featured">Feature this app on homepage</Label>
              </div>

              {uploadProgress && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded-lg flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{uploadProgress}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Add App</span>
                    </>
                  )}
                </Button>

                <Link href="/admin">
                  <Button type="button" variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
