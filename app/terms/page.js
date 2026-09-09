export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Terms & Conditions</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm">
        <p>Last updated: August 2026</p>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. General</h2>
          <p>By placing an order on POSTTA, you agree to these terms and conditions. We reserve the right to update these terms at any time.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Products</h2>
          <p>All posters are printed on 200gsm premium paper. Colors may vary slightly due to screen display differences. Sizes are approximate.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Pricing</h2>
          <p>All prices are in Indian Rupees (INR) and include applicable taxes. Prices may change without prior notice.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Orders</h2>
          <p>Orders are confirmed via phone/WhatsApp. We reserve the right to cancel orders due to stock issues or pricing errors.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Payments</h2>
          <p>We accept Cash on Delivery (COD), UPI, and Instagram payments. Prepaid orders get priority processing.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Shipping</h2>
          <p>Free shipping on orders above ₹499. See our <a href="/shipping" className="text-rose-600">Shipping Policy</a> for details.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. Returns & Refunds</h2>
          <p>Due to the nature of printed products, we only accept returns for damaged/defective items. Contact us within 24 hours of delivery with photos.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. Cancellation</h2>
          <p>Orders can be cancelled before dispatch. Once shipped, cancellation is not possible.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">9. Contact</h2>
          <p>For any queries, contact us on Instagram <a href="https://www.instagram.com/itnahithajotha" className="text-rose-600">@itnahithajotha</a> or call +91 9335748094.</p>
        </div>
      </div>
    </div>
  );
}
