'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadFile, getPublicUrl, generateFileName, deleteFile, STORAGE_BUCKETS } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { Book } from '@/components/BookCard';

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
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
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookRef = doc(db, 'books', params.id as string);
        const bookSnap = await getDoc(bookRef);
        
        if (bookSnap.exists()) {
          const bookData = {
            id: bookSnap.id,
            ...bookSnap.data(),
            createdAt: bookSnap.data().createdAt?.toDate()
          } as Book;
          
          setBook(bookData);
          setFormData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price.toString(),
            description: bookData.description,
            featured: bookData.featured || false
          });
        } else {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        router.push('/admin');
      } finally {
        setInitialLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const extractFileNameFromUrl = (url: string): string | null => {
    try {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = book?.coverImage || '';
      let downloadUrl = book?.downloadUrl || '';

      // Upload new cover image if provided
      if (coverImageFile) {
        // Delete old cover image if it exists and is from Supabase
        if (book?.coverImage && book.coverImage.includes('supabase')) {
          const oldFileName = extractFileNameFromUrl(book.coverImage);
          if (oldFileName) {
            try {
              await deleteFile(STORAGE_BUCKETS.COVERS, oldFileName);
            } catch (error) {
              console.warn('Failed to delete old cover image:', error);
            }
          }
        }

        const fileName = generateFileName(coverImageFile.name, 'cover');
        await uploadFile(STORAGE_BUCKETS.COVERS, fileName, coverImageFile);
        coverImageUrl = getPublicUrl(STORAGE_BUCKETS.COVERS, fileName);
      }

      // Upload new book file if provided
      if (bookFile) {
        // Delete old book file if it exists and is from Supabase
        if (book?.downloadUrl && book.downloadUrl.includes('supabase')) {
          const oldFileName = extractFileNameFromUrl(book.downloadUrl);
          if (oldFileName) {
            try {
              await deleteFile(STORAGE_BUCKETS.BOOKS, oldFileName);
            } catch (error) {
              console.warn('Failed to delete old book file:', error);
            }
          }
        }

        const fileName = generateFileName(bookFile.name, 'book');
        await uploadFile(STORAGE_BUCKETS.BOOKS, fileName, bookFile);
        downloadUrl = getPublicUrl(STORAGE_BUCKETS.BOOKS, fileName);
      }

      // Update book document
      const bookRef = doc(db, 'books', params.id as string);
      await updateDoc(bookRef, {
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        description: formData.description,
        coverImage: coverImageUrl,
        downloadUrl: downloadUrl,
        featured: formData.featured
      });

      router.push('/admin');
    } catch (error) {
      console.error('Error updating book:', error);
      alert(`Failed to update book: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

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
            <CardTitle>Edit Book</CardTitle>
            <CardDescription>
              Update book information and files
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
                    Upload a new cover image to replace the current one.
                  </p>
                  {book?.coverImage && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Current cover:</p>
                      <img 
                        src={book.coverImage} 
                        alt="Current cover" 
                        className="w-20 h-28 object-cover rounded mt-1"
                      />
                    </div>
                  )}
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
                    Upload a new book file to replace the current one.
                  </p>
                  {book?.downloadUrl && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Book file is currently available
                    </p>
                  )}
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
                  <span>{loading ? 'Updating...' : 'Update Book'}</span>
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