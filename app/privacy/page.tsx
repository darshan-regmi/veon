import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect basic information such as:",
    list: [
      "Name and email address (if you submit a form)",
      "Messages you send through contact forms",
      "Usage data including pages visited and interactions",
      "Device and browser information for analytics",
    ],
  },
  {
    title: "How We Use Your Information",
    body: "Your data is used only to improve our services:",
    list: [
      "Responding to messages you send",
      "Improving website functionality and user experience",
      "Analyzing traffic and performance",
      "Providing updates if you subscribe voluntarily",
    ],
  },
  {
    title: "Cookies & Tracking",
    body: "We may use cookies or analytics tools (such as Google Analytics) to understand how visitors use the website. These cookies do not store personal information and can be disabled in your browser settings.",
  },
  {
    title: "Third-Party Services",
    body: "Our website may include links to third-party platforms or use external tools. These services have their own privacy policies, and we are not responsible for how they handle data.",
  },
  {
    title: "Data Protection",
    body: "We take reasonable steps to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Your Choices & Rights",
    body: "You may request to:",
    list: [
      "Access the data you've shared",
      "Request deletion of your information",
      "Opt out of communications",
    ],
  },
  {
    title: "Updates to This Policy",
    body: "This Privacy Policy may be updated occasionally. Any changes will be posted on this page with a revised date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}>
      <Navbar />

      {/* Header tile */}
      <section style={{ backgroundColor: "#f5f5f7", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-[#1d1d1f] mb-4"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.28px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-[#7a7a7a]"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Your privacy matters. Here&apos;s how we handle your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-16">
        <p
          className="text-[#1d1d1f] mb-12"
          style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
        >
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our website, services, or products. By
          accessing this website, you agree to the practices described below.
        </p>

        <div className="space-y-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2
                className="text-[#1d1d1f] mb-4"
                style={{
                  fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: "0.231px",
                }}
              >
                {s.title}
              </h2>
              <p
                className="text-[#1d1d1f] mb-3"
                style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
              >
                {s.body}
              </p>
              {s.list && (
                <ul className="space-y-2">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[#1d1d1f]"
                      style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
                    >
                      <span className="text-[#0066cc] shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-10"
          style={{ borderTop: "1px solid #e0e0e0" }}
        >
          <p
            className="text-[#1d1d1f]"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
          >
            Questions about this Privacy Policy? Contact us at{" "}
            <a
              href="mailto:regmidarshan545@gmail.com"
              className="text-[#0066cc] hover:text-[#0071e3] transition-colors"
            >
              regmidarshan545@gmail.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
