export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm">
        <p>Last updated: August 2026</p>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Information We Collect</h2>
          <p>We collect your name, phone number, email, and delivery address when you place an order. We also collect browsing data to improve our services.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To communicate order updates via WhatsApp/SMS</li>
            <li>To improve our website and services</li>
            <li>To send promotional offers (with your consent)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Third-Party Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share data with delivery partners to fulfill your orders.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
          <p>For privacy concerns, contact us on Instagram <a href="https://www.instagram.com/postta.in" className="text-rose-600">@postta.in</a>, WhatsApp <a href="https://wa.me/919335748094" className="text-rose-600">+91 9335748094</a>, or call +91 9335748094.</p>
        </div>
      </div>
    </div>
  );
}
