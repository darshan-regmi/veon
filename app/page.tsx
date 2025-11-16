"use client";
import React, { useState, useEffect } from "react";
import { Smartphone, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function VeonComingSoon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date(2026, 0, 15, 0, 0, 0).getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = launchDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if email already exists
      const q = query(collection(db, "waitlist"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      const emailData = {
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
      };

      console.log("Attempting to save:", emailData);

      // Add email to Firestore
      await addDoc(collection(db, "waitlist"), emailData);

      console.log("Successfully saved!");
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Minimal gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
            <span className="text-white text-3xl font-bold tracking-tight">
              veon
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-gray-400">Launching Soon</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Coming Soon
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of handcrafted apps and ebooks.
            <br />
            Built by one creator, for everyone.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 mb-20">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center mb-2">
                <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
          <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-violet-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Premium Apps
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Thoughtfully designed Android applications to enhance your digital
              life
            </p>
          </div>

          <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Expert Guides
            </h3>
            <p className="text-gray-400 leading-relaxed">
              In-depth knowledge and practical resources to master new skills
            </p>
          </div>
        </div>

        {/* Email Form */}
        <div className="max-w-md mx-auto">
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 px-6 py-4 pr-32 rounded-2xl border border-white/10 focus:border-violet-500/50 focus:outline-none transition-all"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Notify Me"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">
                You&apos;re all set!
              </h3>
              <p className="text-sm text-gray-400">
                We&apos;ll notify you when we launch
              </p>
            </div>
          )}

          {!subscribed && (
            <>
              {error && (
                <p className="text-center text-sm text-red-400 mt-4">{error}</p>
              )}
              {!error && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Join the waitlist • No spam, ever
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-gray-600 text-sm">Crafted with care © 2024</p>
        </div>
      </div>
    </div>
  );
}
