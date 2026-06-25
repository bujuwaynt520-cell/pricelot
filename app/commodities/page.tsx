import { Metadata } from "next";
import { buildPageMetadata } from "../lib/seo";
import { getHubBannerImage } from "../lib/image";
import { COMMODITIES_ARTICLES, COMMODITIES_LESSONS, COMMODITIES_STRATEGIES } from "../lib/services/commoditiesHub";
import CommoditiesHubClient from "./CommoditiesHubClient";
import NewsletterCTA from "../components/NewsletterCTA";
import HubBanner from "../components/HubBanner";

const commoditiesBanner = getHubBannerImage("Commodities");

export const metadata: Metadata = buildPageMetadata({
  title: "Commodities Trading Hub | Crude Oil, Brent, Natural Gas, Silver, Copper, Wheat, Corn, Coffee, Cocoa, Sugar, Palladium",
  description: "Comprehensive commodities trading hub with articles, lessons, strategies, and glossary for energy, metals, and agricultural markets.",
  canonical: "https://pricelot.com/commodities",
  keywords: ["commodities trading", "crude oil", "brent", "natural gas", "silver", "copper", "wheat", "corn", "coffee", "cocoa", "sugar", "palladium"],
  openGraphImage: commoditiesBanner,
  twitterImage: commoditiesBanner,
  type: "website",
});

export default function CommoditiesHubPage() {
  const featuredArticles = COMMODITIES_ARTICLES.slice(0, 3);
  const featuredLessons = COMMODITIES_LESSONS.slice(0, 3);
  const featuredStrategies = COMMODITIES_STRATEGIES.slice(0, 3);
  const latestArticles = COMMODITIES_ARTICLES.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Commodities Trading Hub",
            description: "Complete resource for commodities trading education, analysis, and strategies.",
            url: "https://pricelot.com/commodities",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What drives commodities markets?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Commodities respond to supply shocks, demand growth, weather, macro policy, and global inventory cycles.",
                  },
                },
              ],
            },
          }),
        }}
      />
      <HubBanner
        title="Trade Energy, Metals, and Soft Commodities Confidently"
        description="In-depth education, technical analysis, and risk management for crude oil, Brent, natural gas, silver, copper, wheat, corn, coffee, cocoa, sugar, and palladium."
        image={commoditiesBanner}
        label="Commodities Trading Hub"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-emerald-300">
            <div className="text-2xl font-bold">{COMMODITIES_ARTICLES.length}+</div>
            <div className="text-sm">Articles</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-emerald-300">
            <div className="text-2xl font-bold">{COMMODITIES_LESSONS.length}+</div>
            <div className="text-sm">Lessons</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-emerald-300">
            <div className="text-2xl font-bold">{COMMODITIES_STRATEGIES.length}+</div>
            <div className="text-sm">Strategies</div>
          </div>
        </div>
      </HubBanner>

      <CommoditiesHubClient />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-emerald-300">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/commodities/articles/${article.slug}`}
                className="group rounded-lg border border-emerald-500/30 bg-slate-900/50 p-6 transition hover:border-emerald-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-emerald-400">{article.category}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-emerald-300">{article.title}</h3>
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
          <h2 className="mb-8 text-3xl font-bold text-emerald-300">Featured Lessons</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/commodities/academy/${lesson.id}`}
                className="group rounded-lg border border-emerald-500/30 bg-slate-900/50 p-6 transition hover:border-emerald-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400">{lesson.category}</span>
                  <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-emerald-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{lesson.summary}</p>
                <div className="text-xs text-slate-500">{lesson.readTime} read</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-emerald-300">Trading Strategies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/commodities/strategies/${strategy.id}`}
                className="group rounded-lg border border-emerald-500/30 bg-slate-900/50 p-6 transition hover:border-emerald-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400">{strategy.category}</span>
                  <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-emerald-300">{strategy.name}</h3>
                <p className="mb-4 text-sm text-slate-400">{strategy.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-emerald-300">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <a
                key={article.slug}
                href={`/commodities/articles/${article.slug}`}
                className="group flex flex-col rounded-lg border border-emerald-500/20 bg-slate-900/50 p-6 transition hover:border-emerald-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-emerald-400">{article.category}</div>
                <h3 className="mb-3 flex-grow text-lg font-bold text-white group-hover:text-emerald-300">{article.title}</h3>
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
        <div className="mx-auto max-w-4xl rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-slate-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Explore Every Commodities Resource</h2>
          <p className="mb-8 text-slate-300">
            Browse {COMMODITIES_ARTICLES.length} articles, {COMMODITIES_LESSONS.length} lessons, and {COMMODITIES_STRATEGIES.length} strategies to build commodity market confidence.
          </p>
          <a
            href="#search"
            className="inline-block rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            Search All Content
          </a>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-900/20">
        <div className="mx-auto max-w-6xl">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
