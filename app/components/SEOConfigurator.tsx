"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, Code, CheckCircle, Copy } from "lucide-react";
import { SAMPLE_BROKERS, SAMPLE_STRATEGIES, SAMPLE_LESSONS, SAMPLE_GLOSSARY, SAMPLE_ARTICLES } from "../data";
import { SEOInfo } from "../types";

interface EconomicEvent {
  slug: string;
  title: string;
  currency: string;
  country: string;
  datetimeUtc: string;
  impact: string;
  forecast?: string;
  previous?: string;
  unit?: string;
  source: string;
  region: string;
  category: string;
  notes?: string;
}

export default function SEOConfigurator() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [seo, setSeo] = useState<SEOInfo>({
    title: "PriceLot Trading Hub | Independent Financial Portal",
    description: "Compare regulated ECN brokers, analyze backtested mathematical strategies, master technical concepts, and reference market terminology.",
    keywords: ["Forex", "Trading Strategies", "ECN Brokers", "Pips", "Leverage"],
    canonicalUrl: "https://pricelot.com",
    ogImage: "https://pricelot.com/assets/og-image.jpg",
    jsonLd: "",
  });
  const [calendarEvents, setCalendarEvents] = useState<EconomicEvent[]>([]);

  useEffect(() => {
    // Determine active content based on path
    const segments = pathname ? pathname.split("/").filter(Boolean) : [];
    const rootPath = segments[0] || "home";
    const itemId = segments[1] || null;

    let title = "PriceLot Trading Hub | Independent Financial Portal";
    let description = "Compare regulated ECN brokers, analyze backtested mathematical strategies, master technical concepts, and reference market terminology.";
    let keywords = ["Forex", "Trading Strategies", "ECN Brokers", "Pips", "Leverage"];
    let canonicalUrl = `https://pricelot.com${pathname || ""}`;
    let schemaType = "WebSite";
    let schemaData: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PriceLot Hub",
      "url": "https://pricelot.com",
    };

    if (rootPath === "brokers") {
      if (itemId) {
        const broker = SAMPLE_BROKERS.find((b) => b.id === itemId);
        if (broker) {
          title = `${broker.name} Audit & Review | PriceLot Intelligence`;
          description = `Read our unbiased ECN audit for ${broker.name}. Spreads from ${broker.spreadsFrom}, regulated by ${broker.regulatedBy.join(", ")}, rating ${broker.rating}/5.`;
          keywords = [broker.name, "Broker Audit", "Spreads", ...broker.regulatedBy];
          schemaType = "Review";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "FinancialService",
              "name": broker.name,
              "logo": broker.logo,
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": broker.rating,
              "bestRating": "5",
            },
            "author": {
              "@type": "Organization",
              "name": "PriceLot Audits Group",
            },
            "reviewBody": broker.summary,
          };
        }
      } else {
        title = "Broker Intelligence Matrix | Compare Regulated ECN Brokers";
        description = "Unbiased comparisons of leading retail forex and contract-for-difference (CFD) brokers. Check real regulation status, spreads, minimum deposits, and execution speeds.";
        keywords = ["ECN Spreads", "Regulated Forex Brokers", "ASIC", "FCA Approved"];
        schemaType = "ItemList";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": SAMPLE_BROKERS.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `https://pricelot.com/brokers/${b.id}`,
            "name": b.name,
          })),
        };
      }
    } else if (rootPath === "strategies") {
      if (itemId) {
        const strategy = SAMPLE_STRATEGIES.find((s) => s.id === itemId);
        if (strategy) {
          title = `${strategy.name} Backtested Blueprint | PriceLot Systems`;
          description = `Analyze the rule-based ${strategy.name} strategy. Category: ${strategy.category}, targeted win-rate: ${strategy.winRateEstimate}, appropriate timeframes: ${strategy.timeframe}.`;
          keywords = [strategy.name, strategy.category, "Trading Strategy Rules", ...strategy.indicators];
          schemaType = "TechArticle";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": strategy.name,
            "description": strategy.description,
            "step": [
              { "@type": "HowToStep", "text": `BUY setup: ${strategy.rules.buy.join(" ")}` },
              { "@type": "HowToStep", "text": `SELL setup: ${strategy.rules.sell.join(" ")}` },
            ],
          };
        }
      } else {
        title = "Systematic Strategy Library | Backtested Price Action Systems";
        description = "Browse our audited index of rule-based trading blueprints. Technical indicators, exact entry coordinates, risk margins, and win-rate estimates based on historic runs.";
        keywords = ["Quantitative Trading Systems", "Trend Crossover Rules", "RSI Mean Reversion", "Risk Management Formulas"];
        schemaType = "CollectionPage";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Trading Strategy Blueprints Catalog",
          "description": "An index of audited mathematical and mechanical trading rulesets.",
        };
      }
    } else if (rootPath === "academy") {
      if (itemId) {
        const lesson = SAMPLE_LESSONS.find((l) => l.id === itemId);
        if (lesson) {
          title = `${lesson.title} | PriceLot Academy Courses`;
          description = `Master the foundations: ${lesson.summary} Level: ${lesson.difficulty}, estimated reading duration: ${lesson.readTime}. Includes post-lesson checkpoint quiz.`;
          keywords = [lesson.title, lesson.category, "Learn Forex Trading", "Financial Academy"];
          schemaType = "Course";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": lesson.title,
            "description": lesson.summary,
            "provider": {
              "@type": "Organization",
              "name": "PriceLot Academy",
              "sameAs": "https://pricelot.com",
            },
          };
        }
      } else {
        title = "Interactive Academy Portal | Free Masterclasses & Education";
        description = "A comprehensive curriculum mapping core trading concepts. Structured tutorials spanning pips, lot calculations, leverage controls, and market psychology.";
        keywords = ["Trading Tutorials", "Risk-to-Reward Formulas", "Stop Loss Setup Guide", "Drawdown Management"];
        schemaType = "Series";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          "name": "PriceLot Trading Academy Module",
          "description": "Curated tutorial pathways designed for retailer risk minimization.",
        };
      }
    } else if (rootPath === "glossary") {
      if (itemId) {
        const term = SAMPLE_GLOSSARY.find((g) => g.id === itemId);
        if (term) {
          title = `What is ${term.term}? Definition & Categories | PriceLot Glossary`;
          description = `Understand the financial term: '${term.term}'. Definition: ${term.definition} Category classification: ${term.category}.`;
          keywords = [term.term, "Financial Dictionary", term.category, "Trading Glossary"];
          schemaType = "DefinedTerm";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": term.term,
            "description": term.definition,
            "inDefinedTermSet": "https://pricelot.com/glossary",
          };
        }
      } else {
        title = "A-Z Financial Glossary & Terminology | PriceLot Dictionary";
        description = "Our comprehensive glossary defining key terminology used in forex, crypto, stocks, technical analysis, and systematic asset management.";
        keywords = ["Ask Price Definition", "Bid Price Explain", "Average True Range (ATR) Term", "CFD Leveraged Concept"];
        schemaType = "DefinedTermSet";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "name": "PriceLot Market Vocabulary Set",
          "description": "An exhaustive list of terms, metrics, and abbreviations used in liquid capital markets.",
        };
      }
    } else if (rootPath === "tools") {
      title = "Risk & Dynamic Position Sizing Calculator | PriceLot Tools";
      description = "Input your account balance, desired risk percentage, and stop loss to calculate optimal position lot sizes. Protect your capital with axiomatic mathematical sizing.";
      keywords = ["Lot Size Calculator", "Position Sizing Tool", "Pip Value Calculator", "Risk Estimator"];
      schemaType = "WebApplication";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PriceLot Position Sizing Calculator",
        "applicationCategory": "BusinessApplication",
        "browserRequirements": "Requires JavaScript. HTML5.",
      };
    } else if (rootPath === "articles") {
      if (itemId) {
        const article = SAMPLE_ARTICLES.find((a) => a.slug === itemId);
        if (article) {
          title = `${article.title} | PriceLot Editorial Guides`;
          description = article.summary;
          keywords = [article.title, article.category, "Funded Accounts", "Prop Firms Evaluation", "Trading Journal Quant Analysis"];
          schemaType = "Article";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.summary,
            "datePublished": "2026-06-22T12:00:00Z",
            "author": {
              "@type": "Organization",
              "name": "PriceLot Editorial Board",
            },
          };
        }
      } else {
        title = "Trading Guides & Editorial Deep-Dives | PriceLot Articles";
        description = "Read our rich, content-driven guides covering proprietary trading evaluation rules, funded accounts, high-fidelity quantitative trade journals, and systemic risk models.";
        keywords = ["Prop Firms Evaluations Guide", "Funded Accounts Sizing Rules", "Trade Logging Metrics", "Quantitative Journaling"];
        schemaType = "Blog";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "PriceLot Editorial Board",
          "description": "In-depth investigative articles on retail prop systems and quant tracking.",
        };
      }
    } else if (rootPath === "economic-calendar") {
      if (itemId) {
        const event = calendarEvents.find((e) => e.slug === itemId);
        if (event) {
          title = `${event.title} - ${event.currency} | Economic Calendar | PriceLot`;
          description = `${event.title} for ${event.country}. Impact: ${event.impact}. Forecast: ${event.forecast}, Previous: ${event.previous}. Track this event's impact on ${event.currency}.`;
          keywords = [event.title, event.currency, "Economic Event", event.category, "Forex Calendar"];
          canonicalUrl = `https://pricelot.com/economic-calendar/${event.slug}`;
          schemaType = "Event";
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.title,
            "description": event.notes || `${event.title} economic event`,
            "startDate": event.datetimeUtc,
            "location": {
              "@type": "Place",
              "name": event.country,
            },
            "organizer": {
              "@type": "Organization",
              "name": event.source,
            },
          };
        }
      } else {
        title = "Economic Calendar - High Impact Events & Trading Alerts | PriceLot";
        description = "Real-time economic calendar with high-impact events (NFP, CPI, GDP). Track forex-moving indicators by currency and impact. Subscribe to alerts and filter by timezone.";
        keywords = ["Economic Calendar", "NFP", "CPI", "GDP", "FOMC", "Economic Events", "Forex Calendar", "Trading Events"];
        canonicalUrl = "https://pricelot.com/economic-calendar";
        schemaType = "CollectionPage";
        schemaData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "PriceLot Economic Calendar",
          "description": "Real-time calendar of high-impact economic events that move forex and commodity markets.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": calendarEvents.slice(0, 10).map((e, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://pricelot.com/economic-calendar/${e.slug}`,
              "name": e.title,
            })),
          },
        };
      }
    }

    setSeo({
      title,
      description,
      keywords,
      canonicalUrl,
      ogImage: "https://pricelot.com/assets/og-image.jpg",
      jsonLd: JSON.stringify(schemaData, null, 2),
    });
  }, [pathname, calendarEvents]);

  useEffect(() => {
    const loadCalendarEvents = async () => {
      try {
        const response = await fetch("/api/economic-calendar");
        if (!response.ok) {
          throw new Error(`Failed to load calendar events: ${response.status}`);
        }
        const data = await response.json();
        setCalendarEvents(data.events ?? []);
      } catch (error) {
        console.error("Unable to load economic calendar events for SEO configurator:", error);
      }
    };

    loadCalendarEvents();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(seo.jsonLd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm text-left">
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
                <Copy className="w-3 h-3" /> Copy JSON-LD
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
