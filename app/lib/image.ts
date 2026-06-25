import type { PageImage } from "../types";

const DEFAULT_IMAGE: PageImage = {
  url: "https://pricelot.com/assets/og-image.jpg",
  alt: "PriceLot preview image for market analysis, trading education, and strategy content.",
};

const HUB_BANNER_IMAGES: Record<string, PageImage> = {
  Forex: {
    url: "https://pricelot.com/forex-banner.jpg",
    alt: "Forex trading hub banner with currency markets overview.",
  },
  Gold: {
    url: "https://pricelot.com/gold-banner.jpg",
    alt: "Gold trading hub banner with XAUUSD market analysis.",
  },
  Crypto: {
    url: "https://pricelot.com/crypto-banner.jpg",
    alt: "Crypto trading hub banner highlighting digital asset strategies.",
  },
  Indices: {
    url: "https://pricelot.com/indices-banner.jpg",
    alt: "Global indices trading hub banner for major stock benchmarks.",
  },
  Commodities: {
    url: "https://pricelot.com/commodities-banner.jpg",
    alt: "Commodities trading hub banner for energy, metals, and softs markets.",
  },
  Editorial: {
    url: "https://pricelot.com/assets/editorial-og.jpg",
    alt: "PriceLot editorial article preview banner image.",
  },
};

function normalizeKey(value: string) {
  return value.trim().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getHubBannerImage(hub: string): PageImage {
  return HUB_BANNER_IMAGES[hub] ?? DEFAULT_IMAGE;
}

export function getCategoryBannerImage(categoryId: string, categoryName: string): PageImage {
  return {
    url: `https://pricelot.com/category-${normalizeKey(categoryId)}.jpg`,
    alt: `${categoryName} category image for PriceLot resource pages.`,
  };
}

export function getTagBannerImage(tag: string): PageImage {
  const normalizedTag = normalizeKey(tag.toLowerCase());
  return {
    url: `https://pricelot.com/tag-${normalizedTag}.jpg`,
    alt: `Tag page image for #${tag} resources on PriceLot.`,
  };
}

export function getAuthorBannerImage(authorId: string, authorName: string): PageImage {
  const normalizedAuthor = normalizeKey(authorId.toLowerCase());
  return {
    url: `https://pricelot.com/authors/${normalizedAuthor}.jpg`,
    alt: `Author profile image for ${authorName} on PriceLot.`,
  };
}

export function getEditorialImage(): PageImage {
  return HUB_BANNER_IMAGES.Editorial;
}

export function getFallbackImage(): PageImage {
  return DEFAULT_IMAGE;
}
