/**
 * Topic Cluster Engine
 * Manages pillar pages, cluster pages, and supporting content architecture
 */

export type PageType = "pillar" | "cluster" | "supporting";

export interface TopicCluster {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  pageType: PageType;
  tags: string[];
  keywords: string[];
  parentCluster?: string;
  relatedClusters: string[];
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  estimatedWordCount: number;
  priority: number;
  seoScore?: number;
}

export interface TopicClusterCache {
  clusters: Map<string, TopicCluster>;
  clustersByCategory: Map<string, TopicCluster[]>;
  clustersByPageType: Map<PageType, TopicCluster[]>;
  lastUpdated: number;
}

let clusterCache: TopicClusterCache | null = null;
const CACHE_TTL = 3600000; // 1 hour in milliseconds

// Sample topic clusters covering major categories
const TOPIC_CLUSTERS: TopicCluster[] = [
  // Forex Pillar Cluster
  {
    id: "forex-trading-basics",
    slug: "forex-trading-guide",
    title: "Complete Forex Trading Guide",
    description: "Comprehensive guide to forex trading covering fundamentals, strategies, and risk management",
    category: "Forex",
    pageType: "pillar",
    tags: ["forex", "trading", "beginner"],
    keywords: ["forex trading", "currency exchange", "forex basics", "forex guide"],
    relatedClusters: [
      "forex-technical-analysis",
      "forex-risk-management",
      "currency-pairs-guide",
    ],
    faqItems: [
      {
        question: "What is forex trading?",
        answer:
          "Forex trading is the exchange of one currency for another in the global market.",
      },
      {
        question: "How much capital do I need to start?",
        answer:
          "Most brokers allow starting with $100-$1000, though some allow micro accounts.",
      },
    ],
    estimatedWordCount: 5000,
    priority: 10,
  },

  // Crypto Pillar Cluster
  {
    id: "crypto-trading-guide",
    slug: "cryptocurrency-trading-guide",
    title: "Cryptocurrency Trading Mastery",
    description:
      "Master cryptocurrency trading from blockchain basics to advanced strategies",
    category: "Crypto",
    pageType: "pillar",
    tags: ["crypto", "bitcoin", "ethereum"],
    keywords: [
      "cryptocurrency trading",
      "bitcoin trading",
      "ethereum trading",
      "crypto guide",
    ],
    relatedClusters: [
      "bitcoin-investment",
      "ethereum-strategies",
      "defi-explained",
    ],
    faqItems: [
      {
        question: "Is cryptocurrency trading legal?",
        answer:
          "Cryptocurrency trading is legal in most countries, though regulations vary.",
      },
      {
        question: "What are the risks?",
        answer:
          "Volatility, market manipulation, security risks, and regulatory changes.",
      },
    ],
    estimatedWordCount: 6000,
    priority: 10,
  },

  // Gold Trading Cluster
  {
    id: "gold-trading-basics",
    slug: "gold-trading-guide",
    title: "Gold Trading Fundamentals",
    description: "Learn gold trading including spot prices, futures, and strategies",
    category: "Gold",
    pageType: "pillar",
    tags: ["gold", "commodities", "precious-metals"],
    keywords: ["gold trading", "spot gold", "gold futures", "gold prices"],
    relatedClusters: ["safe-haven-assets", "commodity-trading", "precious-metals"],
    faqItems: [
      {
        question: "Why do traders invest in gold?",
        answer: "Gold is considered a safe-haven asset during market uncertainty.",
      },
      {
        question: "What affects gold prices?",
        answer:
          "US Dollar strength, inflation expectations, geopolitical events, and interest rates.",
      },
    ],
    estimatedWordCount: 4000,
    priority: 9,
  },

  // Technical Analysis Cluster
  {
    id: "technical-analysis-mastery",
    slug: "technical-analysis-guide",
    title: "Technical Analysis Masterclass",
    description:
      "Complete guide to technical analysis including patterns, indicators, and strategies",
    category: "Technical Analysis",
    pageType: "pillar",
    tags: ["technical-analysis", "charts", "indicators"],
    keywords: [
      "technical analysis",
      "chart patterns",
      "trading indicators",
      "price action",
    ],
    relatedClusters: [
      "candlestick-patterns",
      "moving-averages",
      "oscillators-guide",
    ],
    faqItems: [
      {
        question: "Is technical analysis reliable?",
        answer:
          "Technical analysis works best with other analysis methods and risk management.",
      },
      {
        question: "What are the best indicators?",
        answer:
          "Popular indicators include RSI, MACD, Bollinger Bands, and Moving Averages.",
      },
    ],
    estimatedWordCount: 7000,
    priority: 10,
  },

  // Risk Management Cluster
  {
    id: "risk-management-mastery",
    slug: "risk-management-guide",
    title: "Trading Risk Management Mastery",
    description:
      "Master risk management techniques to protect capital and achieve consistent profits",
    category: "Risk Management",
    pageType: "pillar",
    tags: ["risk-management", "position-sizing", "capital-preservation"],
    keywords: [
      "risk management",
      "position sizing",
      "stop loss",
      "money management",
    ],
    relatedClusters: [
      "position-sizing-guide",
      "stop-loss-strategies",
      "drawdown-management",
    ],
    faqItems: [
      {
        question: "What is proper position sizing?",
        answer:
          "Risk only 1-2% of account per trade using the Kelly Criterion or fixed fractional methods.",
      },
      {
        question: "Why is risk management important?",
        answer:
          "Risk management prevents large losses and enables long-term profitability.",
      },
    ],
    estimatedWordCount: 5500,
    priority: 10,
  },
];

/**
 * Get topic cluster by ID with caching
 */
export function getTopicCluster(id: string): TopicCluster | undefined {
  const cache = getClusterCache();
  return cache.clusters.get(id);
}

/**
 * Get all topic clusters
 */
export function getAllTopicClusters(): TopicCluster[] {
  const cache = getClusterCache();
  return Array.from(cache.clusters.values());
}

/**
 * Get clusters by category
 */
export function getClustersByCategory(category: string): TopicCluster[] {
  const cache = getClusterCache();
  return cache.clustersByCategory.get(category) || [];
}

/**
 * Get clusters by page type
 */
export function getClustersByPageType(pageType: PageType): TopicCluster[] {
  const cache = getClusterCache();
  return cache.clustersByPageType.get(pageType) || [];
}

/**
 * Get related clusters for a cluster
 */
export function getRelatedTopicClusters(
  clusterId: string,
  limit = 5
): TopicCluster[] {
  const cluster = getTopicCluster(clusterId);
  if (!cluster) return [];

  const cache = getClusterCache();
  const related: TopicCluster[] = [];

  for (const relatedId of cluster.relatedClusters) {
    const relatedCluster = cache.clusters.get(relatedId);
    if (relatedCluster) {
      related.push(relatedCluster);
    }
  }

  return related.slice(0, limit);
}

/**
 * Get clusters with specific keyword
 */
export function getClustersByKeyword(keyword: string): TopicCluster[] {
  const cache = getClusterCache();
  const lowerKeyword = keyword.toLowerCase();

  return Array.from(cache.clusters.values()).filter((cluster) =>
    cluster.keywords.some((kw) => kw.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Get all unique keywords across clusters
 */
export function getAllClusterKeywords(): string[] {
  const cache = getClusterCache();
  const keywords = new Set<string>();

  cache.clusters.forEach((cluster) => {
    cluster.keywords.forEach((kw) => keywords.add(kw));
  });

  return Array.from(keywords).sort();
}

/**
 * Get cluster statistics
 */
export function getClusterStats() {
  const cache = getClusterCache();
  const clusters = Array.from(cache.clusters.values());

  return {
    totalClusters: clusters.length,
    pillarPages: clusters.filter((c) => c.pageType === "pillar").length,
    clusterPages: clusters.filter((c) => c.pageType === "cluster").length,
    supportingPages: clusters.filter(
      (c) => c.pageType === "supporting"
    ).length,
    averagePriority:
      clusters.reduce((sum, c) => sum + c.priority, 0) / clusters.length,
    totalKeywords: getAllClusterKeywords().length,
    categoryBreakdown: Object.fromEntries(
      Array.from(cache.clustersByCategory.entries())
    ),
  };
}

/**
 * Get cache with TTL management
 */
function getClusterCache(): TopicClusterCache {
  const now = Date.now();

  if (
    clusterCache &&
    clusterCache.lastUpdated + CACHE_TTL > now
  ) {
    return clusterCache;
  }

  // Rebuild cache
  clusterCache = buildClusterCache();
  return clusterCache;
}

/**
 * Build the cluster cache
 */
function buildClusterCache(): TopicClusterCache {
  const cache: TopicClusterCache = {
    clusters: new Map(),
    clustersByCategory: new Map(),
    clustersByPageType: new Map(),
    lastUpdated: Date.now(),
  };

  // Add all clusters to main map
  TOPIC_CLUSTERS.forEach((cluster) => {
    cache.clusters.set(cluster.id, cluster);

    // Index by category
    if (!cache.clustersByCategory.has(cluster.category)) {
      cache.clustersByCategory.set(cluster.category, []);
    }
    cache.clustersByCategory.get(cluster.category)!.push(cluster);

    // Index by page type
    if (!cache.clustersByPageType.has(cluster.pageType)) {
      cache.clustersByPageType.set(cluster.pageType, []);
    }
    cache.clustersByPageType.get(cluster.pageType)!.push(cluster);
  });

  return cache;
}

/**
 * Invalidate cache
 */
export function invalidateClusterCache(): void {
  clusterCache = null;
}

/**
 * Calculate SEO score for a cluster
 */
export function calculateClusterSeoScore(cluster: TopicCluster): number {
  let score = 50; // Base score

  // Add points based on content depth
  score += cluster.estimatedWordCount > 3000 ? 15 : 5;

  // Add points for related clusters
  score += Math.min(cluster.relatedClusters.length * 2, 15);

  // Add points for FAQ items
  score += Math.min(cluster.faqItems.length * 2, 10);

  // Add points for priority
  score += cluster.priority / 10 * 10;

  return Math.min(score, 100);
}

/**
 * Get all cluster categories
 */
export function getAllClusterCategories(): string[] {
  const cache = getClusterCache();
  return Array.from(cache.clustersByCategory.keys()).sort();
}
