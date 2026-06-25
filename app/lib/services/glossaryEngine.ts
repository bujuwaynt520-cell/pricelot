/**
 * Glossary Engine
 * Orchestrates all glossary operations including retrieval, relationships, and content generation
 */

import type { GlossaryTermExtended } from "@/app/lib/contentEngine";
import { SAMPLE_GLOSSARY_EXTENDED } from "@/app/lib/contentEngine";

export type GlossaryCategory =
  | "Forex"
  | "Crypto"
  | "Gold"
  | "Commodities"
  | "Indices"
  | "Technical Analysis"
  | "Risk Management"
  | "Trading Psychology"
  | "Fundamental Analysis"
  | "Stock";

export interface GlossaryRelationships {
  relatedTerms: GlossaryTermExtended[];
  relatedArticles: any[];
  relatedLessons: any[];
  relatedStrategies: any[];
  relatedAssets: any[];
}

/**
 * Get all glossary terms
 */
export function getAllGlossaryTerms(): GlossaryTermExtended[] {
  return SAMPLE_GLOSSARY_EXTENDED;
}

/**
 * Get glossary term by ID
 */
export function getGlossaryTermById(
  id: string
): GlossaryTermExtended | undefined {
  return SAMPLE_GLOSSARY_EXTENDED.find((term) => term.id === id);
}

/**
 * Get glossary terms by category
 */
export function getGlossaryTermsByCategory(
  category: GlossaryCategory
): GlossaryTermExtended[] {
  return SAMPLE_GLOSSARY_EXTENDED.filter((term) => term.category === category);
}

/**
 * Get all unique categories
 */
export function getAllGlossaryCategories(): GlossaryCategory[] {
  const categories = new Set(
    SAMPLE_GLOSSARY_EXTENDED.map((term) => term.category as GlossaryCategory)
  );
  return Array.from(categories).sort();
}

/**
 * Get category statistics
 */
export function getCategoryStats(): Record<GlossaryCategory, number> {
  const stats: Record<string, number> = {};
  SAMPLE_GLOSSARY_EXTENDED.forEach((term) => {
    const category = term.category as string;
    stats[category] = (stats[category] || 0) + 1;
  });
  return stats as Record<GlossaryCategory, number>;
}

/**
 * Search glossary terms by query
 */
export function searchGlossaryTerms(query: string): GlossaryTermExtended[] {
  const lowerQuery = query.toLowerCase();
  return SAMPLE_GLOSSARY_EXTENDED.filter((term) => {
    const matchesTerm = term.term.toLowerCase().includes(lowerQuery);
    const matchesDefinition = term.definition
      .toLowerCase()
      .includes(lowerQuery);
    const matchesTag = term.tags?.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );
    return matchesTerm || matchesDefinition || matchesTag;
  });
}

/**
 * Filter glossary terms with multiple criteria
 */
export function filterGlossaryTerms(options: {
  category?: GlossaryCategory;
  tags?: string[];
  letter?: string;
}): GlossaryTermExtended[] {
  let results = SAMPLE_GLOSSARY_EXTENDED;

  if (options.category) {
    results = results.filter((term) => term.category === options.category);
  }

  if (options.tags && options.tags.length > 0) {
    results = results.filter((term) =>
      options.tags!.some((tag) => term.tags?.includes(tag))
    );
  }

  if (options.letter) {
    results = results.filter((term) =>
      term.term.toLowerCase().startsWith(options.letter!.toLowerCase())
    );
  }

  return results.sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Get alphabetical grouping of glossary terms
 */
export function getGlossaryByLetter(): Record<string, GlossaryTermExtended[]> {
  const grouping: Record<string, GlossaryTermExtended[]> = {};

  SAMPLE_GLOSSARY_EXTENDED.forEach((term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!grouping[firstLetter]) {
      grouping[firstLetter] = [];
    }
    grouping[firstLetter].push(term);
  });

  // Sort each group
  Object.keys(grouping).forEach((letter) => {
    grouping[letter].sort((a, b) => a.term.localeCompare(b.term));
  });

  return grouping;
}

/**
 * Find related glossary terms based on tags and category
 */
export function getRelatedGlossaryTerms(
  termId: string,
  limit = 5
): GlossaryTermExtended[] {
  const currentTerm = getGlossaryTermById(termId);
  if (!currentTerm) return [];

  return SAMPLE_GLOSSARY_EXTENDED.filter((term) => {
    // Don't return the current term
    if (term.id === termId) return false;

    // Score based on matching tags and category
    let score = 0;

    // Same category bonus
    if (term.category === currentTerm.category) score += 3;

    // Matching tags bonus
    const sharedTags = term.tags?.filter((tag) =>
      currentTerm.tags?.includes(tag)
    ) || [];
    score += sharedTags.length * 2;

    return score > 0;
  })
    .sort((a, b) => {
      // Sort by relevance
      let scoreA = 0;
      let scoreB = 0;

      if (a.category === currentTerm.category) scoreA += 3;
      if (b.category === currentTerm.category) scoreB += 3;

      scoreA += (a.tags?.filter((tag) => currentTerm.tags?.includes(tag))
        .length || 0) * 2;
      scoreB += (b.tags?.filter((tag) => currentTerm.tags?.includes(tag))
        .length || 0) * 2;

      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Get glossary statistics
 */
export function getGlossaryStats() {
  return {
    totalTerms: SAMPLE_GLOSSARY_EXTENDED.length,
    categories: getAllGlossaryCategories().length,
    categoryBreakdown: getCategoryStats(),
    lettersRepresented: Object.keys(getGlossaryByLetter()).length,
  };
}

/**
 * Get glossary terms starting with a specific letter
 */
export function getGlossaryTermsByLetter(letter: string): GlossaryTermExtended[] {
  const letterGrouping = getGlossaryByLetter();
  return letterGrouping[letter.toUpperCase()] || [];
}

/**
 * Paginate glossary terms
 */
export function paginateGlossaryTerms(page: number, pageSize: number) {
  const terms = SAMPLE_GLOSSARY_EXTENDED.sort((a, b) =>
    a.term.localeCompare(b.term)
  );
  const totalPages = Math.ceil(terms.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    terms: terms.slice(startIndex, endIndex),
    page,
    pageSize,
    totalTerms: terms.length,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
