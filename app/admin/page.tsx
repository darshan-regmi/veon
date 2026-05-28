"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllApps, deleteApp, getAllBooks, deleteBook } from "@/lib/firestore";
import type { App, Book } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Smartphone,
  Download,
  TrendingUp,
  Eye,
  BookOpen,
} from "lucide-react";
import AppCard from "@/components/AppCard";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

function AdminPageInner() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") ?? "apps";

  const [apps, setApps] = useState<App[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsData, booksData, usersSnap] = await Promise.all([
          getAllApps(),
          getAllBooks(),
          getDocs(collection(db, "users")),
        ]);
        setApps(appsData);
        setBooks(booksData);
        setTotalUsers(usersSnap.size);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteApp = async (e: React.MouseEvent, appId: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this app?")) return;
    try {
      await deleteApp(appId);
      setApps((prev) => prev.filter((a) => a.id !== appId));
    } catch (error) {
      console.error("Error deleting app:", error);
      alert(`Failed to delete: ${error instanceof Error ? error.message : "Please try again."}`);
    }
  };

  const handleDeleteBook = async (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert(`Failed to delete: ${error instanceof Error ? error.message : "Please try again."}`);
    }
  };

  const totalDownloads = apps.reduce((sum, a) => sum + (a.downloads ?? 0), 0);
  const totalRevenue = apps.reduce(
    (sum, a) => sum + (a.price ?? 0) * (a.downloads ?? 0),
    0
  );

  const totalBookDownloads = books.reduce(
    (sum, b) => sum + (b.downloads ?? 0),
    0
  );

  const statCards = [
    {
      title: "Total Apps",
      value: apps.length,
      icon: Smartphone,
      color: "text-blue-600",
    },
    {
      title: "Total Books",
      value: books.length,
      icon: BookOpen,
      color: "text-amber-600",
    },
    {
      title: "Total Downloads",
      value: (totalDownloads + totalBookDownloads).toLocaleString(),
      icon: Download,
      color: "text-green-600",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className="text-[#1d1d1f] mb-1"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            Dashboard
          </h1>
          <p className="text-[#7a7a7a]" style={{ fontSize: 14 }}>Manage your store and content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="p-6"
              style={{ borderRadius: 14, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#7a7a7a]" style={{ fontSize: 13 }}>{stat.title}</p>
                  <p className="text-[#1d1d1f] font-bold" style={{ fontSize: 28 }}>{stat.value}</p>
                </div>
                <stat.icon className="h-10 w-10 text-[#0066cc]" />
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Apps Tab */}
          <TabsContent value="apps">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Apps</CardTitle>
                  <CardDescription>
                    Add, edit, or remove apps from your store
                  </CardDescription>
                </div>
                <Link href="/admin/apps/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add App
                  </Button>
                </Link>
              </CardHeader>

              <CardContent>
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse border rounded-lg p-4"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4" />
                        <div className="h-4 bg-gray-200 rounded mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                      </div>
                    ))}
                  </div>
                )}

                {!loading && apps.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map((app) => (
                      <div key={app.id} className="relative">
                        <AppCard app={app} />

                        {/* Action overlay */}
                        <div className="absolute top-3 right-3 flex gap-1 z-10">
                          <Link href={`/apps/${app.slug}`} target="_blank">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Link href={`/admin/apps/edit/${app.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
                            onClick={(e) => handleDeleteApp(e, app.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {app.featured && (
                          <Badge className="absolute top-3 left-3 z-10" style={{ backgroundColor: "#0066cc" }}>
                            Featured
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!loading && apps.length === 0 && (
                  <div className="text-center py-12">
                    <Smartphone className="w-12 h-12 mx-auto text-[#7a7a7a] mb-4" />
                    <p className="text-[#7a7a7a] mb-4">No apps yet</p>
                    <Link href="/admin/apps/add">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First App
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Books</CardTitle>
                  <CardDescription>
                    Add, edit, or remove books from your library
                  </CardDescription>
                </div>
                <Link href="/admin/books/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Book
                  </Button>
                </Link>
              </CardHeader>

              <CardContent>
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse border rounded-lg p-4"
                      >
                        <div className="w-24 h-32 bg-gray-200 rounded-lg mb-4 mx-auto" />
                        <div className="h-4 bg-gray-200 rounded mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                )}

                {!loading && books.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <div key={book.id} className="relative">
                        <BookCard book={book} />

                        {/* Action overlay */}
                        <div className="absolute top-3 right-3 flex gap-1 z-10">
                          <Link href={`/books/${book.slug}`} target="_blank">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Link href={`/admin/books/edit/${book.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
                            onClick={(e) => handleDeleteBook(e, book.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {book.featured && (
                          <Badge className="absolute top-3 left-3 z-10" style={{ backgroundColor: "#0066cc" }}>
                            Featured
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!loading && books.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto text-[#7a7a7a] mb-4" />
                    <p className="text-[#7a7a7a] mb-4">No books yet</p>
                    <Link href="/admin/books/add">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Book
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Insights into your app store performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Top Performing Apps</h3>
                    {apps.length > 0 ? (
                      <div className="space-y-2">
                        {[...apps]
                          .sort(
                            (a, b) => (b.downloads ?? 0) - (a.downloads ?? 0)
                          )
                          .slice(0, 5)
                          .map((app) => (
                            <div
                              key={app.id}
                              className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "#f5f5f7" }}
                            >
                              <div className="flex items-center gap-3">
                                {app.icon ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={app.icon}
                                    alt={app.name}
                                    className="w-8 h-8 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: "#f0f4ff" }}
                                  >
                                    <span
                                      className="text-xs font-bold"
                                      style={{ color: "#0066cc" }}
                                    >
                                      {app.name[0]}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium truncate max-w-[140px]">
                                    {app.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {(app.downloads ?? 0).toLocaleString()}{" "}
                                    downloads
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-[#7a7a7a] shrink-0">
                                v{app.version}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#7a7a7a] py-4">
                        No apps yet
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Coming Soon</h3>
                    <p className="text-[#7a7a7a] text-sm">
                      More analytics features will be added later.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </ProtectedRoute>
  );
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPageInner />
    </Suspense>
  );
}
