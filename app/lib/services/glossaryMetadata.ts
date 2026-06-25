/**
 * Glossary Metadata & SEO
 * Handles metadata generation, structured data, and SEO optimization for glossary pages
 */

import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import type { GlossaryTermExtended } from "@/app/lib/contentEngine";

export function buildGlossaryTermMetadata(
  term: GlossaryTermExtended,
  canonicalUrl: string
): Metadata {
  return buildPageMetadata({
    title: `${term.term} Definition | PriceLot Glossary`,
    description: `Learn what ${term.term} means in trading and finance. ${term.definition}`,
    canonical: canonicalUrl,
    keywords: [term.term, term.category, "glossary", "trading", "finance"],
    type: "article",
  });
}

export function buildGlossaryCategoryMetadata(
  category: string,
  termCount: number
): Metadata {
  return buildPageMetadata({
    title: `${category} Terms | PriceLot Glossary`,
    description: `Explore ${termCount} finance and trading terms in the ${category} category. Comprehensive definitions and explanations.`,
    canonical: `https://pricelot.com/glossary/category/${category.toLowerCase().replace(/\s+/g, "-")}`,
    keywords: [category, "glossary", "finance", "trading", "definitions"],
    type: "website",
  });
}

export function buildGlossaryIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: "Financial Glossary | PriceLot Dictionary",
    description:
      "Comprehensive financial glossary with 3,000+ trading terms and definitions. Search forex, crypto, commodities, and more.",
    canonical: "https://pricelot.com/glossary",
    keywords: ["glossary", "definitions", "finance", "trading", "dictionary"],
    type: "website",
  });
}

/**
 * Build DefinedTerm structured data for glossary terms
 */
export function buildDefinedTermStructuredData(
  term: GlossaryTermExtended,
  pageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "PriceLot Financial Glossary",
        description: "Comprehensive finance and trading terminology",
        url: "https://pricelot.com/glossary",
      },
      url: pageUrl,
      image: {
        "@type": "ImageObject",
        url: `https://via.placeholder.com/1200x630?text=${encodeURIComponent(term.term)}`,
      },
    },
    null,
    2
  );
}

/**
 * Build glossary collection schema
 */
export function buildGlossaryCollectionStructuredData(
  category: string,
  termCount: number,
  pageUrl: string,
  terms: GlossaryTermExtended[]
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category} Glossary Terms`,
      description: `Collection of ${termCount} financial and trading terms in the ${category} category`,
      url: pageUrl,
      mainEntity: {
        "@type": "ItemList",
        name: `${category} Terms`,
        description: `Financial terms related to ${category}`,
        itemListElement: terms.slice(0, 50).map((term, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: term.term,
          description: term.definition,
          url: `https://pricelot.com/glossary/${term.id}`,
        })),
      },
    },
    null,
    2
  );
}

/**
 * Build FAQ schema for glossary
 */
export function buildGlossaryFaqStructuredData(
  terms: GlossaryTermExtended[],
  pageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: pageUrl,
      mainEntity: terms.slice(0, 10).map((term) => ({
        "@type": "Question",
        name: `What does ${term.term} mean?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: term.definition,
        },
      })),
    },
    null,
    2
  );
}

/**
 * Generate breadcrumb schema
 */
export function buildGlossaryBreadcrumbStructuredData(
  termId: string,
  termName: string,
  category: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pricelot.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Glossary",
          item: "https://pricelot.com/glossary",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category,
          item: `https://pricelot.com/glossary/category/${category.toLowerCase().replace(/\s+/g, "-")}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: termName,
          item: `https://pricelot.com/glossary/${termId}`,
        },
      ],
    },
    null,
    2
  );
}

/**
 * Generate glossary index page structured data
 */
export function buildGlossaryIndexStructuredData(
  categories: string[],
  totalTerms: number
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SpecializedCollection",
      name: "PriceLot Financial Glossary",
      description: `Comprehensive glossary with ${totalTerms}+ financial and trading terms`,
      url: "https://pricelot.com/glossary",
      numberOfItems: totalTerms,
      categories: categories.map((cat) => ({
        "@type": "Thing",
        name: cat,
        url: `https://pricelot.com/glossary/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
      })),
    },
    null,
    2
  );
}

/**
 * SEO optimized term summary
 */
export function buildTermSummary(term: GlossaryTermExtended): string {
  return `${term.term} is a financial trading term in the ${term.category} category. ${term.definition}`;
}

/**
 * Generate og:image URL for term
 */
export function generateGlossaryOgImage(term: GlossaryTermExtended): string {
  const encodedTerm = encodeURIComponent(term.term);
  const encodedCategory = encodeURIComponent(term.category);
  return `https://via.placeholder.com/1200x630?text=${encodedTerm}+-+${encodedCategory}`;
}

/**
 * Generate twitter card image
 */
export function generateGlossaryTwitterImage(term: GlossaryTermExtended): string {
  return generateGlossaryOgImage(term);
}

/**
 * Get SEO-friendly slug for category
 */
export function getCategorySeoSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Get SEO-friendly description for category
 */
export function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    Forex: "Master foreign exchange trading terminology with our comprehensive forex glossary covering currency pairs, leverage, spreads, and market mechanics.",
    Crypto:
      "Understand cryptocurrency and blockchain terminology. Learn about Bitcoin, Ethereum, smart contracts, DeFi, and digital asset trading.",
    Gold: "Essential gold trading terminology including spot prices, bullion, safe-haven assets, and precious metals market dynamics.",
    Commodities:
      "Commodity trading definitions covering oil, natural gas, agricultural products, and commodity futures market mechanics.",
    Indices:
      "Stock market and indices terminology including S&P 500, NASDAQ, market cap, blue-chip stocks, and equity benchmarks.",
    "Technical Analysis":
      "Technical analysis terms including chart patterns, indicators, support/resistance, and price action analysis methods.",
    "Risk Management":
      "Risk management definitions covering position sizing, stop-loss, drawdown, value-at-risk, and capital preservation strategies.",
    "Trading Psychology":
      "Trading psychology terms explaining cognitive biases, emotional discipline, and mental frameworks for consistent trading.",
    "Fundamental Analysis":
      "Fundamental analysis terminology covering GDP, inflation, earnings, economic indicators, and financial ratios.",
    Stock: "Stock market and equity trading terms including market capitalization, dividend yields, earnings, and stock valuation metrics.",
  };

  return (
    descriptions[category] ||
    `Comprehensive glossary of ${category} trading and finance terminology.`
  );
}
