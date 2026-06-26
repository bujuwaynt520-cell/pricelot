import {
  ENGINE_ARTICLES,
  SAMPLE_GLOSSARY_EXTENDED,
  SAMPLE_LESSONS_EXTENDED,
  SAMPLE_STRATEGIES_EXTENDED,
} from "../contentEngine";
import { MarketAssetType } from "../../types";
import { getNewsArticles } from "./newsFeed";
import { getCommoditiesHub } from "./commoditiesHub";
import { getCryptoHub } from "./cryptoHub";
import { getForexHub } from "./forexHub";
import { getGoldHub } from "./goldHub";
import { getIndicesHub } from "./indicesHub";

export type InternalLinkType =
  | "article"
  | "lesson"
  | "strategy"
  | "glossary"
  | "news";

export interface InternalLinkItem {
  id: string;
  type: InternalLinkType;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  url: string;
  hub: string;
  score?: number;
}

type InternalLinkSource = {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
};

type InternalHubLoader = {
  articles: Array<{ slug: string; title: string; category: string; summary: string; tags: string[] }>;
  lessons: Array<{ id: string; title: string; category: string; summary: string; tags: string[] }>;
  strategies: Array<{ id: string; name: string; category: string; description: string; tags: string[] }>;
  glossary: Array<{ id: string; term: string; definition: string; category: string; tags?: string[] }>;
};

type InternalLinkBuilder<Item = any> = {
  type: InternalLinkType;
  hub: string;
  urlPrefix: string;
  itemMapper: (item: Item) => InternalLinkSource;
  urlBuilder: (item: Item) => string;
};

type HubConfig = {
  hub: string;
  loader: () => Promise<InternalHubLoader> | InternalHubLoader;
  base: string;
};

function buildInternalLinkItem(
  item: InternalLinkSource,
  type: InternalLinkType,
  hub: string,
  url: string
): InternalLinkItem {
  return {
    id: item.id,
    type,
    title: item.title,
    category: item.category,
    summary: item.summary,
    tags: item.tags,
    url,
    hub,
  };
}

function createInternalLinkItems<Item>(
  items: Item[],
  builder: InternalLinkBuilder<Item>
): InternalLinkItem[] {
  return items.map((item) => {
    const source = builder.itemMapper(item);
    return buildInternalLinkItem(source, builder.type, builder.hub, builder.urlBuilder(item));
  });
}

const HUB_CONFIGS = [
  { hub: "Forex", loader: getForexHub, base: "/forex" },
  { hub: "Gold", loader: getGoldHub, base: "/gold" },
  { hub: "Crypto", loader: getCryptoHub, base: "/crypto" },
  { hub: "Indices", loader: getIndicesHub, base: "/indices" },
  { hub: "Commodities", loader: getCommoditiesHub, base: "/commodities" },
] as const;

const HUB_ITEM_BUILDERS = {
  article: (hub: string, base: string): InternalLinkBuilder<{ slug: string; title: string; category: string; summary: string; tags: string[] }> => ({
    type: "article",
    hub,
    urlPrefix: `${base}/articles`,
    itemMapper: (item) => ({
      id: item.slug,
      title: item.title,
      category: item.category,
      summary: item.summary,
      tags: item.tags,
    }),
    urlBuilder: (item) => `${base}/articles/${item.slug}`,
  }),
  lesson: (hub: string, base: string): InternalLinkBuilder<{ id: string; title: string; category: string; summary: string; tags: string[] }> => ({
    type: "lesson",
    hub,
    urlPrefix: `${base}/academy`,
    itemMapper: (item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      summary: item.summary,
      tags: item.tags,
    }),
    urlBuilder: (item) => `${base}/academy/${item.id}`,
  }),
  strategy: (hub: string, base: string): InternalLinkBuilder<{ id: string; name: string; category: string; description: string; tags: string[] }> => ({
    type: "strategy",
    hub,
    urlPrefix: `${base}/strategies`,
    itemMapper: (item) => ({
      id: item.id,
      title: item.name,
      category: item.category,
      summary: item.description,
      tags: item.tags,
    }),
    urlBuilder: (item) => `${base}/strategies/${item.id}`,
  }),
  glossary: (hub: string, base: string): InternalLinkBuilder<{ id: string; term: string; definition: string; category: string; tags?: string[] }> => ({
    type: "glossary",
    hub,
    urlPrefix: `${base}/glossary`,
    itemMapper: (item) => ({
      id: item.id,
      title: item.term,
      category: item.category,
      summary: item.definition,
      tags: item.tags ?? [item.term.toLowerCase()],
    }),
    urlBuilder: (item) => `${base}/glossary/${item.id}`,
  }),
};

async function getHubItems() {
  const hubItems = await Promise.all(
    HUB_CONFIGS.map(async ({ hub, loader, base }) => {
      const data = await loader();
      return [
        ...createInternalLinkItems(data.articles, HUB_ITEM_BUILDERS.article(hub, base) as InternalLinkBuilder<any>),
        ...createInternalLinkItems(data.lessons, HUB_ITEM_BUILDERS.lesson(hub, base) as InternalLinkBuilder<any>),
        ...createInternalLinkItems(data.strategies, HUB_ITEM_BUILDERS.strategy(hub, base) as InternalLinkBuilder<any>),
        ...createInternalLinkItems(data.glossary, HUB_ITEM_BUILDERS.glossary(hub, base) as InternalLinkBuilder<any>),
      ];
    })
  );
  return hubItems.flat();
}

function getEditorialItems() {
  return [
    ...createInternalLinkItems(
      ENGINE_ARTICLES,
      {
        type: "article",
        hub: "Editorial",
        urlPrefix: "/articles",
        itemMapper: (item: typeof ENGINE_ARTICLES[number]) => ({
          id: item.slug,
          title: item.title,
          category: item.category,
          summary: item.summary,
          tags: item.tags,
        }),
        urlBuilder: (item) => `/articles/${item.slug}`,
      }
    ),
    ...createInternalLinkItems(
      SAMPLE_LESSONS_EXTENDED,
      {
        type: "lesson",
        hub: "Editorial",
        urlPrefix: "/academy",
        itemMapper: (item: typeof SAMPLE_LESSONS_EXTENDED[number]) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          summary: item.summary,
          tags: item.tags,
        }),
        urlBuilder: (item) => `/academy/${item.id}`,
      }
    ),
    ...createInternalLinkItems(
      SAMPLE_STRATEGIES_EXTENDED,
      {
        type: "strategy",
        hub: "Editorial",
        urlPrefix: "/strategies",
        itemMapper: (item: typeof SAMPLE_STRATEGIES_EXTENDED[number]) => ({
          id: item.id,
          title: item.name,
          category: item.category,
          summary: item.description,
          tags: item.tags,
        }),
        urlBuilder: (item) => `/strategies/${item.id}`,
      }
    ),
    ...createInternalLinkItems(
      SAMPLE_GLOSSARY_EXTENDED,
      {
        type: "glossary",
        hub: "Editorial",
        urlPrefix: "/glossary",
        itemMapper: (item: typeof SAMPLE_GLOSSARY_EXTENDED[number]) => ({
          id: item.id,
          title: item.term,
          category: item.category,
          summary: item.definition,
          tags: item.tags ?? [item.term.toLowerCase()],
        }),
        urlBuilder: (item) => `/glossary/${item.id}`,
      }
    ),
  ];
}

let cachedInternalLinkCandidates: InternalLinkItem[] | null = null;

async function getAllInternalLinkCandidates() {
  if (cachedInternalLinkCandidates) return cachedInternalLinkCandidates;
  const newsArticles = await getNewsArticles();
  cachedInternalLinkCandidates = [
    ...getEditorialItems(),
    ...(await getHubItems()),
    ...newsArticles.map((news) => buildInternalLinkItem(
      {
        id: news.slug,
        title: news.title,
        category: news.category,
        summary: news.summary,
        tags: news.tags,
      },
      "news",
      "News",
      `/news/${news.slug}`
    )),
  ];
  return cachedInternalLinkCandidates;
}

async function getCurrentItem(currentId: string, currentType: InternalLinkType) {
  const allItems = await getAllInternalLinkCandidates();
  return allItems.find((item) => item.type === currentType && item.id === currentId);
}

function scoreItem(current: InternalLinkItem, candidate: InternalLinkItem) {
  let score = 0;
  const sharedTags = candidate.tags.filter((tag) => current.tags.includes(tag)).length;

  if (candidate.hub === current.hub) score += 6;
  if (candidate.category === current.category) score += 5;
  if (candidate.type === current.type) score += 2;
  score += sharedTags * 3;

  if (candidate.hub !== current.hub && candidate.category === current.category) score += 1;
  if (sharedTags > 0 && candidate.hub === current.hub) score += 1;

  return score;
}

export async function getRelatedInternalLinks(
  currentId: string,
  currentType: InternalLinkType,
  limit: number = 3
): Promise<InternalLinkItem[]> {
  const current = await getCurrentItem(currentId, currentType);
  if (!current) return [];

  const candidates = await getAllInternalLinkCandidates();
  return candidates
    .filter((item) => item.type !== current.type || item.id !== current.id)
    .map((item) => ({
      ...item,
      score: scoreItem(current, item),
    }))
    .filter((item) => (item.score ?? 0) > 0)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export async function getRelatedContentForMarketAsset(
  assetSlug: string,
  assetType: MarketAssetType,
  limit = 4
): Promise<InternalLinkItem[]> {
  const normalizedAssetSlug = assetSlug.toLowerCase();
  const candidates = await getAllInternalLinkCandidates();

  return candidates
    .map((item) => ({
      ...item,
      score:
        (item.hub.toLowerCase() === assetType.toLowerCase() ? 5 : 0) +
        (item.tags.some((tag) => tag.toLowerCase() === normalizedAssetSlug) ? 8 : 0) +
        (item.tags.some((tag) => tag.toLowerCase() === assetType.toLowerCase()) ? 3 : 0) +
        (item.category.toLowerCase().includes(assetType.toLowerCase()) ? 2 : 0) +
        (item.summary.toLowerCase().includes(normalizedAssetSlug) ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}
