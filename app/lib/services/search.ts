import { AUTHORS, CATEGORIES, ENGINE_ARTICLES, SAMPLE_LESSONS_EXTENDED, SAMPLE_STRATEGIES_EXTENDED, SAMPLE_GLOSSARY_EXTENDED } from "../contentEngine";
import { getNewsArticles } from "./newsFeed";
import { getBrokerHub } from "./brokerHub";
import { getCommoditiesHub } from "./commoditiesHub";
import { getCryptoHub } from "./cryptoHub";
import { getForexHub } from "./forexHub";
import { getGoldHub } from "./goldHub";
import { getIndicesHub } from "./indicesHub";

type HubContent = {
  articles: Array<{ slug: string; title: string; category: string; summary: string; tags: string[]; publishDate?: string }>;
  lessons: Array<{ id: string; title: string; category: string; summary: string; tags: string[]; updatedDate?: string }>;
  strategies: Array<{ id: string; name: string; category: string; description: string; tags: string[] }>;
  glossary: Array<{ id: string; term: string; definition: string; category: string; tags?: string[] }>;
};

type HubConfig = {
  name: string;
  label: string;
  loader: () => Promise<HubContent & { stats?: unknown }> | (HubContent & { stats?: unknown });
  prefix: string;
};

const HUB_CONFIGS: HubConfig[] = [
  { name: "gold", label: "Gold Hub", loader: getGoldHub, prefix: "/gold" },
  { name: "crypto", label: "Crypto Hub", loader: getCryptoHub, prefix: "/crypto" },
  { name: "indices", label: "Indices Hub", loader: getIndicesHub, prefix: "/indices" },
  { name: "commodities", label: "Commodities Hub", loader: getCommoditiesHub, prefix: "/commodities" },
  { name: "forex", label: "Forex Hub", loader: getForexHub, prefix: "/forex" },
];

let cachedSearchIndex: SearchResult[] | null = null;

export type SearchContentType =
  | "all"
  | "article"
  | "lesson"
  | "strategy"
  | "glossary"
  | "broker"
  | "news"
  | "tool";

export interface SearchResult {
  id: string;
  type: Exclude<SearchContentType, "all">;
  source: string;
  title: string;
  summary: string;
  category: string;
  url: string;
  publishedDate?: string;
  tags: string[];
  score?: number;
}

export const SEARCH_TYPES: { value: SearchContentType; label: string }[] = [
  { value: "all", label: "All content" },
  { value: "article", label: "Articles" },
  { value: "lesson", label: "Academy" },
  { value: "strategy", label: "Strategies" },
  { value: "glossary", label: "Glossary" },
  { value: "broker", label: "Brokers" },
  { value: "news", label: "News" },
];

export const SEARCH_SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "source", label: "Source" },
];

function normalizeText(value: unknown): string {
  if (typeof value === "string") {
    return value.toLowerCase().trim();
  }
  if (Array.isArray(value)) {
    return value.map(normalizeText).join(" ");
  }
  if (typeof value === "object" && value !== null) {
    return Object.values(value).map(normalizeText).join(" ");
  }
  return "";
}

function buildSearchText(result: SearchResult): string {
  return [
    result.title,
    result.summary,
    result.category,
    result.source,
    result.tags.join(" "),
  ]
    .map(normalizeText)
    .join(" ");
}

function scoreResult(result: SearchResult, query: string): number {
  const q = normalizeText(query);
  if (!q) return 0;

  let score = 0;
  const words = q.split(/\s+/).filter(Boolean);
  const title = result.title.toLowerCase();
  const summary = result.summary.toLowerCase();
  const category = result.category.toLowerCase();
  const source = result.source.toLowerCase();
  const tags = result.tags.map((tag) => tag.toLowerCase());
  const haystack = buildSearchText(result);

  if (title.startsWith(q)) score += 10;
  if (summary.includes(q)) score += 6;
  if (category === q || source === q) score += 5;
  if (tags.includes(q)) score += 8;

  words.forEach((word) => {
    if (title.includes(word)) score += 9;
    if (summary.includes(word)) score += 4;
    if (category.includes(word)) score += 3;
    if (source.includes(word)) score += 2;
    if (tags.some((tag) => tag.includes(word))) score += 5;
    if (haystack.includes(word)) score += 1;
  });

  const phraseMatch = words.every((word) => haystack.includes(word));
  if (phraseMatch) score += 7;

  return score;
}

function buildContentItem(
  raw: Record<string, any>,
  type: Exclude<SearchContentType, "all">,
  source: string,
  url: string,
  title: string,
  summary: string,
  category: string,
  tags: string[] = [],
  publishedDate?: string
): SearchResult {
  return {
    id: `${source}:${type}:${raw.id ?? raw.slug ?? title}`,
    type,
    source,
    title,
    summary,
    category,
    url,
    publishedDate,
    tags,
  };
}

function createHubItems<ItemType>(
  items: ItemType[],
  type: Exclude<SearchContentType, "all">,
  source: string,
  urlBuilder: (item: ItemType) => string,
  titleBuilder: (item: ItemType) => string,
  summaryBuilder: (item: ItemType) => string,
  categoryBuilder: (item: ItemType) => string,
  tagsBuilder: (item: ItemType) => string[],
  publishedDateBuilder?: (item: ItemType) => string | undefined
): SearchResult[] {
  return items.map((item) =>
    buildContentItem(
      item,
      type,
      source,
      urlBuilder(item),
      titleBuilder(item),
      summaryBuilder(item),
      categoryBuilder(item),
      tagsBuilder(item),
      publishedDateBuilder?.(item)
    )
  );
}

export async function buildGlobalSearchIndex(): Promise<SearchResult[]> {
  if (cachedSearchIndex) return cachedSearchIndex;

  const index: SearchResult[] = [];
  const newsArticles = await getNewsArticles();
  const brokerHub = getBrokerHub();

  index.push(
    buildContentItem(
      { id: "search" },
      "tool",
      "PriceLot Hub",
      "/search",
      "Search PriceLot",
      "Search all broker audits, news, guides, strategies, glossary terms, and academy lessons across PriceLot.",
      "Search",
      ["search", "lookup", "browse", "content hub"]
    )
  );

  index.push(
    buildContentItem(
      { id: "tools" },
      "tool",
      "PriceLot Hub",
      "/tools",
      "Trading Tools Hub",
      "Use our calculators, lot sizing rules, and risk-reward models to trade with discipline.",
      "Tools",
      ["tools", "calculator", "position sizing", "risk management"]
    )
  );

  index.push(
    ...ENGINE_ARTICLES.map((article) =>
      buildContentItem(
        article,
        "article",
        "Core Articles",
        `/articles/${article.slug}`,
        article.title,
        article.summary,
        article.category,
        article.tags,
        article.publishedDate
      )
    )
  );

  index.push(
    ...brokerHub.brokers.map((broker) =>
      buildContentItem(
        broker,
        "broker",
        "Broker Reviews",
        `/brokers/${broker.id}`,
        `${broker.name} Broker Audit`,
        broker.summary,
        "Broker Reviews",
        [...broker.platforms, ...broker.regulatedBy].map((value) => value.toString()),
        undefined
      )
    )
  );

  index.push(
    ...newsArticles.map((article) =>
      buildContentItem(
        article,
        "news",
        "News Hub",
        `/news/${article.slug}`,
        article.title,
        article.summary,
        article.category,
        article.tags,
        article.publishDate
      )
    )
  );

  index.push(
    ...SAMPLE_LESSONS_EXTENDED.map((lesson) =>
      buildContentItem(
        lesson,
        "lesson",
        "Academy",
        `/academy/${lesson.id}`,
        lesson.title,
        lesson.summary,
        lesson.category,
        lesson.tags,
        lesson.updatedDate
      )
    )
  );

  index.push(
    ...SAMPLE_STRATEGIES_EXTENDED.map((strategy) =>
      buildContentItem(
        strategy,
        "strategy",
        "Strategy Library",
        `/strategies/${strategy.id}`,
        strategy.name,
        strategy.description,
        strategy.category,
        strategy.tags,
        strategy.updatedDate
      )
    )
  );

  index.push(
    ...SAMPLE_GLOSSARY_EXTENDED.map((term) =>
      buildContentItem(
        term,
        "glossary",
        "Glossary",
        `/glossary/${term.id}`,
        term.term,
        term.definition,
        term.category,
        term.tags ?? [],
        undefined
      )
    )
  );

  for (const hub of HUB_CONFIGS) {
    const data = await hub.loader();

    index.push(
      ...createHubItems(
        data.articles,
        "article",
        hub.label,
        (item) => `${hub.prefix}/articles/${item.slug}`,
        (item) => item.title,
        (item) => item.summary,
        (item) => item.category,
        (item) => item.tags,
        (item) => item.publishDate
      )
    );

    index.push(
      ...createHubItems(
        data.lessons,
        "lesson",
        hub.label,
        (item) => `${hub.prefix}/academy/${item.id}`,
        (item) => item.title,
        (item) => item.summary,
        (item) => item.category,
        (item) => item.tags,
        (item) => item.updatedDate
      )
    );

    index.push(
      ...createHubItems(
        data.strategies,
        "strategy",
        hub.label,
        (item) => `${hub.prefix}/strategies/${item.id}`,
        (item) => item.name,
        (item) => item.description,
        (item) => item.category,
        (item) => item.tags,
        undefined
      )
    );

    index.push(
      ...createHubItems(
        data.glossary,
        "glossary",
        hub.label,
        (item) => `${hub.prefix}/glossary/${item.id}`,
        (item) => item.term,
        (item) => item.definition,
        (item) => item.category,
        (item) => item.tags ?? [],
        undefined
      )
    );
  }

  cachedSearchIndex = index;
  return index;
}

export async function searchContent(
  query: string,
  filters: { type?: SearchContentType } = {},
  sortBy: string = "relevance"
): Promise<SearchResult[]> {
  const normalizedQuery = normalizeText(query);
  const index = await buildGlobalSearchIndex();

  const candidates = index
    .map((item) => {
      const result = { ...item };
      result.score = scoreResult(item, normalizedQuery);
      return result;
    })
    .filter((item) => {
      if (!normalizedQuery) return true;
      return item.score! > 0;
    })
    .filter((item) => {
      if (!filters.type || filters.type === "all") return true;
      return item.type === filters.type;
    });

  const sorted = candidates.sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
      return dateB - dateA || (b.score || 0) - (a.score || 0);
    }
    if (sortBy === "source") {
      if (a.source !== b.source) return a.source.localeCompare(b.source);
      return (b.score || 0) - (a.score || 0);
    }
    return (b.score || 0) - (a.score || 0);
  });

  return sorted;
}

export async function getSearchSuggestions(query: string, limit: number = 8): Promise<string[]> {
  const normalizedQuery = normalizeText(query);
  const index = await buildGlobalSearchIndex();
  const related = new Map<string, number>();

  index.forEach((item) => {
    item.tags.forEach((tag) => {
      const normalized = normalizeText(tag);
      if (!normalized || normalized === normalizedQuery) return;
      if (query && !normalized.includes(normalizedQuery)) return;
      related.set(tag, (related.get(tag) || 0) + 1);
    });

    const titleParts = item.title.split(/\s+/).slice(0, 4);
    titleParts.forEach((part) => {
      const normalized = normalizeText(part);
      if (!normalized || normalized === normalizedQuery) return;
      if (query && !normalized.includes(normalizedQuery)) return;
      const current = related.get(part) || 0;
      related.set(part, current + 1);
    });
  });

  if (related.size === 0) {
    return ["forex", "gold", "crypto", "risk management", "broker", "strategy", "glossary", "economic calendar"].slice(0, limit);
  }

  return Array.from(related.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([term]) => term)
    .filter((term) => term.length > 2)
    .slice(0, limit);
}

export async function getSearchPreviewContent(): Promise<SearchResult[]> {
  return (await buildGlobalSearchIndex()).slice(0, 12);
}
