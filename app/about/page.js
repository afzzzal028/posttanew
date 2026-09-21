"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
          YOUR WALL SHOULD SAY<br />SOMETHING ABOUT YOU.
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          POSTTA started with a simple idea: you shouldn't need to spend thousands to make your room feel like yours.
        </p>
      </div>

      {/* Story */}
      <div className="space-y-6 mb-12">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Football. F1. Anime. Cars. Gaming. Movies. Music.
        </p>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Pick what you love. Mix it together. Build your wall.
        </p>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          We print on <strong>200 GSM premium paper</strong> with a glossy powder finish. Every poster feels thick, shiny, and built to last. Not the thin, floppy prints you see elsewhere.
        </p>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Prices start at <strong>{"\u20B9"}22 for A6 cards</strong> and go up to <strong>{"\u20B9"}159 for A3 posters</strong>. We also do <strong>custom posters</strong> &mdash; upload any image and we'll print it for you.
        </p>
      </div>

      {/* What we do */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { icon: "\uD83C\uDFA8", text: "80+ Designs" },
          { icon: "\uD83D\uDCC4", text: "200 GSM Paper" },
          { icon: "\uD83D\uDE9A", text: "All India Delivery" },
          { icon: "\uD83D\uDCB5", text: "COD Available" },
        ].map((item, i) => (
          <div key={i} className="text-center p-4 bg-gray-50 border border-gray-200">
            <span className="text-2xl block mb-1">{item.icon}</span>
            <p className="text-xs font-bold text-gray-900">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="bg-gray-950 text-white p-6 sm:p-10 mb-12">
        <h2 className="text-xl sm:text-2xl font-black mb-4">WHY WE EXIST</h2>
        <div className="space-y-4 text-sm text-gray-300">
          <p>Posters should be <strong className="text-white">affordable</strong>. Not everyone can spend {"\u20B9"}500 on a single print.</p>
          <p>Posters should be <strong className="text-white">premium quality</strong>. Cheap doesn't mean low quality.</p>
          <p>Posters should be <strong className="text-white">personal</strong>. Your wall, your interests, your world.</p>
          <p>Posters should <strong className="text-white">ship fast</strong>. 24-48 hour dispatch, everywhere in India.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">Ready to build your wall?</h2>
        <p className="text-sm text-gray-500 mb-5">Pick what you love. Mix it together.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="bg-rose-600 text-white px-8 py-3 font-bold text-sm hover:bg-rose-700 transition-colors">Shop Posters &rarr;</Link>
          <Link href="/custom" className="bg-white text-gray-900 px-8 py-3 font-bold text-sm border-2 border-gray-200 hover:border-rose-300 transition-colors">Make Your Own</Link>
        </div>
      </div>
    </div>
  );
}
