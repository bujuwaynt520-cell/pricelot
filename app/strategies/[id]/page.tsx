import { Metadata } from "next";
import Link from "next/link";
import StrategyLibrary from "../../../src/components/StrategyLibrary";
import SaveStrategyButton from "@/app/components/SaveStrategyButton";
import {
  SAMPLE_STRATEGIES_EXTENDED,
  getJsonLdStrategy,
  getJsonLdBreadcrumbs,
  getBreadcrumbs
} from "../../lib/contentEngine";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Dynamic Server-side Metadata Resolver
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const strategy = SAMPLE_STRATEGIES_EXTENDED.find((s) => s.id === id);

  if (!strategy) {
    return {
      title: "Strategy Blueprint Not Found | PriceLot Systems",
      description: "The requested algorithmic trading ruleset is unavailable.",
    };
  }

  return {
    title: `${strategy.name} Backtested Blueprint | PriceLot Systems`,
    description: `Analyze the rule-based ${strategy.name} strategy. Category: ${strategy.category}, estimated win-rate: ${strategy.winRateEstimate}, TF: ${strategy.timeframe}.`,
    alternates: {
      canonical: `https://pricelot.com/strategies/${id}`,
    },
    openGraph: {
      title: strategy.name,
      description: strategy.description,
      type: "article",
    },
  };
}

export default async function StrategyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const strategy = SAMPLE_STRATEGIES_EXTENDED.find((s) => s.id === id);

  const strategyJsonLd = strategy ? getJsonLdStrategy(strategy) : "";
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/strategies/${id}`);
  const breadcrumbs = getBreadcrumbs(`/strategies/${id}`);

  return (
    <div className="space-y-4 text-left">
      {/* Dynamic JSON-LD structured data elements for Google crawler */}
      {strategy && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: strategyJsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Dynamic Breadcrumbs Navigation UI Component */}
      <nav id="strategy-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
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

      {/* Save Strategy Button */}
      {strategy && (
        <div className="flex gap-2">
          <SaveStrategyButton
            strategyId={id}
            title={strategy.name}
            summary={strategy.description}
            category={strategy.category}
          />
        </div>
      )}

      {/* Client-side Strategy interactive chart and historical simulation runner */}
      <StrategyLibrary selectedStrategyId={id} />
    </div>
  );
}
