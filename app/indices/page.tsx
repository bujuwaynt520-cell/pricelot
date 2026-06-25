import { Metadata } from "next";
import { buildPageMetadata } from "../lib/seo";
import { getHubBannerImage } from "../lib/image";
import { INDICES_ARTICLES, INDICES_LESSONS, INDICES_STRATEGIES } from "../lib/services/indicesHub";
import IndicesHubClient from "./IndicesHubClient";
import NewsletterCTA from "../components/NewsletterCTA";
import HubBanner from "../components/HubBanner";

const indicesBanner = getHubBannerImage("Indices");

export const metadata: Metadata = buildPageMetadata({
  title: "Indices Trading Hub | S&P 500, NASDAQ, Dow, FTSE, DAX, Nikkei, Hang Seng, ASX",
  description: "Comprehensive indices trading hub with articles, lessons, strategies, and glossary for global benchmarks.",
  canonical: "https://pricelot.com/indices",
  keywords: ["indices trading", "S&P 500", "NASDAQ", "Dow Jones", "FTSE 100", "DAX", "Nikkei 225", "Hang Seng", "ASX 200"],
  openGraphImage: indicesBanner,
  twitterImage: indicesBanner,
  type: "website",
});

export default function IndicesHubPage() {
  const featuredArticles = INDICES_ARTICLES.slice(0, 3);
  const featuredLessons = INDICES_LESSONS.slice(0, 3);
  const featuredStrategies = INDICES_STRATEGIES.slice(0, 3);
  const latestArticles = INDICES_ARTICLES.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Indices Trading Hub",
            description: "Complete resource for global index trading education, analysis, and strategies.",
            url: "https://pricelot.com/indices",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What drives index market moves?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Index markets respond to macro policy, sector rotation, liquidity, and sentiment across major benchmarks.",
                  },
                },
              ],
            },
          }),
        }}
      />
      <HubBanner
        title="Master Major Global Indices"
        description="Education, technical analysis, and risk management for S&P 500, NASDAQ, Dow Jones, FTSE, DAX, Nikkei, Hang Seng, and ASX."
        image={indicesBanner}
        label="Indices Trading Hub"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-sky-500/10 px-4 py-3 text-sky-300">
            <div className="text-2xl font-bold">{INDICES_ARTICLES.length}+</div>
            <div className="text-sm">Articles</div>
          </div>
          <div className="rounded-lg bg-sky-500/10 px-4 py-3 text-sky-300">
            <div className="text-2xl font-bold">{INDICES_LESSONS.length}+</div>
            <div className="text-sm">Lessons</div>
          </div>
          <div className="rounded-lg bg-sky-500/10 px-4 py-3 text-sky-300">
            <div className="text-2xl font-bold">{INDICES_STRATEGIES.length}+</div>
            <div className="text-sm">Strategies</div>
          </div>
        </div>
      </HubBanner>

      <IndicesHubClient />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-sky-300">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/indices/articles/${article.slug}`}
                className="group rounded-lg border border-sky-500/30 bg-slate-900/50 p-6 transition hover:border-sky-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-sky-400">{article.category}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-sky-300">{article.title}</h3>
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
          <h2 className="mb-8 text-3xl font-bold text-sky-300">Featured Lessons</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/indices/academy/${lesson.id}`}
                className="group rounded-lg border border-sky-500/30 bg-slate-900/50 p-6 transition hover:border-sky-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-sky-400">{lesson.category}</span>
                  <span className="rounded bg-sky-500/20 px-2 py-1 text-xs text-sky-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-sky-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{lesson.summary}</p>
                <div className="text-xs text-slate-500">{lesson.readTime} read</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-sky-300">Trading Strategies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/indices/strategies/${strategy.id}`}
                className="group rounded-lg border border-sky-500/30 bg-slate-900/50 p-6 transition hover:border-sky-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-sky-400">{strategy.category}</span>
                  <span className="rounded bg-sky-500/20 px-2 py-1 text-xs text-sky-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-sky-300">{strategy.name}</h3>
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
          <h2 className="mb-8 text-3xl font-bold text-sky-300">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <a
                key={article.slug}
                href={`/indices/articles/${article.slug}`}
                className="group flex flex-col rounded-lg border border-sky-500/20 bg-slate-900/50 p-6 transition hover:border-sky-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-sky-400">{article.category}</div>
                <h3 className="mb-3 flex-grow text-lg font-bold text-white group-hover:text-sky-300">{article.title}</h3>
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
        <div className="mx-auto max-w-4xl rounded-lg border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-slate-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Explore Every Indices Resource</h2>
          <p className="mb-8 text-slate-300">
            Browse {INDICES_ARTICLES.length} articles, {INDICES_LESSONS.length} lessons, and {INDICES_STRATEGIES.length} strategies to build index market confidence.
          </p>
          <a
            href="#search"
            className="inline-block rounded-lg bg-sky-500 px-8 py-3 font-semibold text-black transition hover:bg-sky-400"
          >
            Search All Content
          </a>
        </div>
      </div>
    </div>
  );
}
