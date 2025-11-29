"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
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
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

interface App {
  id: string;
  name: string;
  developer: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  downloads: number;
  icon: string;
  featured?: boolean;
  createdAt?: Date;
}

interface DashboardStats {
  totalApps: number;
  totalDownloads: number;
  totalRevenue: number;
  totalUsers: number;
}

export default function AdminPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalApps: 0,
    totalDownloads: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appsRef = collection(db, "apps");
        const appsQuery = query(appsRef, orderBy("createdAt", "desc"));
        const appsSnap = await getDocs(appsQuery);

        const appsData = appsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as App[];

        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);

        const totalDownloads = appsData.reduce(
          (sum, app) => sum + (app.downloads || 0),
          0
        );

        const totalRevenue = appsData.reduce(
          (sum, app) => sum + app.price * (app.downloads || 0),
          0
        );

        setApps(appsData);
        setStats({
          totalApps: appsData.length,
          totalDownloads,
          totalRevenue,
          totalUsers: usersSnap.size,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteApp = async (appId: string) => {
    if (confirm("Are you sure you want to delete this app?")) {
      try {
        await deleteDoc(doc(db, "apps", appId));
        setApps((prev) => prev.filter((app) => app.id !== appId));
      } catch (error) {
        console.error("Error deleting app:", error);
      }
    }
  };

  const statCards = [
    {
      title: "Total Apps",
      value: stats.totalApps,
      icon: Smartphone,
      color: "text-blue-600",
    },
    {
      title: "Total Downloads",
      value: stats.totalDownloads.toLocaleString(),
      icon: Download,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            App Store Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your app store and applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="apps" className="space-y-6">
          <TabsList>
            <TabsTrigger value="apps">Apps</TabsTrigger>
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
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add App</span>
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
                        <ProductCard
                          product={{
                            id: Number(app.id),
                            name: app.name,
                            description: app.description,
                            category: app.category,
                            price: app.price,
                            rating: app.rating,
                            downloads: app.downloads,
                            icon: app.icon,
                            image: app.icon,
                            badge: app.featured ? "Featured" : null,
                            downloadLink: `/apps/${app.id}`,
                          }}
                        />

                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Link href={`/apps/${app.id}`}>
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>

                          <Link href={`/admin/apps/edit/${app.id}`}>
                            <Button
                              size="sm"
                              className="h-8 w-8 p-0 bg-white hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>

                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-white hover:bg-red-50 text-red-600"
                            onClick={() => handleDeleteApp(app.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {app.featured && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!loading && apps.length === 0 && (
                  <div className="text-center py-12">
                    <Smartphone className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">No apps yet</p>
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
                            (a, b) => (b.downloads || 0) - (a.downloads || 0)
                          )
                          .slice(0, 5)
                          .map((app) => (
                            <div
                              key={app.id}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={app.icon}
                                  alt={app.name}
                                  width={32}
                                  height={32}
                                  className="rounded-lg"
                                />
                                <div>
                                  <p className="text-sm font-medium truncate">
                                    {app.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {app.downloads?.toLocaleString()} downloads
                                  </p>
                                </div>
                              </div>
                              <span className="text-sm font-medium">
                                ${app.price}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-4">
                        No apps available yet
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Coming Soon</h3>
                    <p className="text-gray-500">
                      More analytics features will be added later.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
