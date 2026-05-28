"use client";

import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  badge: string | null;
  category: string;
  downloadLink: string;
  rating?: number;
  downloads?: number;
  icon?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const handleDownload = () => {
    window.open(product.downloadLink, "_blank");
  };

  return (
    <div
      className="overflow-hidden group"
      style={{
        borderRadius: 18,
        border: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#f5f5f7" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-3 right-3">
            <span
              className="text-white"
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 9999,
                backgroundColor: "#0066cc",
              }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-[#1d1d1f] font-semibold mb-2"
          style={{ fontSize: 17, letterSpacing: "-0.374px" }}
        >
          {product.name}
        </h3>

        <p
          className="text-[#7a7a7a] mb-5 line-clamp-2"
          style={{ fontSize: 14, lineHeight: 1.47, letterSpacing: "-0.224px" }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          {product.price ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#1d1d1f] font-semibold" style={{ fontSize: 21 }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[#7a7a7a] line-through" style={{ fontSize: 14 }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[#7a7a7a]" style={{ fontSize: 14 }}>Free</span>
          )}

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 text-white active:scale-95 transition-all"
            style={{
              fontSize: 14,
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: 9999,
              backgroundColor: "#0066cc",
              letterSpacing: "-0.224px",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
