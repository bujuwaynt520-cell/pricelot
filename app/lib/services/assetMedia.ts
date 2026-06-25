/**
 * Asset Media Management
 * Handles images, charts, and visual resources for trading assets
 */

import type { MarketQuote } from "@/app/types";

export interface AssetMediaLibrary {
  symbol: string;
  assetType: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption?: string;
  chartImages: {
    dailyChart: string;
    weeklyChart: string;
    monthlyChart: string;
  };
  galleryImages: Array<{
    url: string;
    alt: string;
    caption: string;
    creditLine?: string;
  }>;
  relatedImages: Array<{
    url: string;
    alt: string;
    title: string;
  }>;
}

const ASSET_MEDIA_CACHE: Record<string, AssetMediaLibrary> = {
  "EUR/USD": {
    symbol: "EUR/USD",
    assetType: "Forex",
    heroImage: "https://via.placeholder.com/1200x400?text=EURUSD+Forex+Market",
    heroImageAlt: "EUR/USD currency pair trading chart and market data",
    heroImageCaption: "EUR/USD is the most traded currency pair globally",
    chartImages: {
      dailyChart: "https://via.placeholder.com/800x400?text=EURUSD+Daily",
      weeklyChart: "https://via.placeholder.com/800x400?text=EURUSD+Weekly",
      monthlyChart: "https://via.placeholder.com/800x400?text=EURUSD+Monthly",
    },
    galleryImages: [
      {
        url: "https://via.placeholder.com/600x400?text=Market+Structure",
        alt: "Market structure and trading zones",
        caption: "Support and resistance zones for EUR/USD",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Volume+Profile",
        alt: "Volume profile analysis",
        caption: "Historical volume distribution",
      },
    ],
    relatedImages: [
      {
        url: "https://via.placeholder.com/300x200?text=Technical+Analysis",
        alt: "Technical analysis concepts",
        title: "Understanding Technical Analysis",
      },
      {
        url: "https://via.placeholder.com/300x200?text=Risk+Management",
        alt: "Risk management strategies",
        title: "Risk Management in Forex",
      },
    ],
  },
  "XAU/USD": {
    symbol: "XAU/USD",
    assetType: "Gold",
    heroImage: "https://via.placeholder.com/1200x400?text=Gold+Price+Chart",
    heroImageAlt: "Gold (XAU/USD) price chart and market analysis",
    heroImageCaption: "Gold remains a key safe-haven asset",
    chartImages: {
      dailyChart: "https://via.placeholder.com/800x400?text=Gold+Daily",
      weeklyChart: "https://via.placeholder.com/800x400?text=Gold+Weekly",
      monthlyChart: "https://via.placeholder.com/800x400?text=Gold+Monthly",
    },
    galleryImages: [
      {
        url: "https://via.placeholder.com/600x400?text=Bullion+Markets",
        alt: "Physical gold bullion markets",
        caption: "Global bullion market structure",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Safe+Haven+Asset",
        alt: "Safe-haven asset dynamics",
        caption: "Gold as a portfolio hedge",
      },
    ],
    relatedImages: [
      {
        url: "https://via.placeholder.com/300x200?text=Commodities+Trading",
        alt: "Commodities trading basics",
        title: "Commodities Trading 101",
      },
    ],
  },
  "BTC/USD": {
    symbol: "BTC/USD",
    assetType: "Crypto",
    heroImage: "https://via.placeholder.com/1200x400?text=Bitcoin+Price+Chart",
    heroImageAlt: "Bitcoin (BTC/USD) price chart and market trends",
    heroImageCaption: "Bitcoin leads the cryptocurrency market",
    chartImages: {
      dailyChart: "https://via.placeholder.com/800x400?text=Bitcoin+Daily",
      weeklyChart: "https://via.placeholder.com/800x400?text=Bitcoin+Weekly",
      monthlyChart: "https://via.placeholder.com/800x400?text=Bitcoin+Monthly",
    },
    galleryImages: [
      {
        url: "https://via.placeholder.com/600x400?text=Blockchain+Tech",
        alt: "Blockchain technology diagram",
        caption: "Bitcoin blockchain fundamentals",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Crypto+Market",
        alt: "Cryptocurrency market overview",
        caption: "Crypto market structure and flows",
      },
    ],
    relatedImages: [
      {
        url: "https://via.placeholder.com/300x200?text=Crypto+101",
        alt: "Cryptocurrency basics",
        title: "Bitcoin for Beginners",
      },
    ],
  },
};

export function getAssetMediaLibrary(
  symbol: string
): AssetMediaLibrary | undefined {
  return ASSET_MEDIA_CACHE[symbol];
}

export function getAssetHeroImage(
  symbol: string
): { url: string; alt: string; caption?: string } | null {
  const media = ASSET_MEDIA_CACHE[symbol];
  if (!media) {
    // Generate fallback image
    return {
      url: `https://via.placeholder.com/1200x400?text=${encodeURIComponent(symbol)}+Trading`,
      alt: `${symbol} trading chart and market data`,
    };
  }
  return {
    url: media.heroImage,
    alt: media.heroImageAlt,
    caption: media.heroImageCaption,
  };
}

export function getAssetChartImages(symbol: string) {
  const media = ASSET_MEDIA_CACHE[symbol];
  if (!media) {
    return {
      dailyChart: `https://via.placeholder.com/800x400?text=${symbol}+Daily`,
      weeklyChart: `https://via.placeholder.com/800x400?text=${symbol}+Weekly`,
      monthlyChart: `https://via.placeholder.com/800x400?text=${symbol}+Monthly`,
    };
  }
  return media.chartImages;
}

export function buildAssetImageStructuredData(
  symbol: string,
  assetType: string,
  pageUrl: string
): string {
  const image = getAssetHeroImage(symbol);
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      url: image?.url,
      name: `${symbol} ${assetType} Chart`,
      description: image?.alt,
      uploadDate: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildAssetGalleryStructuredData(
  symbol: string,
  galleryImages: AssetMediaLibrary["galleryImages"],
  pageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: `${symbol} Gallery`,
      url: pageUrl,
      associatedMedia: galleryImages.map((img) => ({
        "@type": "ImageObject",
        url: img.url,
        name: img.alt,
        description: img.caption,
      })),
    },
    null,
    2
  );
}
