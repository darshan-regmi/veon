import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const sections = [
  {
    title: "1. Use of Services",
    body: "You may use our website and services only for lawful purposes and in accordance with these Terms. You agree not to use the services:",
    list: [
      "In any way that violates applicable laws or regulations.",
      "To exploit, harm, or attempt to exploit or harm others.",
      "To transmit malicious code or malware.",
    ],
  },
  {
    title: "2. Intellectual Property",
    body: "All content, features, and functionality on the website are owned or licensed by us and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our permission.",
  },
  {
    title: "3. Account Responsibility",
    body: "If you create an account, you are responsible for maintaining the confidentiality of your account information and for all activities under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Third-Party Links",
    body: "Our website may include links to third-party websites. We are not responsible for the content, policies, or practices of these sites.",
  },
  {
    title: "5. Limitation of Liability",
    body: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services.",
  },
  {
    title: "6. Modifications",
    body: "We reserve the right to modify or update these Terms at any time. Any changes will be posted on this page, and your continued use of the services constitutes acceptance of the updated Terms.",
  },
  {
    title: "7. Governing Law",
    body: "These Terms are governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to conflict of law principles.",
  },
];

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p
            className="text-[#7a7a7a]"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.196px" }}
          >
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-16">
        <p
          className="text-[#1d1d1f] mb-12"
          style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
        >
          Welcome to Veon. By accessing or using our services, you agree to comply
          with and be bound by the following Terms of Service.
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
          className="mt-14 pt-10 space-y-4"
          style={{ borderTop: "1px solid #e0e0e0" }}
        >
          <p
            className="text-[#1d1d1f]"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
          >
            By using our services, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service.
          </p>
          <p
            className="text-[#1d1d1f]"
            style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
          >
            Questions?{" "}
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
