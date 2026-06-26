import { getBreadcrumbs, getJsonLdBreadcrumbs } from "@/app/lib/contentEngine";
import {
  getMarketQuoteByAssetAndSlug,
  getMarketQuoteParams,
  getMarketQuotesByType,
  getMarketQuoteSlug,
} from "@/app/lib/services/marketData";
import {
  buildMarketAssetMetadata,
  buildMarketAssetFaqJsonLd,
  getMarketAssetBreadcrumbs,
  getMarketAssetBreadcrumbsJsonLd,
  getMarketAssetFaqItems,
} from "@/app/lib/services/assetMetadata";
import {
  getMarketAssetRelatedGroups,
  type MarketAssetRelatedGroups,
} from "@/app/lib/services/assetRelationships";
import type { InternalLinkItem } from "@/app/lib/services/internalLinks";
import { getAssetHeroImage, getAssetChartImages, getAssetMediaLibrary } from "@/app/lib/services/assetMedia";
import type { MarketQuote, MarketAssetType } from "@/app/types";

type BreadcrumbLink = { label: string; url: string };

export interface MarketAssetProfileData {
  quote: MarketQuote;
  categoryAssets: MarketQuote[];
  profileUrl: string;
  categoryPath: string;
  canonicalUrl: string;
  currentUrl: string;
  metadata: Awaited<ReturnType<typeof buildMarketAssetMetadata>>;
  relatedGroups: MarketAssetRelatedGroups;
  relatedItems: InternalLinkItem[];
  breadcrumbs: BreadcrumbLink[];
  breadcrumbsJsonLd: string;
  faqItems: ReturnType<typeof getMarketAssetFaqItems>;
  faqJsonLd: string;
  assetLabel: string;
  heroImage: { url: string; alt: string; caption?: string };
  chartImages: { dailyChart: string; weeklyChart: string; monthlyChart: string };
  mediaLibrary?: Awaited<ReturnType<typeof getAssetMediaLibrary>>;
}

export async function getMarketAssetProfile(
  params: { category: string; asset: string }
): Promise<MarketAssetProfileData | null> {
  const quote = await getMarketQuoteByAssetAndSlug(params.category, params.asset);
  if (!quote) return null;

  const canonicalAssetSlug = getMarketQuoteSlug(quote.symbol);
  const profileUrl = `/markets/${params.category}/${params.asset}`;
  const assetType = (quote.assetType || params.category) as MarketAssetType;
  const canonicalUrl = `https://pricelot.com/markets/${assetType.toLowerCase()}/${canonicalAssetSlug}`;
  const currentUrl = `https://pricelot.com${profileUrl}`;

  const relatedGroups = await getMarketAssetRelatedGroups(params.asset, assetType, 8);
  const categoryAssets = await getMarketQuotesByType(assetType);
  const breadcrumbs = getMarketAssetBreadcrumbs(profileUrl);
  const breadcrumbsJsonLd = getMarketAssetBreadcrumbsJsonLd(profileUrl);
  const faqItems = getMarketAssetFaqItems(quote);
  const faqJsonLd = buildMarketAssetFaqJsonLd(faqItems, currentUrl);
  
  // Load media assets
  const heroImage = getAssetHeroImage(quote.symbol) || {
    url: `https://via.placeholder.com/1200x400?text=${encodeURIComponent(quote.symbol)}`,
    alt: `${quote.displayName} trading chart`,
  };
  const chartImages = getAssetChartImages(quote.symbol);
  const mediaLibrary = getAssetMediaLibrary(quote.symbol);

  return {
    quote,
    categoryAssets,
    profileUrl,
    categoryPath: `/markets/${params.category}`,
    canonicalUrl,
    currentUrl,
    metadata: buildMarketAssetMetadata(quote, canonicalUrl),
    relatedGroups,
    relatedItems: Object.values(relatedGroups).flat(),
    breadcrumbs,
    breadcrumbsJsonLd,
    faqItems,
    faqJsonLd,
    assetLabel: quote.symbol,
    heroImage,
    chartImages,
    mediaLibrary,
  };
}

export async function getMarketAssetPageParams() {
  return getMarketQuoteParams();
}
