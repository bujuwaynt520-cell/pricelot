/**
 * Content Relationship Graph
 * Builds and maintains a weighted graph of relationships between all content types
 */

export interface ContentNode {
  id: string;
  type:
    | "article"
    | "lesson"
    | "strategy"
    | "glossary"
    | "asset"
    | "broker"
    | "topic";
  title: string;
  category: string;
  tags: string[];
  keywords: string[];
  hub?: string;
}

export interface ContentEdge {
  from: string;
  to: string;
  weight: number;
  reason: string;
  type:
    | "category-match"
    | "tag-match"
    | "keyword-match"
    | "hub-match"
    | "semantic";
}

export interface ContentGraph {
  nodes: Map<string, ContentNode>;
  edges: Map<string, ContentEdge[]>;
  weights: Map<string, number>;
}

let contentGraphCache: ContentGraph | null = null;
const GRAPH_CACHE_TTL = 3600000; // 1 hour

/**
 * Score relationship between two content nodes
 */
export function scoreContentRelationship(
  node1: ContentNode,
  node2: ContentNode
): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // Category match (highest weight: 3.0x)
  if (node1.category === node2.category) {
    score += 30;
    reasons.push("category-match");
  }

  // Hub match (weight: 2.5x)
  if (node1.hub === node2.hub) {
    score += 25;
    reasons.push("hub-match");
  }

  // Tag overlap (weight: 2.0x per shared tag, max 20)
  const sharedTags = node1.tags.filter((t) => node2.tags.includes(t));
  const tagScore = Math.min(sharedTags.length * 5, 20);
  if (tagScore > 0) {
    score += tagScore;
    reasons.push(`tag-match:${sharedTags.join(",")}`);
  }

  // Keyword overlap (weight: 1.5x per shared keyword, max 15)
  const sharedKeywords = node1.keywords.filter((k) =>
    node2.keywords.some((k2) => k.toLowerCase().includes(k2.toLowerCase()))
  );
  const keywordScore = Math.min(sharedKeywords.length * 3, 15);
  if (keywordScore > 0) {
    score += keywordScore;
    reasons.push(`keyword-match:${sharedKeywords.slice(0, 2).join(",")}`);
  }

  // Type compatibility bonus (weight: 1.0x)
  const compatiblePairs = [
    ["article", "lesson"],
    ["lesson", "strategy"],
    ["strategy", "glossary"],
    ["article", "strategy"],
    ["topic", "article"],
  ];

  const pairKey = `${node1.type}|${node2.type}`;
  const isPairCompatible = compatiblePairs.some(
    (pair) =>
      (pair[0] === node1.type && pair[1] === node2.type) ||
      (pair[1] === node1.type && pair[0] === node2.type)
  );

  if (isPairCompatible) {
    score += 10;
    reasons.push("type-compatibility");
  }

  // Normalize score (0-100)
  score = Math.min(Math.max(score, 0), 100);

  return { score, reasons };
}

/**
 * Get related content for a node
 */
export function getConnectedContent(
  nodeId: string,
  graph: ContentGraph,
  minScore = 40,
  limit = 5
): Array<{ node: ContentNode; score: number; reasons: string[] }> {
  const edges = graph.edges.get(nodeId) || [];

  return edges
    .filter((edge) => edge.weight >= minScore)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)
    .map((edge) => ({
      node: graph.nodes.get(edge.to)!,
      score: edge.weight,
      reasons: [edge.reason],
    }));
}

/**
 * Find strongest relationships for a node
 */
export function getStrongestRelationships(
  nodeId: string,
  graph: ContentGraph,
  limit = 3
): ContentEdge[] {
  const edges = graph.edges.get(nodeId) || [];
  return edges.sort((a, b) => b.weight - a.weight).slice(0, limit);
}

/**
 * Get all connected content recursively
 */
export function getTransitiveConnections(
  nodeId: string,
  graph: ContentGraph,
  depth = 2,
  visited = new Set<string>()
): ContentNode[] {
  if (depth === 0 || visited.has(nodeId)) return [];

  visited.add(nodeId);
  const connections: ContentNode[] = [];
  const edges = graph.edges.get(nodeId) || [];

  edges.forEach((edge) => {
    const targetNode = graph.nodes.get(edge.to);
    if (targetNode && !visited.has(edge.to)) {
      connections.push(targetNode);

      // Recursively get connections of this node
      if (depth > 1) {
        connections.push(
          ...getTransitiveConnections(edge.to, graph, depth - 1, visited)
        );
      }
    }
  });

  return connections;
}

/**
 * Find hub-specific subgraph
 */
export function getHubSubgraph(
  hub: string,
  graph: ContentGraph
): ContentGraph {
  const hubNodes = new Map<string, ContentNode>();
  const hubEdges = new Map<string, ContentEdge[]>();

  // Get all nodes in hub
  graph.nodes.forEach((node, id) => {
    if (node.hub === hub) {
      hubNodes.set(id, node);
    }
  });

  // Get edges between hub nodes
  hubNodes.forEach((node, id) => {
    const edges = graph.edges.get(id) || [];
    const hubInternalEdges = edges.filter((e) => hubNodes.has(e.to));
    if (hubInternalEdges.length > 0) {
      hubEdges.set(id, hubInternalEdges);
    }
  });

  return {
    nodes: hubNodes,
    edges: hubEdges,
    weights: graph.weights,
  };
}

/**
 * Find nodes by criteria
 */
export function findNodesInGraph(
  graph: ContentGraph,
  criteria: {
    type?: ContentNode["type"];
    category?: string;
    tags?: string[];
    minConnectionCount?: number;
  }
): ContentNode[] {
  const results: ContentNode[] = [];

  graph.nodes.forEach((node) => {
    let matches = true;

    if (criteria.type && node.type !== criteria.type) matches = false;
    if (criteria.category && node.category !== criteria.category) matches = false;
    if (
      criteria.tags &&
      !criteria.tags.some((t) => node.tags.includes(t))
    )
      matches = false;

    if (
      criteria.minConnectionCount &&
      (graph.edges.get(node.id) || []).length < criteria.minConnectionCount
    )
      matches = false;

    if (matches) results.push(node);
  });

  return results;
}

/**
 * Calculate graph density
 */
export function getGraphDensity(graph: ContentGraph): number {
  const nodeCount = graph.nodes.size;
  if (nodeCount <= 1) return 0;

  let edgeCount = 0;
  graph.edges.forEach((edges) => {
    edgeCount += edges.length;
  });

  const maxEdges = nodeCount * (nodeCount - 1);
  return (edgeCount / maxEdges) * 100;
}

/**
 * Find isolated or weak nodes
 */
export function findIsolatedNodes(
  graph: ContentGraph,
  minConnections = 1
): ContentNode[] {
  const isolated: ContentNode[] = [];

  graph.nodes.forEach((node) => {
    const edges = graph.edges.get(node.id) || [];
    if (edges.length < minConnections) {
      isolated.push(node);
    }
  });

  return isolated;
}

/**
 * Get graph statistics
 */
export function getGraphStats(graph: ContentGraph) {
  let totalWeight = 0;
  let edgeCount = 0;

  graph.edges.forEach((edges) => {
    edges.forEach((edge) => {
      totalWeight += edge.weight;
      edgeCount++;
    });
  });

  return {
    nodeCount: graph.nodes.size,
    edgeCount,
    averageWeight: edgeCount > 0 ? totalWeight / edgeCount : 0,
    density: getGraphDensity(graph),
    maxWeight: Math.max(
      ...Array.from(graph.edges.values())
        .flat()
        .map((e) => e.weight)
    ),
    minWeight: Math.min(
      ...Array.from(graph.edges.values())
        .flat()
        .map((e) => e.weight)
    ),
    typeBreakdown: Array.from(
      new Map(
        Array.from(graph.nodes.values()).map((n) => [
          n.type,
          (Array.from(graph.nodes.values()).filter((x) => x.type === n.type)
            .length),
        ])
      )
    ).reduce((acc, [type, count]) => ({ ...acc, [type]: count }), {}),
  };
}
