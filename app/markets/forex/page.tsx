import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Forex Markets | PriceLot Market Hub",
  description: "Forex market dashboard featuring live currency flow insights, major pair analysis, and trading resources.",
  canonical: "https://pricelot.com/markets/forex",
  keywords: ["forex markets", "EURUSD", "USDJPY", "GBPUSD", "currency trading", "FX"],
  type: "website",
});

export default function MarketsForexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Forex Market Hub",
            description: "Forex market resources, pair analysis, and insights for active currency traders.",
            url: "https://pricelot.com/markets/forex",
            itemList: [
              { position: 1, name: "Forex Hub", url: "https://pricelot.com/forex" },
              { position: 2, name: "Forex Articles", url: "https://pricelot.com/forex/articles" },
              { position: 3, name: "Forex Strategies", url: "https://pricelot.com/forex/strategies" },
            ],
          }),
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Forex Markets</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Trade the World’s Most Liquid Market
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Monitor live currency flows, explore major pair setups, and access the dedicated Forex hub for analysis, strategies, and lessons.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Forex Live Data</h2>
            <p className="mt-3 text-slate-300">
              See live rate quotes, market depth, and the latest moves for EUR/USD, GBP/USD, USD/JPY, AUD/USD, and more.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Trading Resources</h2>
            <p className="mt-3 text-slate-300">
              Browse lessons, strategies, and trading guides tailored for forex traders at every experience level.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">Explore the Forex Hub</h2>
          <p className="mt-3 text-slate-300">
            <strong>Tip:</strong> Use the dedicated Forex hub to access 100+ articles, 50 lessons, and curated trading strategies for major currency pairs.
          </p>
          <Link
            href="/forex"
            className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Visit Forex Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
