import Link from "next/link";
import { Metadata } from "next";
import { getComparisonPairs, getBrokerHub } from "../lib/services/brokerHub";
import AdSlot from "../components/ads/AdSlot";
import AffiliateCard from "../components/affiliate/AffiliateCard";
import AffiliateDisclosure from "../components/affiliate/AffiliateDisclosure";
import { defaultAffiliatePrograms } from "../lib/services/monetization";

const brokerHub = getBrokerHub();
const comparePairs = getComparisonPairs().slice(0, 8);

export const metadata: Metadata = {
  title: "Broker Comparison Hub | Side-by-Side Broker Audits | PriceLot",
  description: "Compare regulated forex and CFD brokers side-by-side across spreads, leverage, commissions, instruments and platform support.",
  alternates: {
    canonical: "https://pricelot.com/compare",
  },
};

export default function CompareLandingPage() {
  return (
    <div className="space-y-8 text-left">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            Broker Comparison Center
          </div>
          <h1 className="text-4xl font-serif font-black tracking-tight text-zinc-900">
            Compare broker audits, fee structures and market access in one place.
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-500">
            Use PriceLot's comparison engine to evaluate regulated broker execution, spreads, commissions, deposit requirements, instruments, and platform support before you choose.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Total Broker Audits</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.brokerCount}</div>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Regulators Covered</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.regulatorCount}</div>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Platform Networks</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.platformCount}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900">Broker offers that fund independent analysis</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
                PriceLot may feature vetted affiliate programs and partner offers to keep the broker comparison engine freely available while preserving editorial independence.
              </p>
            </div>
            <AffiliateCard program={defaultAffiliatePrograms[0]} />
          </div>
          <div className="space-y-4">
            <AffiliateDisclosure />
            <AdSlot placement="sidebar" />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Most relevant broker comparisons</h2>
            <p className="text-sm text-zinc-500 mt-1">Pick a pair and review essential broker differences in detail.</p>
          </div>
          <Link
            href="/brokers"
            className="self-start md:self-auto inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-700 hover:bg-zinc-100 transition"
          >
            Browse all brokers
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comparePairs.map((pair) => (
            <Link
              key={pair.slug}
              href={`/compare/${pair.slug}`}
              className="group block rounded-3xl border border-zinc-100 bg-zinc-50 p-5 transition hover:border-orange-300 hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{pair.brokerA.logo}</div>
                <div className="text-2xl">vs</div>
                <div className="text-2xl">{pair.brokerB.logo}</div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-zinc-900">{pair.brokerA.name}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-1">{pair.brokerB.name}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-zinc-500">
                <div className="rounded-2xl bg-white p-3 border border-zinc-100">Spreads {pair.brokerA.spreadsFrom}</div>
                <div className="rounded-2xl bg-white p-3 border border-zinc-100">Spreads {pair.brokerB.spreadsFrom}</div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-[0.24em]">
                View comparison →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">How to use the comparison engine</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 text-sm text-zinc-600">
            <p className="font-bold text-zinc-900 mb-2">1. Pick two brokers</p>
            <p>Choose brokers with similar account types or regulatory footprints to compare spreads, leverage, commission, and instrument coverage.</p>
          </div>
          <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 text-sm text-zinc-600">
            <p className="font-bold text-zinc-900 mb-2">2. Compare key metrics</p>
            <p>Review each broker's minimum deposit, platforms, and regulators to identify the best fit for your trading strategy.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
