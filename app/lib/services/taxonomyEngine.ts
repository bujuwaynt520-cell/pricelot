/**
 * Taxonomy Engine
 * Centralizes and manages categories, tags, topics, assets, and hubs
 */

export interface TaxonomyMapping {
  id: string;
  name: string;
  label: string;
  type: "category" | "tag" | "topic" | "asset" | "hub";
  parent?: string;
  children: string[];
  related: string[];
  keywords: string[];
  description: string;
}

export interface TaxonomyRegistry {
  categories: Map<string, TaxonomyMapping>;
  tags: Map<string, TaxonomyMapping>;
  topics: Map<string, TaxonomyMapping>;
  assets: Map<string, TaxonomyMapping>;
  hubs: Map<string, TaxonomyMapping>;
  allMappings: Map<string, TaxonomyMapping>;
}

let taxonomyRegistry: TaxonomyRegistry | null = null;

// Master taxonomy definitions
const MASTER_TAXONOMY = {
  hubs: [
    {
      id: "forex",
      name: "forex",
      label: "Forex Hub",
      description: "Currency exchange and forex trading",
      keywords: ["forex", "fx", "currency", "trading"],
    },
    {
      id: "crypto",
      name: "crypto",
      label: "Crypto Hub",
      description: "Cryptocurrency and blockchain trading",
      keywords: ["crypto", "bitcoin", "ethereum", "blockchain"],
    },
    {
      id: "gold",
      name: "gold",
      label: "Gold Hub",
      description: "Gold and precious metals trading",
      keywords: ["gold", "precious metals", "commodities"],
    },
    {
      id: "commodities",
      name: "commodities",
      label: "Commodities Hub",
      description: "Oil, gas, and commodity trading",
      keywords: ["commodities", "oil", "gas", "energy"],
    },
    {
      id: "indices",
      name: "indices",
      label: "Indices Hub",
      description: "Stock indices and equity trading",
      keywords: ["indices", "stocks", "equity", "s&p500"],
    },
  ],
  categories: [
    {
      id: "technical-analysis",
      name: "Technical Analysis",
      description: "Price action and chart analysis",
      keywords: ["technical", "charts", "patterns"],
      related: ["risk-management", "trading-psychology"],
    },
    {
      id: "fundamental-analysis",
      name: "Fundamental Analysis",
      description: "Economic and financial analysis",
      keywords: ["fundamental", "economics", "analysis"],
      related: ["technical-analysis"],
    },
    {
      id: "risk-management",
      name: "Risk Management",
      description: "Capital preservation and trading safety",
      keywords: ["risk", "position-sizing", "stop-loss"],
      related: ["trading-psychology", "technical-analysis"],
    },
    {
      id: "trading-psychology",
      name: "Trading Psychology",
      description: "Emotional discipline and mindset",
      keywords: ["psychology", "emotions", "discipline"],
      related: ["risk-management"],
    },
    {
      id: "education",
      name: "Education",
      description: "Learning resources and tutorials",
      keywords: ["education", "learning", "academy"],
      related: ["technical-analysis", "fundamental-analysis"],
    },
  ],
  tags: [
    // Trading level tags
    { id: "beginner", name: "Beginner", description: "Beginner level content" },
    {
      id: "intermediate",
      name: "Intermediate",
      description: "Intermediate level content",
    },
    { id: "advanced", name: "Advanced", description: "Advanced level content" },

    // Content type tags
    { id: "strategy", name: "Strategy", description: "Trading strategy" },
    { id: "indicator", name: "Indicator", description: "Technical indicator" },
    { id: "tool", name: "Tool", description: "Trading tool" },
    { id: "news", name: "News", description: "Market news" },
    { id: "education", name: "Education", description: "Educational content" },

    // Market tags
    {
      id: "market-analysis",
      name: "Market Analysis",
      description: "Market analysis",
    },
    { id: "price-action", name: "Price Action", description: "Price action" },
    { id: "volatility", name: "Volatility", description: "Volatility trading" },
  ],
  assets: [
    // Forex pairs
    {
      id: "eurusd",
      name: "EUR/USD",
      hub: "forex",
      keywords: ["eur/usd", "eurusd", "euro", "dollar"],
    },
    {
      id: "gbpusd",
      name: "GBP/USD",
      hub: "forex",
      keywords: ["gbp/usd", "gbpusd", "pound", "cable"],
    },
    {
      id: "usdjpy",
      name: "USD/JPY",
      hub: "forex",
      keywords: ["usd/jpy", "usdjpy", "yen", "dollar"],
    },

    // Crypto assets
    {
      id: "bitcoin",
      name: "Bitcoin",
      hub: "crypto",
      keywords: ["bitcoin", "btc", "crypto"],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      hub: "crypto",
      keywords: ["ethereum", "eth", "altcoin"],
    },

    // Commodities
    {
      id: "xauusd",
      name: "Gold (XAU/USD)",
      hub: "gold",
      keywords: ["gold", "xauusd", "precious metal"],
    },
    {
      id: "wti",
      name: "WTI Crude Oil",
      hub: "commodities",
      keywords: ["wti", "oil", "crude"],
    },

    // Indices
    {
      id: "us500",
      name: "S&P 500",
      hub: "indices",
      keywords: ["sp500", "s&p500", "index"],
    },
    {
      id: "nasdaq",
      name: "NASDAQ",
      hub: "indices",
      keywords: ["nasdaq", "tech", "index"],
    },
  ],
};

/**
 * Get or build taxonomy registry with caching
 */
function getTaxonomyRegistry(): TaxonomyRegistry {
  if (taxonomyRegistry) {
    return taxonomyRegistry;
  }

  taxonomyRegistry = {
    categories: new Map(),
    tags: new Map(),
    topics: new Map(),
    assets: new Map(),
    hubs: new Map(),
    allMappings: new Map(),
  };

  // Build hubs
  MASTER_TAXONOMY.hubs.forEach((hub) => {
    const mapping: TaxonomyMapping = {
      id: hub.id,
      name: hub.name,
      label: hub.label,
      type: "hub",
      children: [],
      related: [],
      keywords: hub.keywords,
      description: hub.description,
    };
    taxonomyRegistry!.hubs.set(hub.id, mapping);
    taxonomyRegistry!.allMappings.set(`hub:${hub.id}`, mapping);
  });

  // Build categories
  MASTER_TAXONOMY.categories.forEach((cat) => {
    const mapping: TaxonomyMapping = {
      id: cat.id,
      name: cat.name,
      label: cat.name,
      type: "category",
      children: [],
      related: cat.related || [],
      keywords: cat.keywords,
      description: cat.description,
    };
    taxonomyRegistry!.categories.set(cat.id, mapping);
    taxonomyRegistry!.allMappings.set(`category:${cat.id}`, mapping);
  });

  // Build tags
  MASTER_TAXONOMY.tags.forEach((tag) => {
    const mapping: TaxonomyMapping = {
      id: tag.id,
      name: tag.name,
      label: tag.name,
      type: "tag",
      children: [],
      related: [],
      keywords: [tag.id],
      description: tag.description,
    };
    taxonomyRegistry!.tags.set(tag.id, mapping);
    taxonomyRegistry!.allMappings.set(`tag:${tag.id}`, mapping);
  });

  // Build assets
  MASTER_TAXONOMY.assets.forEach((asset) => {
    const mapping: TaxonomyMapping = {
      id: asset.id,
      name: asset.name,
      label: asset.name,
      type: "asset",
      parent: asset.hub,
      children: [],
      related: [],
      keywords: asset.keywords,
      description: `Trading data for ${asset.name}`,
    };
    taxonomyRegistry!.assets.set(asset.id, mapping);
    taxonomyRegistry!.allMappings.set(`asset:${asset.id}`, mapping);

    // Add to hub's children
    const hub = taxonomyRegistry!.hubs.get(asset.hub);
    if (hub) {
      hub.children.push(asset.id);
    }
  });

  return taxonomyRegistry;
}

/**
 * Get related categories
 */
export function getRelatedCategories(categoryId: string): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  const category = registry.categories.get(categoryId);
  if (!category) return [];

  return category.related
    .map((id) => registry.categories.get(id))
    .filter((c) => c !== undefined) as TaxonomyMapping[];
}

/**
 * Get related tags
 */
export function getRelatedTags(tagId: string): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  const tag = registry.tags.get(tagId);
  if (!tag) return [];

  return tag.related
    .map((id) => registry.tags.get(id))
    .filter((t) => t !== undefined) as TaxonomyMapping[];
}

/**
 * Get related assets
 */
export function getRelatedAssets(
  assetId: string,
  limit = 5
): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  const asset = registry.assets.get(assetId);
  if (!asset || !asset.parent) return [];

  // Get assets from same hub
  const hubAssets = Array.from(registry.assets.values()).filter(
    (a) => a.parent === asset.parent && a.id !== assetId
  );

  return hubAssets.slice(0, limit);
}

/**
 * Get all assets for hub
 */
export function getAssetsByHub(hubId: string): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  return Array.from(registry.assets.values()).filter((a) => a.parent === hubId);
}

/**
 * Get taxonomy by ID across all types
 */
export function getTaxonomy(id: string): TaxonomyMapping | undefined {
  const registry = getTaxonomyRegistry();

  // Try all types
  return (
    registry.hubs.get(id) ||
    registry.categories.get(id) ||
    registry.tags.get(id) ||
    registry.assets.get(id) ||
    registry.topics.get(id)
  );
}

/**
 * Get all categories
 */
export function getAllCategories(): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  return Array.from(registry.categories.values());
}

/**
 * Get all tags
 */
export function getAllTags(): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  return Array.from(registry.tags.values());
}

/**
 * Get all assets
 */
export function getAllAssets(): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  return Array.from(registry.assets.values());
}

/**
 * Get all hubs
 */
export function getAllHubs(): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  return Array.from(registry.hubs.values());
}

/**
 * Search taxonomy by keyword
 */
export function searchTaxonomy(keyword: string): TaxonomyMapping[] {
  const registry = getTaxonomyRegistry();
  const lowerKeyword = keyword.toLowerCase();

  return Array.from(registry.allMappings.values()).filter(
    (mapping) =>
      mapping.name.toLowerCase().includes(lowerKeyword) ||
      mapping.keywords.some((kw) => kw.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Validate taxonomy integrity - check for orphans
 */
export function validateTaxonomy(): {
  valid: boolean;
  orphanedAssets: string[];
  missingParents: string[];
  orphanedTags: string[];
} {
  const registry = getTaxonomyRegistry();
  const issues = {
    valid: true,
    orphanedAssets: [] as string[],
    missingParents: [] as string[],
    orphanedTags: [] as string[],
  };

  // Check assets
  registry.assets.forEach((asset) => {
    if (asset.parent && !registry.hubs.has(asset.parent)) {
      issues.missingParents.push(asset.id);
      issues.valid = false;
    }
  });

  // Check categories
  registry.categories.forEach((cat) => {
    cat.related.forEach((relId) => {
      if (!registry.categories.has(relId)) {
        issues.orphanedAssets.push(`${cat.id} -> ${relId}`);
        issues.valid = false;
      }
    });
  });

  // Check tags
  registry.tags.forEach((tag) => {
    tag.related.forEach((relId) => {
      if (!registry.tags.has(relId)) {
        issues.orphanedTags.push(`${tag.id} -> ${relId}`);
        issues.valid = false;
      }
    });
  });

  return issues;
}

/**
 * Get taxonomy statistics
 */
export function getTaxonomyStats() {
  const registry = getTaxonomyRegistry();

  return {
    totalCategories: registry.categories.size,
    totalTags: registry.tags.size,
    totalAssets: registry.assets.size,
    totalHubs: registry.hubs.size,
    totalMappings: registry.allMappings.size,
    categoryBreakdown: Array.from(registry.categories.values()).map((c) => ({
      id: c.id,
      name: c.name,
      relatedCount: c.related.length,
    })),
    hubsWithAssets: Array.from(registry.hubs.values()).map((h) => ({
      id: h.id,
      name: h.name,
      assetCount: h.children.length,
    })),
  };
}

/**
 * Invalidate taxonomy cache
 */
export function invalidateTaxonomyRegistry(): void {
  taxonomyRegistry = null;
}
