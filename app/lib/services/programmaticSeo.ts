/**
 * Programmatic SEO Engine
 * Generates page templates for long-tail keywords and various content types
 */

export type PageTemplate =
  | "what-is"
  | "how-to"
  | "comparison"
  | "best-practices"
  | "qa"
  | "guide"
  | "tutorial";

export interface ProgrammaticSeoPage {
  id: string;
  template: PageTemplate;
  title: string;
  slug: string;
  description: string;
  keyword: string;
  relatedKeywords: string[];
  category: string;
  asset?: string;
  estimatedWordCount: number;
  priority: number;
  seoScore?: number;
  contentOutline?: string[];
}

// Template generators with reusable patterns
const TEMPLATE_GENERATORS = {
  "what-is": (keyword: string, category: string) => ({
    titlePattern: `What Is {keyword}? Definition & {category}`,
    descriptionPattern: `Learn what {keyword} means in {category}. Complete definition with examples and how it affects trading.`,
    contentSections: [
      "Definition",
      "Key Characteristics",
      "Examples in Trading",
      "Related Concepts",
      "FAQs",
    ],
    wordCount: 1500,
  }),

  "how-to": (keyword: string, category: string) => ({
    titlePattern: `How To {keyword} - Step-By-Step {category} Guide`,
    descriptionPattern: `Complete guide to {keyword}. Learn {category} techniques with actionable steps, tools, and best practices.`,
    contentSections: [
      "Introduction",
      "Prerequisites",
      "Step-by-Step Guide",
      "Tools & Resources",
      "Common Mistakes",
      "Advanced Tips",
      "FAQs",
    ],
    wordCount: 2500,
  }),

  comparison: (keyword: string, category: string) => ({
    titlePattern: `{keyword} Comparison - Which {category} Tool is Best?`,
    descriptionPattern: `Compare {keyword} options in {category}. Detailed comparison table, pros/cons, and expert recommendations.`,
    contentSections: [
      "Overview",
      "Comparison Table",
      "Pros & Cons",
      "Use Cases",
      "Price Comparison",
      "Recommendations",
    ],
    wordCount: 2000,
  }),

  "best-practices": (keyword: string, category: string) => ({
    titlePattern: `{keyword} Best Practices In {category} Trading`,
    descriptionPattern: `Master {keyword} with proven best practices. Expert tips, strategies, and guidelines for {category} success.`,
    contentSections: [
      "Fundamentals",
      "Best Practices",
      "Expert Tips",
      "Common Pitfalls",
      "Implementation Guide",
      "Case Studies",
    ],
    wordCount: 2200,
  }),

  qa: (keyword: string, category: string) => ({
    titlePattern: `Frequently Asked Questions About {keyword} In {category}`,
    descriptionPattern: `Common questions about {keyword} in {category} trading answered. Expert insights and practical solutions.`,
    contentSections: [
      "General Questions",
      "Technical Questions",
      "Strategy Questions",
      "Risk Management Questions",
      "Platform Questions",
    ],
    wordCount: 1800,
  }),

  guide: (keyword: string, category: string) => ({
    titlePattern: `The Complete {keyword} Guide For {category} Traders`,
    descriptionPattern: `Comprehensive guide to {keyword} for {category} trading. Everything you need to know from beginner to advanced.`,
    contentSections: [
      "Introduction",
      "Fundamentals",
      "Intermediate Concepts",
      "Advanced Strategies",
      "Tools & Resources",
      "Conclusion",
    ],
    wordCount: 3500,
  }),

  tutorial: (keyword: string, category: string) => ({
    titlePattern: `{keyword} Tutorial: Learn {category} Trading Step-by-Step`,
    descriptionPattern: `Interactive tutorial for {keyword} in {category}. Hands-on learning with examples, exercises, and real trades.`,
    contentSections: [
      "Getting Started",
      "Basic Concepts",
      "Practical Examples",
      "Hands-On Exercises",
      "Troubleshooting",
      "Next Steps",
    ],
    wordCount: 2800,
  }),
};

/**
 * Generate programmatic SEO pages for a keyword
 */
export function generateProgrammaticPages(
  keyword: string,
  category: string,
  asset?: string
): ProgrammaticSeoPage[] {
  const pages: ProgrammaticSeoPage[] = [];
  const templates: PageTemplate[] = [
    "what-is",
    "how-to",
    "comparison",
    "best-practices",
    "qa",
  ];

  templates.forEach((template, index) => {
    const generator =
      TEMPLATE_GENERATORS[template as keyof typeof TEMPLATE_GENERATORS];
    const spec = generator(keyword, category);

    const title = spec.titlePattern
      .replace("{keyword}", keyword)
      .replace("{category}", category);
    const slug = generateSlug(title);
    const description = spec.descriptionPattern
      .replace("{keyword}", keyword)
      .replace("{category}", category);

    pages.push({
      id: `${slug}-${template}`,
      template,
      title,
      slug,
      description,
      keyword,
      relatedKeywords: generateRelatedKeywords(keyword, category),
      category,
      asset,
      estimatedWordCount: spec.wordCount,
      priority: 8 - index * 0.5,
      contentOutline: spec.contentSections,
    });
  });

  return pages;
}

/**
 * Generate comparison pages
 */
export function generateComparisonPages(
  item1: string,
  item2: string,
  category: string
): ProgrammaticSeoPage[] {
  const comparisonKeyword = `${item1} vs ${item2}`;
  const pages: ProgrammaticSeoPage[] = [];

  const title = `${item1} vs ${item2} - ${category} Comparison`;
  const slug = generateSlug(title);
  const description = `Compare ${item1} and ${item2} in ${category} trading. Detailed analysis, pros/cons, and recommendations.`;

  pages.push({
    id: `comparison-${generateSlug(item1)}-${generateSlug(item2)}`,
    template: "comparison",
    title,
    slug,
    description,
    keyword: comparisonKeyword,
    relatedKeywords: [item1, item2, category],
    category,
    estimatedWordCount: 2000,
    priority: 8,
  });

  return pages;
}

/**
 * Generate long-tail keyword pages
 */
export function generateLongTailPages(
  baseKeyword: string,
  modifiers: string[],
  category: string
): ProgrammaticSeoPage[] {
  const pages: ProgrammaticSeoPage[] = [];

  modifiers.forEach((modifier, index) => {
    const keyword = `${modifier} ${baseKeyword}`;
    const template: PageTemplate = ["what-is", "how-to", "guide"][
      index % 3
    ] as PageTemplate;

    const title = `${keyword} - ${category} Trading Guide`;
    const slug = generateSlug(title);
    const description = `Learn about ${keyword} in ${category}. Comprehensive guide with strategies and best practices.`;

    pages.push({
      id: `longtail-${generateSlug(keyword)}`,
      template,
      title,
      slug,
      description,
      keyword,
      relatedKeywords: [baseKeyword, modifier, category],
      category,
      estimatedWordCount: 1500 + Math.random() * 1000,
      priority: 6 + (5 - index) * 0.2,
    });
  });

  return pages;
}

/**
 * Generate question-based pages
 */
export function generateQuestionPages(
  questions: string[],
  category: string
): ProgrammaticSeoPage[] {
  const pages: ProgrammaticSeoPage[] = [];

  questions.forEach((question, index) => {
    const slug = generateSlug(question);
    const title = `${question}?`;
    const description = `Answer to: ${question}. Expert explanation with examples and practical applications.`;

    pages.push({
      id: `question-${slug}`,
      template: "qa",
      title,
      slug,
      description,
      keyword: question,
      relatedKeywords: question.split(" ").filter((w) => w.length > 4),
      category,
      estimatedWordCount: 800,
      priority: 5 + Math.random() * 3,
    });
  });

  return pages;
}

/**
 * Generate related keywords for a main keyword
 */
function generateRelatedKeywords(keyword: string, category: string): string[] {
  const modifiers = [
    "best practices",
    "tutorial",
    "guide",
    "strategies",
    "examples",
    "tips",
    "mistakes",
  ];
  return modifiers
    .slice(0, 4)
    .map((mod) => `${keyword} ${mod}`)
    .concat([keyword, category]);
}

/**
 * Generate URL-friendly slug
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 75);
}

/**
 * Calculate SEO score for programmatic page
 */
export function calculateProgrammaticPageScore(
  page: ProgrammaticSeoPage
): number {
  let score = 50;

  // Content length
  score += page.estimatedWordCount > 2000 ? 15 : 5;

  // Keyword relevance
  score += page.relatedKeywords.length * 2;

  // Content outline
  if (page.contentOutline) {
    score += Math.min(page.contentOutline.length * 2, 15);
  }

  // Priority
  score += page.priority;

  return Math.min(score, 100);
}

/**
 * Get all programmatic page templates
 */
export function getAllPageTemplates(): PageTemplate[] {
  return Object.keys(TEMPLATE_GENERATORS) as PageTemplate[];
}

/**
 * Get template specification
 */
export function getTemplateSpec(template: PageTemplate) {
  return TEMPLATE_GENERATORS[template as keyof typeof TEMPLATE_GENERATORS];
}

/**
 * Generate comprehensive page set for asset
 */
export function generateAssetPageSet(
  assetName: string,
  category: string
): ProgrammaticSeoPage[] {
  const pages: ProgrammaticSeoPage[] = [];

  // Core pages
  pages.push(
    ...generateProgrammaticPages(assetName, category, assetName)
  );

  // Comparison pages
  const commonComparisons =
    category === "Forex" ? ["USD", "EUR", "GBP"] : ["alternative"];
  if (commonComparisons[0] !== "alternative") {
    pages.push(
      ...generateComparisonPages(assetName, commonComparisons[0], category)
    );
  }

  // Long-tail pages
  const modifiers =
    category === "Forex"
      ? ["best time to trade", "technical analysis for", "risk management for"]
      : ["how to trade", "strategies for", "best practices for"];
  pages.push(...generateLongTailPages(assetName, modifiers, category));

  return pages;
}
