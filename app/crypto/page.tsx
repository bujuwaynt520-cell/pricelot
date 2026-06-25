import { Metadata } from "next";
import { buildPageMetadata } from "../lib/seo";
import { getHubBannerImage } from "../lib/image";
import { CRYPTO_ARTICLES, CRYPTO_LESSONS, CRYPTO_STRATEGIES } from "../lib/services/cryptoHub";
import CryptoHubClient from "./CryptoHubClient";
import NewsletterCTA from "../components/NewsletterCTA";
import HubBanner from "../components/HubBanner";

const cryptoBanner = getHubBannerImage("Crypto");

export const metadata: Metadata = buildPageMetadata({
  title: "Crypto Trading Hub | BTC, ETH, SOL, XRP, ADA, LINK Guides",
  description: "Comprehensive crypto trading hub with 60+ articles, 25+ lessons, strategies, and glossary for Bitcoin, Ethereum, Solana, XRP, Cardano, and Chainlink.",
  canonical: "https://pricelot.com/crypto",
  keywords: ["crypto trading", "Bitcoin", "Ethereum", "Solana", "XRP", "Cardano", "Chainlink"],
  openGraphImage: cryptoBanner,
  twitterImage: cryptoBanner,
  type: "website",
});

export default function CryptoHubPage() {
  const featuredArticles = CRYPTO_ARTICLES.slice(0, 3);
  const featuredLessons = CRYPTO_LESSONS.slice(0, 3);
  const featuredStrategies = CRYPTO_STRATEGIES.slice(0, 3);
  const latestArticles = CRYPTO_ARTICLES.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Crypto Trading Hub",
            description: "Complete resource for crypto trading education, analysis, and strategies.",
            url: "https://pricelot.com/crypto",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What drives crypto market moves?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Crypto markets are influenced by network adoption, macro liquidity, regulatory events, on-chain activity, and sentiment.",
                  },
                },
              ],
            },
          }),
        }}
      />

      <HubBanner
        title="Master Crypto Markets and Layer-1 Strategies"
        description="Comprehensive education, technical analysis, and risk management for Bitcoin, Ethereum, Solana, XRP, Cardano, and Chainlink."
        image={cryptoBanner}
        label="Crypto Trading Hub"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-cyan-500/10 px-4 py-3 text-cyan-300">
            <div className="text-2xl font-bold">{CRYPTO_ARTICLES.length}+</div>
            <div className="text-sm">Articles</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 px-4 py-3 text-cyan-300">
            <div className="text-2xl font-bold">{CRYPTO_LESSONS.length}+</div>
            <div className="text-sm">Lessons</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 px-4 py-3 text-cyan-300">
            <div className="text-2xl font-bold">{CRYPTO_STRATEGIES.length}+</div>
            <div className="text-sm">Strategies</div>
          </div>
        </div>
      </HubBanner>

      <CryptoHubClient />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-cyan-300">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/crypto/articles/${article.slug}`}
                className="group rounded-lg border border-cyan-500/30 bg-slate-900/50 p-6 transition hover:border-cyan-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-cyan-400">{article.category}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-300">{article.title}</h3>
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
          <h2 className="mb-8 text-3xl font-bold text-cyan-300">Featured Lessons</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/crypto/academy/${lesson.id}`}
                className="group rounded-lg border border-cyan-500/30 bg-slate-900/50 p-6 transition hover:border-cyan-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-400">{lesson.category}</span>
                  <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{lesson.summary}</p>
                <div className="text-xs text-slate-500">{lesson.readTime} read</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-cyan-300">Trading Strategies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/crypto/strategies/${strategy.id}`}
                className="group rounded-lg border border-cyan-500/30 bg-slate-900/50 p-6 transition hover:border-cyan-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-400">{strategy.category}</span>
                  <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-300">{strategy.name}</h3>
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
          <h2 className="mb-8 text-3xl font-bold text-cyan-300">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <a
                key={article.slug}
                href={`/crypto/articles/${article.slug}`}
                className="group flex flex-col rounded-lg border border-cyan-500/20 bg-slate-900/50 p-6 transition hover:border-cyan-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-cyan-400">{article.category}</div>
                <h3 className="mb-3 flex-grow text-lg font-bold text-white group-hover:text-cyan-300">{article.title}</h3>
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
        <div className="mx-auto max-w-4xl rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-slate-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Explore Every Crypto Resource</h2>
          <p className="mb-8 text-slate-300">
            Browse {CRYPTO_ARTICLES.length} articles, {CRYPTO_LESSONS.length} lessons, and {CRYPTO_STRATEGIES.length} strategies to build crypto trading confidence.
          </p>
          <a
            href="#search"
            className="inline-block rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Search All Content
          </a>
        </div>
      </div>
    </div>
  );
}
