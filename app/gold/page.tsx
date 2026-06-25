import { Metadata } from "next";
import { GOLD_ARTICLES, GOLD_LESSONS, GOLD_STRATEGIES } from "../lib/services/goldHub";
import { buildPageMetadata } from "../lib/seo";
import { getHubBannerImage } from "../lib/image";
import HubBanner from "../components/HubBanner";
import GoldHubClient from "./GoldHubClient";
import NewsletterCTA from "../components/NewsletterCTA";

const goldBanner = getHubBannerImage("Gold");

export const metadata: Metadata = buildPageMetadata({
  title: "Gold Trading Hub | XAUUSD Education & Analysis",
  description: "Complete gold trading resource with 50+ articles, 25+ lessons, strategies, and glossary. Master XAUUSD trading with expert guides, technical analysis, and risk management.",
  canonical: "https://pricelot.com/gold",
  keywords: ["gold trading", "XAUUSD", "gold analysis", "trading strategies", "gold education"],
  openGraphImage: goldBanner,
  twitterImage: goldBanner,
  type: "website",
});

export default function GoldHubPage() {
  // Featured content
  const featuredArticles = GOLD_ARTICLES.slice(0, 3);
  const featuredLessons = GOLD_LESSONS.slice(0, 3);
  const featuredStrategies = GOLD_STRATEGIES.slice(0, 3);
  const latestArticles = GOLD_ARTICLES.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-yellow-950 to-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Gold Trading Hub",
            description: "Complete resource for XAUUSD gold trading education, analysis, and strategies",
            url: "https://pricelot.com/gold",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What drives gold prices?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gold prices are driven by inflation expectations, real interest rates, USD strength, geopolitical risk, and safe-haven demand.",
                  },
                },
              ],
            },
          }),
        }}
      />

      <HubBanner
        title="Master XAUUSD Gold Trading"
        description="Comprehensive guides, strategies, technical analysis, and risk management for gold traders of all levels."
        image={goldBanner}
        label="Gold Trading Hub"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-yellow-500/10 px-4 py-3 text-yellow-300">
            <div className="text-2xl font-bold">{GOLD_ARTICLES.length}+</div>
            <div className="text-sm">Articles</div>
          </div>
          <div className="rounded-lg bg-yellow-500/10 px-4 py-3 text-yellow-300">
            <div className="text-2xl font-bold">{GOLD_LESSONS.length}+</div>
            <div className="text-sm">Lessons</div>
          </div>
          <div className="rounded-lg bg-yellow-500/10 px-4 py-3 text-yellow-300">
            <div className="text-2xl font-bold">{GOLD_STRATEGIES.length}+</div>
            <div className="text-sm">Strategies</div>
          </div>
        </div>
      </HubBanner>

      {/* Main Content - Using Client Component */}
      <GoldHubClient />

      {/* Featured Articles Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-yellow-300">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/gold/articles/${article.slug}`}
                className="group rounded-lg border border-yellow-500/30 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-yellow-400">{article.category}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-yellow-300">{article.title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Lessons Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-yellow-300">Featured Lessons</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/gold/academy/${lesson.id}`}
                className="group rounded-lg border border-yellow-500/30 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-400">{lesson.category}</span>
                  <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-yellow-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{lesson.summary}</p>
                <div className="text-xs text-zinc-500">{lesson.readTime} read</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Strategies Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-yellow-300">Trading Strategies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/gold/strategies/${strategy.id}`}
                className="group rounded-lg border border-yellow-500/30 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-400">{strategy.category}</span>
                  <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-yellow-300">{strategy.name}</h3>
                <p className="mb-4 text-sm text-zinc-400">{strategy.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-yellow-300">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <a
                key={article.slug}
                href={`/gold/articles/${article.slug}`}
                className="group flex flex-col rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-yellow-400">{article.category}</div>
                <h3 className="mb-3 flex-grow text-lg font-bold text-white group-hover:text-yellow-300">{article.title}</h3>
                <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-zinc-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Explore All Resources</h2>
          <p className="mb-8 text-zinc-300">
            Browse {GOLD_ARTICLES.length} articles, {GOLD_LESSONS.length} lessons, and {GOLD_STRATEGIES.length} strategies to master gold trading
          </p>
          <a
            href="#search"
            className="inline-block rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Search All Content
          </a>
        </div>
      </div>
    </div>
  );
}
