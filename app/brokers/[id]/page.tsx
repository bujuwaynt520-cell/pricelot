import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BrokerReview from "@/app/components/BrokerReview";
import AdSlot from "../../components/ads/AdSlot";
import AffiliateCard from "../../components/affiliate/AffiliateCard";
import AffiliateDisclosure from "../../components/affiliate/AffiliateDisclosure";
import SaveBrokerButton from "../../components/SaveBrokerButton";
import ContentMediaHero from "../../components/ContentMediaHero";
import { defaultAffiliatePrograms } from "../../lib/services/monetization";
import { getBrokerById, getRelatedBrokers } from "../../lib/services/brokerHub";
import { generatePlaceholderImage } from "../../lib/services/placeholderImages";
import { buildPageMetadata } from "../../lib/seo";
import {
  getJsonLdReview,
  getJsonLdBreadcrumbs,
  getBreadcrumbs
} from "../../lib/contentEngine";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Dynamic Server-side Metadata Resolver
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const broker = getBrokerById(id);

  if (!broker) {
    return {
      title: "Broker Audit Not Found | PriceLot Intelligence",
      description: "The requested ECN broker review is unavailable.",
    };
  }

  const pageImage = broker.featuredImage
    ? { url: broker.featuredImage, alt: broker.name }
    : generatePlaceholderImage("broker", broker.name);

  return buildPageMetadata({
    title: `${broker.name} Review & Audit | PriceLot Intelligence`,
    description: `Read our unbiased audit of ${broker.name}. Spreads from ${broker.spreadsFrom}, regulated by ${broker.regulatedBy.join(", ")}, overall rating ${broker.rating}/5.`,
    canonical: `https://pricelot.com/brokers/${id}`,
    keywords: [broker.name, ...broker.regulatedBy, broker.maxLeverage],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export default async function BrokerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const broker = getBrokerById(id);
  if (!broker) notFound();
  const relatedBrokers = getRelatedBrokers(id);

  const reviewJsonLd = getJsonLdReview(broker);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/brokers/${id}`);
  const breadcrumbs = getBreadcrumbs(`/brokers/${id}`);
  const pageImage = broker.featuredImage
    ? { url: broker.featuredImage, alt: broker.name }
    : generatePlaceholderImage("broker", broker.name);

  return (
    <div className="space-y-6 text-left">
      {/* Dynamic JSON-LD structured data reviews schemas */}
      {broker && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: reviewJsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Dynamic Breadcrumbs Navigation UI Component */}
      <nav id="broker-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.url} className="flex items-center gap-1.5">
            {idx > 0 && <span>/</span>}
            <Link
              href={crumb.url}
              className={`hover:text-orange-600 transition ${
                idx === breadcrumbs.length - 1 ? "text-zinc-600 font-bold pointer-events-none" : ""
              }`}
            >
              {crumb.label}
            </Link>
          </div>
        ))}
      </nav>

      <ContentMediaHero
        image={broker.featuredImage ? { url: broker.featuredImage, alt: broker.name } : undefined}
        fallbackImage={pageImage}
        title={broker.name}
        videoUrl={broker.videoUrl}
        className="mb-8"
      />

      {/* Save Broker Button */}
      {broker && (
        <div className="flex gap-2">
          <SaveBrokerButton
            brokerId={id}
            brokerName={broker.name}
            summary={broker.summary}
          />
        </div>
      )}

      {/* Client-side comparison grids, broker reviews, platform specs, and filters */}
      <BrokerReview selectedBrokerId={id} />

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900">Monetization transparency</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
                Some referral links on this broker review page may be affiliate links. Commissions help PriceLot maintain independent audits and publish more broker research.
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

      {relatedBrokers.length > 0 && (
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900">Related broker audits</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {relatedBrokers.map((related) => (
              <div key={related.id} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-700 transition hover:border-orange-300 hover:bg-white">
            <Link href={`/brokers/${related.id}`} className="block">
              <div className="text-2xl">{related.logo}</div>
              <div className="mt-3 font-semibold text-zinc-900">{related.name}</div>
              <div className="mt-2 text-[11px] text-zinc-500">{related.spreadsFrom} • {related.maxLeverage}</div>
            </Link>
            <Link
              href={`/compare/${broker.id}-vs-${related.id}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-orange-600 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white transition hover:bg-orange-500"
            >
              Compare
            </Link>
          </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
