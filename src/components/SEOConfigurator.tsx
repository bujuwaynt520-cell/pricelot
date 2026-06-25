/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Globe, Code, Copy, CheckCircle } from "lucide-react";
import { SAMPLE_BROKERS, SAMPLE_STRATEGIES, SAMPLE_LESSONS, SAMPLE_GLOSSARY } from "../data";
import { SEOInfo } from "../types";
import { useAnalytics } from "../hooks/useAnalytics";

interface SEOConfiguratorProps {
  activeTab: string;
  selectedItemId?: string | null;
}

export default function SEOConfigurator({ activeTab, selectedItemId }: SEOConfiguratorProps) {
  const { trackEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [seo, setSeo] = useState<SEOInfo>({
    title: "PriceLot - Independent Trading Portal & Broker intelligence",
    description: "Equipping retail traders with neutral, non-sponsored broker audits, backtested technical strategies, and structural education on financial markets.",
    keywords: ["Forex", "Broker comparison", "Trading strategies", "Backtesting", "Finance", "Pips", "ECN spreads"],
    canonicalUrl: "https://pricelot.com/home",
    ogImage: "https://pricelot.com/og-home.jpg",
    jsonLd: "",
  });

  useEffect(() => {
    let title = "PriceLot - Independent Trading Portal & Broker intelligence";
    let description = "Equipping retail traders with neutral, non-sponsored broker audits, backtested technical strategies, and structural education on financial markets.";
    let keywords = ["Forex", "Broker comparison", "Trading strategies", "Backtesting", "Finance"];
    let path = activeTab;
    let jsonLdObj: Record<string, any> = {};

    if (activeTab === "brokers") {
      if (selectedItemId) {
        const b = SAMPLE_BROKERS.find((broker) => broker.id === selectedItemId);
        if (b) {
          title = `${b.name} Honest Review & Trading Specs | PriceLot`;
          description = `Read our honest review of ${b.name} established in ${b.established}. Minimum deposit $${b.minDeposit}, maximum leverage ${b.maxLeverage}, spreads from ${b.spreadsFrom}.`;
          keywords = [b.name, "broker review", "ECN spread", "minimum deposit", ...b.platforms];
          path = `brokers/${b.id}`;
          jsonLdObj = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": b.name,
            "description": b.summary,
            "category": "Broker Review",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": b.rating,
              "reviewCount": b.reviewsCount,
            },
          };
        }
      } else {
        title = "Top Broker Comparison Matrix 2026 | PriceLot Hub";
        description = "Neutral ECN spreads comparison, regulation review (FCA, ASIC), platform support (MT4, MT5, TradingView), and withdrawal fees comparison.";
        keywords = ["best forex brokers", "regulated brokers", "ECN spreads comparison", "FCA regulation"];
        path = "brokers";
        jsonLdObj = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "PriceLot Regulated Forex Brokers",
          "itemListElement": SAMPLE_BROKERS.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "url": `https://pricelot.com/brokers/${b.id}`,
          })),
        };
      }
    } else if (activeTab === "strategies") {
      if (selectedItemId) {
        const s = SAMPLE_STRATEGIES.find((strat) => strat.id === selectedItemId);
        if (s) {
          title = `How to trade: ${s.name} | Strategy Blueprint`;
          description = `Learn the complete mechanical rules for the ${s.name} strategy. Category: ${s.category}, estimated win-rate ${s.winRateEstimate}, target R:R ${s.riskRewardRatio}.`;
          keywords = [s.name, s.category, "trading rules", "backtested strategy", ...s.indicators];
          path = `strategies/${s.id}`;
          jsonLdObj = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": s.name,
            "description": s.description,
            "step": [
              { "@type": "HowToStep", "text": `Ensure conditions: Buy rules: ${s.rules.buy.join(". ")}` },
              { "@type": "HowToStep", "text": `Ensure conditions: Sell rules: ${s.rules.sell.join(". ")}` },
            ],
          };
        }
      } else {
        title = "Systematic Backtested Trading Strategy Index | PriceLot";
        description = "Full rulesets and indicators for trend-following, mean reversion, momentum breakout, and defensive capital allocation models.";
        keywords = ["trading strategies", "RSI systems", "moving average crossover", "risk management"];
        path = "strategies";
        jsonLdObj = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "PriceLot Strategic Index blueprints",
          "description": "Rulesets for retail trading automation.",
        };
      }
    } else if (activeTab === "academy") {
      if (selectedItemId) {
        const l = SAMPLE_LESSONS.find((lesson) => lesson.id === selectedItemId);
        if (l) {
          title = `${l.title} - Academy Lesson | PriceLot`;
          description = l.summary;
          keywords = [l.title, l.category, "trading course", "tutorial lesson", l.difficulty];
          path = `academy/${l.id}`;
          jsonLdObj = {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": l.title,
            "description": l.summary,
            "educationalLevel": l.difficulty,
            "about": {
              "@type": "Thing",
              "name": l.category,
            },
          };
        }
      } else {
        title = "Interactive Trading Academy - Learn Finance 101 | PriceLot";
        description = "Pips, lots, leverage, candlestick charts, drawdowns, and risk reward models. Master the financial markets with interactive curriculum check quizzes.";
        keywords = ["learn trading", "forex course", "technical analysis tutorial", "drawdown psychology"];
        path = "academy";
        jsonLdObj = {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "PriceLot Complete Financial Literacy Curriculum",
          "description": "Interactive trading academy covering structure, execution, and psychological safeguards.",
        };
      }
    } else if (activeTab === "glossary") {
      if (selectedItemId) {
        const g = SAMPLE_GLOSSARY.find((term) => term.id === selectedItemId);
        if (g) {
          title = `What is ${g.term}? Financial Term Definition | PriceLot`;
          description = g.definition;
          keywords = [g.term, "definition", "glossary", g.category, "dictionary"];
          path = `glossary/${g.id}`;
          jsonLdObj = {
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": g.term,
            "description": g.definition,
            "inDefinedTermSet": "https://pricelot.com/glossary",
          };
        }
      } else {
        title = "A-Z Financial Dictionary & Trading Jargon | PriceLot";
        description = "Look up over 30 fundamental trading terms: slippage, arbitrage, spread, leverage, margin, equity, drawdown, bid, and ask prices.";
        keywords = ["trading dictionary", "financial jargon terms", "pips meaning", "margin call meaning"];
        path = "glossary";
        jsonLdObj = {
          "@context": "https://schema.org",
          "@type": "MedicalScholarlyArticle", // used generally for academic definitions
          "headline": "A-Z Financial Dictionary",
          "description": "Standardized financial definitions for retail market participants.",
        };
      }
    } else if (activeTab === "tools") {
      title = "Risk, Position Sizing & Pip Calculators | PriceLot Tools";
      description = "Free institutional-grade trading tools. Calculate optimal lot sizes, pip values, risk-reward ratios, and contract specs for Forex, Gold, and Cryptocurrencies.";
      keywords = ["position size calculator", "pip calculator", "risk reward calculator", "lot size calculator", "trading tools"];
      path = "tools";
      jsonLdObj = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PriceLot Sizing and Risk Sizer Calculators",
        "description": "Calculators for contract lots, stop losses, and pip valuations.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All"
      };
    } else {
      // Home
      title = "PriceLot - Independent Trading Portal & Broker intelligence";
      description = "Equipping retail traders with neutral, non-sponsored broker audits, backtested technical strategies, and structural education on financial markets.";
      keywords = ["Forex", "Broker comparison", "Trading strategies", "Backtesting", "Finance", "Pips", "ECN spreads"];
      path = "home";
      jsonLdObj = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "PriceLot Trading Hub",
        "url": "https://pricelot.com/",
        "description": description,
      };
    }

    const currentSeo = {
      title,
      description,
      keywords,
      canonicalUrl: `https://pricelot.com/${path}`,
      ogImage: `https://pricelot.com/og-${activeTab}.jpg`,
      jsonLd: JSON.stringify(jsonLdObj, null, 2),
    };

    setSeo(currentSeo);
    
    // Simulate updating browser head
    document.title = title;
  }, [activeTab, selectedItemId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(seo.jsonLd);
    setCopied(true);
    trackEvent("seo_schema_copied", "SEO", seo.title);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-600" />
          <h4 className="font-serif font-black italic text-zinc-900 text-xs uppercase tracking-wider">SEO Real-Time Metadata Framework</h4>
        </div>
        <div className="text-[10px] font-mono text-zinc-400">HTML HEAD SIMULATOR</div>
      </div>

      {/* Meta outputs */}
      <div className="space-y-3 font-mono text-[11px] leading-relaxed text-zinc-500">
        <div>
          <span className="text-zinc-400 font-bold block">&lt;title&gt;</span>
          <span className="text-zinc-800 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-zinc-200 block mt-1 leading-snug font-sans font-bold">
            {seo.title}
          </span>
        </div>

        <div>
          <span className="text-zinc-400 font-bold block">&lt;meta name="description" content="..."&gt;</span>
          <span className="text-zinc-600 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-zinc-200 block mt-1 leading-snug font-sans">
            {seo.description}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2 flex-wrap">
          <div>
            <span className="text-zinc-400 font-bold block">&lt;link rel="canonical"&gt;</span>
            <span className="text-orange-600 text-[10px] mt-0.5 block font-bold">{seo.canonicalUrl}</span>
          </div>
          <div>
            <span className="text-zinc-400 font-bold block">&lt;meta keywords&gt;</span>
            <span className="text-zinc-500 text-[10px] mt-0.5 block truncate max-w-[200px]">{seo.keywords.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Code Inspector */}
      <div className="border-t border-zinc-150 pt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase font-mono font-bold">
            <Code className="w-3.5 h-3.5 text-zinc-400" /> Structured Schema (JSON-LD)
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] font-bold text-orange-600 hover:text-orange-500 transition cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3 h-3 text-orange-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy Schema
              </>
            )}
          </button>
        </div>

        <pre className="bg-zinc-900 border border-zinc-850 p-3 rounded-lg text-[9px] font-mono text-orange-400 overflow-x-auto max-h-32 custom-scrollbar text-left select-all">
          {seo.jsonLd}
        </pre>
      </div>

    </div>
  );
}
