"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  screenshots: string[];
  appName: string;
}

export default function Screenshots({ screenshots, appName }: Props) {
  const [active, setActive] = useState(0);

  if (!screenshots.length) return null;

  const prev = () =>
    setActive((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setActive((i) => (i + 1) % screenshots.length);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="relative overflow-hidden max-w-[260px] mx-auto aspect-[9/16]"
        style={{
          borderRadius: 18,
          backgroundColor: "#f5f5f7",
          boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshots[active]}
          alt={`${appName} screenshot ${active + 1}`}
          className="w-full h-full object-cover"
        />

        {screenshots.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
              style={{ backgroundColor: "rgba(210,210,215,0.64)" }}
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 text-[#1d1d1f]" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
              style={{ backgroundColor: "rgba(210,210,215,0.64)" }}
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 text-[#1d1d1f]" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to screenshot ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === active ? "bg-white w-4 h-1.5" : "bg-white/50 w-1.5 h-1.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-1 px-4">
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative shrink-0 w-11 h-[74px] overflow-hidden transition-all duration-200"
              style={{
                borderRadius: 8,
                border: i === active ? "2px solid #0066cc" : "2px solid transparent",
                opacity: i === active ? 1 : 0.45,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
