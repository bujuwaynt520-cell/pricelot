import { Metadata } from "next";
import BrokerReview from "@/app/components/BrokerReview";
import { getBrokerHub } from "../lib/services/brokerHub";

const brokerHub = getBrokerHub();

export const metadata: Metadata = {
  title: "Broker Intelligence Matrix | Compare Regulated ECN Brokers | PriceLot",
  description: "Unbiased audits and side-by-side comparisons of leading retail forex and CFD brokers. Verify regulator approval (FCA, ASIC), ECN spreads, maximum leverage, and deposit speeds.",
  alternates: {
    canonical: "https://pricelot.com/brokers",
  },
};

export default function BrokersPage() {
  return (
    <div className="space-y-8 text-left">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            Broker Intelligence Hub
          </div>
          <h1 className="text-4xl font-serif font-black tracking-tight text-zinc-900">
            Browse regulated broker audits, platform specs, and execution ratings.
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-500">
            Filter across 50+ verified broker reviews, compare ECN spreads, platform support,
            regulatory oversight, and account setup requirements from trusted global providers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Broker Count</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.brokerCount}</div>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Platforms Covered</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.platformCount}</div>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-400">Regulators Represented</div>
              <div className="mt-3 text-4xl font-bold text-zinc-900">{brokerHub.stats.regulatorCount}</div>
            </div>
          </div>
        </div>
      </section>

      <BrokerReview />
    </div>
  );
}
