"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fontSize: 17,
    letterSpacing: "-0.374px",
    height: 44,
    borderRadius: 9999,
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    color: "#1d1d1f",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  } as const;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f5f5f7" }}
    >
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center">
            <span
              className="text-[#1d1d1f] text-2xl font-semibold"
              style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
            >
              ve
            </span>
            <span
              className="text-[#1d1d1f] text-2xl font-semibold border-2 border-[#1d1d1f] px-1 mx-0.5"
              style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}
            >
              on
            </span>
          </Link>
        </div>

        <div
          className="p-8"
          style={{ borderRadius: 18, border: "1px solid #e0e0e0", backgroundColor: "#ffffff" }}
        >
          <h1
            className="text-[#1d1d1f] text-center mb-2"
            style={{
              fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            Sign In
          </h1>
          <p
            className="text-[#7a7a7a] text-center mb-8"
            style={{ fontSize: 14, letterSpacing: "-0.224px" }}
          >
            Access your Veon admin account
          </p>

          {error && (
            <div
              className="mb-5 p-3 text-center"
              style={{
                borderRadius: 11,
                backgroundColor: "rgba(255,59,48,0.08)",
                border: "1px solid rgba(255,59,48,0.2)",
                fontSize: 14,
                color: "#ff3b30",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="block text-[#1d1d1f] font-semibold"
                style={{ fontSize: 14, letterSpacing: "-0.224px" }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={inputStyle}
                className="focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-[#1d1d1f] font-semibold"
                style={{ fontSize: 14, letterSpacing: "-0.224px" }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={inputStyle}
                className="focus:outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: 17, padding: "11px 22px", letterSpacing: "-0.374px", marginTop: 8 }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
            <span
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[#7a7a7a]"
              style={{ fontSize: 12 }}
            >
              or
            </span>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            style={{
              fontSize: 17,
              letterSpacing: "-0.374px",
              height: 44,
              borderRadius: 9999,
              border: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              color: "#1d1d1f",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <p
            className="text-center text-[#7a7a7a] mt-6"
            style={{ fontSize: 14, letterSpacing: "-0.224px" }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#0066cc] hover:text-[#0071e3] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
