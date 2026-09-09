"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (user) { router.push("/account"); return null; }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signUp(email, password, name);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Check Your Email</h1>
          <p className="text-gray-500 text-sm mb-6">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link href="/login" className="inline-block bg-rose-600 text-white px-6 py-3 font-bold text-sm hover:bg-rose-700 transition-colors">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-black text-rose-600">POSTTA</Link>
          <p className="text-sm text-gray-500 mt-1">Create your account</p>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          {error && <div className="p-3 mb-4 text-xs bg-red-50 text-red-700 border border-red-200">{error}</div>}

          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Min 6 characters" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors disabled:opacity-50">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-xs text-rose-600 hover:underline">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
