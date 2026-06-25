import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commodities Markets | PriceLot Market Hub",
  description: "Commodities market monitoring, energy and metals insights, and trading resources for commodity investors.",
  canonical: "https://pricelot.com/markets/commodities",
  keywords: ["commodities markets", "oil", "natural gas", "metals", "agriculture", "commodity trading"],
  type: "website",
});

export default function MarketsCommoditiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Commodities Market Hub",
            description: "Energy, metals, and agricultural commodity coverage with market commentary and trading resources.",
            url: "https://pricelot.com/markets/commodities",
            itemList: [
              { position: 1, name: "Commodities Hub", url: "https://pricelot.com/commodities" },
              { position: 2, name: "Commodities Articles", url: "https://pricelot.com/commodities/articles" },
              { position: 3, name: "Commodities Strategies", url: "https://pricelot.com/commodities/strategies" },
            ],
          }),
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Commodities Markets</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Follow Energy, Metals, and Agriculture Market Themes
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Track the key catalysts behind commodities moves, from oil and gas to industrial metals and food crop supplies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Energy and Metals</h2>
            <p className="mt-3 text-slate-300">
              Explore the major supply and demand factors shaping oil, natural gas, gold, and base metal prices.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Commodity Strategies</h2>
            <p className="mt-3 text-slate-300">
              Discover commodity-specific trading frameworks for risk management and directional exposure.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">Visit the Commodities Hub</h2>
          <p className="mt-3 text-slate-300">
            The Commodities hub brings together market analysis, strategy ideas, and trade-ready commentary for energy, metals, and agricultural markets.
          </p>
          <Link
            href="/commodities"
            className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Visit Commodities Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
