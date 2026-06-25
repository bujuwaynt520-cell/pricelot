/**
 * PriceLot Commodities Hub Seed Data
 * Complete content repository for commodities trading education, lessons, strategies, and glossary
 */

export type CommoditiesCategory =
  | "Commodities Fundamentals"
  | "Commodities Trading"
  | "Commodities Strategies"
  | "Commodities Technical Analysis"
  | "Commodities Risk Management"
  | "Commodities Market Structure";

export interface CommoditiesArticle {
  slug: string;
  title: string;
  category: CommoditiesCategory;
  author: string;
  publishDate: string;
  summary: string;
  content: string;
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

export interface CommoditiesLesson {
  id: string;
  title: string;
  category: CommoditiesCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

export interface CommoditiesGlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: CommoditiesCategory;
}

export interface CommoditiesStrategy {
  id: string;
  name: string;
  category: CommoditiesCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  rules: string[];
  tags: string[];
  featuredImage?: string;
  thumbnailImage?: string;
  videoUrl?: string;
}

const COMMODITY_TYPES = [
  { key: "crude-oil", name: "Crude Oil" },
  { key: "brent-oil", name: "Brent Oil" },
  { key: "natural-gas", name: "Natural Gas" },
  { key: "silver", name: "Silver" },
  { key: "copper", name: "Copper" },
  { key: "wheat", name: "Wheat" },
  { key: "corn", name: "Corn" },
  { key: "coffee", name: "Coffee" },
  { key: "cocoa", name: "Cocoa" },
  { key: "sugar", name: "Sugar" },
  { key: "palladium", name: "Palladium" },
];

const COMMODITIES_TOPICS = [
  {
    slug: "fundamentals",
    title: "Fundamentals",
    category: "Commodities Fundamentals" as CommoditiesCategory,
    summary: "Understand the macro drivers and supply-demand forces behind commodities markets.",
  },
  {
    slug: "trading-basics",
    title: "Trading Basics",
    category: "Commodities Trading" as CommoditiesCategory,
    summary: "Learn the key trading principles for energy, metals, and agricultural commodities.",
  },
  {
    slug: "technical-analysis",
    title: "Technical Analysis",
    category: "Commodities Technical Analysis" as CommoditiesCategory,
    summary: "Apply chart patterns, trend structure, and indicators to commodity markets.",
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    category: "Commodities Risk Management" as CommoditiesCategory,
    summary: "Manage position size, volatility, and event risk across commodity trades.",
  },
  {
    slug: "market-structure",
    title: "Market Structure",
    category: "Commodities Market Structure" as CommoditiesCategory,
    summary: "Study term structure, contango/backwardation, and the physical market context.",
  },
  {
    slug: "seasonality",
    title: "Seasonality",
    category: "Commodities Fundamentals" as CommoditiesCategory,
    summary: "Track seasonal patterns that influence energy, agricultural, and metal prices.",
  },
  {
    slug: "supply-demand",
    title: "Supply & Demand",
    category: "Commodities Fundamentals" as CommoditiesCategory,
    summary: "Monitor inventories, production, and demand shifts that move commodity prices.",
  },
  {
    slug: "volatility",
    title: "Volatility",
    category: "Commodities Trading" as CommoditiesCategory,
    summary: "Trade with volatility awareness and adapt to range-bound or breakout environments.",
  },
  {
    slug: "spread-analysis",
    title: "Spread Analysis",
    category: "Commodities Strategies" as CommoditiesCategory,
    summary: "Use spread relationships to identify relative value opportunities across commodity contracts.",
  },
  {
    slug: "hedging-techniques",
    title: "Hedging Techniques",
    category: "Commodities Risk Management" as CommoditiesCategory,
    summary: "Hedge exposure using futures, options, and portfolio diversification tactics.",
  },
  {
    slug: "portfolio-diversification",
    title: "Portfolio Diversification",
    category: "Commodities Risk Management" as CommoditiesCategory,
    summary: "Add commodities to a portfolio for broader diversification and risk balance.",
  },
];

const AUTHORS = [
  "Mia Brooks",
  "Jordan Hale",
  "Avery Kim",
  "Evan Park",
  "Tara Grant",
  "Noah Lee",
  "Iris Nguyen",
  "Luca Patel",
  "Sofia Malik",
  "Cameron Reed",
];

export const COMMODITIES_ARTICLES: CommoditiesArticle[] = COMMODITIES_TOPICS.flatMap((topic, topicIndex) =>
  COMMODITY_TYPES.map((commodity, commodityIndex) => ({
    slug: `${topic.slug}-${commodity.key}`,
    title: `${commodity.name} ${topic.title}`,
    category: topic.category,
    author: AUTHORS[(topicIndex * COMMODITY_TYPES.length + commodityIndex) % AUTHORS.length],
    publishDate: `2026-06-${((topicIndex * COMMODITY_TYPES.length + commodityIndex) % 25) + 1}`.padStart(2, "0"),
    summary: `${topic.summary} The article explains how ${commodity.name} behaves and how traders can build confidence in this market.`,
    content: `${commodity.name} ${topic.title} explains the most important factors, technical levels, seasonality, and risk controls for traders. The guide is written to help both new and experienced traders navigate commodity price action with clarity and discipline.`,
    tags: [commodity.key, topic.slug],
  }))
).slice(0, 70);

export const COMMODITIES_LESSONS: CommoditiesLesson[] = [
  {
    id: "commodities-101",
    title: "Commodities Trading 101",
    category: "Commodities Fundamentals",
    difficulty: "Beginner",
    readTime: "12 min",
    summary: "Core fundamentals for starting commodities trading.",
    content: [
      "Commodity prices move on supply, demand, macro policy, and inventory data.",
      "Crude oil, metals, and softs each have unique seasonality and drivers.",
      "A solid risk management plan helps protect capital when prices move fast.",
      "Learn the basics of futures, contract sizing, and margin for commodity markets.",
    ],
    tags: ["fundamentals", "commodities", "beginner"],
  },
  {
    id: "commodity-supply-demand",
    title: "Supply & Demand in Commodities",
    category: "Commodities Fundamentals",
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Analyze physical and financial supply-demand cycles for commodity trade setups.",
    content: [
      "Inventory levels and production forecasts set the tone for commodity supply.",
      "Demand signals from industrial use, weather, and macro growth are critical.",
      "Trade using inventories, rig counts, and export data as leading indicators.",
      "Recognize when supply shocks or demand shifts are already priced into the market.",
    ],
    tags: ["supply", "demand", "analysis"],
  },
  {
    id: "commodity-technical-analysis",
    title: "Technical Analysis for Commodities",
    category: "Commodities Technical Analysis",
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Apply charting tools and indicators to commodity markets.",
    content: [
      "Identify trend direction with moving averages and structure.",
      "Use support and resistance zones from supply/demand levels.",
      "Oscillators like RSI and MACD help gauge momentum and exhaustion.",
      "Combine indicators with price action for higher confidence entries.",
    ],
    tags: ["technical", "analysis", "commodities"],
  },
  {
    id: "commodity-risk-management",
    title: "Commodities Risk Management",
    category: "Commodities Risk Management",
    difficulty: "Beginner",
    readTime: "13 min",
    summary: "Position sizing and stop placement for commodity trades.",
    content: [
      "Commodities can move rapidly; use smaller size when volatility rises.",
      "Calculate risk per trade based on contract value and the stop distance.",
      "Avoid overexposure to one commodity or one directional theme.",
      "Review drawdowns and adjust risk after large moves or news events.",
    ],
    tags: ["risk", "management", "sizing"],
  },
  {
    id: "commodity-seasonality",
    title: "Seasonality in Commodities",
    category: "Commodities Market Structure",
    difficulty: "Intermediate",
    readTime: "13 min",
    summary: "Trade seasonal patterns in energy, metals, and agricultural markets.",
    content: [
      "Wheat and corn often follow planting and harvest cycles.",
      "Natural gas demand increases in winter and can drive sharp moves.",
      "Precious metals may show seasonal strength around central bank demand.",
      "Use seasonal context as part of your timing and risk assessment.",
    ],
    tags: ["seasonality", "market structure", "commodities"],
  },
  {
    id: "commodity-hedging-techniques",
    title: "Hedging Commodity Exposure",
    category: "Commodities Risk Management",
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "Use futures and options to protect commodity exposures.",
    content: [
      "Hedge physical exposure with futures contracts and roll strategy.",
      "Options provide defined-risk protection against adverse price moves.",
      "Balance hedging cost versus the protection it delivers.",
      "Monitor basis risk and the impact of delivery/roll cycles.",
    ],
    tags: ["hedging", "options", "risk management"],
  },
  {
    id: "commodity-portfolio-diversification",
    title: "Commodity Portfolio Diversification",
    category: "Commodities Risk Management",
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Build a commodity portfolio that balances energy, metals, and softs.",
    content: [
      "Diversify across commodities to reduce idiosyncratic risk.",
      "Consider correlation between gold, oil, and agricultural markets.",
      "Allocate by liquidity and volatility to keep risk balanced.",
      "Review allocations as macro conditions and seasonality shift.",
    ],
    tags: ["portfolio", "diversification", "allocation"],
  },
  {
    id: "commodity-volatility-trading",
    title: "Volatility Trading in Commodities",
    category: "Commodities Trading",
    difficulty: "Advanced",
    readTime: "15 min",
    summary: "Trade commodity moves while adapting to changing volatility.",
    content: [
      "Measure volatility with ATR and use it for stop placement.",
      "High volatility often follows news events or inventory surprises.",
      "Reduce size when markets are choppy and widen stops accordingly.",
      "Capture moves with breakout and trend continuation strategies.",
    ],
    tags: ["volatility", "trading", "risk"],
  },
  {
    id: "commodity-spread-analysis",
    title: "Spread Trading for Commodities",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    readTime: "16 min",
    summary: "Use relative value spreads to trade commodity relationships.",
    content: [
      "Calendar spreads can capture term structure shifts in oil and gas.",
      "Inter-commodity spreads help compare metals, energy, and softs.",
      "Analyze carry, contango, and backwardation when setting spread risk.",
      "Manage margin carefully because spreads still carry basis risk.",
    ],
    tags: ["spreads", "relative value", "strategies"],
  },
  {
    id: "commodity-session-timing",
    title: "Commodity Session Timing",
    category: "Commodities Trading",
    difficulty: "Intermediate",
    readTime: "13 min",
    summary: "Trade sessions that matter for energy, metals, and agricultural markets.",
    content: [
      "Energy is most liquid during US hours and when inventories are released.",
      "Metals often show strong moves during London and US overlap.",
      "Soft commodities respond to Asian market hours and weather headlines.",
      "Match your timeframe to session liquidity and news flow.",
    ],
    tags: ["sessions", "timing", "liquidity"],
  },
  {
    id: "commodity-breakout-strategy",
    title: "Commodity Breakout Strategy",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    readTime: "15 min",
    summary: "Trade clean commodity breakouts with momentum confirmation.",
    content: [
      "Spot consolidation zones before the breakout occurs.",
      "Wait for a clean break with volume or range expansion.",
      "Use a breakout stop near the consolidation low or high.",
      "Target the next technical level or measured move.",
    ],
    tags: ["breakout", "momentum", "strategy"],
  },
  {
    id: "commodity-pullback-strategy",
    title: "Commodity Pullback Strategy",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    readTime: "14 min",
    summary: "Buy pullbacks during strong commodity trends.",
    content: [
      "Identify the dominant trend using higher timeframe structure.",
      "Enter on corrective pullbacks to support or moving averages.",
      "Use stops below the swing low in an uptrend or above the swing high in a downtrend.",
      "Trail profits once the trend resumes in the original direction.",
    ],
    tags: ["pullbacks", "trend", "strategy"],
  },
];

export const COMMODITIES_GLOSSARY: CommoditiesGlossaryTerm[] = [
  {
    id: "contango",
    term: "Contango",
    definition: "A futures market structure where later contracts trade at a premium to near-term contracts.",
    category: "Commodities Market Structure",
  },
  {
    id: "backwardation",
    term: "Backwardation",
    definition: "A futures market condition where near-term contracts trade above later contracts.",
    category: "Commodities Market Structure",
  },
  {
    id: "roll-yield",
    term: "Roll Yield",
    definition: "The gain or loss from rolling a futures position from one contract to the next.",
    category: "Commodities Market Structure",
  },
  {
    id: "basis",
    term: "Basis",
    definition: "The difference between the cash price and the futures price of a commodity.",
    category: "Commodities Market Structure",
  },
  {
    id: "storage-cost",
    term: "Storage Cost",
    definition: "The cost of storing physical commodities, which can affect term structure and carrying costs.",
    category: "Commodities Fundamentals",
  },
  {
    id: "open-interest",
    term: "Open Interest",
    definition: "The total number of outstanding futures contracts that have not been settled.",
    category: "Commodities Trading",
  },
  {
    id: "inventory-report",
    term: "Inventory Report",
    definition: "A data release that shows stock levels for commodities such as oil, natural gas, and agricultural goods.",
    category: "Commodities Fundamentals",
  },
  {
    id: "weather-risk",
    term: "Weather Risk",
    definition: "The impact of weather on production, demand, and price volatility in agricultural and energy commodities.",
    category: "Commodities Fundamentals",
  },
  {
    id: "carry",
    term: "Carry",
    definition: "The cost or return from holding a commodity position, including storage and financing costs.",
    category: "Commodities Market Structure",
  },
  {
    id: "hedge-ratio",
    term: "Hedge Ratio",
    definition: "The relationship between the size of a hedge and the exposure being protected.",
    category: "Commodities Risk Management",
  },
  {
    id: "price-spread",
    term: "Price Spread",
    definition: "The difference between prices for related commodity contracts or contract months.",
    category: "Commodities Strategies",
  },
  {
    id: "seasonality",
    term: "Seasonality",
    definition: "Recurring patterns in commodity prices that happen at similar times each year.",
    category: "Commodities Fundamentals",
  },
  {
    id: "technical-support",
    term: "Support Level",
    definition: "A price area where buying pressure tends to prevent prices from falling further.",
    category: "Commodities Technical Analysis",
  },
  {
    id: "technical-resistance",
    term: "Resistance Level",
    definition: "A price area where selling pressure tends to cap rally attempts.",
    category: "Commodities Technical Analysis",
  },
  {
    id: "volatility",
    term: "Volatility",
    definition: "The degree of price movement in a commodity market over a set period.",
    category: "Commodities Technical Analysis",
  },
  {
    id: "trend-following",
    term: "Trend Following",
    definition: "A trading approach that seeks to capture sustained commodity moves in the direction of the trend.",
    category: "Commodities Strategies",
  },
  {
    id: "mean-reversion",
    term: "Mean Reversion",
    definition: "A strategy that assumes prices will return to a normal range after an extreme move.",
    category: "Commodities Strategies",
  },
  {
    id: "stop-loss",
    term: "Stop Loss",
    definition: "An order placed to close a position when the market moves against it by a predetermined amount.",
    category: "Commodities Risk Management",
  },
  {
    id: "position-sizing",
    term: "Position Sizing",
    definition: "The process of determining how large a position should be based on account risk and volatility.",
    category: "Commodities Risk Management",
  },
  {
    id: "economic-calendar",
    term: "Economic Calendar",
    definition: "A schedule of economic releases and events that can affect commodity prices.",
    category: "Commodities Fundamentals",
  },
];

export const COMMODITIES_STRATEGIES: CommoditiesStrategy[] = [
  {
    id: "commodity-trend-following",
    name: "Commodity Trend Following",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    description: "Trade commodity trends using moving averages and momentum confirmation.",
    rules: [
      "Identify the dominant trend on the daily chart.",
      "Use moving averages to define the bias.",
      "Enter on pullbacks in the direction of the trend.",
      "Exit when the trend structure breaks.",
    ],
    tags: ["trend", "moving averages", "commodity"],
  },
  {
    id: "commodity-breakout",
    name: "Commodity Breakout Strategy",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    description: "Trade clean breakouts from consolidation zones in energy and metals.",
    rules: [
      "Spot consolidation or range structure.",
      "Wait for a breakout with confirmation.",
      "Place the stop just inside the breakout zone.",
      "Target the next technical level or measured move.",
    ],
    tags: ["breakout", "momentum", "strategy"],
  },
  {
    id: "commodity-mean-reversion",
    name: "Commodity Mean Reversion",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    description: "Trade pullbacks toward average price in choppy commodity markets.",
    rules: [
      "Identify oversold or overbought conditions on an oscillator.",
      "Wait for a reversal signal near support or resistance.",
      "Use a tight stop in case the trend continues.",
      "Target the recent mean or moving average.",
    ],
    tags: ["mean reversion", "oscillators", "commodity"],
  },
  {
    id: "commodity-seasonal-trend",
    name: "Seasonal Commodity Trend",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    description: "Combine seasonal tendencies with trend analysis for position timing.",
    rules: [
      "Review historical seasonal cycles for the commodity.",
      "Confirm the seasonal bias with price structure.",
      "Enter when price aligns with the seasonally favored direction.",
      "Exit as seasonal strength wanes or momentum fades.",
    ],
    tags: ["seasonality", "trend", "timing"],
  },
  {
    id: "commodity-hedge-strategy",
    name: "Commodity Hedge Strategy",
    category: "Commodities Risk Management",
    difficulty: "Intermediate",
    description: "Protect commodity exposure with futures, options, or paired hedges.",
    rules: [
      "Determine the exposure to be hedged.",
      "Choose a hedge contract that closely matches the underlying commodity.",
      "Set the hedge size based on risk and correlation.",
      "Monitor carry cost and roll risk over time.",
    ],
    tags: ["hedge", "risk management", "portfolio"],
  },
  {
    id: "commodity-spread-trading",
    name: "Commodity Spread Trading",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    description: "Trade calendar and inter-commodity spreads to capture value relationships.",
    rules: [
      "Analyze the spread structure for the selected contract.",
      "Enter trades when spreads are historically rich or cheap.",
      "Use defined risk to manage the position.",
      "Adjust the trade as futures expiry approaches.",
    ],
    tags: ["spread", "relative value", "advanced"],
  },
  {
    id: "commodity-volatility-breakout",
    name: "Volatility Breakout Strategy",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    description: "Trade breakouts after periods of low volatility in commodity markets.",
    rules: [
      "Identify low volatility consolidation.",
      "Enter on a breakout with expanding range.",
      "Use a stop under the consolidation boundary.",
      "Target the next structural resistance or support.",
    ],
    tags: ["volatility", "breakout", "strategy"],
  },
  {
    id: "commodity-risk-adjusted-sizing",
    name: "Risk-Adjusted Position Sizing",
    category: "Commodities Risk Management",
    difficulty: "Intermediate",
    description: "Size positions using volatility and account risk for commodity trades.",
    rules: [
      "Measure volatility with ATR or historical ranges.",
      "Define risk in account percentage terms.",
      "Calculate position size based on stop distance and contract value.",
      "Reduce size during elevated volatility events.",
    ],
    tags: ["position sizing", "volatility", "risk"],
  },
  {
    id: "commodity-session-open",
    name: "Commodity Session Open Strategy",
    category: "Commodities Trading",
    difficulty: "Intermediate",
    description: "Trade early session moves when commodity liquidity quickly ramps up.",
    rules: [
      "Identify the opening range after the major session begins.",
      "Trade breakouts or fade moves from the opening range.",
      "Use stops inside the opening structure.",
      "Exit before the session loses momentum.",
    ],
    tags: ["sessions", "opening range", "strategy"],
  },
  {
    id: "commodity-chart-patterns",
    name: "Commodity Chart Pattern Strategy",
    category: "Commodities Strategies",
    difficulty: "Intermediate",
    description: "Trade commodity breakouts and reversals using chart patterns.",
    rules: [
      "Spot flags, triangles, and head-and-shoulders patterns.",
      "Wait for pattern confirmation before entering.",
      "Use the pattern height to set profit targets.",
      "Protect the trade with a structural stop.",
    ],
    tags: ["patterns", "technical", "commodity"],
  },
  {
    id: "commodity-fundamental-entry",
    name: "Fundamental Entry Strategy",
    category: "Commodities Trading",
    difficulty: "Advanced",
    description: "Time entries using macro and inventory data for commodity markets.",
    rules: [
      "Track key fundamental releases for the commodity.",
      "Align the fundamental view with the technical trend.",
      "Enter when data supports a high-confidence directional bias.",
      "Manage trades around subsequent news flow.",
    ],
    tags: ["fundamentals", "entry", "data"],
  },
  {
    id: "commodity-roi-accuracy",
    name: "Commodity Risk/Reward Strategy",
    category: "Commodities Risk Management",
    difficulty: "Beginner",
    description: "Use a disciplined risk/reward ratio when trading commodities.",
    rules: [
      "Define a minimum 1:2 risk/reward ratio before entering.",
      "Place stops at a technical invalidation level.",
      "Set profit targets based on structure or measured moves.",
      "Avoid trades that do not meet the risk/reward criteria.",
    ],
    tags: ["risk reward", "discipline", "beginner"],
  },
  {
    id: "commodity-trend-reversal",
    name: "Commodity Trend Reversal Strategy",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    description: "Spot trend exhaustion and trade reversals in commodity markets.",
    rules: [
      "Watch for divergence and exhaustion at key levels.",
      "Confirm reversal with a break of structure.",
      "Use a stop beyond the reversal extreme.",
      "Target the next support or resistance zone.",
    ],
    tags: ["reversal", "strategy", "advanced"],
  },
  {
    id: "commodity-portfolio-rotation",
    name: "Commodity Rotation Strategy",
    category: "Commodities Strategies",
    difficulty: "Advanced",
    description: "Rotate between commodity sectors based on macro conditions.",
    rules: [
      "Identify the strongest commodity sector in the current macro cycle.",
      "Switch exposure when the leading sector loses momentum.",
      "Allocate size based on relative strength and volatility.",
      "Keep risk toward the least correlated positions.",
    ],
    tags: ["rotation", "portfolio", "sector"],
  },
];

export function getCommoditiesHub() {
  return {
    articles: COMMODITIES_ARTICLES,
    lessons: COMMODITIES_LESSONS,
    glossary: COMMODITIES_GLOSSARY,
    strategies: COMMODITIES_STRATEGIES,
    stats: {
      articlesCount: COMMODITIES_ARTICLES.length,
      lessonsCount: COMMODITIES_LESSONS.length,
      glossaryCount: COMMODITIES_GLOSSARY.length,
      strategiesCount: COMMODITIES_STRATEGIES.length,
    },
  };
}

export function getRelatedCommoditiesContent(slug: string, type: "article" | "lesson", limit = 3) {
  if (type === "article") {
    const article = COMMODITIES_ARTICLES.find((a) => a.slug === slug);
    if (!article) return [];
    return COMMODITIES_ARTICLES.filter((a) => a.slug !== slug && a.tags.some((tag) => article.tags.includes(tag))).slice(0, limit);
  }

  const lesson = COMMODITIES_LESSONS.find((l) => l.id === slug);
  if (!lesson) return [];
  return COMMODITIES_LESSONS.filter((l) => l.id !== slug && l.tags.some((tag) => lesson.tags.includes(tag))).slice(0, limit);
}
