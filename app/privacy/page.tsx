"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-stone-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            Your privacy matters. Here's how we handle your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto py-16 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 md:p-12">
          <p className="text-stone-600 mb-6 leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our website, services, or products. By
            accessing this website, you agree to the practices described below.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Information We Collect
          </h2>
          <p className="text-stone-600 mb-3 leading-relaxed">
            We may collect basic information such as:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6 marker:text-amber-900">
            <li>Name and email address (if you submit a form)</li>
            <li>Messages you send through contact forms</li>
            <li>Usage data including pages visited and interactions</li>
            <li>Device and browser information for analytics</li>
          </ul>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-stone-600 mb-3 leading-relaxed">
            Your data is used only to improve our services. Common reasons
            include:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6 marker:text-amber-900">
            <li>Responding to messages you send</li>
            <li>Improving website functionality and user experience</li>
            <li>Analyzing traffic and performance</li>
            <li>Providing updates if you subscribe voluntarily</li>
          </ul>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Cookies & Tracking
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We may use cookies or analytics tools (such as Google Analytics) to
            understand how visitors use the website. These cookies do not store
            personal information and can be disabled in your browser settings.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Third-Party Services
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Our website may include links to third-party platforms or use
            external tools. These services have their own privacy policies, and
            we are not responsible for how they handle data.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Data Protection
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We take reasonable steps to protect your information. However, no
            method of transmission over the internet is completely secure, and
            we cannot guarantee absolute security.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Your Choices & Rights
          </h2>
          <p className="text-stone-600 mb-3 leading-relaxed">
            You may request to:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6 marker:text-amber-900">
            <li>Access the data you've shared</li>
            <li>Request deletion of your information</li>
            <li>Opt out of communications</li>
          </ul>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            Updates to This Policy
          </h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            This Privacy Policy may be updated occasionally. Any changes will be
            posted on this page with a revised date.
          </p>

          {/* Contact Section */}
          <div className="mt-10 pt-8 border-t border-stone-200">
            <p className="text-stone-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:regmidarshan545@gmail.com"
                className="text-amber-900 font-medium hover:text-amber-950 transition-colors"
              >
                regmidarshan545@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
