import { getRelatedContentForMarketAsset } from "@/app/lib/services/internalLinks";
import type { InternalLinkItem } from "@/app/lib/services/internalLinks";
import type { MarketAssetType } from "@/app/types";

export type MarketAssetRelatedGroups = {
  article: InternalLinkItem[];
  lesson: InternalLinkItem[];
  strategy: InternalLinkItem[];
  glossary: InternalLinkItem[];
  news: InternalLinkItem[];
};

export async function getMarketAssetRelatedGroups(
  assetSlug: string,
  assetType: MarketAssetType,
  limit = 8
): Promise<MarketAssetRelatedGroups> {
  const items = await getRelatedContentForMarketAsset(assetSlug, assetType, limit);
  return groupRelatedContentByType(items);
}

export function groupRelatedContentByType(items: InternalLinkItem[]): MarketAssetRelatedGroups {
  return {
    article: items.filter((item) => item.type === "article"),
    lesson: items.filter((item) => item.type === "lesson"),
    strategy: items.filter((item) => item.type === "strategy"),
    glossary: items.filter((item) => item.type === "glossary"),
    news: items.filter((item) => item.type === "news"),
  };
}
