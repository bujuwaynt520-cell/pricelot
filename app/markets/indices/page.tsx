import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, buildCollectionJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Indices Markets | PriceLot Market Hub",
  description: "Indices market coverage, benchmark analysis, and trading resources for equity market readers.",
  canonical: "https://pricelot.com/markets/indices",
  keywords: ["indices markets", "equity indices", "S&P 500", "Nasdaq", "FTSE"],
  type: "website",
});

export default function MarketsIndicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: "Indices Market Hub",
            description: "Benchmark index insights, macro commentary, and equity market strategy resources.",
            url: "https://pricelot.com/markets/indices",
            itemList: [
              { position: 1, name: "Indices Hub", url: "https://pricelot.com/indices" },
              { position: 2, name: "Indices Articles", url: "https://pricelot.com/indices/articles" },
              { position: 3, name: "Indices Strategies", url: "https://pricelot.com/indices/strategies" },
            ],
          }),
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Indices Markets</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Monitor Equity Benchmarks and Macro Index Themes
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Explore S&P, Nasdaq, FTSE, and global index insights to understand broad market risk and leading sector trends.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Benchmark Analysis</h2>
            <p className="mt-3 text-slate-300">
              Review index momentum, macro drivers, and the impact of central bank and growth data on equity benchmarks.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <h2 className="text-xl font-bold text-white">Strategy Insights</h2>
            <p className="mt-3 text-slate-300">
              Discover index strategies designed to help manage market direction, sector rotation, and risk exposure.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">Visit the Indices Hub</h2>
          <p className="mt-3 text-slate-300">
            Use the Indices hub to access market commentary, benchmark articles, and practical trading resources for global indices.
          </p>
          <Link
            href="/indices"
            className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Visit Indices Hub
          </Link>
        </div>
      </main>
    </div>
  );
}
