"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/admin");
    } else {
      setError(data.error || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-rose-600">POSTTA</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Login</p>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          {error && <div className="p-3 mb-4 text-xs bg-red-50 text-red-700 border border-red-200">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50">
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
