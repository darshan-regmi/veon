import Link from "next/link";
import { Download } from "lucide-react";
import type { App } from "@/lib/types";

export default function AppCard({ app }: { app: App }) {
  return (
    <Link href={`/apps/${app.slug}`} className="block group h-full">
      <div
        className="bg-white h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
      >
        {/* Icon */}
        <div className="relative p-6 flex justify-center" style={{ backgroundColor: "#f5f5f7" }}>
          <div
            className="w-24 h-24 overflow-hidden"
            style={{ borderRadius: 8, boxShadow: "0 3px 30px 5px rgba(0,0,0,0.22)" }}
          >
            {app.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={app.icon}
                alt={app.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "#1d1d1f" }}
              >
                <span className="text-3xl font-semibold text-white">
                  {app.name[0]}
                </span>
              </div>
            )}
          </div>
          {app.featured && (
            <span
              className="absolute top-3 right-3 text-white"
              style={{
                fontSize: 11,
                letterSpacing: "-0.12px",
                backgroundColor: "#0066cc",
                borderRadius: 9999,
                padding: "3px 10px",
              }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3
              className="text-[#1d1d1f] font-semibold group-hover:text-[#0066cc] transition-colors leading-tight"
              style={{ fontSize: 17, letterSpacing: "-0.374px" }}
            >
              {app.name}
            </h3>
            <span
              className="text-[#7a7a7a] ml-2 mt-0.5 shrink-0"
              style={{ fontFamily: "monospace", fontSize: 12 }}
            >
              v{app.version}
            </span>
          </div>
          <p
            className="text-[#7a7a7a] line-clamp-2 mb-4 flex-1"
            style={{ fontSize: 14, lineHeight: 1.43, letterSpacing: "-0.224px" }}
          >
            {app.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span
              className="text-[#0066cc] capitalize"
              style={{ fontSize: 14, letterSpacing: "-0.224px" }}
            >
              {app.category}
            </span>
            <span
              className="text-[#7a7a7a] flex items-center gap-1"
              style={{ fontSize: 12 }}
            >
              <Download className="w-3 h-3" />
              {app.downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
