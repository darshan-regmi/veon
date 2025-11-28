"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">About Me</h1>
          <p className="text-stone-600 text-lg mx-auto leading-relaxed">
            Crafting digital experiences with emotion, clarity, and intention.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section — text */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-stone-900">Who I Am</h2>
            <p className="text-stone-700 leading-relaxed text-lg">
              I'm Darshan, a developer and poet who loves building products that
              feel warm, human, and meaningful. Whether it's an app, a poem, or
              a personal project, my goal is simple — combine creativity with
              intention, and make something worth remembering.
            </p>

            <p className="text-stone-700 leading-relaxed text-lg">
              I design minimal, aesthetic experiences and write poetry that
              connects with people on a deeper level. Every line of code and
              every line of verse comes from the same place — emotion,
              curiosity, and a desire to create something real.
            </p>

            <h2 className="text-2xl font-semibold pt-6 text-stone-900">
              What I Do
            </h2>
            <ul className="text-stone-700 leading-relaxed text-lg space-y-3 list-disc ml-5 marker:text-amber-900">
              <li>Build mobile & web apps with smooth, expressive UI</li>
              <li>Write poetry that explores love, loss, growth, and story</li>
              <li>Create meaningful digital products like Veil</li>
              <li>
                Work on hackathons, freelance projects, and personal tools
              </li>
              <li>Document my journey through writing & design</li>
            </ul>
          </div>

          {/* Right Section — card */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8 space-y-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-stone-900">
              A Small Note
            </h3>
            <p className="text-stone-600 leading-relaxed">
              I believe good design feels like breathing — simple, quiet, and
              effortless. And good code should do the same. My products are
              built to be minimal, lightweight, and helpful.
            </p>

            <p className="text-stone-600 leading-relaxed italic">
              "Every project I build is a love letter to who I used to be, and a
              step toward who I'm becoming."
            </p>

            <div className="pt-4 space-y-2">
              <a
                href="https://instagram.com/wordsbydarshan"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-amber-900 font-medium hover:text-amber-950 transition-colors"
              >
                Instagram — @wordsbydarshan
              </a>
              <a
                href="https://github.com/darshan-regmi"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-amber-900 font-medium hover:text-amber-950 transition-colors"
              >
                GitHub — @darshan-regmi
              </a>
              <a
                href="mailto:regmidarshan545@gmail.com"
                className="block text-amber-900 font-medium hover:text-amber-950 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
