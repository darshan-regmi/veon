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
        "https://github.com/darshan-regmi/project-releases/releases/download/v1.0.0/veil.apk",
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
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      {/* Header tile */}
      <section style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-[#1d1d1f] mb-4"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.28px",
            }}
          >
            Our Collection
          </h1>
          <p
            className="text-[#7a7a7a] max-w-xl mx-auto"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Handcrafted apps and ebooks, designed with care
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] w-4 h-4" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors"
              style={{
                width: "100%",
                paddingLeft: 44,
                paddingRight: 20,
                height: 44,
                borderRadius: 9999,
                border: "1px solid #e0e0e0",
                backgroundColor: "#ffffff",
                color: "#1d1d1f",
                fontSize: 17,
                letterSpacing: "-0.374px",
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Filter className="text-[#7a7a7a] w-4 h-4 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap transition-all active:scale-95"
              style={{
                padding: "6px 16px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.224px",
                border: "1px solid",
                borderColor: selectedCategory === category.id ? "#0066cc" : "#e0e0e0",
                backgroundColor: selectedCategory === category.id ? "#0066cc" : "#ffffff",
                color: selectedCategory === category.id ? "#ffffff" : "#1d1d1f",
              }}
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
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-4"
              style={{ borderRadius: 9999, backgroundColor: "#f5f5f7" }}
            >
              <Search className="w-8 h-8 text-[#7a7a7a]" />
            </div>
            <p
              className="text-[#1d1d1f] font-semibold mb-2"
              style={{ fontSize: 17 }}
            >
              No products found
            </p>
            <p className="text-[#7a7a7a]" style={{ fontSize: 14 }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
