/**
 * PriceLot Content Engine V1
 * An Investopedia-scale financial education taxonomy, MDX, and metadata platform.
 */

import { Broker, Strategy, AcademyLesson, GlossaryTerm, SponsoredContent } from "../types";
import { SAMPLE_BROKERS } from "../data";

// ==========================================
// 1. Author Model & Registry
// ==========================================
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  linkedin?: string;
}

export const AUTHORS: Record<string, Author> = {
  "jane-doe": {
    id: "jane-doe",
    name: "Jane Doe, CFA",
    avatar: "👩‍💼",
    role: "Senior Quantitative Analyst",
    bio: "Jane has 12+ years of experience trading currency derivatives and designing programmatic hedging strategies for European pension funds.",
    twitter: "https://twitter.com/janedoe_cfa",
    linkedin: "https://linkedin.com/in/janedoe-cfa"
  },
  "john-smith": {
    id: "john-smith",
    name: "John Smith",
    avatar: "👨‍💻",
    role: "Director of Systematic Trading Systems",
    bio: "John is an ex-FX spot trader at a Tier-1 investment bank. He specializes in low-latency execution and ATR-based risk management systems.",
    twitter: "https://twitter.com/johnsmith_fx",
    linkedin: "https://linkedin.com/in/johnsmith-systematic"
  },
  "editorial-board": {
    id: "editorial-board",
    name: "PriceLot Editorial Board",
    avatar: "🛡️",
    role: "Independent Audit Committee",
    bio: "Our editorial board consists of industry veterans committed to strict objectivity, regulatory transparency, and un-referred brokerage auditing."
  }
};

// ==========================================
// 2. Category Model & Registry
// ==========================================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Record<string, Category> = {
  "beginners-guide": {
    id: "beginners-guide",
    name: "Beginners Guide",
    slug: "beginners-guide",
    description: "Foundational concepts including pips, leverage, order execution, and basic capital protection frameworks.",
    icon: "GraduationCap"
  },
  "technical-analysis": {
    id: "technical-analysis",
    name: "Technical Analysis",
    slug: "technical-analysis",
    description: "Deep-dives into chart patterns, horizontal zones, momentum oscillators, and multi-timeframe correlation.",
    icon: "TrendingUp"
  },
  "risk-management": {
    id: "risk-management",
    name: "Risk Management",
    slug: "risk-management",
    description: "Mathematical models and allocation policies designed to mitigate drawdowns and survive extreme volatility cycles.",
    icon: "ShieldAlert"
  },
  "trading-psychology": {
    id: "trading-psychology",
    name: "Trading Psychology",
    slug: "trading-psychology",
    description: "Frameworks to govern cognitive biases, combat revenge trading, and maintain mechanical execution consistency.",
    icon: "Award"
  },
  "pro-trading-guides": {
    id: "pro-trading-guides",
    name: "Pro Trading Guides",
    slug: "pro-trading-guides",
    description: "Advanced quantitative journals, proprietary firm evaluations, API trading, and custom platform setups.",
    icon: "Layers"
  },
  "forex-basics": {
    id: "forex-basics",
    name: "Forex Basics",
    slug: "forex-basics",
    description: "Core terminology and mechanisms governing the foreign exchange market.",
    icon: "Globe"
  }
};

// ==========================================
// 3. Dynamic MDX/Markdown Content Repositories
// ==========================================
export interface ContentEngineArticle {
  slug: string;
  title: string;
  summary: string;
  content: string; // MDX formatted content
  category: string;
  tags: string[];
  authorId: string;
  publishedDate: string;
  updatedDate: string;
  featuredImage?: string; // URL to featured/hero image
  thumbnailImage?: string; // URL to thumbnail for lists
  videoUrl?: string; // Optional YouTube, Vimeo, or direct video URL
}

import { EXPORT_GLOSSARY, EXPORT_LESSONS, EXPORT_STRATEGIES, EXPORT_ARTICLES } from "./contentData";

export const ENGINE_ARTICLES: ContentEngineArticle[] = EXPORT_ARTICLES;

// ==========================================
// 4. Reading Time Calculation Engine
// ==========================================
export function calculateReadingTime(content: string): string {
  if (!content) return "1 min read";
  const wordsPerMinute = 200; // Technical content has slower reading rates
  const cleanContent = content.replace(/[#*`$\-\n]/g, " "); // Strip markdown characters
  const wordCount = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// ==========================================
// 5. Related Content Engine
// ==========================================
export interface RelatedItem {
  idOrSlug: string;
  title: string;
  type: "article" | "glossary" | "academy" | "strategy" | "broker";
  url: string;
  category: string;
}

export function getRelatedContent(
  currentIdOrSlug: string,
  currentType: "article" | "glossary" | "academy" | "strategy" | "broker",
  limit: number = 3
): RelatedItem[] {
  const currentTags: string[] = [];
  let currentCategory = "";

  // Get current item's tags and category
  if (currentType === "article") {
    const art = ENGINE_ARTICLES.find(a => a.slug === currentIdOrSlug);
    if (art) {
      currentTags.push(...art.tags);
      currentCategory = art.category;
    }
  } else if (currentType === "glossary") {
    const term = SAMPLE_GLOSSARY_EXTENDED.find(g => g.id === currentIdOrSlug);
    if (term) {
      if (term.tags) currentTags.push(...term.tags);
      currentCategory = term.category;
    }
  } else if (currentType === "academy") {
    const lesson = SAMPLE_LESSONS_EXTENDED.find(l => l.id === currentIdOrSlug);
    if (lesson) {
      currentTags.push(...lesson.tags);
      currentCategory = lesson.category;
    }
  } else if (currentType === "strategy") {
    const strat = SAMPLE_STRATEGIES_EXTENDED.find(s => s.id === currentIdOrSlug);
    if (strat) {
      currentTags.push(...strat.tags);
      currentCategory = strat.category;
    }
  }

  const candidates: RelatedItem[] = [];

  // Gather articles
  ENGINE_ARTICLES.forEach(art => {
    if (currentType === "article" && art.slug === currentIdOrSlug) return;
    let score = 0;
    if (art.category === currentCategory) score += 3;
    const overlap = art.tags.filter(t => currentTags.includes(t)).length;
    score += overlap * 2;
    if (score > 0) {
      candidates.push({
        idOrSlug: art.slug,
        title: art.title,
        type: "article",
        url: `/articles/${art.slug}`,
        category: art.category,
        // @ts-ignore
        score
      });
    }
  });

  // Gather lessons
  SAMPLE_LESSONS_EXTENDED.forEach(lesson => {
    if (currentType === "academy" && lesson.id === currentIdOrSlug) return;
    let score = 0;
    if (lesson.category === currentCategory) score += 3;
    const overlap = lesson.tags.filter(t => currentTags.includes(t)).length;
    score += overlap * 2;
    if (score > 0) {
      candidates.push({
        idOrSlug: lesson.id,
        title: lesson.title,
        type: "academy",
        url: `/academy/${lesson.id}`,
        category: lesson.category,
        // @ts-ignore
        score
      });
    }
  });

  // Gather strategies
  SAMPLE_STRATEGIES_EXTENDED.forEach(strat => {
    if (currentType === "strategy" && strat.id === currentIdOrSlug) return;
    let score = 0;
    if (strat.category === currentCategory) score += 3;
    const overlap = strat.tags.filter(t => currentTags.includes(t)).length;
    score += overlap * 2;
    if (score > 0) {
      candidates.push({
        idOrSlug: strat.id,
        title: strat.name,
        type: "strategy",
        url: `/strategies/${strat.id}`,
        category: strat.category,
        // @ts-ignore
        score
      });
    }
  });

  // Sort by score descending and return top matches
  // @ts-ignore
  return candidates.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ==========================================
// 6. Complete Data Extensions
// ==========================================

export interface AcademyLessonExtended extends AcademyLesson {
  tags: string[];
  authorId: string;
  updatedDate: string;
}

export const SAMPLE_LESSONS_EXTENDED: AcademyLessonExtended[] = EXPORT_LESSONS;

export interface StrategyExtended extends Strategy {
  tags: string[];
  authorId: string;
  updatedDate: string;
}

export const SAMPLE_STRATEGIES_EXTENDED: StrategyExtended[] = EXPORT_STRATEGIES;

export interface GlossaryTermExtended extends GlossaryTerm {
  tags?: string[];
  content?: string;
}

export const SAMPLE_GLOSSARY_EXTENDED: GlossaryTermExtended[] = EXPORT_GLOSSARY;

// ==========================================
// 7. Dynamic Breadcrumbs Engine
// ==========================================
export interface BreadcrumbLink {
  label: string;
  url: string;
}

export function getBreadcrumbs(pathname: string): BreadcrumbLink[] {
  const crumbs: BreadcrumbLink[] = [{ label: "Home", url: "/" }];
  if (!pathname) return crumbs;

  const segments = pathname.split("/").filter(Boolean);
  let currentUrl = "";

  segments.forEach((segment, index) => {
    currentUrl += `/${segment}`;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Resolve specific, rich titles based on IDs
    if (index === 1) {
      const parent = segments[0];
      if (parent === "articles") {
        const art = ENGINE_ARTICLES.find(a => a.slug === segment);
        if (art) label = art.title;
      } else if (parent === "brokers") {
        const broker = SAMPLE_BROKERS.find(b => b.id === segment);
        if (broker) label = broker.name;
      } else if (parent === "strategies") {
        const strat = SAMPLE_STRATEGIES_EXTENDED.find(s => s.id === segment);
        if (strat) label = strat.name;
      } else if (parent === "academy") {
        const lesson = SAMPLE_LESSONS_EXTENDED.find(l => l.id === segment);
        if (lesson) label = lesson.title;
      } else if (parent === "glossary") {
        const term = SAMPLE_GLOSSARY_EXTENDED.find(g => g.id === segment);
        if (term) label = term.term;
      } else if (parent === "compare") {
        const [first, second] = segment.split("-vs-");
        const brokerA = SAMPLE_BROKERS.find(b => b.id === first);
        const brokerB = SAMPLE_BROKERS.find(b => b.id === second);
        if (brokerA && brokerB) {
          label = `Compare ${brokerA.name} vs ${brokerB.name}`;
        } else {
          label = "Compare Brokers";
        }
      }
    } else {
      // Map directory routes to standard readable names
      if (segment === "brokers") label = "Broker Reviews";
      else if (segment === "strategies") label = "Strategy Library";
      else if (segment === "academy") label = "Trading Academy";
      else if (segment === "glossary") label = "Financial Glossary";
      else if (segment === "articles") label = "Guides & Editorial";
      else if (segment === "compare") label = "Compare Brokers";
      else if (segment === "tools") label = "Trading Tools";
    }

    crumbs.push({ label, url: currentUrl });
  });

  return crumbs;
}

// ==========================================
// 8. Search Indexing System
// ==========================================
export interface SearchIndexItem {
  idOrSlug: string;
  type: "broker" | "strategy" | "academy" | "glossary" | "article" | "tool";
  title: string;
  summary: string;
  url: string;
  category: string;
  keywords: string[];
}

export function generateSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];

  // Home and static tools
  index.push({
    idOrSlug: "home",
    type: "tool",
    title: "PriceLot Trading Hub Dashboard",
    summary: "Dynamic financial comparison portal featuring regulated broker evaluations, mathematical strategy backtesters, courses, and dictionary terms.",
    url: "/",
    category: "system",
    keywords: ["dashboard", "home", "pricelot", "forex", "hub", "portal"]
  });

  index.push({
    idOrSlug: "calculator",
    type: "tool",
    title: "Risk & Position Sizing Calculator",
    summary: "Calculate precise trade lot contract sizing based on strict risk ceiling margins to protect equity from severe drawdowns.",
    url: "/tools",
    category: "risk-management",
    keywords: ["calculator", "position sizing", "lot size", "pips", "leverage", "risk allocation"]
  });

  // Index Articles
  ENGINE_ARTICLES.forEach(art => {
    index.push({
      idOrSlug: art.slug,
      type: "article",
      title: art.title,
      summary: art.summary,
      url: `/articles/${art.slug}`,
      category: art.category,
      keywords: [...art.tags, art.title.toLowerCase(), "article", "guide"]
    });
  });

  // Index Brokers
  SAMPLE_BROKERS.forEach(b => {
    index.push({
      idOrSlug: b.id,
      type: "broker",
      title: `${b.name} Broker Audit`,
      summary: b.summary,
      url: `/brokers/${b.id}`,
      category: "broker-reviews",
      keywords: ["broker", b.name, "regulated", ...b.regulatedBy, ...b.platforms]
    });
  });

  // Index Strategies
  SAMPLE_STRATEGIES_EXTENDED.forEach(s => {
    index.push({
      idOrSlug: s.id,
      type: "strategy",
      title: s.name,
      summary: s.description,
      url: `/strategies/${s.id}`,
      category: s.category,
      keywords: [...s.tags, s.name, "rules", "backtest", ...s.indicators]
    });
  });

  // Index Academy
  SAMPLE_LESSONS_EXTENDED.forEach(l => {
    index.push({
      idOrSlug: l.id,
      type: "academy",
      title: l.title,
      summary: l.summary,
      url: `/academy/${l.id}`,
      category: l.category,
      keywords: [...l.tags, l.title, "quiz", "course", "lesson"]
    });
  });

  // Index Glossary
  SAMPLE_GLOSSARY_EXTENDED.forEach(g => {
    index.push({
      idOrSlug: g.id,
      type: "glossary",
      title: g.term,
      summary: g.definition,
      url: `/glossary/${g.id}`,
      category: g.category,
      keywords: [...(g.tags || []), g.term, "dictionary", "definition", g.letter]
    });
  });

  return index;
}

export interface TagSummary {
  tag: string;
  count: number;
}

export interface AuthorSummary {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  count: number;
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = Object.keys(CATEGORIES).reduce((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {} as Record<string, number>);

  const categoryNameToId = Object.values(CATEGORIES).reduce((acc, category) => {
    acc[category.name.toLowerCase().trim()] = category.id;
    return acc;
  }, {} as Record<string, string>);

  const recordItemCategory = (categoryName: string) => {
    const normalized = categoryName.toLowerCase().trim();
    const categoryId = categoryNameToId[normalized];
    if (categoryId) {
      counts[categoryId] = (counts[categoryId] || 0) + 1;
    }
  };

  ENGINE_ARTICLES.forEach((item) => recordItemCategory(item.category));
  SAMPLE_LESSONS_EXTENDED.forEach((item) => recordItemCategory(item.category));
  SAMPLE_STRATEGIES_EXTENDED.forEach((item) => recordItemCategory(item.category));
  SAMPLE_GLOSSARY_EXTENDED.forEach((item) => recordItemCategory(item.category));

  return counts;
}

export function getTagSummary(): TagSummary[] {
  const tagMap = new Map<string, TagSummary>();

  const accumulateTags = (tags?: string[]) => {
    tags?.forEach((tag) => {
      const normalized = tag.toLowerCase().trim();
      if (!normalized) return;
      const existing = tagMap.get(normalized);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(normalized, { tag: tag.trim(), count: 1 });
      }
    });
  };

  ENGINE_ARTICLES.forEach((item) => accumulateTags(item.tags));
  SAMPLE_LESSONS_EXTENDED.forEach((item) => accumulateTags(item.tags));
  SAMPLE_STRATEGIES_EXTENDED.forEach((item) => accumulateTags(item.tags));
  SAMPLE_GLOSSARY_EXTENDED.forEach((item) => accumulateTags(item.tags));

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getAuthorSummaries(): AuthorSummary[] {
  const authorCounts = Object.keys(AUTHORS).reduce((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {} as Record<string, number>);

  ENGINE_ARTICLES.forEach((item) => {
    if (authorCounts[item.authorId] !== undefined) {
      authorCounts[item.authorId] += 1;
    }
  });

  SAMPLE_LESSONS_EXTENDED.forEach((item) => {
    if (authorCounts[item.authorId] !== undefined) {
      authorCounts[item.authorId] += 1;
    }
  });

  SAMPLE_STRATEGIES_EXTENDED.forEach((item) => {
    if (authorCounts[item.authorId] !== undefined) {
      authorCounts[item.authorId] += 1;
    }
  });

  return Object.values(AUTHORS).map((author) => ({
    ...author,
    count: authorCounts[author.id] || 0,
  }));
}

// ==========================================
// 9. Structured Schema.org (JSON-LD) Generators
// ==========================================
export function getJsonLdBreadcrumbs(pathname: string): string {
  const crumbs = getBreadcrumbs(pathname);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://pricelot.com${crumb.url === "/" ? "" : crumb.url}`
    }))
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdArticle(article: ContentEngineArticle, author: Author): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pricelot.com/articles/${article.slug}`
    },
    "headline": article.title,
    "description": article.summary,
    "datePublished": `${article.publishedDate}T08:00:00Z`,
    "dateModified": `${article.updatedDate}T08:00:00Z`,
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "PriceLot Financial",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pricelot.com/assets/logo.png"
      }
    }
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdSponsoredContent(content: SponsoredContent): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "headline": content.title,
    "description": content.description,
    "isAccessibleForFree": true,
    "sponsor": {
      "@type": "Organization",
      "name": content.sponsorName,
    },
  };

  return JSON.stringify(schema, null, 2);
}

export function getJsonLdGlossary(term: GlossaryTermExtended): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://pricelot.com/glossary/${term.id}`,
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "PriceLot Market Vocabulary Set",
      "url": "https://pricelot.com/glossary"
    }
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdCourse(lesson: AcademyLessonExtended): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": lesson.title,
    "description": lesson.summary,
    "provider": {
      "@type": "Organization",
      "name": "PriceLot Academy",
      "sameAs": "https://pricelot.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "duration": lesson.readTime === "5 min read" ? "PT5M" : lesson.readTime === "6 min read" ? "PT6M" : lesson.readTime === "7 min read" ? "PT7M" : "PT8M"
    }
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdReview(broker: Broker): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "image": "https://pricelot.com/assets/logo.png",
      "priceRange": `Min Deposit $${broker.minDeposit}`
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.rating,
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "PriceLot Intelligence Audits"
    },
    "reviewBody": broker.summary,
    "publisher": {
      "@type": "Organization",
      "name": "PriceLot Portal"
    }
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdComparison(brokerA: Broker, brokerB: Broker): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Compare ${brokerA.name} vs ${brokerB.name}`,
    "description": `Side-by-side broker comparison of ${brokerA.name} and ${brokerB.name} across regulation, spreads, commission, leverage, platforms, deposit, and instruments.`,
    "url": `https://pricelot.com/compare/${brokerA.id}-vs-${brokerB.id}`,
    "mainEntity": [
      {
        "@type": "FinancialService",
        "name": brokerA.name,
        "provider": {
          "@type": "Organization",
          "name": "PriceLot"
        }
      },
      {
        "@type": "FinancialService",
        "name": brokerB.name,
        "provider": {
          "@type": "Organization",
          "name": "PriceLot"
        }
      }
    ]
  };
  return JSON.stringify(schema, null, 2);
}

export function getJsonLdStrategy(strat: StrategyExtended): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": strat.name,
    "description": strat.description,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "BUY Trigger",
        "text": strat.rules.buy.join(" ")
      },
      {
        "@type": "HowToStep",
        "name": "SELL Trigger",
        "text": strat.rules.sell.join(" ")
      }
    ]
  };
  return JSON.stringify(schema, null, 2);
}
