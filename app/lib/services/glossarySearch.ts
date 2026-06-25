/**
 * Glossary Search & Discovery
 * Advanced search, filtering, and discovery features for glossary
 */

import type { GlossaryTermExtended } from "@/app/lib/contentEngine";
import { SAMPLE_GLOSSARY_EXTENDED } from "@/app/lib/contentEngine";

export interface SearchResult {
  id: string;
  term: string;
  definition: string;
  category: string;
  matchType: "term" | "definition" | "tag";
  relevance: number;
}

export interface SearchFilters {
  query?: string;
  categories?: string[];
  letter?: string;
  tags?: string[];
  minLength?: number;
}

/**
 * Advanced search with relevance scoring
 */
export function advancedGlossarySearch(filters: SearchFilters): SearchResult[] {
  let results: SearchResult[] = [];

  SAMPLE_GLOSSARY_EXTENDED.forEach((term) => {
    let relevance = 0;
    let matchType: "term" | "definition" | "tag" = "definition";

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(term.category)) {
        return; // Skip if category doesn't match
      }
    }

    // Letter filter
    if (filters.letter) {
      if (!term.term.toLowerCase().startsWith(filters.letter.toLowerCase())) {
        return;
      }
    }

    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        term.tags?.includes(tag)
      );
      if (!hasMatchingTag && filters.query === undefined) {
        return;
      }
    }

    // Query search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const termLower = term.term.toLowerCase();
      const defLower = term.definition.toLowerCase();

      // Exact term match = highest relevance
      if (termLower === query) {
        relevance = 100;
        matchType = "term";
      }
      // Term starts with query
      else if (termLower.startsWith(query)) {
        relevance = 90;
        matchType = "term";
      }
      // Term contains query
      else if (termLower.includes(query)) {
        relevance = 80;
        matchType = "term";
      }
      // Definition contains query
      else if (defLower.includes(query)) {
        relevance = 50;
        matchType = "definition";
      }
      // Tag contains query
      else if (term.tags?.some((tag) => tag.toLowerCase().includes(query))) {
        relevance = 40;
        matchType = "tag";
      }
    } else if (filters.categories || filters.letter || filters.tags) {
      // Default relevance when not searching by query
      relevance = 50;
    }

    if (relevance > 0) {
      results.push({
        id: term.id,
        term: term.term,
        definition: term.definition,
        category: term.category,
        matchType,
        relevance,
      });
    }
  });

  // Sort by relevance (descending), then by term (ascending)
  return results
    .sort((a, b) => b.relevance - a.relevance || a.term.localeCompare(b.term))
    .slice(0, 50); // Limit to 50 results
}

/**
 * Get search suggestions
 */
export function getSearchSuggestions(
  query: string,
  limit = 10
): Array<{ text: string; category: string }> {
  if (query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const matches = SAMPLE_GLOSSARY_EXTENDED.filter((term) => {
    const termLower = term.term.toLowerCase();
    return (
      termLower.startsWith(lowerQuery) || termLower.includes(` ${lowerQuery}`)
    );
  }).slice(0, limit);

  return matches.map((term) => ({
    text: term.term,
    category: term.category,
  }));
}

/**
 * Get trending terms
 */
export function getTrendingTerms(limit = 10): GlossaryTermExtended[] {
  // In a real implementation, this would query user search/view analytics
  // For now, return a random selection
  const shuffled = [...SAMPLE_GLOSSARY_EXTENDED].sort(
    () => Math.random() - 0.5
  );
  return shuffled.slice(0, limit);
}

/**
 * Get featured terms by category
 */
export function getFeaturedTermsByCategory(
  category: string,
  limit = 5
): GlossaryTermExtended[] {
  return SAMPLE_GLOSSARY_EXTENDED.filter((term) => term.category === category)
    .sort((a, b) => a.term.localeCompare(b.term))
    .slice(0, limit);
}

/**
 * Build search index for frontend autocomplete
 */
export function buildSearchIndex(): Array<{
  id: string;
  term: string;
  category: string;
}> {
  return SAMPLE_GLOSSARY_EXTENDED.map((term) => ({
    id: term.id,
    term: term.term,
    category: term.category,
  })).sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Get all tags used in glossary
 */
export function getAllGlossaryTags(): string[] {
  const tagsSet = new Set<string>();
  SAMPLE_GLOSSARY_EXTENDED.forEach((term) => {
    term.tags?.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Filter terms by multiple criteria
 */
export function filterGlossaryTermsAdvanced(options: {
  categories?: string[];
  tags?: string[];
  letter?: string;
  minCharacters?: number;
}): GlossaryTermExtended[] {
  let results = SAMPLE_GLOSSARY_EXTENDED;

  if (options.categories && options.categories.length > 0) {
    results = results.filter((term) =>
      options.categories!.includes(term.category)
    );
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

  if (options.minCharacters) {
    results = results.filter((term) => term.term.length >= options.minCharacters);
  }

  return results.sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Generate sitemap entries for glossary
 */
export function generateGlossarySitemapEntries(): Array<{
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}> {
  const entries: Array<{
    url: string;
    lastmod: string;
    changefreq: string;
    priority: number;
  }> = [];

  // Main glossary page
  entries.push({
    url: "/glossary",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: 0.8,
  });

  // Category pages
  const categories = new Set(
    SAMPLE_GLOSSARY_EXTENDED.map((term) => term.category)
  );
  categories.forEach((category) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    entries.push({
      url: `/glossary/category/${slug}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  // Individual term pages
  SAMPLE_GLOSSARY_EXTENDED.forEach((term) => {
    entries.push({
      url: `/glossary/${term.id}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: 0.6,
    });
  });

  return entries;
}

/**
 * Get related search queries (for "Did you mean" features)
 */
export function getRelatedSearchQueries(
  term: GlossaryTermExtended
): Array<{ term: string; score: number }> {
  const related: Array<{ term: string; score: number }> = [];

  SAMPLE_GLOSSARY_EXTENDED.forEach((t) => {
    if (t.id === term.id) return;

    let score = 0;

    // Same category match
    if (t.category === term.category) score += 5;

    // Shared tags
    const sharedTags = t.tags?.filter((tag) => term.tags?.includes(tag)) || [];
    score += sharedTags.length * 3;

    // Similar term length (suggests related topic)
    if (Math.abs(t.term.length - term.term.length) < 5) score += 1;

    if (score > 0) {
      related.push({ term: t.term, score });
    }
  });

  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((r) => ({ term: r.term, score: r.score }));
}
