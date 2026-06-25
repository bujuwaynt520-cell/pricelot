import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComparisonBrokers, getRelatedBrokers } from "../../lib/services/brokerHub";
import AdSlot from "../../components/ads/AdSlot";
import AffiliateDisclosure from "../../components/affiliate/AffiliateDisclosure";
import AffiliateCard from "../../components/affiliate/AffiliateCard";
import { defaultAffiliatePrograms } from "../../lib/services/monetization";
import { getJsonLdComparison, getJsonLdBreadcrumbs, getBreadcrumbs } from "../../lib/contentEngine";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const brokerPair = getComparisonBrokers(pair);

  if (!brokerPair) {
    notFound();
  }

  const [brokerA, brokerB] = brokerPair;

  return {
    title: `Compare ${brokerA.name} vs ${brokerB.name} | PriceLot Broker Intelligence`,
    description: `Review the side-by-side comparison of ${brokerA.name} and ${brokerB.name}, including spreads, commissions, leverage, platforms, and instrument coverage.`,
    alternates: {
      canonical: `https://pricelot.com/compare/${pair}`,
    },
    openGraph: {
      title: `Compare ${brokerA.name} vs ${brokerB.name}`,
      description: `Side-by-side broker comparison of ${brokerA.name} and ${brokerB.name}.`,
      type: "website",
    },
  };
}

export default async function BrokerComparePage({ params }: PageProps) {
  const { pair } = await params;
  const brokerPair = getComparisonBrokers(pair);
  if (!brokerPair) notFound();

  const [brokerA, brokerB] = brokerPair;
  const comparisonJsonLd = getJsonLdComparison(brokerA, brokerB);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/compare/${pair}`);
  const breadcrumbs = getBreadcrumbs(`/compare/${pair}`);

  const relatedSuggestions = Array.from(
    new Map(
      [...getRelatedBrokers(brokerA.id), ...getRelatedBrokers(brokerB.id)]
        .filter((broker) => broker.id !== brokerA.id && broker.id !== brokerB.id)
        .map((broker) => [broker.id, broker])
    ).values()
  ).slice(0, 4);

  return (
    <div className="space-y-8 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: comparisonJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }} />

      <nav id="compare-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.url} className="flex items-center gap-1.5">
            {idx > 0 && <span>/</span>}
            <Link
              href={crumb.url}
              className={`hover:text-orange-600 transition ${idx === breadcrumbs.length - 1 ? "text-zinc-600 font-bold pointer-events-none" : ""}`}
            >
              {crumb.label}
            </Link>
          </div>
        ))}
      </nav>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] font-bold text-orange-600">
              Broker Comparison Engine
            </div>
            <h1 className="mt-4 text-4xl font-serif font-black tracking-tight text-zinc-900">
              {brokerA.name} vs {brokerB.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
              Compare regulation, spreads, commission, leverage caps, deposit requirements, platform coverage, and instrument access across these two audited brokers.
            </p>
          </div>
          <div className="grid gap-3 text-xs sm:text-sm">
            <Link
              href={`/brokers/${brokerA.id}`}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700 font-semibold transition hover:bg-zinc-100"
            >
              View {brokerA.name}
            </Link>
            <Link
              href={`/brokers/${brokerB.id}`}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700 font-semibold transition hover:bg-zinc-100"
            >
              View {brokerB.name}
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm overflow-x-auto">
        <table className="min-w-full table-auto text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-zinc-500 text-[11px] uppercase tracking-[0.24em]">
              <th className="p-4"></th>
              <th className="p-4">{brokerA.name}</th>
              <th className="p-4">{brokerB.name}</th>
            </tr>
          </thead>
          <tbody className="text-sm text-zinc-700">
            <tr className="bg-zinc-50 rounded-3xl">
              <td className="p-4 font-semibold text-zinc-900">Rating</td>
              <td className="p-4">{brokerA.rating}/5</td>
              <td className="p-4">{brokerB.rating}/5</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-900">Regulated by</td>
              <td className="p-4">{brokerA.regulatedBy.join(", ")}</td>
              <td className="p-4">{brokerB.regulatedBy.join(", ")}</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-4 font-semibold text-zinc-900">Spreads from</td>
              <td className="p-4 text-orange-600 font-semibold">{brokerA.spreadsFrom}</td>
              <td className="p-4 text-orange-600 font-semibold">{brokerB.spreadsFrom}</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-900">Commission</td>
              <td className="p-4">{brokerA.commission}</td>
              <td className="p-4">{brokerB.commission}</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-4 font-semibold text-zinc-900">Max leverage</td>
              <td className="p-4">{brokerA.maxLeverage}</td>
              <td className="p-4">{brokerB.maxLeverage}</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-900">Minimum deposit</td>
              <td className="p-4">${brokerA.minDeposit}</td>
              <td className="p-4">${brokerB.minDeposit}</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-4 font-semibold text-zinc-900">Platforms</td>
              <td className="p-4">{brokerA.platforms.join(", ")}</td>
              <td className="p-4">{brokerB.platforms.join(", ")}</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-900">Instruments</td>
              <td className="p-4">{brokerA.instruments.join(", ")}</td>
              <td className="p-4">{brokerB.instruments.join(", ")}</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-4 font-semibold text-zinc-900">US Clients</td>
              <td className="p-4">{brokerA.usClients ? "Allowed" : "Restricted"}</td>
              <td className="p-4">{brokerB.usClients ? "Allowed" : "Restricted"}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {[brokerA, brokerB].map((broker) => (
          <div key={broker.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-zinc-900">{broker.name}</h2>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400 mt-1">Fast facts</p>
              </div>
              <div className="text-3xl">{broker.logo}</div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span>Deposit methods</span>
                <span>{broker.depositMethods.slice(0, 3).join(", ")}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span>Highlights</span>
                <span>{broker.pros[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Summary</span>
                <span className="text-right text-zinc-500 max-w-[55%]">{broker.summary}</span>
              </div>
            </div>

            <Link
              href={`https://www.pricelot.com/go/${broker.id}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white hover:bg-orange-500 transition"
            >
              Open account with {broker.name}
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900">Partner offers and transparency</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
                PriceLot uses affiliate relationships to support ongoing broker audits and comparison tools. All partner offers are selected to help traders without compromising editorial independence.
              </p>
            </div>
            <AdSlot placement="in-content" />
            <AffiliateDisclosure />
          </div>
          <div className="space-y-4">
            <AffiliateCard program={defaultAffiliatePrograms[0]} />
          </div>
        </div>
      </section>

      {relatedSuggestions.length > 0 && (
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">Related broker comparison ideas</h2>
            <Link href="/compare" className="text-xs uppercase tracking-[0.24em] text-orange-600 font-bold hover:underline">
              Browse more
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedSuggestions.map((broker) => (
              <Link
                key={broker.id}
                href={`/brokers/${broker.id}`}
                className="block rounded-3xl border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-700 transition hover:border-orange-300 hover:bg-white"
              >
                <div className="text-2xl">{broker.logo}</div>
                <div className="mt-3 font-semibold text-zinc-900">{broker.name}</div>
                <div className="mt-2 text-[11px] text-zinc-500">{broker.spreadsFrom} • {broker.maxLeverage}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
