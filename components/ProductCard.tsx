"use client";

import React, { useState } from "react";

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

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  const handleDownload = () => {
    window.open(product.downloadLink, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 right-3">
            <span className="text-xs text-amber-50 bg-amber-900 px-3 py-1.5 rounded-full font-medium shadow-sm">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-stone-900">
            {product.name}
          </h3>
        </div>

        <p className="text-stone-600 text-sm mb-5 leading-relaxed line-clamp-2">
          {product.description}
          <br />
        </p>

        <div className="flex items-center justify-between">
          {product.price ? (
            <div>
              <span className="text-2xl font-semibold text-stone-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          ) : (
            <span className="text-2xl font-semibold text-stone-900"></span>)}

          <button
            onClick={handleDownload}
            className="bg-amber-900 text-amber-50 px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-amber-950 transition-all text-sm font-medium shadow-sm hover:shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
