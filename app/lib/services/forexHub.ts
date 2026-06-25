/**
 * PriceLot Forex Hub Seed Data
 * Complete content repository for forex education, research, strategies, and glossary
 */

export type ForexCategory =
  | "Forex Fundamentals"
  | "Forex Trading"
  | "Forex Strategies"
  | "Forex Technical Analysis"
  | "Forex Risk Management"
  | "Forex Market Structure";

export interface ForexArticle {
  slug: string;
  title: string;
  category: ForexCategory;
  author: string;
  publishDate: string;
  summary: string;
  content: string;
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

export interface ForexLesson {
  id: string;
  title: string;
  category: ForexCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

export interface ForexGlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: ForexCategory;
}

export interface ForexStrategy {
  id: string;
  name: string;
  category: ForexCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  rules: string[];
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

const FOREX_PAIRS = [
  "EURUSD",
  "USDJPY",
  "GBPUSD",
  "AUDUSD",
  "USDCAD",
  "USDCHF",
  "NZDUSD",
  "EURJPY",
  "EURGBP",
  "GBPJPY",
];

const FOREX_TOPICS = [
  { slug: "fundamentals", title: "Fundamentals", category: "Forex Fundamentals" as ForexCategory, summary: "Discover the macro and rate drivers behind currency moves." },
  { slug: "trading-basics", title: "Trading Basics", category: "Forex Trading" as ForexCategory, summary: "Learn the core rules for entering and managing forex trades." },
  { slug: "technical-analysis", title: "Technical Analysis", category: "Forex Technical Analysis" as ForexCategory, summary: "Use chart patterns and indicators to read currency pairs." },
  { slug: "risk-management", title: "Risk Management", category: "Forex Risk Management" as ForexCategory, summary: "Protect capital with position sizing, stops, and drawdown control." },
  { slug: "market-structure", title: "Market Structure", category: "Forex Market Structure" as ForexCategory, summary: "Understand trend, range, and session structure across forex markets." },
  { slug: "carry-trade", title: "Carry Trade Strategies", category: "Forex Strategies" as ForexCategory, summary: "Capture yield from currency differentials with disciplined entries." },
  { slug: "news-trading", title: "News Trading", category: "Forex Trading" as ForexCategory, summary: "Trade major economic releases and central bank announcements." },
  { slug: "intermarket", title: "Intermarket Analysis", category: "Forex Fundamentals" as ForexCategory, summary: "Learn how currencies move with yields, commodities, and equities." },
  { slug: "session-flow", title: "Session Flow", category: "Forex Market Structure" as ForexCategory, summary: "Identify the best forex sessions and liquidity windows." },
  { slug: "advanced-entries", title: "Advanced Entries", category: "Forex Strategies" as ForexCategory, summary: "Refine entry timing using confluence, levels, and momentum." },
];

const AUTHORS = [
  "Ava Carter",
  "Ethan Brooks",
  "Isla Morgan",
  "Noah Bennett",
  "Liam Chen",
  "Mia Patel",
  "Zoe Park",
  "Aria Singh",
  "Leo Wong",
  "Sofia Rivera",
];

export const FOREX_ARTICLES: ForexArticle[] = FOREX_TOPICS.flatMap((topic, topicIndex) =>
  FOREX_PAIRS.map((pair, pairIndex) => ({
    slug: `${pair.toLowerCase()}-${topic.slug}`,
    title: `${pair} ${topic.title}`,
    category: topic.category,
    author: AUTHORS[(topicIndex * FOREX_PAIRS.length + pairIndex) % AUTHORS.length],
    publishDate: `2026-06-${((topicIndex * FOREX_PAIRS.length + pairIndex) % 30) + 1}`.padStart(2, "0"),
    summary: `${topic.summary} This guide explains how traders can approach ${pair} with clarity and risk control.`,
    content: `${pair} ${topic.title} explains the most important drivers, technical levels, and decision rules for today’s currency market. Traders learn how macro data, central bank policy, and market internals shape moves in ${pair}.`,
    tags: [pair.toLowerCase(), topic.slug],
  }))
);

const LESSON_TOPICS = [
  "Forex Trading 101",
  "Currency Pair Basics",
  "Using Economic Calendars",
  "Trend Trading in Forex",
  "Range Trading Techniques",
  "Breakout Entries",
  "Managing Volatility",
  "Leverage and Margin",
  "Currency Correlations",
  "Price Action Patterns",
];

export const FOREX_LESSONS: ForexLesson[] = Array.from({ length: 50 }, (_, index) => {
  const topic = LESSON_TOPICS[index % LESSON_TOPICS.length];
  const category = [
    "Forex Fundamentals",
    "Forex Trading",
    "Forex Technical Analysis",
    "Forex Risk Management",
    "Forex Market Structure",
  ] as const;
  const lessonCategory: ForexCategory = category[index % 5];
  const difficulty = ["Beginner", "Intermediate", "Advanced"] as const;
  const lessonDifficulty: "Beginner" | "Intermediate" | "Advanced" = difficulty[index % 3];

  return {
    id: `forex-lesson-${index + 1}`,
    title: `${topic} ${index + 1}`,
    category: lessonCategory,
    difficulty: lessonDifficulty,
    readTime: `${10 + (index % 5) * 2} min`,
    summary: `A practical walkthrough of ${topic.toLowerCase()} for forex traders at every experience level.`,
    content: [
      `Step-by-step guidance for ${topic.toLowerCase()} in modern forex markets.`,
      `Key concepts include market structure, risk control, and timing the best entries.`,
      `Use real example charts to improve discipline and build consistent outcomes.`,
      `Practical takeaways focus on staying grounded during volatility and news events.`,
    ],
    tags: [topic.toLowerCase().replace(/ /g, "-"), lessonDifficulty.toLowerCase(), "forex"],
  };
});

const STRATEGY_TITLES = [
  "Momentum Trend Follow",
  "Support / Resistance Bounce",
  "Breakout Pullback",
  "Session Open Scalping",
  "Carry Trade Overlay",
  "Volatility Breakout",
  "Mean Reversion",
  "News Fade",
  "Correlation Filter",
  "Swing Positioning",
  "MACD Trend Entry",
  "RSI Reversal",
  "Moving Average Crossover",
  "Fibonacci Retracement Entry",
  "Range Breakout",
  "Multi-Timeframe Confluence",
  "Risk-Adjusted Sizing",
  "Volatility-Weighted Positioning",
  "Trend Continuation",
  "Macro Reaction Trade",
  "Pair Strength Rotation",
  "Momentum Divergence",
  "Price Action Reversal",
  "Currency Carry Strategy",
  "Micro Session Momentum",
];

export const FOREX_STRATEGIES: ForexStrategy[] = STRATEGY_TITLES.map((name, index) => {
  const strategyCategories = [
    "Forex Trading",
    "Forex Strategies",
    "Forex Technical Analysis",
    "Forex Risk Management",
    "Forex Market Structure",
  ] as const;
  const category: ForexCategory = strategyCategories[index % 5];
  const difficulty = ["Beginner", "Intermediate", "Advanced"] as const;
  const strategyDifficulty: "Beginner" | "Intermediate" | "Advanced" = difficulty[index % 3];

  return {
    id: `forex-strategy-${index + 1}`,
    name,
    category,
    difficulty: strategyDifficulty,
    description: `A ${strategyDifficulty.toLowerCase()} strategy for trading forex using ${name.toLowerCase()}.`,
    rules: [
      `Define the setup using ${name.toLowerCase()}.`,
      "Confirm the trade with risk parameters and timeframe alignment.",
      "Place a stop loss according to market structure and volatility.",
      "Manage the trade with a target based on the edge and currency pair behavior.",
    ],
    tags: [name.toLowerCase().replace(/ /g, "-"), category.toLowerCase().replace(/ /g, "-"), "forex"],
  };
});

const GLOSSARY_TERMS = [
  { id: "pip", term: "Pip", definition: "The smallest standardized price movement in forex, usually 0.0001 for major currency pairs.", category: "Forex Fundamentals" as ForexCategory },
  { id: "pipette", term: "Pipette", definition: "One-tenth of a pip, used to quote forex spreads with extra precision.", category: "Forex Fundamentals" as ForexCategory },
  { id: "lot-size", term: "Lot Size", definition: "The standardized quantity of currency units in a forex trade, such as standard, mini, and micro lots.", category: "Forex Trading" as ForexCategory },
  { id: "margin", term: "Margin", definition: "Collateral required to open and maintain leveraged forex positions.", category: "Forex Risk Management" as ForexCategory },
  { id: "leverage", term: "Leverage", definition: "The ability to control a larger position with a smaller amount of capital.", category: "Forex Risk Management" as ForexCategory },
  { id: "spread", term: "Spread", definition: "The difference between the bid and ask price of a currency pair.", category: "Forex Trading" as ForexCategory },
  { id: "base-currency", term: "Base Currency", definition: "The first currency in a pair, which is being bought or sold.", category: "Forex Fundamentals" as ForexCategory },
  { id: "quote-currency", term: "Quote Currency", definition: "The second currency in a pair, used to price the base currency.", category: "Forex Fundamentals" as ForexCategory },
  { id: "long-position", term: "Long Position", definition: "Buying the base currency in anticipation that it will strengthen against the quote currency.", category: "Forex Trading" as ForexCategory },
  { id: "short-position", term: "Short Position", definition: "Selling the base currency expecting it to weaken relative to the quote currency.", category: "Forex Trading" as ForexCategory },
  { id: "major-pairs", term: "Major Pairs", definition: "The most liquid currency pairs that include the US dollar, like EURUSD and GBPUSD.", category: "Forex Market Structure" as ForexCategory },
  { id: "minor-pairs", term: "Minor Pairs", definition: "Currency pairs that exclude the US dollar, such as EURGBP and AUDNZD.", category: "Forex Market Structure" as ForexCategory },
  { id: "exotic-pairs", term: "Exotic Pairs", definition: "Less liquid pairs made up of a major currency and an emerging-market currency.", category: "Forex Market Structure" as ForexCategory },
  { id: "bid-price", term: "Bid Price", definition: "The price at which a broker will buy the base currency from a trader.", category: "Forex Trading" as ForexCategory },
  { id: "ask-price", term: "Ask Price", definition: "The price at which a broker will sell the base currency to a trader.", category: "Forex Trading" as ForexCategory },
  { id: "slippage", term: "Slippage", definition: "The difference between the expected entry price and the actual execution price.", category: "Forex Risk Management" as ForexCategory },
  { id: "margin-call", term: "Margin Call", definition: "A broker alert that additional funds must be added to maintain open positions.", category: "Forex Risk Management" as ForexCategory },
  { id: "stop-out", term: "Stop-Out", definition: "The forced closure of positions when account equity falls below maintenance margin.", category: "Forex Risk Management" as ForexCategory },
  { id: "carry-trade", term: "Carry Trade", definition: "A strategy that profits from the interest rate differential between two currencies.", category: "Forex Strategies" as ForexCategory },
  { id: "rollover", term: "Rollover", definition: "The interest payment or receipt for holding a forex position overnight.", category: "Forex Strategies" as ForexCategory },
  { id: "news-trading", term: "News Trading", definition: "Trading currency moves around major economic announcements and events.", category: "Forex Trading" as ForexCategory },
  { id: "economic-calendar", term: "Economic Calendar", definition: "A schedule of macroeconomic releases that often drive forex volatility.", category: "Forex Fundamentals" as ForexCategory },
  { id: "central-bank", term: "Central Bank", definition: "A national bank that sets interest rate policy and influences currency direction.", category: "Forex Fundamentals" as ForexCategory },
  { id: "interest-rate-differential", term: "Interest Rate Differential", definition: "The gap between the policy rates of two currencies that affects carry trades.", category: "Forex Fundamentals" as ForexCategory },
  { id: "volatility", term: "Volatility", definition: "The degree of currency price fluctuation over a given period.", category: "Forex Market Structure" as ForexCategory },
  { id: "trend", term: "Trend", definition: "The prevailing direction of a currency pair over time.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "support", term: "Support", definition: "A price level where buying interest tends to stop a decline.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "resistance", term: "Resistance", definition: "A price level where selling pressure tends to cap advances.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "pivot-points", term: "Pivot Points", definition: "Calculated levels used to estimate support and resistance.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "fibonacci", term: "Fibonacci Retracement", definition: "Technical levels based on ratios used to identify pullback targets.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "moving-average", term: "Moving Average", definition: "A smoothed average used to identify trend direction and dynamic support.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "macd", term: "MACD", definition: "A momentum oscillator used for trend and momentum confirmation.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "rsi", term: "RSI", definition: "An oscillator measuring overbought and oversold conditions.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "trendline", term: "Trendline", definition: "A diagonal line connecting swing highs or lows to show direction.", category: "Forex Technical Analysis" as ForexCategory },
  { id: "breakout", term: "Breakout", definition: "A move beyond a defined support or resistance zone.", category: "Forex Trading" as ForexCategory },
  { id: "false-breakout", term: "False Breakout", definition: "A breakout that fails and reverses back into the prior range.", category: "Forex Trading" as ForexCategory },
  { id: "order-flow", term: "Order Flow", definition: "The buying and selling pressure visible in price action and volume.", category: "Forex Market Structure" as ForexCategory },
  { id: "liquidity", term: "Liquidity", definition: "The ease of buying or selling a currency pair without moving the market too much.", category: "Forex Market Structure" as ForexCategory },
  { id: "session-overlap", term: "Session Overlap", definition: "Periods when multiple major forex trading sessions are open together.", category: "Forex Market Structure" as ForexCategory },
  { id: "risk-reward", term: "Risk/Reward Ratio", definition: "The relationship between potential profit and potential loss on a trade.", category: "Forex Risk Management" as ForexCategory },
  { id: "position-sizing", term: "Position Sizing", definition: "Determining trade size based on risk tolerance and stop distance.", category: "Forex Risk Management" as ForexCategory },
  { id: "stop-loss", term: "Stop Loss", definition: "An order placed to close a position at a predetermined loss level.", category: "Forex Risk Management" as ForexCategory },
  { id: "take-profit", term: "Take Profit", definition: "An order placed to close a position at a targeted profit level.", category: "Forex Risk Management" as ForexCategory },
  { id: "correlation", term: "Correlation", definition: "How currency pairs move relative to each other.", category: "Forex Fundamentals" as ForexCategory },
  { id: "supply-demand", term: "Supply and Demand", definition: "The balance of buyers and sellers that creates price levels.", category: "Forex Fundamentals" as ForexCategory },
  { id: "hedging", term: "Hedging", definition: "Taking an offsetting position to reduce directional risk.", category: "Forex Risk Management" as ForexCategory },
  { id: "trade-journal", term: "Trade Journal", definition: "A record of trades used to review performance and improve discipline.", category: "Forex Risk Management" as ForexCategory },
  { id: "backtesting", term: "Backtesting", definition: "Testing a strategy using historical price data before trading live.", category: "Forex Strategies" as ForexCategory },
];

export const FOREX_GLOSSARY: ForexGlossaryTerm[] = GLOSSARY_TERMS;

export function getForexHub() {
  return {
    articles: FOREX_ARTICLES,
    lessons: FOREX_LESSONS,
    glossary: FOREX_GLOSSARY,
    strategies: FOREX_STRATEGIES,
    stats: {
      articlesCount: FOREX_ARTICLES.length,
      lessonsCount: FOREX_LESSONS.length,
      glossaryCount: FOREX_GLOSSARY.length,
      strategiesCount: FOREX_STRATEGIES.length,
    },
  };
}

export function getRelatedForexContent(slug: string, type: "article" | "lesson", limit = 3) {
  if (type === "article") {
    const article = FOREX_ARTICLES.find((a) => a.slug === slug);
    if (!article) return [];
    return FOREX_ARTICLES.filter((a) => a.slug !== slug && a.tags.some((tag) => article.tags.includes(tag))).slice(0, limit);
  }

  const lesson = FOREX_LESSONS.find((l) => l.id === slug);
  if (!lesson) return [];
  return FOREX_LESSONS.filter((l) => l.id !== slug && l.tags.some((tag) => lesson.tags.includes(tag))).slice(0, limit);
}
