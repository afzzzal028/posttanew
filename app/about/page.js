export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-6">About POSTTA</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 text-lg mb-4">
          Welcome to POSTTA — your one-stop destination for premium posters and wall art.
        </p>
        <p className="text-gray-600 mb-4">
          We started with a simple idea: everyone deserves to have a cool room without breaking the bank.
          That's why we offer high-quality posters at prices that won&apos;t empty your wallet.
        </p>
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">What We Offer</h2>
        <ul className="space-y-2 text-gray-600">
          <li>🏎️ <strong>Cars & Bikes</strong> — Supercars, Muscle Cars, JDM Legends</li>
          <li>⚔️ <strong>Anime</strong> — Naruto, One Piece, Dragon Ball, Jujutsu Kaisen</li>
          <li>🎮 <strong>Gaming</strong> — GTA, Valorant, Minecraft, God of War</li>
          <li>⚽ <strong>Sports</strong> — Football, Cricket, F1, UFC</li>
          <li>🦸 <strong>Marvel & DC</strong> — Avengers, Batman, Spider-Man</li>
          <li>🎬 <strong>Movies</strong> — Fight Club, Interstellar, Inception</li>
          <li>🎵 <strong>Music</strong> — Hip-Hop, Vinyl Aesthetic</li>
          <li>💪 <strong>Motivational</strong> — Hustle, Discipline, Grind</li>
          <li>🕉️ <strong>Devotional</strong> — Krishna, Hanuman, Ganesha</li>
        </ul>
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Quality Promise</h2>
        <p className="text-gray-600 mb-4">
          All our posters are printed on <strong>200gsm premium paper</strong> with powder color printing
          for a slightly shiny, premium finish. We ensure every print meets our quality standards before shipping.
        </p>
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
        <p className="text-gray-600">
          📱 Instagram: <a href="https://www.instagram.com/postta.in" className="text-rose-600 hover:underline">@postta.in</a>
          <br />
          💬 WhatsApp: <a href="https://wa.me/919335748094" className="text-rose-600 hover:underline">Chat on WhatsApp</a>
          <br />
          📞 Phone: +91 9335748094
        </p>
      </div>
    </div>
  );
}
