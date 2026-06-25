import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Crypto Markets | PriceLot Market Hub",
  description: "Crypto market coverage, digital asset commentary, and trading tools for blockchain-focused investors.",
  canonical: "https://pricelot.com/markets/crypto",
  keywords: ["crypto markets", "bitcoin", "ethereum", "digital assets", "crypto trading"],
  type: "website",
});

export default function MarketsCryptoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Crypto Market Hub",
            description: "Digital asset market coverage, price themes, and trading insights for crypto investors.",
            url: "https://pricelot.com/markets/crypto",
            itemList: [
              { position: 1, name: "Crypto Hub", url: "https://pricelot.com/crypto" },
              { position: 2, name: "Crypto Articles", url: "https://pricelot.com/crypto/articles" },
              { position: 3, name: "Crypto Strategies", url: "https://pricelot.com/crypto/strategies" },
            ],
          }),
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Crypto Markets</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Track Digital Asset Momentum and Crypto Themes
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Stay ahead of the latest crypto market moves, network upgrades, and volatility events in the most dynamic asset class.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Crypto Market Trends</h2>
            <p className="mt-3 text-slate-300">
              Follow price action, on-chain narratives, and headline-driven catalysts for Bitcoin and major altcoins.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Trading Playbooks</h2>
            <p className="mt-3 text-slate-300">
              Discover crypto strategies, risk management ideas, and scenario-based planning for market volatility.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">Visit the Crypto Hub</h2>
          <p className="mt-3 text-slate-300">
            A focused resource center for digital asset research and trading insights across Bitcoin, Ethereum, and broader crypto markets.
          </p>
          <Link
            href="/crypto"
            className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Visit Crypto Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
