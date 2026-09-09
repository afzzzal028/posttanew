export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Shipping Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Time</h2>
          <p>All orders are processed and dispatched within 24-48 business hours after order confirmation.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Delivery Time</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Metro Cities:</strong> 3-5 business days</li>
            <li><strong>Tier 2 Cities:</strong> 4-6 business days</li>
            <li><strong>Rural/Remote Areas:</strong> 5-7 business days</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Orders above ₹499: <strong>FREE SHIPPING</strong></li>
            <li>Orders below ₹499: ₹49 flat shipping</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cash on Delivery</h2>
          <p>COD is available across India. COD orders may take 1-2 extra days for processing.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Packaging</h2>
          <p>Posters are carefully packaged in rigid cardboard envelopes/tubes to prevent bending during transit.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contact</h2>
          <p>For shipping queries, reach us on Instagram <a href="https://www.instagram.com/itnahithajotha" className="text-rose-600 hover:underline">@itnahithajotha</a> or call +91 9335748094.</p>
        </div>
      </div>
    </div>
  );
}
