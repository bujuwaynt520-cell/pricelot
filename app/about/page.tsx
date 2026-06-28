export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-6">About PriceLot</h1>

      <p className="text-lg text-gray-600 mb-8">
        PriceLot is building the world's most comprehensive free financial
        education platform for Forex, Gold, Stocks, Indices, Cryptocurrencies,
        Commodities, ETFs, Bonds, Options, Futures and every other financial
        market.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>

          <p className="text-gray-700">
            Our mission is to simplify financial education by providing
            high-quality lessons, professional trading tools, live market
            insights, calculators, and AI-powered learning—all completely free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>

          <p className="text-gray-700">
            We aim to become the number one financial education website in the
            world and compete directly with platforms like Investopedia by
            offering more educational content, more tools, better explanations,
            and a superior learning experience.
          </p>
        </section>
      </div>
    </main>
  );
}