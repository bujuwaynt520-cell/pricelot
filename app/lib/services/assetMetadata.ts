import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { getBreadcrumbs, getJsonLdBreadcrumbs } from "@/app/lib/contentEngine";
import type { MarketQuote, PageImage } from "@/app/types";

export interface MarketAssetFaqItem {
  question: string;
  answer: string;
}

export function buildMarketAssetMetadata(
  quote: MarketQuote,
  canonicalUrl: string
): Metadata {
  const hubImage = generateMarketAssetOpenGraphImage(quote.assetType);

  return buildPageMetadata({
    title: `${quote.displayName} (${quote.symbol}) | ${quote.assetType} Market Profile`,
    description: `Live quote, key stats, and market resources for ${quote.displayName}.`,
    canonical: canonicalUrl,
    keywords: [quote.symbol, quote.displayName, quote.assetType, "market profile", "trading ideas", "live quote"],
    type: "article",
    openGraphImage: hubImage,
    twitterImage: hubImage,
  });
}

export function generateMarketAssetOpenGraphImage(assetType: string): PageImage {
  const hub = assetType.toLowerCase() as "forex" | "gold" | "crypto" | "indices" | "commodities";
  return generateHubImage(hub, "article");
}

export function getMarketAssetBreadcrumbs(pathname: string) {
  return getBreadcrumbs(pathname);
}

export function getMarketAssetBreadcrumbsJsonLd(pathname: string) {
  return getJsonLdBreadcrumbs(pathname);
}

export function getMarketAssetFaqItems(quote: MarketQuote): MarketAssetFaqItem[] {
  const assetName = quote.displayName;
  return [
    {
      question: `What is ${assetName}?`,
      answer: `${assetName} is a key ${quote.assetType.toLowerCase()} instrument tracked by traders for its liquidity, price action, and macro sensitivity.`,
    },
    {
      question: `What drives ${assetName} price movements?`,
      answer: `Price moves are driven by supply and demand shifts, macro data, policy decisions, and market sentiment for ${quote.assetType.toLowerCase()} instruments.`,
    },
    {
      question: `How should traders use this ${quote.assetType.toLowerCase()} profile?`,
      answer: `Use the live quote, support and resistance levels, and curated resources to frame trade ideas and manage risk while monitoring broader market context.`,
    },
  ];
}

export function buildMarketAssetFaqJsonLd(items: MarketAssetFaqItem[], pageUrl: string): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: pageUrl,
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    null,
    2
  );
}
