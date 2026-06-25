import { Broker, Strategy, AcademyLesson, GlossaryTerm } from "./types";
import { BROKER_HUB_BROKERS } from "./lib/services/brokerHub";

// Helper to generate realistic technical indicators on chart steps
export function generateChartData(trendType: "bullish" | "bearish" | "ranging" | "breakout") {
  const data = [];
  const basePrice = trendType === "bullish" ? 1.0500 : trendType === "bearish" ? 1.1500 : 1.1000;
  
  for (let i = 0; i < 8; i++) {
    let diff = 0;
    if (trendType === "bullish") {
      diff = 0.0015 * i + (i % 2 === 0 ? 0.0005 : -0.0003);
    } else if (trendType === "bearish") {
      diff = -0.0015 * i + (i % 2 === 0 ? -0.0005 : 0.0003);
    } else if (trendType === "ranging") {
      diff = (i % 2 === 0 ? 0.0010 : -0.0010);
    } else if (trendType === "breakout") {
      diff = i < 4 ? 0.0002 * i : 0.0025 * (i - 3);
    }
    
    const price = +(basePrice + diff).toFixed(4);
    const ma = +(basePrice + (trendType === "bullish" ? 0.0008 : trendType === "bearish" ? -0.0008 : 0) * i).toFixed(4);
    
    let rsi = 50;
    if (trendType === "bullish") rsi = 45 + i * 4;
    else if (trendType === "bearish") rsi = 55 - i * 4;
    else if (trendType === "ranging") rsi = i % 2 === 0 ? 65 : 35;
    else if (trendType === "breakout") rsi = i < 4 ? 48 : 74;
    
    let signal: "BUY" | "SELL" | null = null;
    if (i === 3) {
      signal = trendType === "bullish" || trendType === "breakout" ? "BUY" : "SELL";
    }
    
    data.push({
      name: `Step ${i + 1}`,
      price,
      ma,
      rsi: Math.max(10, Math.min(90, Math.round(rsi))),
      signal
    });
  }
  return data;
}

export const SAMPLE_BROKERS: Broker[] = BROKER_HUB_BROKERS;

const STRATEGY_SEED = [
  { name: "Dual Moving Average Convergence", cat: "Trend", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Forex", "Technical Analysis"] },
  { name: "RSI Multi-Timeframe Divergence", cat: "Reversal", tf: "4-Hour (H4)", diff: "Intermediate", clusters: ["Technical Analysis", "Forex"] },
  { name: "Gold Scalping Order Flow System", cat: "Scalping", tf: "5-Minute (M5)", diff: "Advanced", clusters: ["Gold", "Technical Analysis"] },
  { name: "S&P 500 Mean Reversion Model", cat: "Reversal", tf: "Daily (D1)", diff: "Advanced", clusters: ["Indices", "Fundamental Analysis"] },
  { name: "ATR Volatility Position Sizer", cat: "Risk Management", tf: "Any timeframe", diff: "Intermediate", clusters: ["Risk Management", "Trading Psychology"] },
  { name: "Bitcoin Liquidity Sweep Strategy", cat: "Scalping", tf: "15-Minute (M15)", diff: "Advanced", clusters: ["Cryptocurrency", "Technical Analysis"] },
  { name: "Crude Oil Inventory Breakout", cat: "Trend", tf: "30-Minute (M30)", diff: "Intermediate", clusters: ["Commodities", "Fundamental Analysis"] },
  { name: "MACD Histogram Cross System", cat: "Trend", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Technical Analysis", "Forex"] },
  { name: "Bollinger Band Volatility Squeeze", cat: "Trend", tf: "4-Hour (H4)", diff: "Intermediate", clusters: ["Technical Analysis", "Indices"] },
  { name: "Stochastic Momentum Extreme Cross", cat: "Reversal", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Technical Analysis", "Forex"] },
  { name: "Ichimoku Kumo Cloud Breakout", cat: "Trend", tf: "Daily (D1)", diff: "Advanced", clusters: ["Technical Analysis", "Indices"] },
  { name: "Harmonic Gartley Pattern", cat: "Reversal", tf: "1-Hour (H1)", diff: "Advanced", clusters: ["Technical Analysis", "Gold"] },
  { name: "Session Open Range Breakout", cat: "Scalping", tf: "15-Minute (M15)", diff: "Intermediate", clusters: ["Forex", "Technical Analysis"] },
  { name: "Pinbar Horizontal Support Rebound", cat: "Reversal", tf: "4-Hour (H4)", diff: "Beginner", clusters: ["Technical Analysis", "Forex"] },
  { name: "Heikin-Ashi Trend Continuation", cat: "Trend", tf: "Daily (D1)", diff: "Beginner", clusters: ["Technical Analysis", "Commodities"] },
  { name: "Pivot Point Daily Rebound", cat: "Reversal", tf: "1-Hour (H1)", diff: "Intermediate", clusters: ["Technical Analysis", "Forex"] },
  { name: "Fibonacci Retracement Confluence", cat: "Trend", tf: "4-Hour (H4)", diff: "Intermediate", clusters: ["Technical Analysis", "Forex"] },
  { name: "VWAP Institutional Flow Tracking", cat: "Trend", tf: "5-Minute (M5)", diff: "Advanced", clusters: ["Technical Analysis", "Indices"] },
  { name: "Market Profile Value Area Shift", cat: "Trend", tf: "30-Minute (M30)", diff: "Advanced", clusters: ["Technical Analysis", "Commodities"] },
  { name: "ADX Trend Strength Filter", cat: "Risk Management", tf: "Any timeframe", diff: "Intermediate", clusters: ["Risk Management", "Technical Analysis"] },
  { name: "Keltner Channel Volatility Banding", cat: "Trend", tf: "1-Hour (H1)", diff: "Intermediate", clusters: ["Technical Analysis", "Cryptocurrency"] },
  { name: "Gold ATR Trailing Stop Safeguard", cat: "Risk Management", tf: "4-Hour (H4)", diff: "Intermediate", clusters: ["Gold", "Risk Management"] },
  { name: "S&P 500 Sector Strength Arbitrage", cat: "Trend", tf: "Daily (D1)", diff: "Advanced", clusters: ["Indices", "Fundamental Analysis"] },
  { name: "Exponential Moving Average Ribbons", cat: "Trend", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Technical Analysis", "Forex"] },
  { name: "Volatile Index VIX Hedging Model", cat: "Risk Management", tf: "Daily (D1)", diff: "Advanced", clusters: ["Indices", "Risk Management"] },
  { name: "Carry Trade Interest Differential", cat: "Trend", tf: "Weekly (W1)", diff: "Advanced", clusters: ["Forex", "Fundamental Analysis"] },
  { name: "Wyckoff Accumulation Phase Entry", cat: "Reversal", tf: "Daily (D1)", diff: "Advanced", clusters: ["Technical Analysis", "Cryptocurrency"] },
  { name: "Volume Spread Analysis (VSA)", cat: "Trend", tf: "15-Minute (M15)", diff: "Advanced", clusters: ["Technical Analysis", "Forex"] },
  { name: "NASDAQ 100 Momentum Gap Fill", cat: "Scalping", tf: "5-Minute (M5)", diff: "Advanced", clusters: ["Indices", "Technical Analysis"] },
  { name: "Donchian Channel Breakout System", cat: "Trend", tf: "Daily (D1)", diff: "Beginner", clusters: ["Technical Analysis", "Commodities"] },
  { name: "Parabolic SAR Reversal System", cat: "Reversal", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Technical Analysis", "Forex"] },
  { name: "Triple Screen Trading System", cat: "Trend", tf: "Multi-TF", diff: "Advanced", clusters: ["Technical Analysis", "Forex"] },
  { name: "Elder Impulse Trend Filter", cat: "Trend", tf: "4-Hour (H4)", diff: "Intermediate", clusters: ["Technical Analysis", "Cryptocurrency"] },
  { name: "Commodity Channel Index Extremes", cat: "Reversal", tf: "1-Hour (H1)", diff: "Beginner", clusters: ["Technical Analysis", "Commodities"] },
  { name: "Chaikin Money Flow Convergence", cat: "Trend", tf: "Daily (D1)", diff: "Intermediate", clusters: ["Technical Analysis", "Indices"] },
  { name: "Momentum Oscillator Extreme Fade", cat: "Reversal", tf: "15-Minute (M15)", diff: "Intermediate", clusters: ["Technical Analysis", "Forex"] },
  { name: "Gold Standard Deviation Bands", cat: "Reversal", tf: "4-Hour (H4)", diff: "Advanced", clusters: ["Gold", "Technical Analysis"] },
  { name: "Bitcoin Funding Rate Arbitrage", cat: "Risk Management", tf: "8-Hour cycles", diff: "Advanced", clusters: ["Cryptocurrency", "Risk Management"] },
  { name: "Multi-Asset Volatility Allocator", cat: "Risk Management", tf: "Weekly (W1)", diff: "Advanced", clusters: ["Risk Management", "Indices"] },
  { name: "Dynamic Risk-of-Ruin Optimizer", cat: "Risk Management", tf: "Dynamic", diff: "Advanced", clusters: ["Risk Management", "Trading Psychology"] },
  { name: "Kelly Criterion Allocation Sizer", cat: "Risk Management", tf: "Static", diff: "Intermediate", clusters: ["Risk Management", "Trading Psychology"] },
  { name: "Cognitive Bias Checklist Sizer", cat: "Risk Management", tf: "Static", diff: "Beginner", clusters: ["Risk Management", "Trading Psychology"] },
  { name: "Revenge Trading Lockout Shield", cat: "Risk Management", tf: "Static", diff: "Beginner", clusters: ["Trading Psychology", "Risk Management"] },
  { name: "Fixed Fractional Position Sizer", cat: "Risk Management", tf: "Dynamic", diff: "Beginner", clusters: ["Risk Management", "Forex"] },
  { name: "Average True Range Trailing Shield", cat: "Risk Management", tf: "4-Hour (H4)", diff: "Beginner", clusters: ["Risk Management", "Technical Analysis"] },
  { name: "Correlation Matrix Dispersion Guard", cat: "Risk Management", tf: "Daily (D1)", diff: "Intermediate", clusters: ["Risk Management", "Commodities"] },
  { name: "Multi-Timeframe Correlation Filter", cat: "Risk Management", tf: "Dynamic", diff: "Intermediate", clusters: ["Risk Management", "Forex"] },
  { name: "Liquidity Sweet Spot Sweep Model", cat: "Scalping", tf: "15-Minute (M15)", diff: "Advanced", clusters: ["Technical Analysis", "Forex"] },
  { name: "Order Book Depth Squeeze System", cat: "Scalping", tf: "5-Minute (M5)", diff: "Advanced", clusters: ["Technical Analysis", "Cryptocurrency"] },
  { name: "Core Axiomatic Capital Preserver", cat: "Risk Management", tf: "Static", diff: "Beginner", clusters: ["Risk Management", "Trading Psychology"] }
];

export const SAMPLE_STRATEGIES: Strategy[] = STRATEGY_SEED.map((s, idx) => {
  const id = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const chartType: "bullish" | "bearish" | "ranging" | "breakout" =
    s.cat === "Trend" ? "bullish" : s.cat === "Reversal" ? "ranging" : s.cat === "Scalping" ? "breakout" : "bearish";
  
  return {
    id,
    name: s.name,
    category: s.cat as any,
    timeframe: s.tf,
    difficulty: s.diff as any,
    winRateEstimate: "N/A - Educational Example", // REMOVED FAKE NUMERICAL METRIC
    description: `A rigid, rules-based ${s.cat.toLowerCase()} blueprint designed for educational analysis of ${s.clusters.join(" and ")}. It establishes precise coordinates without subjective metrics.`,
    indicators: [`${s.name} Core Osc`, "Exponential Moving Average (20 EMA)", "Horizontal Key Support/Resistance Nodes"],
    rules: {
      buy: [
        "Confirm that structural macro conditions align with a long bias.",
        "Wait for the indicator overlay to hit the calculated discount threshold.",
        "Place a pending long buy stop order 2 pips above the trigger bar.",
        "Immediately set the Stop Loss invalidation point below the swing low."
      ],
      sell: [
        "Confirm that structural macro conditions align with a short bias.",
        "Wait for the indicator overlay to hit the calculated premium threshold.",
        "Place a pending short sell stop order 2 pips below the trigger bar.",
        "Immediately set the Stop Loss invalidation point above the swing high."
      ]
    },
    chartsData: generateChartData(chartType),
    riskRewardRatio: s.cat === "Risk Management" ? "Dynamic" : "1:2 or 1:3",
    proTips: "Never execute trades based on isolated indicator overlays. Always calculate position size strictly according to current account equity."
  };
});

// ============================================================================
// 3. RAW SEED BLUEPRINTS FOR 50 ACADEMY LESSONS
// ============================================================================
const LESSON_SEED = [
  { title: "What is a Pip and Pipette?", cat: "Forex Basics", diff: "Beginner", clusters: ["Forex"] },
  { title: "Understanding Leverage and Margin", cat: "Forex Basics", diff: "Beginner", clusters: ["Forex", "Risk Management"] },
  { title: "Bid-Ask Spread and Slippage", cat: "Forex Basics", diff: "Beginner", clusters: ["Forex"] },
  { title: "Market Orders vs Limit Orders", cat: "Forex Basics", diff: "Beginner", clusters: ["Forex"] },
  { title: "What is a CFD?", cat: "Forex Basics", diff: "Beginner", clusters: ["Forex"] },
  { title: "Reading a Candlestick Chart", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "Moving Averages Explained", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "Using the RSI Oscillator", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "Drawing Trendlines and Horizontals", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "The Power of Fibonacci Retracements", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "MACD Indicator Masterclass", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "Bollinger Bands Volatility Trading", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "Average True Range (ATR) Volatility", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis", "Risk Management"] },
  { title: "Understanding Multi-Timeframe Analysis", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "Identifying Support and Resistance", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "Volume Profile and Order Flow Basics", cat: "Technical Analysis", diff: "Advanced", clusters: ["Technical Analysis"] },
  { title: "Chart Patterns: Head and Shoulders", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "Chart Patterns: Double Tops and Bottoms", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "Chart Patterns: Wedges and Flags", cat: "Technical Analysis", diff: "Intermediate", clusters: ["Technical Analysis"] },
  { title: "Introduction to Price Action", cat: "Technical Analysis", diff: "Beginner", clusters: ["Technical Analysis"] },
  { title: "The Core Law of Capital Preservation", cat: "Risk Management", diff: "Beginner", clusters: ["Risk Management"] },
  { title: "Calculating Your Risk Per Trade", cat: "Risk Management", diff: "Beginner", clusters: ["Risk Management"] },
  { title: "Calculating Position Size Mathematically", cat: "Risk Management", diff: "Intermediate", clusters: ["Risk Management"] },
  { title: "Risk-to-Reward Ratio Dynamics", cat: "Risk Management", diff: "Beginner", clusters: ["Risk Management"] },
  { title: "Understanding Maximum Drawdown", cat: "Risk Management", diff: "Intermediate", clusters: ["Risk Management"] },
  { title: "How to Set Proper Stop Losses", cat: "Risk Management", diff: "Beginner", clusters: ["Risk Management"] },
  { title: "The Risk of Ruin Statistics", cat: "Risk Management", diff: "Advanced", clusters: ["Risk Management"] },
  { title: "Fixed Fractional Position Sizing", cat: "Risk Management", diff: "Intermediate", clusters: ["Risk Management"] },
  { title: "Portfolio Correlation Risks", cat: "Risk Management", diff: "Advanced", clusters: ["Risk Management"] },
  { title: "The Golden Rule of Daily Loss Limits", cat: "Risk Management", diff: "Beginner", clusters: ["Risk Management"] },
  { title: "The Psychology of Loss Aversion", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "Overcoming the FOMO Loop", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "Managing Overconfidence and Euphoria", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "The Trap of Revenge Trading", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "Creating a Trading Constitution", cat: "Trading Psychology", diff: "Intermediate", clusters: ["Trading Psychology"] },
  { title: "Building Emotional Discipline", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "Combating Recency Bias", cat: "Trading Psychology", diff: "Intermediate", clusters: ["Trading Psychology"] },
  { title: "The Habit of Weekly Journaling", cat: "Trading Psychology", diff: "Beginner", clusters: ["Trading Psychology"] },
  { title: "Coping with Trading Drawdowns", cat: "Trading Psychology", diff: "Intermediate", clusters: ["Trading Psychology", "Risk Management"] },
  { title: "The Zen State of Mechanical Execution", cat: "Trading Psychology", diff: "Advanced", clusters: ["Trading Psychology"] },
  { title: "Direct Market Access vs Market Maker", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Forex"] },
  { title: "ECN and STP Broker Routing", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Forex"] },
  { title: "Navigating Prop Firm Evaluations", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Risk Management"] },
  { title: "High-Impact News Hedging", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Risk Management"] },
  { title: "Automated and Algorithmic API Trading", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Technical Analysis"] },
  { title: "Trading Gold: Macro and Volatility", cat: "Pro Trading Guides", diff: "Intermediate", clusters: ["Gold", "Commodities"] },
  { title: "Indices Trading: Broad Market Cycles", cat: "Pro Trading Guides", diff: "Intermediate", clusters: ["Indices"] },
  { title: "Cryptocurrency Trading Risk Models", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Cryptocurrency", "Risk Management"] },
  { title: "Commodity Futures and Spot Markets", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Commodities"] },
  { title: "Advanced Quantitative Portfolio Metrics", cat: "Pro Trading Guides", diff: "Advanced", clusters: ["Pro Trading Guides", "Risk Management"] }
];

export const SAMPLE_LESSONS: AcademyLesson[] = LESSON_SEED.map((l, idx) => {
  const id = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id,
    title: l.title,
    category: l.cat as any,
    readTime: `${4 + (idx % 4)} min read`,
    difficulty: l.diff as any,
    summary: `A thorough educational module mapping out the micro-mechanics of ${l.title} to support structural risk controls and systematic strategy modeling.`,
    content: [
      `Welcome to our educational breakdown of ${l.title}. This guide represents a structured reference framework. It contains no promotional affiliate ties and serves solely for academic explanation.`,
      `In institutional finance, operators analyze ${l.title} through a cold, statistical lens. Understanding the underlying variables enables you to insulate your capital from extreme volatility events.`,
      `A systematic approach requires logging every outcome. When we look at ${l.title}, we discover a clear correlation with risk boundaries. Treating trading as a series of probabilities is the foundation of longevity.`
    ],
    quiz: {
      question: `What is the most mathematically sound takeaway when studying ${l.title}?`,
      options: [
        "Rely on random layouts and instinctual execution.",
        "Preserve capital above all else and enforce a strict personal constitution.",
        "Increase leverage when encountering losing streaks.",
        "Ignore spreads and broker commission schedules."
      ],
      correctAnswer: 1,
      explanation: "Longevity in trading is built purely on capital preservation, statistical expectancy, and unyielding risk discipline."
    }
  };
});

// ============================================================================
// 4. RAW BLUEPRINTS FOR 200 UNIQUE GLOSSARY TERMS
// ============================================================================
const GLOSSARY_BLUEPRINTS = [
  // Forex Basics & Advanced Mechanics (50 items)
  { id: "pip", term: "Pip", cat: "Forex", def: "The smallest standardized pricing movement in currency exchange rates, typically 0.0001 for major pairs." },
  { id: "leverage", term: "Leverage", cat: "Forex", def: "The use of borrowed broker capital to control a larger trading position size than the deposit alone allows." },
  { id: "spread", term: "Spread", cat: "Forex", def: "The difference between the Bid (selling) price and the Ask (buying) price of an asset, representing the primary broker fee." },
  { id: "lot-size", term: "Lot Size", cat: "Forex", def: "The standardized unit quantity of an asset order (e.g., 100,000 units of the base currency in a standard lot)." },
  { id: "margin", term: "Margin", cat: "Forex", def: "The collateral or deposit required by a broker to open and maintain a leveraged trading position." },
  { id: "free-margin", term: "Free Margin", cat: "Forex", def: "The remaining capital in a trading account not locked up as collateral, available for new orders." },
  { id: "margin-call", term: "Margin Call", cat: "Forex", def: "A broker alert that account equity has fallen below the minimum maintenance margin, requiring additional funding." },
  { id: "stop-out-level", term: "Stop Out Level", cat: "Forex", def: "The threshold where a broker automatically closes open positions to protect the account from negative balances." },
  { id: "base-currency", term: "Base Currency", cat: "Forex", def: "The first currency quoted in a forex pair (e.g., EUR in EUR/USD), representing what is being bought or sold." },
  { id: "quote-currency", term: "Quote Currency", cat: "Forex", def: "The second currency quoted in a forex pair, representing how much of it is needed to buy one base currency unit." },
  { id: "slippage", term: "Slippage", cat: "Forex", def: "The difference between the expected price of a trade and the actual execution price due to volatility or latency." },
  { id: "swap-rate", term: "Swap Rate (Rollover)", cat: "Forex", def: "The interest rate differential debited or credited for holding a spot currency position past the overnight cut-off." },
  { id: "ecn-broker", term: "ECN Broker", cat: "Forex", def: "An Electronic Communication Network broker routing retail orders directly to institutional liquidity networks." },
  { id: "stp-broker", term: "STP Broker", cat: "Forex", def: "A Straight Through Processing broker forwarding client trades directly to liquidity providers with zero dealing desk manual action." },
  { id: "market-maker", term: "Market Maker", cat: "Forex", def: "A broker that acts as the direct counterparty to retail trades, taking the opposite side of orders to provide instant liquidity." },
  { id: "dealing-desk", term: "Dealing Desk", cat: "Forex", def: "A traditional broker model where orders are processed internally rather than routed directly to interbank pools." },
  { id: "requote", term: "Re-quote", cat: "Forex", def: "A broker's refusal to execute a trade at the requested price, offering a different price instead due to rapid market moves." },
  { id: "bid-price", term: "Bid Price", cat: "Forex", def: "The highest price a buyer is willing to pay for an asset. The price you receive when selling." },
  { id: "ask-price", term: "Ask Price", cat: "Forex", def: "The lowest price a seller is willing to accept for an asset. The price you pay when buying." },
  { id: "cross-pair", term: "Cross Currency Pair", cat: "Forex", def: "A forex pair that does not include the US Dollar (e.g., EUR/GBP, GBP/JPY)." },
  { id: "major-pair", term: "Major Currency Pair", cat: "Forex", def: "A heavily traded forex pair containing the US Dollar (e.g., EUR/USD, GBP/USD, USD/JPY)." },
  { id: "minor-pair", term: "Minor Currency Pair", cat: "Forex", def: "Pairs containing major currencies except the USD, traded less actively than major pairs." },
  { id: "exotic-pair", term: "Exotic Currency Pair", cat: "Forex", def: "A pair containing one major currency and one from an emerging or small economy (e.g., USD/TRY, USD/MXN)." },
  { id: "liquidity-provider", term: "Liquidity Provider", cat: "Forex", def: "An institution (like a tier-1 bank) that stands ready to buy or sell assets to maintain orderly market flow." },
  { id: "prime-broker", term: "Prime Broker", cat: "Forex", def: "A high-capacity institution providing credit, clearing, and execution services to hedge funds and brokers." },
  { id: "spot-market", term: "Spot Market", cat: "Forex", def: "A financial market where assets are traded for immediate delivery and settlement." },
  { id: "cable", term: "Cable", cat: "Forex", def: "The trading community's traditional slang term for the GBP/USD currency pair." },
  { id: "fiber", term: "Fiber", cat: "Forex", def: "The trading community's traditional slang term for the EUR/USD currency pair." },
  { id: "kiwi", term: "Kiwi", cat: "Forex", def: "Slang term for the New Zealand Dollar (NZD) or NZD/USD currency pair." },
  { id: "aussie", term: "Aussie", cat: "Forex", def: "Slang term for the Australian Dollar (AUD) or AUD/USD currency pair." },
  { id: "loonie", term: "Loonie", cat: "Forex", def: "Slang term for the Canadian Dollar (CAD) or USD/CAD currency pair." },
  { id: "swissy", term: "Swissy", cat: "Forex", def: "Slang term for the Swiss Franc (CHF) or USD/CHF currency pair." },
  { id: "arbitrage", term: "Arbitrage", cat: "Forex", def: "The simultaneous buying and selling of an asset in different markets to capture risk-free price discrepancies." },
  { id: "forward-contract", term: "Forward Contract", cat: "Forex", def: "A customized private agreement to buy or sell an asset at a set price on a specified future date." },
  { id: "non-deliverable-forward", term: "NDF", cat: "Forex", def: "A cash-settled, short-term forward contract on a thinly traded or non-convertible foreign currency." },
  { id: "g10-currencies", term: "G10 Currencies", cat: "Forex", def: "The ten most heavily traded and liquid currencies globally, including USD, EUR, JPY, GBP, and CHF." },
  { id: "margin-level", term: "Margin Level", cat: "Forex", def: "The percentage ratio of account Equity to locked Margin. It gauges account safety." },
  { id: "slippage-tolerance", term: "Slippage Tolerance", cat: "Forex", def: "A user-defined limit on the maximum price variance allowed for order execution." },
  { id: "order-book", term: "Order Book", cat: "Forex", def: "The digital directory showing pending buy and sell limit orders sorted by price interval." },
  { id: "market-depth", term: "Market Depth (DOM)", cat: "Forex", def: "The depth of market showing real-time volume queues at various price increments." },
  { id: "tick", term: "Tick", cat: "Forex", def: "The absolute minimum price movement of an asset up or down on a trading platform." },
  { id: "re-quote", term: "Re-quote", cat: "Forex", def: "When a broker cannot execute a market order at the requested price and prompts with a secondary rate." },
  { id: "round-turn", term: "Round Turn Lot", cat: "Forex", def: "A completed transaction cycle representing both the initiation and liquidation of a trade." },
  { id: "ctrader", term: "cTrader", cat: "Forex", def: "A modern, premium trading platform famous for ultra-fast execution, ECN routing, and clean visuals." },
  { id: "metatrader-4", term: "MetaTrader 4 (MT4)", cat: "Forex", def: "The historic industry-standard trading platform launched by MetaQuotes, primarily used for retail FX." },
  { id: "metatrader-5", term: "MetaTrader 5 (MT5)", cat: "Forex", def: "The advanced successor to MT4, offering multi-asset support, deeper backtesting engines, and depth of market." },
  { id: "limit-order", term: "Limit Order", cat: "Forex", def: "An order to buy an asset at or below a set price, or sell at or above a set price." },
  { id: "stop-order", term: "Stop Order", cat: "Forex", def: "An order that becomes executable only once a specific price barrier is penetrated." },
  { id: "good-till-cancelled", term: "GTC Order", cat: "Forex", def: "A pending order instruction that remains active indefinitely until executed or manually removed." },
  { id: "fill-or-kill", term: "FOK Order", cat: "Forex", def: "An order that must execute immediately in its entirety or be instantly cancelled." },

  // Technical Analysis (50 items)
  { id: "support", term: "Support", cat: "Technical Analysis", def: "A price zone where buying pressure historically overcomes selling pressure, halting downward moves." },
  { id: "resistance", term: "Resistance", cat: "Technical Analysis", def: "A price zone where selling pressure historically overcomes buying pressure, halting upward moves." },
  { id: "trendline", term: "Trendline", cat: "Technical Analysis", def: "A diagonal line drawn across relative price extremes to chart market path and invalidations." },
  { id: "moving-average", term: "Simple Moving Average (SMA)", cat: "Technical Analysis", def: "A lag indicator that calculates the average price of an asset over a set number of historical periods." },
  { id: "ema", term: "Exponential Moving Average (EMA)", cat: "Technical Analysis", def: "A moving average placing greater weight on recent data points to react faster to price turns." },
  { id: "macd", term: "MACD Indicator", cat: "Technical Analysis", def: "Moving Average Convergence Divergence, a momentum oscillator charting relation between two EMAs." },
  { id: "rsi", term: "Relative Strength Index (RSI)", cat: "Technical Analysis", def: "A momentum oscillator measuring price speed and change to evaluate overbought and oversold states." },
  { id: "bollinger-bands", term: "Bollinger Bands", cat: "Technical Analysis", def: "A volatility channel plotted using standard deviation units above and below a central SMA." },
  { id: "atr", term: "Average True Range (ATR)", cat: "Technical Analysis", def: "A technical indicator calculating historical asset volatility over a specified period." },
  { id: "stochastic", term: "Stochastic Oscillator", cat: "Technical Analysis", def: "A momentum oscillator comparing an asset's closing price to its range over a specified timeframe." },
  { id: "fibonacci-retracement", term: "Fibonacci Retracement", cat: "Technical Analysis", def: "Horizontal lines pointing to potential support/resistance at mathematical ratios (38.2%, 50%, 61.8%)." },
  { id: "fibonacci-extension", term: "Fibonacci Extension", cat: "Technical Analysis", def: "Lines used to project potential future take-profit zones following a trend breakout." },
  { id: "ichimoku", term: "Ichimoku Kumo Cloud", cat: "Technical Analysis", def: "A comprehensive Japanese charting system defining support, trend direction, and momentum cues." },
  { id: "pivot-points", term: "Pivot Points", cat: "Technical Analysis", def: "Mathematical support and resistance levels computed from the prior session's high, low, and close." },
  { id: "parabolic-sar", term: "Parabolic SAR", cat: "Technical Analysis", def: "A chart overlay of dots designed to map trend reversal coordinates and trailing stops." },
  { id: "adx", term: "Average Directional Index (ADX)", cat: "Technical Analysis", def: "An indicator measuring the strength of a trend on a scale of 0 to 100, ignoring direction." },
  { id: "candlestick", term: "Candlestick", cat: "Technical Analysis", def: "A visual price representation showing open, high, low, and close levels for a designated time window." },
  { id: "doji", term: "Doji Candle", cat: "Technical Analysis", def: "A candlestick with virtually identical open and close coordinates, signifying intense market indecision." },
  { id: "hammer-candle", term: "Hammer Candle", cat: "Technical Analysis", def: "A bullish reversal candlestick with a small upper body and a long lower wick." },
  { id: "engulfing-pattern", term: "Engulfing Pattern", cat: "Technical Analysis", def: "A dual-candle pattern where the second body completely covers the first body, signaling reversal." },
  { id: "head-shoulders", term: "Head and Shoulders", cat: "Technical Analysis", def: "A classic reversal chart pattern featuring three peaks, with the middle being the highest." },
  { id: "double-top", term: "Double Top", cat: "Technical Analysis", def: "A bearish reversal chart pattern showing two consecutive peaks at roughly the same level." },
  { id: "double-bottom", term: "Double Bottom", cat: "Technical Analysis", def: "A bullish reversal chart pattern showing two consecutive troughs at roughly the same level." },
  { id: "rising-wedge", term: "Rising Wedge", cat: "Technical Analysis", def: "A bearish chart pattern of narrowing, upward-sloping price channels." },
  { id: "falling-wedge", term: "Falling Wedge", cat: "Technical Analysis", def: "A bullish chart pattern of narrowing, downward-sloping price channels." },
  { id: "bull-flag", term: "Bull Flag", cat: "Technical Analysis", def: "A short consolidation channel sloping against a sharp upward move, preceding trend extension." },
  { id: "bear-flag", term: "Bear Flag", cat: "Technical Analysis", def: "A short consolidation channel sloping against a sharp downward move, preceding trend extension." },
  { id: "pennant", term: "Pennant", cat: "Technical Analysis", def: "A small symmetrical triangle of brief consolidation before trend resumption." },
  { id: "cup-handle", term: "Cup and Handle", cat: "Technical Analysis", def: "A bullish continuation pattern resembling a cup with a small downward-sloping handle." },
  { id: "symmetrical-triangle", term: "Symmetrical Triangle", cat: "Technical Analysis", def: "A consolidation pattern with converging upper and lower boundary lines." },
  { id: "volume-profile", term: "Volume Profile", cat: "Technical Analysis", def: "A horizontal chart overlay displaying trading activity volume at specific price levels over time." },
  { id: "order-flow", term: "Order Flow", cat: "Technical Analysis", def: "The study of actual executed transactions and pending limit queues to spot supply-demand shifts." },
  { id: "market-profile", term: "Market Profile", cat: "Technical Analysis", def: "An organizing framework charting price, volume, and time relationship in a bell curve." },
  { id: "wyckoff-spring", term: "Wyckoff Spring", cat: "Technical Analysis", def: "A brief penetration of a trading range low designed to clean out stop orders before upward reversal." },
  { id: "elliott-wave", term: "Elliott Wave Theory", cat: "Technical Analysis", def: "A system modeling market price patterns through five impulse waves and three corrective waves." },
  { id: "dow-theory", term: "Dow Theory", cat: "Technical Analysis", def: "The classic technical foundation explaining trend cycles, accumulation, and volume confirmations." },
  { id: "vsa", term: "Volume Spread Analysis (VSA)", cat: "Technical Analysis", def: "A method evaluating the relationship between volume, price spread, and candle closes." },
  { id: "keltner-channels", term: "Keltner Channels", cat: "Technical Analysis", def: "Volatility-based envelopes set above and below an EMA using ATR distances." },
  { id: "donchian-channels", term: "Donchian Channels", cat: "Technical Analysis", def: "Bands showing the highest high and lowest low of the last N bars, mapping breakout bounds." },
  { id: "momentum", term: "Momentum", cat: "Technical Analysis", def: "The velocity and rate of acceleration of price changes over a specified timeline." },
  { id: "divergence", term: "Divergence", cat: "Technical Analysis", def: "When an asset price makes a new extreme high/low but an oscillator fails to make a matching extreme." },
  { id: "overbought", term: "Overbought", cat: "Technical Analysis", def: "An oscillator reading suggesting price has risen too far, too fast, nearing exhaustion bounds." },
  { id: "oversold", term: "Oversold", cat: "Technical Analysis", def: "An oscillator reading suggesting price has fallen too far, too fast, nearing consolidation bounds." },
  { id: "consolidation", term: "Consolidation", cat: "Technical Analysis", def: "A sideways price range showing balance between buyers and sellers, waiting for breakout." },
  { id: "breakout", term: "Breakout", cat: "Technical Analysis", def: "A forceful penetration of established support or resistance bounds on high volume." },
  { id: "fakeout", term: "Fakeout", cat: "Technical Analysis", def: "A brief, false breakout that quickly reverses, trapping late breakout participants." },
  { id: "mean-reversion", term: "Mean Reversion", cat: "Technical Analysis", def: "The theory that asset prices eventually pull back toward their long-term average." },
  { id: "gap-fill", term: "Gap Fill", cat: "Technical Analysis", def: "When the price of an asset trades back to fill an empty pricing gap left from market closures." },
  { id: "swing-high", term: "Swing High", cat: "Technical Analysis", def: "A peak price bar flanked by lower highs on both immediate left and right bars." },
  { id: "swing-low", term: "Swing Low", cat: "Technical Analysis", def: "A trough price bar flanked by higher lows on both immediate left and right bars." },

  // Risk Management (50 items)
  { id: "position-sizing", term: "Position Sizing", cat: "Risk Management", def: "The calculation determining the exact lot size to trade based on capital safety ceilings." },
  { id: "stop-loss", term: "Stop Loss Order", cat: "Risk Management", def: "A pending order set to liquidate a trade at a set coordinate to prevent runaway loss." },
  { id: "take-profit", term: "Take Profit Order", cat: "Risk Management", def: "A pending order set to close a profitable position once a target ceiling is achieved." },
  { id: "trailing-stop", term: "Trailing Stop", cat: "Risk Management", def: "A stop-loss order that adjusts automatically in the direction of profit to lock in gains." },
  { id: "risk-reward", term: "Risk-to-Reward Ratio", cat: "Risk Management", def: "The prospective ratio comparing the capital risked on a trade to the expected gain target." },
  { id: "r-multiple", term: "R-Multiple", cat: "Risk Management", def: "The trade outcome expressed as a multiple of the initial risk parameter (e.g., +2R, -1R)." },
  { id: "expectancy", term: "Expectancy", cat: "Risk Management", def: "The average mathematical net result per trade over a large historical transaction pool." },
  { id: "profit-factor", term: "Profit Factor", cat: "Risk Management", def: "The ratio of gross profits divided by gross losses over a specific trading record." },
  { id: "drawdown", term: "Drawdown", cat: "Risk Management", def: "The peak-to-trough decline in a trading account's equity curve expressed as a percentage." },
  { id: "daily-loss-limit", term: "Daily Loss Limit", cat: "Risk Management", def: "A strict risk mandate freezing account execution once a set daily loss boundary is reached." },
  { id: "max-drawdown", term: "Maximum Drawdown", cat: "Risk Management", def: "The largest historical peak-to-trough drawdown recorded for a specific trading record." },
  { id: "risk-of-ruin", term: "Risk of Ruin", cat: "Risk Management", def: "The mathematical probability of losing a trading account entirely based on win-rate and risk parameters." },
  { id: "kelly-criterion", term: "Kelly Criterion", cat: "Risk Management", def: "A formula calculating the optimal trade sizing ratio to maximize geometric portfolio growth." },
  { id: "fixed-fractional", term: "Fixed Fractional Sizing", cat: "Risk Management", def: "Sizing positions where the risk per trade is restricted to a set fraction of total capital." },
  { id: "fixed-ratio", term: "Fixed Ratio Sizing", cat: "Risk Management", def: "A position sizing method adjusting contract counts based on predefined profit milestones." },
  { id: "margin-allocation", term: "Margin Allocation", cat: "Risk Management", def: "The percentage of account equity allocated to maintain active open positions." },
  { id: "diversification", term: "Diversification", cat: "Risk Management", def: "Spreading capital across multiple uncorrelated assets to lower systemic exposure." },
  { id: "correlation-matrix", term: "Correlation Matrix", cat: "Risk Management", def: "A table displaying correlation coefficients between different assets to avoid redundant risks." },
  { id: "value-at-risk", term: "Value at Risk (VaR)", cat: "Risk Management", def: "A statistical metric measuring the maximum potential loss of a portfolio over a set time window." },
  { id: "sharpe-ratio", term: "Sharpe Ratio", cat: "Risk Management", def: "A metric calculating the risk-adjusted return of a trading record or portfolio." },
  { id: "sortino-ratio", term: "Sortino Ratio", cat: "Risk Management", def: "A modification of the Sharpe ratio, focusing strictly on harmful downside variance." },
  { id: "mae", term: "Maximum Adverse Excursion", cat: "Risk Management", def: "The maximum paper drawdown experienced during the lifetime of an individual trade." },
  { id: "mfe", term: "Maximum Favorable Excursion", cat: "Risk Management", def: "The maximum paper profit achieved during the lifetime of an individual trade." },
  { id: "equity-curve", term: "Equity Curve", cat: "Risk Management", def: "A graphical record plotting the cumulative net value of a trading account over time." },
  { id: "leverage-cap", term: "Leverage Cap", cat: "Risk Management", def: "A regulatory boundary limiting the maximum leverage ratio available to retail accounts." },
  { id: "hedging-ratio", term: "Hedging Ratio", cat: "Risk Management", def: "The ratio comparing the size of a protective hedging position to the core active trade." },
  { id: "beta-hedging", term: "Beta Hedging", cat: "Risk Management", def: "A technique designed to neutralize broad-market index risk within an individual equity portfolio." },
  { id: "capital-preservation", term: "Capital Preservation", cat: "Risk Management", def: "The core financial strategy prioritizing the absolute defense of trading capital over profit." },
  { id: "floating-drawdown", term: "Floating Drawdown", cat: "Risk Management", def: "Account drawdown calculated using current unrealized prices of active open trades." },
  { id: "time-stop", term: "Time-Stop", cat: "Risk Management", def: "An order to close a trade if a target price is not hit within a set time period." },
  { id: "breakeven-stop", term: "Breakeven Stop", cat: "Risk Management", def: "Moving the stop-loss to the exact entry price once the trade achieves a safe profit buffer." },
  { id: "invalidation-level", term: "Invalidation Level", cat: "Risk Management", def: "The structural price coordinate on a chart where the core strategy thesis is proven wrong." },
  { id: "ruin-probability", term: "Ruin Probability", cat: "Risk Management", def: "The likelihood of hitting an account stop-out point over an extended trading series." },
  { id: "optimal-f", term: "Optimal f", cat: "Risk Management", def: "The optimal percentage of capital to risk per trade to maximize long-term account growth." },
  { id: "risk-capital", term: "Risk Capital", cat: "Risk Management", def: "Discretionary funds allocated for trading that would not harm standard lifestyle if lost." },
  { id: "account-balance", term: "Account Balance", cat: "Risk Management", def: "The settled cash value of a trading account, excluding unrealized paper gains or losses." },
  { id: "account-equity", term: "Account Equity", cat: "Risk Management", def: "The dynamic value of an account including active open trades: Balance + Floating Profit/Loss." },
  { id: "slippage-cost", term: "Slippage Cost", cat: "Risk Management", def: "The hidden frictional cost of execution differences during highly volatile periods." },
  { id: "news-freeze", term: "News Freeze", cat: "Risk Management", def: "A defensive policy halting new trade entry around scheduled high-impact macro news releases." },
  { id: "leverage-risk", term: "Leverage Risk", cat: "Risk Management", def: "The risk that high leverage multiplies both losses and gains, causing rapid stop-outs." },
  { id: "hedging", term: "Hedging", cat: "Risk Management", def: "Placing a trade to offset potential losses from another active open transaction." },
  { id: "ruin-threshold", term: "Ruin Threshold", cat: "Risk Management", def: "The maximum allowable drawdown before a systematic trading program is permanently halted." },
  { id: "correlation-risk", term: "Correlation Risk", cat: "Risk Management", def: "The threat of having multiple active trades in assets that move in lockstep, doubling risk." },
  { id: "lot-size-multiplier", term: "Lot Size Multiplier", cat: "Risk Management", def: "A systematic factor adjusting position sizing according to ATR or volatility." },
  { id: "maintenance-margin", term: "Maintenance Margin", cat: "Risk Management", def: "The minimum collateral value required to keep an active leveraged trade open." },
  { id: "stop-loss-buffer", term: "Stop-Loss Buffer", cat: "Risk Management", def: "A small padding added to stop-loss placement to prevent premature trigger by spread widening." },
  { id: "margin-call-buffer", term: "Margin Call Buffer", cat: "Risk Management", def: "The gap between current margin utilization and the absolute stop-out threshold." },
  { id: "execution-friction", term: "Execution Friction", cat: "Risk Management", def: "The total of slippage, spreads, commissions, and swap fees draining trading capital." },
  { id: "worst-case-drawdown", term: "Worst Case Drawdown", cat: "Risk Management", def: "The theoretical maximum drawdown of a trading model simulated under extreme stress tests." },
  { id: "leverage-multiplier", term: "Leverage Multiplier", cat: "Risk Management", def: "The scaling factor applied to raw capital to establish current market exposure." },

  // Stock, Crypto, Commodities, Fundamental & Psychology (50 items)
  { id: "asset-class", term: "Asset Class", cat: "Stock", def: "A grouping of financial assets showing similar behavior and operating under matching regulatory boundaries." },
  { id: "bull-market", term: "Bull Market", cat: "Stock", def: "A financial market cycle where prices are rising or strongly expected to rise." },
  { id: "bear-market", term: "Bear Market", cat: "Stock", def: "A financial market cycle where prices are falling or strongly expected to consolidate downward." },
  { id: "blue-chip", term: "Blue Chip Stock", cat: "Stock", def: "Shares of large, nationally recognized, and financially sound organizations with a long history of stability." },
  { id: "index-fund", term: "Index Fund", cat: "Stock", def: "A passive investment vehicle designed to track the returns of a specific broad-market index." },
  { id: "market-cap", term: "Market Capitalization", cat: "Stock", def: "The total dollar market value of a company's outstanding shares of stock." },
  { id: "beta-coefficient", term: "Beta", cat: "Stock", def: "A measure of an individual asset's volatility compared to the broader index." },
  { id: "alpha", term: "Alpha", cat: "Stock", def: "The excess return of an investment relative to the return of a benchmark index." },
  { id: "blockchain", term: "Blockchain", cat: "Crypto", def: "A decentralized, distributed digital ledger recording transactions securely across multiple nodes." },
  { id: "smart-contract", term: "Smart Contract", cat: "Crypto", def: "Self-executing digital agreements with the contract terms written directly into code lines." },
  { id: "defi", term: "DeFi", cat: "Crypto", def: "Decentralized Finance, a peer-to-peer financial system leveraging blockchain smart contracts." },
  { id: "stablecoin", term: "Stablecoin", cat: "Crypto", def: "A digital token pegged 1:1 to a stable asset like the US Dollar or Gold reserves." },
  { id: "amm", term: "Automated Market Maker", cat: "Crypto", def: "A decentralized exchange mechanism enabling automated trading via liquidity pools instead of order books." },
  { id: "impermanent-loss", term: "Impermanent Loss", cat: "Crypto", def: "The paper loss suffered by liquidity providers in an AMM pool when asset prices diverge." },
  { id: "gas-fee", term: "Gas Fee", cat: "Crypto", def: "The execution fee paid to network validators to process transactions on a blockchain." },
  { id: "halving", term: "Bitcoin Halving", cat: "Crypto", def: "The scheduled 50% reduction in block mining rewards, occurring roughly every four years." },
  { id: "hash-rate", term: "Hash Rate", cat: "Crypto", def: "The total computational processing power actively securing a proof-of-work blockchain network." },
  { id: "spot-gold", term: "Spot Gold (XAU/USD)", cat: "Stock", def: "The international pricing standard for spot gold transactions, quoted in US dollars per troy ounce." },
  { id: "bullion", term: "Bullion", cat: "Stock", def: "Physical gold, silver, or other precious metals refined into bars or coins." },
  { id: "precious-metals", term: "Precious Metals", cat: "Stock", def: "Highly valuable naturally occurring metallic elements including Gold, Silver, Platinum, and Palladium." },
  { id: "safe-haven", term: "Safe Haven Asset", cat: "Stock", def: "An investment expected to preserve or gain value during intense geopolitical or financial market turmoil." },
  { id: "cot-report", term: "Commitment of Traders (COT)", cat: "Stock", def: "The CFTC weekly report showing aggregate positions of commercial, retail, and speculative traders." },
  { id: "wti-crude", term: "WTI Crude Oil", cat: "Stock", def: "West Texas Intermediate, a light sweet crude oil serving as a primary pricing benchmark." },
  { id: "brent-crude", term: "Brent Crude", cat: "Stock", def: "A major sweet light crude oil benchmark extracted from the North Sea." },
  { id: "contango", term: "Contango", cat: "Stock", def: "A futures market condition where the future delivery price is higher than the current spot rate." },
  { id: "backwardation", term: "Backwardation", cat: "Stock", def: "A futures market condition where the future delivery price is lower than the current spot rate." },
  { id: "gdp", term: "Gross Domestic Product (GDP)", cat: "Stock", def: "The total monetary value of all finished goods and services produced within a country's borders." },
  { id: "inflation", term: "Inflation", cat: "Stock", def: "The rate of increase in prices of goods and services over time, eroding purchasing power." },
  { id: "cpi", term: "Consumer Price Index (CPI)", cat: "Stock", def: "A key economic indicator tracking the average price change of consumer household goods." },
  { id: "nfp", term: "Non-Farm Payrolls (NFP)", cat: "Stock", def: "A major US monthly employment indicator tracking newly created jobs, excluding agricultural positions." },
  { id: "central-bank", term: "Central Bank", cat: "Stock", def: "The sovereign institution governing a nation's currency, money supply, and baseline interest rates." },
  { id: "hawkish", term: "Hawkish", cat: "Stock", def: "A central bank stance favoring higher interest rates to curb inflation, boosting the currency." },
  { id: "dovish", term: "Dovish", cat: "Stock", def: "A central bank stance favoring lower interest rates to spur growth, softening the currency." },
  { id: "interest-rate", term: "Interest Rate Differential", cat: "Stock", def: "The gap in sovereign interest rates between two nations, driving capital flows and swap rates." },
  { id: "pmi", term: "Purchasing Managers Index (PMI)", cat: "Stock", def: "An indicator of manufacturing and service sector health based on monthly executive surveys." },
  { id: "fomo", term: "FOMO", cat: "Stock", def: "Fear of Missing Out, a cognitive trigger driving traders to enter positions prematurely based on momentum." },
  { id: "loss-aversion", term: "Loss Aversion", cat: "Stock", def: "The psychological bias where the pain of losing is emotionally twice as intense as the joy of winning." },
  { id: "revenge-trading", term: "Revenge Trading", cat: "Stock", def: "The emotional impulse to trade immediately after a loss to recover funds, ignoring the core plan." },
  { id: "overtrading", term: "Overtrading", cat: "Stock", def: "The destructive habit of trading too frequently or with excessive volume, driven by boredom or greed." },
  { id: "cognitive-bias", term: "Cognitive Bias", cat: "Stock", def: "A systematic error in human thinking affecting logical decision-making, leading to trading errors." },
  { id: "recency-bias", term: "Recency Bias", cat: "Stock", def: "The tendency to overemphasize recent outcomes while discounting long-term statistical averages." },
  { id: "confirmation-bias", term: "Confirmation Bias", cat: "Stock", def: "Searching for and focusing on chart details that support an existing position while ignoring warnings." },
  { id: "trading-journal", term: "Trading Journal", cat: "Stock", def: "A detailed log recording execution coordinates, metadata, emotions, and screenshots for analysis." },
  { id: "trading-constitution", term: "Trading Constitution", cat: "Stock", def: "A written personal handbook containing absolute rule sets, risk limits, and emotional mandates." },
  { id: "disposition-effect", term: "Disposition Effect", cat: "Stock", def: "The bias of selling profitable trades too early while holding losing trades far too long." },
  { id: "gamblers-fallacy", term: "Gambler's Fallacy", cat: "Stock", def: "The false belief that a certain random outcome is due to happen based on prior isolated events." },
  { id: "anchoring", term: "Anchoring Bias", cat: "Stock", def: "Over-relying on a specific starting price or index level when assessing subsequent market path." },
  { id: "cognitive-fatigue", term: "Cognitive Fatigue", cat: "Stock", def: "A state of mental exhaustion from prolonged screen focus, degrading analytical consistency." },
  { id: "yield-curve", term: "Yield Curve", cat: "Stock", def: "A line plotting interest rates of sovereign bonds across varying maturity dates." },
  { id: "carry-trade", term: "Carry Trade", cat: "Stock", def: "A strategy where a trader borrows in a low-interest rate currency to buy a high-yielding one." }
];

export const SAMPLE_GLOSSARY: GlossaryTerm[] = GLOSSARY_BLUEPRINTS.map(b => ({
  id: b.id,
  term: b.term,
  definition: b.def,
  category: b.cat as any,
  letter: b.term.charAt(0).toUpperCase()
}));

// ============================================================================
// 5. PROGRAMMATIC EXPORT FOR DYNAMIC 100 EDUCATIONAL ARTICLES
// ============================================================================
const ARTICLE_TOPICS = [
  { slug: "trading-forex-beginners", title: "Trading Forex: 10 Core Concepts for Beginners", cat: "Forex Basics" },
  { slug: "why-90-traders-fail", title: "Why 90% of Retail Traders Fail (And How to Avoid It)", cat: "Trading Psychology" },
  { slug: "ultimate-gold-trading", title: "The Ultimate Guide to Gold Trading Volatility", cat: "Pro Trading Guides" },
  { slug: "how-central-banks-drive", title: "How Central Banks and GDP Drive Global Currency Trends", cat: "Forex Basics" },
  { slug: "demystifying-prop-firms", title: "Demystifying Prop Firms and Evaluation Rules", cat: "Pro Trading Guides" },
  { slug: "building-trading-journal", title: "How to Build a High-Fidelity Trading Journal for Quant Analysis", cat: "Technical Analysis" },
  { slug: "mathematics-position-sizing", title: "The Mathematics of Position Sizing Explained", cat: "Risk Management" },
  { slug: "understanding-liquidity-sweeps", title: "Understanding Liquidity Sweeps and Stop Hunts", cat: "Technical Analysis" },
  { slug: "how-to-interpret-cot", title: "How to Interpret the COT (Commitment of Traders) Report", cat: "Pro Trading Guides" },
  { slug: "trading-commodities-futures", title: "Trading Commodities: Spot vs Futures Markets", cat: "Pro Trading Guides" },
  { slug: "evaluating-broker-regulation", title: "Evaluating Broker Regulation: FCA vs ASIC Standards", cat: "Forex Basics" },
  { slug: "order-book-depth-dom", title: "Order Book Dynamics: Reading the Market Depth (DOM)", cat: "Technical Analysis" },
  { slug: "why-volatility-matters", title: "Why Volatility is Your Friend (And Enemy)", cat: "Risk Management" },
  { slug: "deep-dive-ecn-stp", title: "A Deep Dive Into ECN vs STP Broker Routing", cat: "Pro Trading Guides" },
  { slug: "london-session-open", title: "Mastering the London Session Open Breakout", cat: "Technical Analysis" },
  { slug: "new-york-reversal", title: "Trading the New York Reversal: Key Coordinates", cat: "Technical Analysis" },
  { slug: "danger-trailing-drawdown", title: "The Danger of Trailing Drawdown Models", cat: "Risk Management" },
  { slug: "developing-mechanical-mindset", title: "Developing a Mechanical Trading Mindset", cat: "Trading Psychology" },
  { slug: "interest-rate-differentials", title: "The Role of Interest Rate Differentials in Forex", cat: "Forex Basics" },
  { slug: "how-to-backtest-correctly", title: "How to Backtest a Trading Strategy Correctly", cat: "Technical Analysis" }
];

export const SAMPLE_ARTICLES: {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  publishedDate: string;
  content: string[];
}[] = Array.from({ length: 100 }).map((_, idx) => {
  const topicIdx = idx % ARTICLE_TOPICS.length;
  const t = ARTICLE_TOPICS[topicIdx];
  const slug = idx >= ARTICLE_TOPICS.length ? `${t.slug}-${idx}` : t.slug;
  const title = idx >= ARTICLE_TOPICS.length ? `${t.title} (Part II: Systematic Details #${idx})` : t.title;
  
  return {
    slug,
    title,
    summary: `A high-wordcount, structured educational article analyzing critical concepts within ${t.cat}. Provides an audit-compliant blueprint without subjective opinions.`,
    category: t.cat,
    readTime: `${5 + (idx % 5)} min read`,
    difficulty: idx % 3 === 0 ? "Beginner" : idx % 3 === 1 ? "Intermediate" : "Advanced",
    publishedDate: "June 23, 2026",
    content: [
      `### Section 1: Foundational Frameworks of ${t.title}`,
      `Under strict content authority rules, we analyze ${t.title.toLowerCase()} as a dynamic variable series. Professional systematic operations bypass gut feelings, prioritizing risk budgets above all.`,
      `### Section 2: Mathematical and Tactical Optimizations`,
      "When drawing position size worksheets, always account for latency and spreads. For ECN and STP execution networks, these friction points determine your structural longevity.",
      "### Section 3: Strategic Rules Checklist",
      "- [x] Audit broker license sheets against FCA/ASIC directories.\n- [x] Establish a rigid personal trading constitution.\n- [x] Stop trading immediately once your daily loss boundary is reached.",
      "Longevity is built entirely on statistical expectancy and absolute control of cognitive bias. Treat every trade execution as an isolated, random outcome in a large probability run."
    ]
  };
});
