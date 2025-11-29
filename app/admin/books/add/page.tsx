'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadFile, getPublicUrl, generateFileName, STORAGE_BUCKETS } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AddBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    featured: false
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg';
      let downloadUrl = '';

      // Upload cover image
      if (coverImageFile) {
        const fileName = generateFileName(coverImageFile.name, 'cover');
        await uploadFile(STORAGE_BUCKETS.COVERS, fileName, coverImageFile);
        coverImageUrl = getPublicUrl(STORAGE_BUCKETS.COVERS, fileName);
      }

      // Upload book file to Supabase
      if (bookFile) {
        const fileName = generateFileName(bookFile.name, 'book');
        await uploadFile(STORAGE_BUCKETS.BOOKS, fileName, bookFile);
        downloadUrl = getPublicUrl(STORAGE_BUCKETS.BOOKS, fileName);
      }

      // Create book document
      const bookData = {
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        description: formData.description,
        coverImage: coverImageUrl,
        downloadUrl: downloadUrl,
        featured: formData.featured,
        rating: 0,
        reviews: 0,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'books'), bookData);
      router.push('/admin');
    } catch (error) {
      console.error('Error adding book:', error);
      alert(`Failed to add book: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
            <CardDescription>
              Add a new e-book to your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter book description"
                  className="min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image</Label>
                <div className="mt-2">
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Upload a cover image for your book. If no image is uploaded, a default one will be used.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="bookFile">Book File (PDF/EPUB)</Label>
                <div className="mt-2">
                  <Input
                    id="bookFile"
                    type="file"
                    accept=".pdf,.epub"
                    onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Upload the actual book file that customers will download.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, featured: checked }))
                  }
                />
                <Label htmlFor="featured">Feature this book</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>{loading ? 'Adding...' : 'Add Book'}</span>
                </Button>
                
                <Link href="/admin">
                  <Button type="button" variant="outline">
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