"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-stone-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto py-16 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 md:p-12">
          <p className="text-stone-600 mb-6 leading-relaxed">
            Welcome to our website. By accessing or using our services, you agree
            to comply with and be bound by the following Terms of Service.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            1. Use of Services
          </h2>
          <p className="text-stone-600 mb-3 leading-relaxed">
            You may use our website and services only for lawful purposes and in
            accordance with these Terms. You agree not to use the services:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6 marker:text-amber-900">
            <li>In any way that violates applicable laws or regulations.</li>
            <li>To exploit, harm, or attempt to exploit or harm others.</li>
            <li>To transmit malicious code or malware.</li>
          </ul>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            2. Intellectual Property
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            All content, features, and functionality on the website are owned or
            licensed by us and are protected by intellectual property laws. You
            may not reproduce, distribute, or create derivative works without our
            permission.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            3. Account Responsibility
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            If you create an account, you are responsible for maintaining the
            confidentiality of your account information and for all activities
            under your account. Notify us immediately of any unauthorized use.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            4. Third-Party Links
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Our website may include links to third-party websites. We are not
            responsible for the content, policies, or practices of these sites.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            To the maximum extent permitted by law, we shall not be liable for
            any indirect, incidental, special, or consequential damages arising
            out of or in connection with your use of our website or services.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            6. Modifications
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We reserve the right to modify or update these Terms at any time. Any
            changes will be posted on this page, and your continued use of the
            services constitutes acceptance of the updated Terms.
          </p>

          {/* Section */}
          <h2 className="text-2xl font-semibold text-stone-900 mt-10 mb-4">
            7. Governing Law
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            These Terms are governed by and construed in accordance with the laws
            of the jurisdiction in which we operate, without regard to conflict of
            law principles.
          </p>

          {/* Final Note */}
          <div className="mt-10 pt-8 border-t border-stone-200">
            <p className="text-stone-600 leading-relaxed mb-6">
              By using our services, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service.
            </p>

            <p className="text-stone-600 leading-relaxed">
              If you have questions about these Terms, please contact us at{" "}
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
