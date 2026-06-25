"use client";

import { useMemo, useState } from "react";
import {
  FOREX_ARTICLES,
  FOREX_LESSONS,
  FOREX_STRATEGIES,
  FOREX_GLOSSARY,
  ForexCategory,
} from "../lib/services/forexHub";

export default function ForexHubClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"articles" | "lessons" | "strategies" | "glossary">("articles");
  const [selectedCategory, setSelectedCategory] = useState<ForexCategory | "all">("all");

  const categories: ForexCategory[] = [
    "Forex Fundamentals",
    "Forex Trading",
    "Forex Strategies",
    "Forex Technical Analysis",
    "Forex Risk Management",
    "Forex Market Structure",
  ];

  const filteredArticles = useMemo(() => {
    return FOREX_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredLessons = useMemo(() => {
    return FOREX_LESSONS.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredStrategies = useMemo(() => {
    return FOREX_STRATEGIES.filter((strategy) => {
      const matchesSearch =
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || strategy.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredGlossary = useMemo(() => {
    return FOREX_GLOSSARY.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div id="search" className="mb-12">
          <div className="mb-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search forex articles, lessons, strategies, glossary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-orange-500/30 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-black"
                  : "border border-orange-500/30 text-orange-300 hover:border-orange-400"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-black"
                    : "border border-orange-500/30 text-orange-300 hover:border-orange-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex border-b border-orange-500/30">
          {[
            { key: "articles", label: `Articles (${filteredArticles.length})` },
            { key: "lessons", label: `Lessons (${filteredLessons.length})` },
            { key: "strategies", label: `Strategies (${filteredStrategies.length})` },
            { key: "glossary", label: `Glossary (${filteredGlossary.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-3 font-medium transition ${
                activeTab === tab.key
                  ? "border-b-2 border-orange-400 text-orange-300"
                  : "text-slate-400 hover:text-orange-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "articles" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/forex/articles/${article.slug}`}
                className="group rounded-lg border border-orange-500/20 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-orange-400">{article.category}</div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-orange-300">{article.title}</h3>
                <p className="mb-4 text-sm text-slate-400 line-clamp-2">{article.summary}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-orange-500/10 text-orange-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === "lessons" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/forex/academy/${lesson.id}`}
                className="group rounded-lg border border-orange-500/20 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-400">{lesson.category}</span>
                  <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-orange-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{lesson.summary}</p>
                <div className="text-xs text-slate-500">{lesson.readTime}</div>
              </a>
            ))}
          </div>
        )}

        {activeTab === "strategies" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/forex/strategies/${strategy.id}`}
                className="group rounded-lg border border-orange-500/20 bg-slate-900/50 p-6 transition hover:border-orange-400 hover:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-400">{strategy.category}</span>
                  <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-orange-300">{strategy.name}</h3>
                <p className="mb-4 text-sm text-slate-400 line-clamp-2">{strategy.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {strategy.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-orange-500/10 text-orange-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === "glossary" && (
          <div className="space-y-4">
            {filteredGlossary.map((term) => (
              <div key={term.id} className="rounded-lg border border-orange-500/20 bg-slate-900/50 p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-orange-300">{term.term}</h3>
                  <span className="text-xs font-semibold text-orange-400">{term.category}</span>
                </div>
                <p className="text-sm text-slate-300">{term.definition}</p>
              </div>
            ))}
          </div>
        )}

        {searchTerm && filteredArticles.length === 0 && filteredLessons.length === 0 && filteredStrategies.length === 0 && filteredGlossary.length === 0 && (
          <div className="rounded-lg border border-orange-500/20 bg-slate-900/50 p-12 text-center">
            <p className="mb-2 text-lg font-semibold text-white">No results found</p>
            <p className="text-slate-400">Try adjusting your search terms or browsing all content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
