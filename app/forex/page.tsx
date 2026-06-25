import { Metadata } from "next";
import { FOREX_ARTICLES, FOREX_LESSONS, FOREX_STRATEGIES } from "../lib/services/forexHub";
import { buildPageMetadata } from "../lib/seo";
import { getHubBannerImage } from "../lib/image";
import HubBanner from "../components/HubBanner";
import ForexHubClient from "./ForexHubClient";
import NewsletterCTA from "../components/NewsletterCTA";

const forexBanner = getHubBannerImage("Forex");

export const metadata: Metadata = buildPageMetadata({
  title: "Forex Trading Hub | EURUSD, USDJPY, GBPUSD, AUDUSD, USDCAD Education",
  description: "Complete forex trading hub with 100 articles, 50 lessons, strategies, and glossary for major currency pairs and market structure.",
  canonical: "https://pricelot.com/forex",
  keywords: ["forex trading", "EURUSD", "USDJPY", "GBPUSD", "AUDUSD", "USDCAD", "forex education"],
  openGraphImage: forexBanner,
  twitterImage: forexBanner,
  type: "website",
});

export default function ForexHubPage() {
  const featuredArticles = FOREX_ARTICLES.slice(0, 3);
  const featuredLessons = FOREX_LESSONS.slice(0, 3);
  const featuredStrategies = FOREX_STRATEGIES.slice(0, 3);
  const latestArticles = FOREX_ARTICLES.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Forex Trading Hub",
            description: "Complete resource for forex trading education, analysis, and strategies.",
            url: "https://pricelot.com/forex",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What drives major forex pairs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Major forex pairs move on central bank policy, economic data, currency correlations, and risk sentiment.",
                  },
                },
              ],
            },
          }),
        }}
      />

      <HubBanner
        title="Master Major Currency Pairs and Forex Market Structure"
        description="100 in-depth articles, 50 lessons, strategies, and glossary entries focused on EURUSD, USDJPY, GBPUSD, AUDUSD, USDCAD, and global currency flows."
        image={forexBanner}
        label="Forex Trading Hub"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-orange-500/10 px-4 py-3 text-orange-300">
            <div className="text-2xl font-bold">{FOREX_ARTICLES.length}+</div>
            <div className="text-sm">Articles</div>
          </div>
          <div className="rounded-lg bg-orange-500/10 px-4 py-3 text-orange-300">
            <div className="text-2xl font-bold">{FOREX_LESSONS.length}+</div>
            <div className="text-sm">Lessons</div>
          </div>
          <div className="rounded-lg bg-orange-500/10 px-4 py-3 text-orange-300">
            <div className="text-2xl font-bold">{FOREX_STRATEGIES.length}+</div>
            <div className="text-sm">Strategies</div>
          </div>
        </div>
      </HubBanner>

      <ForexHubClient />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-orange-300">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/forex/articles/${article.slug}`}
                className="group rounded-lg border border-orange-500/30 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-orange-400">{article.category}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-orange-300">{article.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-orange-300">Featured Lessons</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/forex/academy/${lesson.id}`}
                className="group rounded-lg border border-orange-500/30 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-400">{lesson.category}</span>
                  <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-orange-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{lesson.summary}</p>
                <div className="text-xs text-slate-500">{lesson.readTime} read</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-orange-300">Trading Strategies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/forex/strategies/${strategy.id}`}
                className="group rounded-lg border border-orange-500/30 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-400">{strategy.category}</span>
                  <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-orange-300">{strategy.name}</h3>
                <p className="mb-4 text-sm text-slate-400">{strategy.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-orange-300">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <a
                key={article.slug}
                href={`/forex/articles/${article.slug}`}
                className="group flex flex-col rounded-lg border border-orange-500/20 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-orange-400">{article.category}</div>
                <h3 className="mb-3 flex-grow text-lg font-bold text-white group-hover:text-orange-300">{article.title}</h3>
                <p className="mb-4 text-sm text-slate-400 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-slate-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Explore Every Forex Resource</h2>
          <p className="mb-8 text-slate-300">
            Browse {FOREX_ARTICLES.length} articles, {FOREX_LESSONS.length} lessons, and {FOREX_STRATEGIES.length} strategies to build forex trading skill and confidence.
          </p>
          <a href="#search" className="inline-block rounded-lg bg-orange-500 px-8 py-3 font-semibold text-black transition hover:bg-orange-400">
            Search All Content
          </a>
        </div>
      </div>
    </div>
  );
}
