"use client";

import { useState, useMemo } from "react";
import { GOLD_ARTICLES, GOLD_LESSONS, GOLD_STRATEGIES, GOLD_GLOSSARY, GoldCategory } from "../lib/services/goldHub";

export default function GoldHubClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"articles" | "lessons" | "strategies" | "glossary">("articles");
  const [selectedCategory, setSelectedCategory] = useState<GoldCategory | "all">("all");

  const categories: GoldCategory[] = ["Gold Basics", "Gold Trading", "Gold Strategies", "Gold Technical Analysis", "Gold Fundamentals", "Gold Risk Management"];

  // Filter articles
  const filteredArticles = useMemo(() => {
    return GOLD_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return GOLD_LESSONS.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Filter strategies
  const filteredStrategies = useMemo(() => {
    return GOLD_STRATEGIES.filter((strategy) => {
      const matchesSearch =
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || strategy.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Filter glossary
  const filteredGlossary = useMemo(() => {
    return GOLD_GLOSSARY.filter((term) => {
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
        {/* Search Section */}
        <div id="search" className="mb-12">
          <div className="mb-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search articles, lessons, strategies, glossary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-yellow-500/30 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-yellow-500 text-black"
                  : "border border-yellow-500/30 text-yellow-300 hover:border-yellow-400"
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
                    ? "bg-yellow-500 text-black"
                    : "border border-yellow-500/30 text-yellow-300 hover:border-yellow-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex border-b border-yellow-500/30">
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
                  ? "border-b-2 border-yellow-400 text-yellow-300"
                  : "text-zinc-400 hover:text-yellow-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/gold/articles/${article.slug}`}
                className="group rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 text-xs font-semibold text-yellow-400">{article.category}</div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-yellow-300">{article.title}</h3>
                <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{article.summary}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{article.author}</span>
                  <span>{article.publishDate}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredLessons.map((lesson) => (
              <a
                key={lesson.id}
                href={`/gold/academy/${lesson.id}`}
                className="group rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-400">{lesson.category}</span>
                  <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">{lesson.difficulty}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-yellow-300">{lesson.title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{lesson.summary}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {lesson.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-zinc-500">{lesson.readTime}</div>
              </a>
            ))}
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === "strategies" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredStrategies.map((strategy) => (
              <a
                key={strategy.id}
                href={`/gold/strategies/${strategy.id}`}
                className="group rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-6 transition hover:border-yellow-400 hover:bg-zinc-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-400">{strategy.category}</span>
                  <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">{strategy.difficulty}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-yellow-300">{strategy.name}</h3>
                <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{strategy.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {strategy.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Glossary Tab */}
        {activeTab === "glossary" && (
          <div className="space-y-4">
            {filteredGlossary.map((term) => (
              <div key={term.id} className="rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-yellow-300">{term.term}</h3>
                  <span className="text-xs font-semibold text-yellow-400">{term.category}</span>
                </div>
                <p className="text-sm text-zinc-300">{term.definition}</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {searchTerm && filteredArticles.length === 0 && filteredLessons.length === 0 && filteredStrategies.length === 0 && filteredGlossary.length === 0 && (
          <div className="rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-12 text-center">
            <p className="mb-2 text-lg font-semibold text-white">No results found</p>
            <p className="text-zinc-400">Try adjusting your search terms or browsing all content</p>
          </div>
        )}
      </div>
    </div>
  );
}
