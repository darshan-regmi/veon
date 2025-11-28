"use client";
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  category: string;
  downloadLink: string;
}

interface Category {
  id: string;
  name: string;
}

// Main Product Page
export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Veil Poetry App",
      description:
        "A minimal, poetry app with curated verses, smooth reading experience, and dark-mode optimized for late-night sessions.",
      image:
        "https://i.pinimg.com/736x/ad/d1/b4/add1b412349bd131da205a71844039ae.jpg",
      price: 0,
      originalPrice: 0,
      badge: "New",
      category: "apps",
      downloadLink:
        "https://github.com/darshan-regmi/project-releases/releases/download/v1.0.1/veil-1.0.1.apk?raw=1",
    },
  ];

  const categories: Category[] = [
    { id: "all", name: "All Products" },
    { id: "apps", name: "Apps" },
    { id: "ebooks", name: "Ebooks" },
    { id: "poetry", name: "Poetry" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium text-stone-900 mb-3">
              Our Collection
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Handcrafted apps and ebooks, designed with care
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900 shadow-sm transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="text-stone-400 w-5 h-5 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                selectedCategory === category.id
                  ? "bg-amber-900 text-amber-50 shadow-md"
                  : "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-stone-400" />
            </div>
            <p className="text-stone-500 text-lg font-medium mb-2">
              No products found
            </p>
            <p className="text-stone-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
