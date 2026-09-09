import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "POSTTA - Premium Posters & Wall Art",
  description: "Transform your wall with premium posters. Cars, Anime, Gaming, Sports & more. A6 cards from ₹29. Free shipping on orders above ₹499.",
  keywords: "posters, wall art, car posters, anime posters, gaming posters, room decor, A6 cards, A4 posters",
  openGraph: {
    title: "POSTTA - Premium Posters & Wall Art",
    description: "Transform your wall with premium posters. A6 cards from ₹29.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
