const faqs = [
  { q: "What sizes are available?", a: "We offer A6 (10.5×14.8cm), A5 (14.8×21cm), A4 (21×29.7cm), and A3 (29.7×42cm) sizes." },
  { q: "What is the paper quality?", a: "All posters are printed on 200gsm premium paper with powder color digital printing for a slightly shiny, premium finish." },
  { q: "How long does delivery take?", a: "We dispatch orders within 24-48 hours. Delivery takes 3-7 business days depending on your location." },
  { q: "Is Cash on Delivery (COD) available?", a: "Yes! COD is available across India. You can also pay via Instagram/UPI." },
  { q: "How do I order via Instagram?", a: "Click 'Buy via Instagram' on any product page or at checkout. It will open Instagram DM with your order details pre-filled." },
  { q: "What is the minimum order?", a: "There is no minimum order. You can order even a single A6 card for ₹29." },
  { q: "Do you offer bulk/wholesale pricing?", a: "Yes! Contact us on Instagram or WhatsApp for bulk orders. Special pricing available for 50+ cards." },
  { q: "What if my poster arrives damaged?", a: "Contact us on Instagram with photos within 24 hours of delivery. We'll send a replacement." },
  { q: "Can I request custom designs?", a: "Currently we offer curated collections. Follow us on Instagram for new designs weekly." },
  { q: "How do I track my order?", a: "Once shipped, we'll send you tracking details via WhatsApp/SMS." },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
