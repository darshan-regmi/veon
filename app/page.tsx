"use client";
import React, { useState } from "react";
import {
  Smartphone,
  BookOpen,
  Sparkles,
  Download,
  Package,
  Settings,
  FileCheck,
  ChevronDown,
  Shield,
  Book,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Refined gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-5xl w-full relative z-10">
          {/* Veon Logo */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="inline-flex items-center">
              <span
                className="text-stone-900 text-5xl font-serif tracking-wide"
                style={{
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.02em",
                }}
              >
                ve
              </span>
              <div className="relative inline-flex items-center justify-center border-2 border-stone-900 w-14 h-14 mx-0.5 transition-transform hover:scale-105">
                <span
                  className="text-stone-900 text-5xl font-serif"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  on
                </span>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900 rounded-full mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-50" />
              <span className="text-sm text-amber-50 font-medium">
                Now Distributing Apps
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium text-stone-900 mb-6 leading-tight">
              Your Personal App Store
            </h1>

            <p className="text-base text-stone-700 text-xl leading-relaxed md-2">
              Veon is a curated platform for apps and books I create.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              Download directly, no middleman—handcrafted software for real
              people.
            </p>
          </div>

          {/* Featured: Veil Poetry App */}
          <div className="bg-gradient-to-br from-amber-50 to-stone-100 border border-amber-200/40 rounded-2xl p-8 text-center mb-8 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-amber-50" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-900 rounded-full mb-4">
              <Package className="w-3.5 h-3.5 text-amber-50" />
              <span className="text-xs text-amber-50 font-medium uppercase tracking-wide">
                Featured Release
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-3">
              Veil Poetry App
            </h2>
            <p className="text-base text-stone-600 text-lg mb-6  leading-relaxed">
              A minimal, poetry reading app with curated verses
              <br />
              and dark mode. Now available for Android users.
              <br />
              <br />
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-amber-900 text-amber-50 px-8 py-3.5 rounded-full font-medium hover:bg-amber-950 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              Download Veil APK
            </Link>
          </div>

          {/* Installation Guide Toggle */}
          <div className="max-w-3xl mx-auto mb-16">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full bg-white border border-stone-200 rounded-xl p-5 text-left hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      How to Install Apps from Veon
                    </h3>
                    <p className="text-sm text-stone-600">
                      Step-by-step guide for Android users
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform ${
                    showGuide ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Installation Guide Content */}
            {showGuide && (
              <div className="bg-white border border-stone-200 border-t-0 rounded-b-xl p-8 -mt-1 animate-fade-in">
                <div className="prose prose-stone max-w-none">
                  <p className="text-stone-600 mb-6">
                    Since Veon apps are distributed as APK files (not through
                    Google Play Store), you'll need to enable installation from
                    unknown sources. Don't worry—it's safe and simple!
                  </p>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-900 font-semibold">
                            1
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900 mb-2 flex items-center gap-2">
                          <Download className="w-5 h-5 text-amber-900" />
                          Download the APK File
                        </h4>
                        <p className="text-stone-600 mb-2">
                          Click the download button on the product page. The APK
                          file will be saved to your device's{" "}
                          <strong>Downloads</strong> folder.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-900 font-semibold">
                            2
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900 mb-2 flex items-center gap-2">
                          <Settings className="w-5 h-5 text-amber-900" />
                          Enable "Install Unknown Apps"
                        </h4>
                        <p className="text-stone-600 mb-3">
                          Go to your phone's <strong>Settings</strong> and
                          follow these steps based on your Android version:
                        </p>

                        <div className="bg-stone-50 rounded-lg p-4 space-y-3 text-sm">
                          <div>
                            <p className="font-medium text-stone-900 mb-1">
                              Android 8.0 and newer:
                            </p>
                            <ol className="list-decimal list-inside space-y-1 text-stone-600 ml-2">
                              <li>
                                Open <strong>Settings</strong> →{" "}
                                <strong>Apps</strong>
                              </li>
                              <li>
                                Tap <strong>Special app access</strong> (or
                                three dots menu)
                              </li>
                              <li>
                                Select <strong>Install unknown apps</strong>
                              </li>
                              <li>
                                Choose your browser (Chrome/Firefox) or file
                                manager
                              </li>
                              <li>
                                Toggle on{" "}
                                <strong>"Allow from this source"</strong>
                              </li>
                            </ol>
                          </div>

                          <div className="border-t border-stone-200 pt-3">
                            <p className="font-medium text-stone-900 mb-1">
                              Android 7.0 and older:
                            </p>
                            <ol className="list-decimal list-inside space-y-1 text-stone-600 ml-2">
                              <li>
                                Open <strong>Settings</strong> →{" "}
                                <strong>Security</strong>
                              </li>
                              <li>
                                Enable <strong>"Unknown sources"</strong>
                              </li>
                              <li>
                                Tap <strong>OK</strong> on the warning prompt
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-900 font-semibold">
                            3
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900 mb-2 flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-amber-900" />
                          Install the App
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-stone-600">
                          <li>
                            Open your <strong>file manager</strong> or{" "}
                            <strong>Downloads</strong> app
                          </li>
                          <li>
                            Find the downloaded APK file (e.g.,{" "}
                            <code className="bg-stone-100 px-2 py-0.5 rounded text-sm">
                              veil-poetry.apk
                            </code>
                            )
                          </li>
                          <li>Tap on the file to open it</li>
                          <li>
                            Review the permissions and tap{" "}
                            <strong>"Install"</strong>
                          </li>
                          <li>
                            Wait a few seconds for installation to complete
                          </li>
                          <li>
                            Tap <strong>"Open"</strong> to launch the app!
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Security Note */}
                    <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-4 mt-6">
                      <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-amber-950 mb-1">
                            Security Note
                          </h5>
                          <p className="text-sm text-amber-900">
                            Only download apps from Veon
                            (veon.darshanregmi.com.np). After installation, you
                            can optionally disable "Install unknown apps" in
                            settings for extra security until your next Veon
                            download.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* What's on Veon */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-stone-900 mb-4">
              What You'll Find on Veon
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Apps, books, and creative projects—all made with care
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-50 transition-colors">
                <Smartphone className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                Mobile Apps
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Thoughtfully crafted Android applications with offline-first
                design, minimal interfaces, and smooth user experiences.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-50 transition-colors">
                <Book className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                Books & Poetry
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Original poetry collections and written works available for
                download in digital formats—straight from the creator.
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <p className="text-sm text-stone-500 mb-4">
              Built and maintained by one developer from Nepal
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-950 font-medium transition-colors"
            >
              Browse All Products
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
