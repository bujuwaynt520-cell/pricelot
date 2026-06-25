import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gold Markets | PriceLot Market Hub",
  description: "Gold market insights, bullion price drivers, and trading resources for precious metals investors.",
  canonical: "https://pricelot.com/markets/gold",
  keywords: ["gold market", "precious metals", "gold trading", "XAUUSD", "bullion"],
  type: "website",
});

export default function MarketsGoldPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Gold Market Hub",
            description: "Market news, price drivers, and trading strategies for gold and precious metals.",
            url: "https://pricelot.com/markets/gold",
            itemList: [
              { position: 1, name: "Gold Hub", url: "https://pricelot.com/gold" },
              { position: 2, name: "Gold Articles", url: "https://pricelot.com/gold/articles" },
              { position: 3, name: "Gold Strategies", url: "https://pricelot.com/gold/strategies" },
            ],
          }),
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Gold Markets</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Navigate Precious Metals Market Trends
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Review the latest drivers for gold, monitor bullion demand, and access analysis that helps position around central bank and inflation signals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Gold Price Drivers</h2>
            <p className="mt-3 text-slate-300">
              Understand how real rates, dollar strength, and geopolitical risk shape gold price action.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Trade and Research</h2>
            <p className="mt-3 text-slate-300">
              Get market commentary, strategy guides, and gold-specific trading frameworks.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">Visit the Gold Hub</h2>
          <p className="mt-3 text-slate-300">
            Designed for bullion traders and macro investors, the Gold hub collects price analysis, strategy, and market commentary in one place.
          </p>
          <Link
            href="/gold"
            className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Visit Gold Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
