"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) { router.push("/account"); return null; }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/account");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-black text-rose-600">POSTTA</Link>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          {error && <div className="p-3 mb-4 text-xs bg-red-50 text-red-700 border border-red-200">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Your password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors disabled:opacity-50">
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/signup" className="text-xs text-rose-600 hover:underline">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
