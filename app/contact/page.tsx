export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-6">
        Contact PriceLot
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        We'd love to hear from you. Whether you have questions, feedback,
        partnership opportunities, or need support, our team is here to help.
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="space-y-6">

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              General Enquiries
            </h2>

            <p className="text-gray-700">
              support@pricelot.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Business Partnerships
            </h2>

            <p className="text-gray-700">
              business@pricelot.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Media
            </h2>

            <p className="text-gray-700">
              media@pricelot.com
            </p>
          </div>

        </div>

        <div className="rounded-xl border p-8 bg-white shadow-sm">

          <h2 className="text-2xl font-semibold mb-6">
            Send us a Message
          </h2>

          <p className="text-gray-600">
            Contact forms will be added during the next phase of development.
          </p>

        </div>

      </div>
    </main>
  );
}