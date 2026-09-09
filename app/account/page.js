"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const name = user.user_metadata?.name || "Customer";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">My Account</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white border border-gray-200 p-5 sm:p-6">
          <h2 className="font-bold text-gray-900 mb-3">Profile</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> <span className="font-medium">{name}</span></p>
            <p><span className="text-gray-500">Email:</span> <span className="font-medium">{user.email}</span></p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 sm:p-6">
          <h2 className="font-bold text-gray-900 mb-3">Quick Links</h2>
          <div className="space-y-2">
            <Link href="/track" className="block text-sm text-rose-600 hover:underline">Track My Orders</Link>
            <Link href="/products" className="block text-sm text-rose-600 hover:underline">Browse Posters</Link>
            <Link href="/custom" className="block text-sm text-rose-600 hover:underline">Custom Poster</Link>
          </div>
        </div>
      </div>

      <button onClick={() => signOut().then(() => router.push("/"))}
        className="mt-6 px-6 py-2 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
        Logout
      </button>
    </div>
  );
}
