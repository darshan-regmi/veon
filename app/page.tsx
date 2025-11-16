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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-stone-50 to-neutral-100"></div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center">
            <span
              className="text-neutral-900 text-4xl font-serif"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ve
            </span>
            <div className="relative inline-flex items-center justify-center border-2 border-neutral-900 w-12 h-12 mx-0.5">
              <span
                className="text-neutral-900 text-4xl font-serif"
                style={{ fontFamily: "Georgia, serif" }}
              >
                on
              </span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-white font-medium">
              Launching Soon
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium text-neutral-900 mb-4">
            Coming Soon
          </h1>

          <p className="text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            A curated collection of handcrafted apps and ebooks.
            <br />
            Built by one creator, for everyone.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-3 mb-16">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border border-neutral-200 flex items-center justify-center mb-2 shadow-sm">
                <span className="text-2xl md:text-3xl font-medium text-neutral-900 tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
            <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5 text-neutral-700" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              Premium Apps
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Thoughtfully designed Android applications to enhance your digital
              life
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
            <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-neutral-700" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              Expert Guides
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              In-depth knowledge and practical resources to master new skills
            </p>
          </div>
        </div>

        {/* Email Form */}
        <div className="max-w-md mx-auto">
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-full bg-white px-5 py-3 text-base text-gray-800 outline-none shadow-sm border border-gray-200 focus:ring-2 focus:ring-black focus:border-black pr-14"
              />

              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white rounded-full flex items-center justify-center px-5 py-2.5 hover:bg-gray-900 transition"
              >
                {/* Desktop/Large screen: Notify me + Arrow */}
                <span className="hidden md:flex items-center gap-x-2 text-sm">
                  Notify me
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* Mobile: show only arrow */}
                <span className="md:hidden">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-emerald-600"
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
              <h3 className="text-neutral-900 font-medium mb-1">
                You&apos;re all set!
              </h3>
              <p className="text-sm text-neutral-600">
                We&apos;ll notify you when we launch
              </p>
            </div>
          )}

          {!subscribed && (
            <>
              {error && (
                <p className="text-center text-sm text-red-600 mt-3">{error}</p>
              )}
              {!error && (
                <p className="text-center text-sm text-neutral-500 mt-3">
                  Join the waitlist • No spam, ever
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-neutral-400 text-sm">Crafted with care © 2024</p>
        </div>
      </div>
    </div>
  );
}
