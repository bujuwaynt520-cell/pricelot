import { Metadata } from "next";
import { FOREX_STRATEGIES } from "../../../lib/services/forexHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import ContentMediaHero from "@/app/components/ContentMediaHero";
import SaveStrategyButton from "@/app/components/SaveStrategyButton";
import { buildPageMetadata } from "@/app/lib/seo";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const strategy = FOREX_STRATEGIES.find((s) => s.id === params.slug);

  if (!strategy) {
    return { title: "Strategy Not Found" };
  }

  const pageImage = strategy.featuredImage
    ? { url: strategy.featuredImage, alt: strategy.name }
    : generateHubImage("forex", "strategy");

  return buildPageMetadata({
    title: `${strategy.name} | Forex Trading Strategies`,
    description: strategy.description,
    canonical: `https://pricelot.com/forex/strategies/${params.slug}`,
    keywords: [strategy.category, strategy.difficulty, ...strategy.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  return FOREX_STRATEGIES.map((strategy) => ({ slug: strategy.id }));
}

export default async function ForexStrategyPage({ params }: Props) {
  const strategy = FOREX_STRATEGIES.find((s) => s.id === params.slug);

  if (!strategy) {
    notFound();
  }

  const relatedStrategies = await getRelatedInternalLinks(strategy.id, "strategy", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: strategy.name,
            description: strategy.description,
            step: strategy.rules.map((rule, idx) => ({
              "@type": "HowToStep",
              position: idx + 1,
              text: rule,
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex text-sm text-slate-400">
          <a href="/forex" className="hover:text-orange-300">
            Forex Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/forex?tab=strategies" className="hover:text-orange-300">
            Strategies
          </a>
          <span className="mx-2">/</span>
          <span className="text-orange-300">{strategy.name}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 flex gap-2">
            <div className="rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300">{strategy.category}</div>
            <div className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300">{strategy.difficulty}</div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{strategy.name}</h1>
          <p className="mb-6 text-xl text-slate-300">{strategy.description}</p>
          <ContentMediaHero
            image={strategy.featuredImage ? { url: strategy.featuredImage, alt: strategy.name } : undefined}
            fallbackImage={generateHubImage("forex", "strategy")}
            title={strategy.name}
            videoUrl={strategy.videoUrl}
            className="mb-8"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {strategy.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-orange-500/10 px-3 py-1 text-sm text-orange-300">#{tag}</span>
          ))}
        </div>

        <div className="mb-12 border-t border-orange-500/20" />

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-orange-300">Strategy Rules</h2>
          <div className="space-y-4">
            {strategy.rules.map((rule, idx) => (
              <div key={idx} className="rounded-lg border border-orange-500/10 bg-slate-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-300 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-lg text-white font-medium">{rule}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <RelatedContentSection
          items={relatedStrategies}
          title="Related Reading"
          accentClass="text-orange-300"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveStrategyButton
            strategyId={params.slug}
            title={strategy.name}
            summary={strategy.description}
            category={strategy.category}
          />
          <a
            href="/forex"
            className="inline-block rounded-lg border border-orange-500/30 px-6 py-3 text-sm font-semibold text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/10"
          >
            ← Back to Forex Hub
          </a>
        </div>
      </div>
    </div>
  );
}

