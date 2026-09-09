export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-semibold text-gray-900">Instagram</p>
                <a href="https://www.instagram.com/postta.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
                  @postta.in
                </a>
                <p className="text-sm text-gray-500 mt-1">DM us for orders & queries</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">+91 9335748094</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Sat, 10am - 7pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <a href="https://wa.me/919335748094" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
                  Chat on WhatsApp
                </a>
                <p className="text-sm text-gray-500 mt-1">Quick response guaranteed</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
            <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
            <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
            <button type="submit" className="w-full py-3 rounded-full bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
