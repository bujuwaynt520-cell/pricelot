import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Markets Hub | PriceLot Market Data, News, and Asset Class Resources",
  description: "Explore curated market dashboards, live data, and trading insights across forex, gold, crypto, indices, and commodities.",
  canonical: "https://pricelot.com/markets",
  keywords: ["markets hub", "market data", "forex", "gold", "crypto", "indices", "commodities", "trading resources"],
  type: "website",
});

const MARKET_CARDS = [
  {
    label: "Forex",
    description: "Major currency pairs, live flows, and market structure for global FX traders.",
    path: "/markets/forex",
  },
  {
    label: "Gold",
    description: "Precious metals insights, bullion trends, and gold trade ideas.",
    path: "/markets/gold",
  },
  {
    label: "Crypto",
    description: "Digital asset market coverage, on-chain commentary, and volatility analysis.",
    path: "/markets/crypto",
  },
  {
    label: "Indices",
    description: "Equity benchmark trends, index structure, and macro market signals.",
    path: "/markets/indices",
  },
  {
    label: "Commodities",
    description: "Energy, metals, and agricultural commodity market themes for traders.",
    path: "/markets/commodities",
  },
];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Markets Hub",
            description: "A centralized market hub for forex, gold, crypto, indices, and commodities resources.",
            url: "https://pricelot.com/markets",
            itemList: MARKET_CARDS.map((card, index) => ({
              position: index + 1,
              name: card.label,
              url: `https://pricelot.com${card.path}`,
            })),
          }),
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300">Markets Hub</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Centralized Market Resources for Active Traders
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-300 sm:text-lg">
            Browse asset specific market dashboards, news, live data, and trading insights across the major market categories that move global portfolios.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {MARKET_CARDS.map((card) => (
            <Link
              key={card.label}
              href={card.path}
              className="group rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 transition hover:border-orange-400/40 hover:bg-slate-800/90"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                {card.label}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">{card.label} Markets</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-orange-300">
                <span>Explore</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
