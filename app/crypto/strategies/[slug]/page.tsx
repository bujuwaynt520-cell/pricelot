import { Metadata } from "next";
import { CRYPTO_STRATEGIES } from "../../../lib/services/cryptoHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import ContentMediaHero from "@/app/components/ContentMediaHero";
import SaveStrategyButton from "@/app/components/SaveStrategyButton";
import { buildPageMetadata } from "@/app/lib/seo";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const strategy = CRYPTO_STRATEGIES.find((s) => s.id === slug);

  if (!strategy) {
    return { title: "Strategy Not Found" };
  }

  const pageImage = strategy.featuredImage
    ? { url: strategy.featuredImage, alt: strategy.name }
    : generateHubImage("crypto", "strategy");

  return buildPageMetadata({
    title: `${strategy.name} | Crypto Trading Strategies`,
    description: strategy.description,
    canonical: `https://pricelot.com/crypto/strategies/${slug}`,
    keywords: [strategy.category, strategy.difficulty, ...strategy.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  return CRYPTO_STRATEGIES.map((strategy) => ({
    slug: strategy.id,
  }));
}

export default async function CryptoStrategyPage({ params }: Props) {
  const { slug } = await params;
  const strategy = CRYPTO_STRATEGIES.find((s) => s.id === slug);

  if (!strategy) {
    notFound();
  }

  const relatedStrategies = await getRelatedInternalLinks(slug, "strategy", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950">
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
          <a href="/crypto" className="hover:text-cyan-300">
            Crypto Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/crypto?tab=strategies" className="hover:text-cyan-300">
            Strategies
          </a>
          <span className="mx-2">/</span>
          <span className="text-cyan-300">{strategy.name}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 flex gap-2">
            <div className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
              {strategy.category}
            </div>
            <div className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300">
              {strategy.difficulty}
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{strategy.name}</h1>
          <p className="mb-6 text-xl text-slate-300">{strategy.description}</p>
          <ContentMediaHero
            image={strategy.featuredImage ? { url: strategy.featuredImage, alt: strategy.name } : undefined}
            fallbackImage={generateHubImage("crypto", "strategy")}
            title={strategy.name}
            videoUrl={strategy.videoUrl}
            className="mb-8"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {strategy.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mb-12 border-t border-cyan-500/20" />

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-cyan-300">Strategy Rules</h2>
          <div className="space-y-4">
            {strategy.rules.map((rule, idx) => (
              <div key={idx} className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-sm">
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

        <div className="mb-12 border-t border-cyan-500/20" />

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
            <h3 className="mb-2 text-sm font-semibold text-cyan-400">Difficulty Level</h3>
            <p className="text-lg text-white">{strategy.difficulty}</p>
          </div>
          <div className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
            <h3 className="mb-2 text-sm font-semibold text-cyan-400">Strategy Type</h3>
            <p className="text-lg text-white">{strategy.category}</p>
          </div>
          <div className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
            <h3 className="mb-2 text-sm font-semibold text-cyan-400">Best For</h3>
            <div className="flex flex-wrap gap-2">
              {strategy.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded bg-cyan-500/10 px-2 py-1 text-sm text-cyan-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
            <h3 className="mb-2 text-sm font-semibold text-cyan-400">Risk/Reward Profile</h3>
            <p className="text-sm text-slate-300">Typically 1:2 to 1:3 ratio</p>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-8">
          <h2 className="mb-4 text-xl font-bold text-cyan-300">💡 Pro Tips</h2>
          <ul className="space-y-3 text-slate-200">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Backtest this strategy on historical crypto price action before using real money.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Keep position sizes small in volatile markets and avoid overleveraging.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Use clear entry and exit rules to avoid emotional decisions during rapid moves.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Monitor market structure and liquidity when trading altcoins or event-driven setups.</span>
            </li>
          </ul>
        </div>

        <RelatedContentSection
          items={relatedStrategies}
          title="Related Reading"
          accentClass="text-cyan-300"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveStrategyButton
            strategyId={slug}
            title={strategy.name}
            summary={strategy.description}
            category={strategy.category}
          />
          <a
            href="/crypto"
            className="inline-block rounded-lg border border-cyan-500/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
          >
            ← Back to Crypto Hub
          </a>
        </div>
      </div>
    </div>
  );
}

