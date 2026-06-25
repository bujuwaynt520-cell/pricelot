import { Broker, Strategy, AcademyLesson, GlossaryTerm } from "../types";
import {
  SAMPLE_GLOSSARY as DATA_GLOSSARY,
  SAMPLE_LESSONS as DATA_LESSONS,
  SAMPLE_STRATEGIES as DATA_STRATEGIES,
  SAMPLE_ARTICLES as DATA_ARTICLES
} from "../data";

// Automatic Internal Linking Helper for building cohesive topical clusters
export function injectInternalLinks(text: string): string {
  const mappings = [
    { key: "spread", url: "/glossary/spread" },
    { key: "leverage", url: "/glossary/leverage" },
    { key: "FCA", url: "/glossary/evaluating-broker-regulation" },
    { key: "ASIC", url: "/glossary/evaluating-broker-regulation" },
    { key: "stop-loss", url: "/glossary/stop-loss" },
    { key: "drawdown", url: "/glossary/drawdown" },
    { key: "RSI", url: "/glossary/rsi" },
    { key: "moving average", url: "/glossary/moving-average" },
    { key: "Gold", url: "/academy/trading-gold-macro-and-volatility" },
    { key: "Forex", url: "/academy/what-is-a-pip-and-pipette" },
    { key: "Cryptocurrency", url: "/academy/cryptocurrency-trading-risk-models" }
  ];
  let result = text;
  mappings.forEach(m => {
    const regex = new RegExp(`\\b(${m.key})\\b(?![^\\[]*\\])`, "gi");
    result = result.replace(regex, `[$1](${m.url})`);
  });
  return result;
}

// 1. Scaled Glossary (200 items)
export interface ScaleGlossaryTerm extends GlossaryTerm {
  tags: string[];
  content: string;
}

export const EXPORT_GLOSSARY: ScaleGlossaryTerm[] = DATA_GLOSSARY.map(b => {
  const content = `
### Understanding the Concept of ${b.term}

In the professional trading community, **${b.term}** represents a fundamental structural concept under the **${b.category}** discipline. 

${b.definition}

To build a sustainable trading system, an operator must understand how **${b.term}** behaves during volatile conditions. For example, during high-impact news releases, the mechanics of ${b.term.toLowerCase()} often undergo rapid transformation. In ECN environments, liquidity can dry up instantly, which directly alters the spread, execution efficiency, and overall margin utilization related to this asset metric.

### Key Operational Implications for Traders

- **Tactical Risk Mitigation**: Always account for ${b.term.toLowerCase()} limits when drawing up your daily risk parameter worksheet.
- **Platform Integrity**: Ensure your trading software (such as cTrader or MetaTrader 5) supports real-time calculations for tracking ${b.term.toLowerCase()}.
- **Broker Execution Standards**: Tier-1 brokers with institutional liquidity feeds minimize the friction and latency associated with ${b.term.toLowerCase()} anomalies.

Quantitative trading models treat ${b.term.toLowerCase()} not as an abstract definition, but as a rigid mathematical boundary. For instance, when designing backtesters, optimizing parameters surrounding this variable is the difference between surviving a standard market cycle and triggering a catastrophic margin deficit.
  `;

  return {
    ...b,
    tags: [b.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "glossary", "educational"],
    content: injectInternalLinks(content)
  };
});

// 2. Scaled Academy Lessons (50 items)
export interface ScaleAcademyLesson extends AcademyLesson {
  tags: string[];
  authorId: string;
  updatedDate: string;
}

export const EXPORT_LESSONS: ScaleAcademyLesson[] = DATA_LESSONS.map((l, idx) => {
  const contentBlock = l.content.join("\n\n");
  const linkedContent = injectInternalLinks(contentBlock);
  
  return {
    ...l,
    content: [linkedContent],
    tags: [l.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "academy", "lesson"],
    authorId: idx % 2 === 0 ? "james-chen" : "john-smith",
    updatedDate: "2026-06-24"
  };
});

// 3. Scaled Strategies (50 items)
export interface ScaleStrategy extends Strategy {
  tags: string[];
  authorId: string;
  updatedDate: string;
}

export const EXPORT_STRATEGIES: ScaleStrategy[] = DATA_STRATEGIES.map((s, idx) => {
  return {
    ...s,
    tags: [s.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "strategy", "system"],
    authorId: idx % 2 === 0 ? "james-chen" : "john-smith",
    updatedDate: "2026-06-24"
  };
});

// 4. Scaled Content Articles (100 items)
export interface ScaleContentEngineArticle {
  slug: string;
  title: string;
  summary: string;
  content: string; // MDX formatted content
  category: string;
  tags: string[];
  authorId: string;
  publishedDate: string;
  updatedDate: string;
}

export const EXPORT_ARTICLES: ScaleContentEngineArticle[] = DATA_ARTICLES.map((art, idx) => {
  const mainMDX = `
# ${art.title}

${art.summary}

---

${art.content.join("\n\n")}

---

### Key Takeaways for Risk Management
1. **Always preserve capital.** No individual strategy is worth risking more than 1% of equity.
2. **Review your logs.** A weekly review of execution logs identifies systemic performance leaks.
3. **Execute mechanically.** Bypass cognitive biases and stick to your rules.
  `;

  return {
    slug: art.slug,
    title: art.title,
    summary: art.summary,
    content: injectInternalLinks(mainMDX),
    category: art.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    tags: [art.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "guide", "editorial"],
    authorId: idx % 2 === 0 ? "john-smith" : "james-chen",
    publishedDate: art.publishedDate,
    updatedDate: "2026-06-24"
  };
});

// Keep legacy bindings to prevent compilation or import issues if referenced
export const RAW_GLOSSARY_BLUEPRINTS = DATA_GLOSSARY;
export const RAW_LESSON_BLUEPRINTS = DATA_LESSONS;
export const RAW_STRATEGY_BLUEPRINTS = DATA_STRATEGIES;
export const RAW_ARTICLE_BLUEPRINTS = DATA_ARTICLES;
