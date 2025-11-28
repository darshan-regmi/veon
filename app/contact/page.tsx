"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Contact Me</h1>
          <p className="text-stone-600 text-lg mx-auto leading-relaxed">
            Whether it's an idea, a collaboration, or just a hello — I'd love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-10 hover:shadow-lg transition-shadow">
          <form className="space-y-8">
            {/* Name */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900 transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-stone-700 font-medium mb-2">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-stone-400 w-5 h-5" />
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900 resize-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-amber-900 text-amber-50 py-3.5 rounded-xl font-medium text-lg hover:bg-amber-950 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Direct Contact */}
        <div className="text-center mt-12">
          <p className="text-stone-600 text-lg mb-4">
            Or reach me directly through:
          </p>
          <div className="space-y-3">
            <a
              href="mailto:regmidarshan545@gmail.com"
              className="block text-amber-900 font-medium hover:text-amber-950 transition-colors"
            >
              regmidarshan545@gmail.com
            </a>
            <a
              href="https://instagram.com/wordsbydarshan"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-amber-900 font-medium hover:text-amber-950 transition-colors"
            >
              Instagram — @wordsbydarshan
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
