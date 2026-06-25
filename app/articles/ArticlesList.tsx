"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Search } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";
import { ContentEngineArticle, calculateReadingTime } from "../lib/contentEngine";

interface ArticlesListProps {
  articles: ContentEngineArticle[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  const { trackEvent } = useAnalytics();
  const [query, setQuery] = useState("");

  const filteredArticles = articles.filter((art) =>
    art.title.toLowerCase().includes(query.toLowerCase()) ||
    art.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left">
      {/* Filter and Search Bar */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
        <Search className="w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter articles by title or keyword..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 2) {
              trackEvent("articles_search_typed", "Articles", e.target.value);
            }
          }}
          className="w-full bg-transparent text-zinc-800 text-xs focus:outline-none font-sans font-medium"
        />
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => {
          const readTime = calculateReadingTime(art.content);
          return (
            <div
              key={art.slug}
              className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-6 flex flex-col justify-between transition shadow-sm group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                  <span className="font-bold text-orange-600 uppercase tracking-wider">{art.category}</span>
                  <span>{art.publishedDate}</span>
                </div>
                <h3 className="text-zinc-900 font-serif font-black italic text-lg leading-snug group-hover:text-orange-600 transition-colors">
                  {art.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readTime}</span>
                </div>
                <Link
                  href={`/articles/${art.slug}`}
                  onClick={() => trackEvent("article_card_clicked", "Articles", art.title, { slug: art.slug })}
                  className="text-xs font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 cursor-pointer font-mono"
                >
                  Read deep-dive <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
        {filteredArticles.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-white border border-dashed border-zinc-200 rounded-xl text-zinc-400 text-sm">
            No articles found matching "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
