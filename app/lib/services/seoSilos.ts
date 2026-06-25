/**
 * SEO Silos Architecture
 * Defines hierarchical silos for each trading hub/category
 */

import type { TopicCluster } from "./topicClusters";
import type { ProgrammaticSeoPage } from "./programmaticSeo";
import {
  getClustersByCategory,
  getAllClusterCategories,
} from "./topicClusters";
import { getAllAssets } from "./taxonomyEngine";

export interface SiloPage {
  id: string;
  title: string;
  slug: string;
  type: "pillar" | "cluster" | "supporting";
  level: number;
  parent?: string;
  children: string[];
  keywords: string[];
  internalLinks: string[];
}

export interface Silo {
  id: string;
  name: string;
  slug: string;
  description: string;
  pillarPages: SiloPage[];
  clusterPages: SiloPage[];
  supportingPages: SiloPage[];
  totalPages: number;
  estimatedContent: number;
  keywords: string[];
}

/**
 * Build silo for a category/hub
 */
export function buildCategorySilo(category: string): Silo {
  const clusters = getClustersByCategory(category);
  const slug = category.toLowerCase().replace(/\s+/g, "-");

  const pillarPages: SiloPage[] = clusters
    .filter((c) => c.pageType === "pillar")
    .map((cluster) => ({
      id: cluster.id,
      title: cluster.title,
      slug: cluster.slug,
      type: "pillar" as const,
      level: 1,
      children: cluster.relatedClusters,
      keywords: cluster.keywords,
      internalLinks: cluster.relatedClusters,
    }));

  const clusterPages: SiloPage[] = clusters
    .filter((c) => c.pageType === "cluster")
    .map((cluster) => ({
      id: cluster.id,
      title: cluster.title,
      slug: cluster.slug,
      type: "cluster" as const,
      level: 2,
      parent: cluster.parentCluster,
      children: [],
      keywords: cluster.keywords,
      internalLinks: cluster.relatedClusters,
    }));

  const supportingPages: SiloPage[] = clusters
    .filter((c) => c.pageType === "supporting")
    .map((cluster) => ({
      id: cluster.id,
      title: cluster.title,
      slug: cluster.slug,
      type: "supporting" as const,
      level: 3,
      parent: cluster.parentCluster,
      children: [],
      keywords: cluster.keywords,
      internalLinks: [],
    }));

  // Collect all keywords
  const allKeywords = new Set<string>();
  [...pillarPages, ...clusterPages, ...supportingPages].forEach((page) => {
    page.keywords.forEach((kw) => allKeywords.add(kw));
  });

  const totalPages = pillarPages.length + clusterPages.length + supportingPages.length;
  const estimatedContent = (pillarPages.length * 5000 + clusterPages.length * 3000 + supportingPages.length * 1500);

  return {
    id: slug,
    name: category,
    slug,
    description: `${category} trading silo with pillar, cluster, and supporting pages`,
    pillarPages,
    clusterPages,
    supportingPages,
    totalPages,
    estimatedContent,
    keywords: Array.from(allKeywords),
  };
}

/**
 * Build silos for all categories
 */
export function buildAllCategorySilos(): Silo[] {
  const categories = getAllClusterCategories();
  return categories.map((cat) => buildCategorySilo(cat));
}

/**
 * Get silo with all nested pages
 */
export function getSiloStructure(categoryId: string): {
  silo: Silo;
  pageTree: Map<string, SiloPage[]>;
  totalPages: number;
} {
  const silo = buildCategorySilo(categoryId);
  const pageTree = new Map<string, SiloPage[]>();

  // Level 1: Pillar pages
  pageTree.set("pillar", silo.pillarPages);

  // Level 2: Cluster pages
  pageTree.set("cluster", silo.clusterPages);

  // Level 3: Supporting pages
  pageTree.set("supporting", silo.supportingPages);

  return {
    silo,
    pageTree,
    totalPages: silo.totalPages,
  };
}

/**
 * Get internal link graph for silo
 */
export function getSiloInternalLinkGraph(categoryId: string): Map<
  string,
  string[]
> {
  const { silo } = getSiloStructure(categoryId);
  const graph = new Map<string, string[]>();

  const allPages = [
    ...silo.pillarPages,
    ...silo.clusterPages,
    ...silo.supportingPages,
  ];

  allPages.forEach((page) => {
    graph.set(page.slug, page.internalLinks);
  });

  return graph;
}

/**
 * Build asset-specific silo
 */
export function buildAssetSilo(
  assetName: string,
  hub: string
): {
  silos: Silo[];
  assetPages: SiloPage[];
  totalPages: number;
} {
  const assets = getAllAssets();
  const asset = assets.find((a) => a.id.includes(assetName.toLowerCase()));

  if (!asset) {
    return {
      silos: [],
      assetPages: [],
      totalPages: 0,
    };
  }

  // Get hub silo
  const hubSilos = buildAllCategorySilos().filter((s) =>
    s.name.toLowerCase().includes(hub.toLowerCase())
  );

  // Create asset-specific pages
  const assetPages: SiloPage[] = [
    {
      id: `${assetName}-overview`,
      title: `${assetName} Trading Guide`,
      slug: `${assetName.toLowerCase()}-trading-guide`,
      type: "pillar",
      level: 1,
      children: [
        `${assetName}-technical`,
        `${assetName}-strategies`,
        `${assetName}-fundamentals`,
      ],
      keywords: [assetName, "trading", hub],
      internalLinks: [
        `${assetName}-technical`,
        `${assetName}-strategies`,
      ],
    },
    {
      id: `${assetName}-technical`,
      title: `${assetName} Technical Analysis`,
      slug: `${assetName.toLowerCase()}-technical-analysis`,
      type: "cluster",
      level: 2,
      parent: `${assetName}-overview`,
      children: [],
      keywords: [assetName, "technical analysis"],
      internalLinks: [`${assetName}-overview`, `${assetName}-fundamentals`],
    },
    {
      id: `${assetName}-strategies`,
      title: `${assetName} Trading Strategies`,
      slug: `${assetName.toLowerCase()}-strategies`,
      type: "cluster",
      level: 2,
      parent: `${assetName}-overview`,
      children: [],
      keywords: [assetName, "strategies"],
      internalLinks: [`${assetName}-overview`, `${assetName}-technical`],
    },
    {
      id: `${assetName}-fundamentals`,
      title: `${assetName} Fundamental Analysis`,
      slug: `${assetName.toLowerCase()}-fundamentals`,
      type: "cluster",
      level: 2,
      parent: `${assetName}-overview`,
      children: [],
      keywords: [assetName, "fundamental analysis"],
      internalLinks: [`${assetName}-overview`],
    },
  ];

  return {
    silos: hubSilos,
    assetPages,
    totalPages: hubSilos.reduce((sum, s) => sum + s.totalPages, 0) + assetPages.length,
  };
}

/**
 * Generate silo statistics
 */
export function getSiloStats() {
  const silos = buildAllCategorySilos();

  return {
    totalSilos: silos.length,
    totalPages: silos.reduce((sum, s) => sum + s.totalPages, 0),
    totalContent: silos.reduce((sum, s) => sum + s.estimatedContent, 0),
    byType: {
      pillarPages: silos.reduce((sum, s) => sum + s.pillarPages.length, 0),
      clusterPages: silos.reduce((sum, s) => sum + s.clusterPages.length, 0),
      supportingPages: silos.reduce((sum, s) => sum + s.supportingPages.length, 0),
    },
    byCategory: silos.map((s) => ({
      id: s.id,
      name: s.name,
      pages: s.totalPages,
      estimatedWords: s.estimatedContent,
      keywordCount: s.keywords.length,
    })),
  };
}

/**
 * Get silo content outline
 */
export function getSiloContentOutline(categoryId: string): string {
  const { silo } = getSiloStructure(categoryId);

  let outline = `# ${silo.name} Silo\n\n`;
  outline += `**Total Pages**: ${silo.totalPages}\n`;
  outline += `**Estimated Content**: ${Math.round(silo.estimatedContent / 1000)}k words\n\n`;

  outline += `## Pillar Pages (Level 1)\n`;
  silo.pillarPages.forEach((page) => {
    outline += `- **${page.title}** (${page.slug})\n`;
  });

  outline += `\n## Cluster Pages (Level 2)\n`;
  silo.clusterPages.forEach((page) => {
    outline += `- **${page.title}** (${page.slug})\n`;
  });

  outline += `\n## Supporting Pages (Level 3)\n`;
  silo.supportingPages.forEach((page) => {
    outline += `- **${page.title}** (${page.slug})\n`;
  });

  return outline;
}

/**
 * Check for orphaned pages in silo
 */
export function checkSiloOrphans(categoryId: string): {
  orphaned: SiloPage[];
  isolated: SiloPage[];
} {
  const { silo } = getSiloStructure(categoryId);
  const allPages = [
    ...silo.pillarPages,
    ...silo.clusterPages,
    ...silo.supportingPages,
  ];

  const orphaned: SiloPage[] = [];
  const isolated: SiloPage[] = [];

  allPages.forEach((page) => {
    // Check if cluster/supporting page has parent
    if (page.type !== "pillar" && !page.parent) {
      orphaned.push(page);
    }

    // Check if has no internal links
    if (page.internalLinks.length === 0 && page.type !== "supporting") {
      isolated.push(page);
    }
  });

  return { orphaned, isolated };
}
