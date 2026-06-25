"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { NEWS_CATEGORIES } from "@/app/lib/services/newsFeed";
import { NewsCategory, NewsArticle } from "@/app/types";

const CATEGORY_ALL = "All" as const;
const FILTER_OPTIONS = [CATEGORY_ALL, ...NEWS_CATEGORIES] as const;

export default function NewsHubClient() {
  const { trackEvent } = useAnalytics();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | typeof CATEGORY_ALL>(CATEGORY_ALL);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/news");
        if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.status}`);
        }
        const data = (await res.json()) as NewsArticle[];
        setArticles(data);
      } catch (error) {
        console.error("Unable to load news articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === CATEGORY_ALL || article.category === selectedCategory;
      const matchesText =
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.summary.toLowerCase().includes(normalizedQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      return matchesCategory && (!normalizedQuery || matchesText);
    });
  }, [articles, query, selectedCategory]);

  const featuredNews = useMemo(
    () => articles.filter((article) => article.featured).slice(0, 2),
    [articles]
  );

  const trendingStories = useMemo(
    () => articles.filter((article) => article.trending).slice(0, 4),
    [articles]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Latest market stories</h2>
            <p className="text-zinc-500 text-sm mt-2">Filter by category or keyword to slice the news feed to your current trading view.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {FILTER_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  trackEvent("news_category_selected", "News Hub", category);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {isLoading ? (
            <div className="col-span-2 rounded-3xl border border-zinc-200 p-10 bg-zinc-50 text-center text-zinc-500">
              Loading market news...
            </div>
          ) : (
            featuredNews.map((article) => {
              return (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  onClick={() => trackEvent("news_featured_opened", "News Hub", article.title, { slug: article.slug })}
                  className="group block rounded-3xl border border-zinc-200 p-5 bg-zinc-50 hover:border-orange-300 transition"
                >
                  <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 uppercase tracking-[0.26em] font-semibold mb-3">
                    <span>{article.category}</span>
                    <span>{article.publishDate}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">{article.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-3 line-clamp-3">{article.summary}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-orange-600 font-bold text-sm">
                    Read story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Search</p>
            <h2 className="text-xl font-semibold text-zinc-900">Find the exact news update</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white border border-zinc-200 px-4 py-2">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="search"
              placeholder="Search headlines, themes, or tags"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                if (value.length > 2) {
                  trackEvent("news_search_typed", "News Hub", value);
                }
              }}
              className="w-full bg-transparent text-sm text-zinc-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Trending stories</p>
                <h3 className="text-lg font-semibold text-zinc-900 mt-2">What traders are watching</h3>
              </div>
              <span className="text-xs text-zinc-500">{trendingStories.length} top stories</span>
            </div>

            <div className="mt-6 space-y-4">
              {trendingStories.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  onClick={() => trackEvent("news_trending_opened", "News Hub", article.title, { slug: article.slug })}
                  className="block rounded-3xl border border-zinc-200 p-5 bg-white hover:border-orange-300 transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">{article.category}</span>
                    <span className="text-xs text-zinc-400">{article.publishDate}</span>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-zinc-900">{article.title}</h4>
                  <p className="mt-2 text-zinc-500 text-sm line-clamp-2">{article.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Latest news</p>
                <h3 className="text-lg font-semibold text-zinc-900 mt-2">Real-time headline feed</h3>
              </div>
              <span className="text-xs text-zinc-400">{filteredNews.length} stories</span>
            </div>

            <div className="mt-6 space-y-4">
              {filteredNews.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  onClick={() => trackEvent("news_latest_opened", "News Hub", article.title, { slug: article.slug })}
                  className="group block rounded-3xl border border-zinc-200 p-5 bg-zinc-50 hover:bg-white hover:border-orange-200 transition"
                >
                  <div className="flex items-center justify-between gap-4 text-zinc-500 text-xs uppercase tracking-[0.26em] font-semibold">
                    <span>{article.category}</span>
                    <span>{article.publishDate}</span>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">{article.title}</h4>
                  <p className="mt-2 text-zinc-500 text-sm line-clamp-2">{article.summary}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-[0.26em]">
                    Read more <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
              {filteredNews.length === 0 && !isLoading && (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
                  No news matched your filters. Try another keyword or category.
                </div>
              )}
              {isLoading && (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
                  Loading stories...
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-zinc-900 text-white rounded-3xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-orange-300">Market pulse</p>
            <h3 className="mt-4 text-xl font-semibold">Fast take: staying ahead</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-200">
              This hub blends curated news, event-driven context, and category filters so you can stay ahead of the next trade catalyst.
            </p>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">Tags</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEWS_CATEGORIES.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-2 text-[11px] font-semibold text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Support</p>
            <h4 className="mt-3 text-base font-semibold text-zinc-900">Need a trading news briefing?</h4>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
              Use the search tool and category filters to quickly locate news that aligns with your strategy and risk horizon.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-orange-600 font-semibold">
              <Clock className="w-4 h-4" /> Updated daily
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
