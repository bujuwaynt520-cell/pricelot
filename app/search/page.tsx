import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "../lib/seo";
import {
  SearchContentType,
  SEARCH_TYPES,
  SEARCH_SORT_OPTIONS,
  searchContent,
  getSearchSuggestions,
} from "../lib/services/search";
import {
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Shield,
  BookOpen,
  Layers,
  HelpCircle,
  Newspaper,
  Clock,
  TrendingUp,
} from "lucide-react";

interface SearchPageProps {
  searchParams: {
    q?: string | string[];
    type?: string | string[];
    sort?: string | string[];
  };
}

function resolveParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = resolveParam(searchParams.q);
  const title = query
    ? `Search results for "${query}" | PriceLot Search`
    : "Search PriceLot | Broker intelligence, strategies, academy, news";

  return buildPageMetadata({
    title,
    description: query
      ? `Search PriceLot for brokers, strategies, academy lessons, glossary terms, news, and on-site research matching "${query}".`
      : "Search the PriceLot hub across brokers, guides, strategies, glossary, academy lessons, news, and market resources.",
    canonical: `https://pricelot.com/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    keywords: ["search", "price lot", "broker reviews", "trading strategies", "academy", "glossary", "news"],
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = resolveParam(searchParams.q).trim();
  const selectedType = (resolveParam(searchParams.type) as SearchContentType) || "all";
  const sortBy = resolveParam(searchParams.sort) || "relevance";
  const results = await searchContent(query, { type: selectedType }, sortBy);
  const total = results.length;
  const suggestions = await getSearchSuggestions(query, 8);

  const groupedResults = results.reduce<Record<string, typeof results>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Articles";
      case "lesson":
        return "Academy Lessons";
      case "strategy":
        return "Strategies";
      case "glossary":
        return "Glossary";
      case "broker":
        return "Brokers";
      case "news":
        return "News";
      case "tool":
        return "Tools";
      default:
        return type;
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "broker":
        return <Shield className="w-4 h-4 text-orange-500" />;
      case "strategy":
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case "lesson":
        return <BookOpen className="w-4 h-4 text-orange-500" />;
      case "glossary":
        return <HelpCircle className="w-4 h-4 text-orange-500" />;
      case "news":
        return <Newspaper className="w-4 h-4 text-orange-500" />;
      case "article":
        return <Layers className="w-4 h-4 text-orange-500" />;
      case "tool":
        return <Sparkles className="w-4 h-4 text-orange-500" />;
      default:
        return <Search className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600">
              <Search className="w-4 h-4" /> Search Hub
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
                {query ? `Search results for “${query}”` : "Search the PriceLot content hub"}
              </h1>
              <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
                Discover broker audits, trading strategies, academy lessons, glossary terms, market news, and tool pages from one unified search experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 w-full md:w-auto md:grid-cols-2">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-700 hover:border-orange-200 hover:bg-orange-50/80 transition"
            >
              <Filter className="w-4 h-4" /> Reset filters
            </Link>
            <Link
              href="/search?q=forex"
              className="flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-500 transition"
            >
              <Sparkles className="w-4 h-4" /> Try popular search
            </Link>
          </div>
        </div>

        <form className="mt-6 grid gap-3 md:grid-cols-[1.6fr_0.9fr_0.9fr]">
          <label className="block">
            <span className="sr-only">Search query</span>
            <input
              name="q"
              defaultValue={query}
              type="search"
              placeholder="Type keywords, broker names, strategy names, or glossary terms"
              className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </label>

          <label className="block">
            <span className="sr-only">Content type</span>
            <select
              name="type"
              defaultValue={selectedType}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              {SEARCH_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Sort order</span>
            <select
              name="sort"
              defaultValue={sortBy}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              {SEARCH_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-orange-600">Search results</p>
              <h2 className="text-2xl font-bold text-zinc-900">{total} result{total === 1 ? "" : "s"} found</h2>
            </div>
            <div className="rounded-3xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700">
              {selectedType === "all" ? "All content" : getTypeLabel(selectedType)}
            </div>
          </div>

          {query === "" ? (
            <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
              <div className="flex items-center gap-3 text-sm font-semibold text-orange-600">
                <Sparkles className="w-4 h-4" /> Search tips
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                <li>Enter a market instrument, broker name, or glossary term like <strong>"leverage"</strong>.</li>
                <li>Filter results by content type if you want only <strong>Academy</strong>, <strong>Articles</strong>, or <strong>News</strong>.</li>
                <li>Sort by newest to find the latest research and updates.</li>
              </ul>
            </div>
          ) : total === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-700 shadow-sm">
              <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-[0.3em] text-xs">
                <HelpCircle className="w-4 h-4" /> No matches
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                We couldn't find results for <span className="font-semibold text-zinc-900">{query}</span>. Try broader terms, or explore the suggestions below.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/search?q=${encodeURIComponent(suggestion)}&type=all`}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 hover:border-orange-200 hover:bg-orange-50/80 transition"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            Object.entries(groupedResults).map(([type, items]) => (
              <div key={type} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900">
                    {typeIcon(type)} {getTypeLabel(type)}
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    {items.length} item{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="group block rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-orange-200 hover:bg-orange-50/70"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-orange-600">
                            <span>{item.source}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                            {item.publishedDate ? <><span>•</span><span>{item.publishedDate}</span></> : null}
                          </div>
                          <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-zinc-600 line-clamp-2">
                            {item.summary}
                          </p>
                        </div>
                        <div className="flex items-center text-orange-600">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
              <Sparkles className="w-4 h-4" /> Search suggestions
            </div>
            <div className="mt-4 grid gap-2">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}&type=all`}
                  className="block rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 hover:border-orange-200 hover:bg-orange-50/80 transition"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-600">
              <Clock className="w-4 h-4 text-orange-600" /> Order & refine
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600 leading-relaxed">
              <p>Use the filter dropdown to narrow by content type.</p>
              <p>Sort by newest to surface recent updates in guides and news.</p>
              <p>Keep queries short and precise for faster results.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
