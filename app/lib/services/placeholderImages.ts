import type { PageImage } from "../types";

/**
 * Placeholder Image Generation Service
 * Generates consistent placeholder images for all content types
 */

interface PlaceholderOptions {
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
  text?: string;
}

const GRADIENT_PALETTES: Record<string, [string, string]> = {
  // Hub colors
  forex: ["#ea580c", "#fed7aa"],
  gold: ["#fbbf24", "#fef3c7"],
  crypto: ["#06b6d4", "#cffafe"],
  indices: ["#0ea5e9", "#e0f2fe"],
  commodities: ["#10b981", "#d1fae5"],

  // Category colors
  technical: ["#8b5cf6", "#ede9fe"],
  risk: ["#ef4444", "#fee2e2"],
  psychology: ["#ec4899", "#fce7f3"],
  strategies: ["#6366f1", "#e0e7ff"],
  fundamentals: ["#14b8a6", "#ccfbf1"],
};

/**
 * Generate a placeholder image URL using Placeholder.com or similar service
 * Returns a consistent gradient-based placeholder for content
 */
export function generatePlaceholderImage(
  contentType: "article" | "lesson" | "strategy" | "broker",
  category?: string,
  options: PlaceholderOptions = {}
): PageImage {
  const { width = 1200, height = 630 } = options;
  const palette = GRADIENT_PALETTES[category?.toLowerCase() || "forex"];
  const [bgColor, textColor] = palette || ["#4f46e5", "#e0e7ff"];

  // Using placeholder image service URL
  const placeholderUrl = `https://via.placeholder.com/${width}x${height}/${bgColor.replace(
    "#",
    ""
  )}/${textColor.replace("#", "")}?text=${encodeURIComponent(
    contentType.charAt(0).toUpperCase() + contentType.slice(1)
  )}`;

  return {
    url: placeholderUrl,
    alt: `Placeholder image for ${contentType} in ${category || "PriceLot"} category`,
  };
}

/**
 * Generate thumbnail placeholder for related content sections
 */
export function generateThumbnailPlaceholder(
  title: string,
  category?: string
): PageImage {
  return generatePlaceholderImage("article", category, {
    width: 400,
    height: 240,
  });
}

/**
 * Generate author avatar placeholder
 */
export function generateAuthorPlaceholder(authorName: string): string {
  // Generate initials-based avatar placeholder
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const bgColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://via.placeholder.com/200x200/${bgColor}/ffffff?text=${initials}`;
}

/**
 * Generate a consistent hub-specific featured image
 * Ensures brand consistency across all content for a given hub
 */
export function generateHubImage(
  hub: "forex" | "gold" | "crypto" | "indices" | "commodities",
  contentType: "article" | "lesson" | "strategy"
): PageImage {
  const palette = GRADIENT_PALETTES[hub];
  const [bgColor, textColor] = palette;

  const url = `https://via.placeholder.com/1200x630/${bgColor.replace(
    "#",
    ""
  )}/${textColor.replace("#", "")}?text=${encodeURIComponent(
    `${hub.charAt(0).toUpperCase() + hub.slice(1)} ${
      contentType.charAt(0).toUpperCase() + contentType.slice(1)
    }`
  )}`;

  return {
    url,
    alt: `Featured image for ${contentType} on ${hub} hub`,
  };
}

/**
 * Map content models to their placeholder images
 * Used as fallback when featured images aren't provided
 */
export const CONTENT_PLACEHOLDERS: Record<
  string,
  Record<"article" | "lesson" | "strategy" | "broker", PageImage>
> = {
  forex: {
    article: generateHubImage("forex", "article"),
    lesson: generateHubImage("forex", "lesson"),
    strategy: generateHubImage("forex", "strategy"),
    broker: generatePlaceholderImage("broker", "forex"),
  },
  gold: {
    article: generateHubImage("gold", "article"),
    lesson: generateHubImage("gold", "lesson"),
    strategy: generateHubImage("gold", "strategy"),
    broker: generatePlaceholderImage("broker", "gold"),
  },
  crypto: {
    article: generateHubImage("crypto", "article"),
    lesson: generateHubImage("crypto", "lesson"),
    strategy: generateHubImage("crypto", "strategy"),
    broker: generatePlaceholderImage("broker", "crypto"),
  },
  indices: {
    article: generateHubImage("indices", "article"),
    lesson: generateHubImage("indices", "lesson"),
    strategy: generateHubImage("indices", "strategy"),
    broker: generatePlaceholderImage("broker", "indices"),
  },
  commodities: {
    article: generateHubImage("commodities", "article"),
    lesson: generateHubImage("commodities", "lesson"),
    strategy: generateHubImage("commodities", "strategy"),
    broker: generatePlaceholderImage("broker", "commodities"),
  },
};
