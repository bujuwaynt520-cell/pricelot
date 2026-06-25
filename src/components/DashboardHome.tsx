/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, ShieldCheck, GraduationCap, BookOpen, Layers, CheckCircle2, Search, ArrowRight, Activity, Percent, Sparkles, AlertCircle } from "lucide-react";
import { SAMPLE_BROKERS, SAMPLE_STRATEGIES, SAMPLE_LESSONS, SAMPLE_GLOSSARY } from "../data";
import { useAnalytics } from "../hooks/useAnalytics";

interface DashboardHomeProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenSearch: () => void;
}

export default function DashboardHome({ onNavigate, onOpenSearch }: DashboardHomeProps) {
  const { trackEvent } = useAnalytics();
  
  // Simulated changing prices ticker
  const [tickerPrices, setTickerPrices] = useState({
    eurUsd: { rate: 1.0854, change: 0.12 },
    gbpUsd: { rate: 1.2642, change: -0.05 },
    usdJpy: { rate: 154.22, change: 0.38 },
    btcUsd: { rate: 67345.10, change: -1.24 },
  });

  // Sentiment ratio state
  const [sentiment, setSentiment] = useState({
    eurUsd: 64,
    gbpUsd: 48,
    usdJpy: 72,
  });

  // Simulate price changes on a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPrices((prev) => ({
        eurUsd: {
          rate: parseFloat((prev.eurUsd.rate + (Math.random() * 0.0004 - 0.0002)).toFixed(4)),
          change: parseFloat((prev.eurUsd.change + (Math.random() * 0.04 - 0.02)).toFixed(2)),
        },
        gbpUsd: {
          rate: parseFloat((prev.gbpUsd.rate + (Math.random() * 0.0004 - 0.0002)).toFixed(4)),
          change: parseFloat((prev.gbpUsd.change + (Math.random() * 0.04 - 0.02)).toFixed(2)),
        },
        usdJpy: {
          rate: parseFloat((prev.usdJpy.rate + (Math.random() * 0.08 - 0.04)).toFixed(2)),
          change: parseFloat((prev.usdJpy.change + (Math.random() * 0.04 - 0.02)).toFixed(2)),
        },
        btcUsd: {
          rate: parseFloat((prev.btcUsd.rate + (Math.random() * 12 - 6)).toFixed(1)),
          change: parseFloat((prev.btcUsd.change + (Math.random() * 0.1 - 0.05)).toFixed(2)),
        },
      }));

      // Shifting sentiment mildly
      setSentiment((prev) => ({
        eurUsd: Math.max(30, Math.min(85, prev.eurUsd + Math.floor(Math.random() * 3 - 1))),
        gbpUsd: Math.max(30, Math.min(85, prev.gbpUsd + Math.floor(Math.random() * 3 - 1))),
        usdJpy: Math.max(30, Math.min(85, prev.usdJpy + Math.floor(Math.random() * 3 - 1))),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (tabId: string, itemId: string, itemType: string, label: string) => {
    trackEvent("dashboard_featured_card_clicked", "Dashboard", `${itemType}: ${label}`, { itemId });
    onNavigate(tabId, itemId);
  };

  return (
    <div id="dashboard-home-module" className="space-y-12 animate-fade-in text-left">
      
      {/* Live Financial Ticker Bar */}
      <div className="bg-white border border-zinc-200/80 rounded-xl p-4 overflow-x-auto custom-scrollbar flex items-center justify-between gap-6 min-w-full shadow-sm">
        <div className="flex items-center gap-2 shrink-0 border-r border-zinc-200 pr-4">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Live Exchange Rates</span>
        </div>

        <div className="flex items-center gap-8 text-xs font-mono w-full justify-around select-none">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">EUR/USD</span>
            <span className="text-zinc-900 font-bold">{tickerPrices.eurUsd.rate.toFixed(4)}</span>
            <span className={tickerPrices.eurUsd.change >= 0 ? "text-orange-600" : "text-zinc-400"}>
              {tickerPrices.eurUsd.change >= 0 ? "+" : ""}{tickerPrices.eurUsd.change}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">GBP/USD</span>
            <span className="text-zinc-900 font-bold">{tickerPrices.gbpUsd.rate.toFixed(4)}</span>
            <span className={tickerPrices.gbpUsd.change >= 0 ? "text-orange-600" : "text-zinc-400"}>
              {tickerPrices.gbpUsd.change >= 0 ? "+" : ""}{tickerPrices.gbpUsd.change}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">USD/JPY</span>
            <span className="text-zinc-900 font-bold">{tickerPrices.usdJpy.rate.toFixed(2)}</span>
            <span className={tickerPrices.usdJpy.change >= 0 ? "text-orange-600" : "text-zinc-400"}>
              {tickerPrices.usdJpy.change >= 0 ? "+" : ""}{tickerPrices.usdJpy.change}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">BTC/USD</span>
            <span className="text-zinc-900 font-bold">${tickerPrices.btcUsd.rate.toLocaleString()}</span>
            <span className={tickerPrices.btcUsd.change >= 0 ? "text-orange-600" : "text-zinc-400"}>
              {tickerPrices.btcUsd.change >= 0 ? "+" : ""}{tickerPrices.btcUsd.change}%
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-2xl bg-white border border-zinc-200 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">
        {/* Ambient Gradient Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-xl space-y-6">
          <span className="text-[9px] font-mono font-black text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
            🛡️ Independent Audits • 📊 Backtested Math
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic text-zinc-900 leading-[1.05] tracking-tight">
            Independent Trading Portal <span className="text-orange-600">&</span> Broker Auditing
          </h1>

          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            Equipping retail traders with clean statistics, backtested strategy blueprints, and transparent evaluations. Zero sponsors. Completely free education.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                trackEvent("hero_brokers_clicked", "Dashboard", "Browse Brokers");
                onNavigate("brokers");
              }}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest rounded-full transition shadow-sm cursor-pointer text-center"
            >
              Browse Broker Directory
            </button>
            <button
              onClick={() => {
                trackEvent("hero_search_clicked", "Dashboard", "Search Portal");
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-900 font-bold text-xs uppercase tracking-widest rounded-full transition cursor-pointer shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-zinc-300" /> Search PriceLot Hub
            </button>
          </div>
        </div>

        {/* Dashboard Quick Metrics Counter Panel */}
        <div className="grid grid-cols-2 gap-4 w-full md:max-w-xs shrink-0">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1 hover:border-orange-500/30 transition shadow-sm">
            <ShieldCheck className="w-5 h-5 text-orange-600" />
            <div className="text-2xl font-mono font-bold text-zinc-900 pt-1">{SAMPLE_BROKERS.length}</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Regulated Brokers</div>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1 hover:border-orange-500/30 transition shadow-sm">
            <Layers className="w-5 h-5 text-orange-600" />
            <div className="text-2xl font-mono font-bold text-zinc-900 pt-1">{SAMPLE_STRATEGIES.length}</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Active Strategies</div>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1 hover:border-orange-500/30 transition shadow-sm">
            <GraduationCap className="w-5 h-5 text-orange-600" />
            <div className="text-2xl font-mono font-bold text-zinc-900 pt-1">{SAMPLE_LESSONS.length}</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Academy Courses</div>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1 hover:border-orange-500/30 transition shadow-sm">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <div className="text-2xl font-mono font-bold text-zinc-900 pt-1">{SAMPLE_GLOSSARY.length}+</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Glossary Terms</div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm hover:border-zinc-300 transition">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-zinc-900 font-serif font-bold italic text-base">Unbiased Auditing</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            No listing can buy higher ratings. We present ECN feeds, platform latencies, and financial regulation bodies completely raw and transparent.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm hover:border-zinc-300 transition">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-zinc-900 font-serif font-bold italic text-base">Mathematical Rulesets</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            We list strict, testable blueprints for price actions. No vague 'gut-feel' predictions, just defined entry conditions and dynamic margin sizing.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm hover:border-zinc-300 transition">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-zinc-900 font-serif font-bold italic text-base">Interactive Backtesting</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Don't trust blind claims. Run simulations directly in-app on currency data to evaluate execution edges before placing live capital.
          </p>
        </div>
      </section>

      {/* Featured spot lights (Brokers, Strategies, Academy) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-zinc-900"></span>
          <h2 className="text-lg font-serif font-black italic text-zinc-900 tracking-tight">Active Platform Spotlights</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Featured Broker Card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-md transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Featured Broker House</span>
                <span className="text-orange-600 font-semibold">★ {SAMPLE_BROKERS[0].rating}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-zinc-50 p-2 rounded-lg border border-zinc-100">{SAMPLE_BROKERS[0].logo}</span>
                <div>
                  <h4 className="text-zinc-950 font-serif font-bold text-base group-hover:text-orange-600 transition-colors">
                    {SAMPLE_BROKERS[0].name}
                  </h4>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5 uppercase tracking-wide">Tier-1 Regulated</div>
                </div>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 pt-1">
                {SAMPLE_BROKERS[0].summary}
              </p>
            </div>
            <button
              onClick={() => handleCardClick("brokers", SAMPLE_BROKERS[0].id, "Broker", SAMPLE_BROKERS[0].name)}
              className="mt-6 w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 border border-zinc-900 transition cursor-pointer shadow-sm"
            >
              Analyze Spreads & Fees <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured Strategy Card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-md transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Popular System</span>
                <span className="text-orange-600 font-semibold">Win: {SAMPLE_STRATEGIES[0].winRateEstimate}</span>
              </div>
              <div>
                <h4 className="text-zinc-950 font-serif font-bold text-base group-hover:text-orange-600 transition-colors">
                  {SAMPLE_STRATEGIES[0].name}
                </h4>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-orange-50 text-orange-600 border border-orange-100/60 rounded">
                    {SAMPLE_STRATEGIES[0].category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">Difficulty: {SAMPLE_STRATEGIES[0].difficulty}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                {SAMPLE_STRATEGIES[0].description}
              </p>
            </div>
            <button
              onClick={() => handleCardClick("strategies", SAMPLE_STRATEGIES[0].id, "Strategy", SAMPLE_STRATEGIES[0].name)}
              className="mt-6 w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 border border-zinc-900 transition cursor-pointer shadow-sm"
            >
              Launch Backtest <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured Academy Tutorial Card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-md transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Highly Rated Lesson</span>
                <span>Time: {SAMPLE_LESSONS[0].readTime}</span>
              </div>
              <div>
                <h4 className="text-zinc-950 font-serif font-bold text-base group-hover:text-orange-600 transition-colors">
                  {SAMPLE_LESSONS[0].title}
                </h4>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-orange-50 text-orange-600 border border-orange-100/60 rounded">
                    {SAMPLE_LESSONS[0].category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">Level: {SAMPLE_LESSONS[0].difficulty}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                {SAMPLE_LESSONS[0].summary}
              </p>
            </div>
            <button
              onClick={() => handleCardClick("academy", SAMPLE_LESSONS[0].id, "Academy", SAMPLE_LESSONS[0].title)}
              className="mt-6 w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 border border-zinc-900 transition cursor-pointer shadow-sm"
            >
              Start Learning Lesson <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Live Market Sentiment monitor */}
      <section className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-zinc-900 font-serif font-bold italic text-base flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-orange-600" /> Live Retail sentiment indexes
            </h3>
            <p className="text-zinc-400 text-xs">Simulated live open interest sentiment representing direct retail buy/sell volumes.</p>
          </div>
          <span className="text-[9px] font-mono text-zinc-400 font-semibold tracking-wide uppercase">UPDATED SECONDS AGO</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs text-zinc-600">
          
          {/* EUR/USD */}
          <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/50">
            <div className="flex justify-between font-bold">
              <span>EUR/USD Sentiment</span>
              <span className="text-orange-600">{sentiment.eurUsd}% LONG</span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded flex overflow-hidden">
              <div className="bg-orange-600 h-full transition-all duration-1000" style={{ width: `${sentiment.eurUsd}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>BUY: {sentiment.eurUsd}%</span>
              <span>SELL: {100 - sentiment.eurUsd}%</span>
            </div>
          </div>

          {/* GBP/USD */}
          <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/50">
            <div className="flex justify-between font-bold">
              <span>GBP/USD Sentiment</span>
              <span className="text-orange-600">{sentiment.gbpUsd}% LONG</span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded flex overflow-hidden">
              <div className="bg-orange-600 h-full transition-all duration-1000" style={{ width: `${sentiment.gbpUsd}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>BUY: {sentiment.gbpUsd}%</span>
              <span>SELL: {100 - sentiment.gbpUsd}%</span>
            </div>
          </div>

          {/* USD/JPY */}
          <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/50">
            <div className="flex justify-between font-bold">
              <span>USD/JPY Sentiment</span>
              <span className="text-orange-600">{sentiment.usdJpy}% LONG</span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded flex overflow-hidden">
              <div className="bg-orange-600 h-full transition-all duration-1000" style={{ width: `${sentiment.usdJpy}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>BUY: {sentiment.usdJpy}%</span>
              <span>SELL: {100 - sentiment.usdJpy}%</span>
            </div>
          </div>

        </div>

        <div className="flex items-start gap-2 text-[10px] text-zinc-500 leading-snug border-t border-zinc-100 pt-4">
          <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <p>
            Sentiment ratios can act as contrarian signals in highly liquid forex sessions. Elevated retail positioning exceeding 70% in either direction often indicators exhaustion, signifying potential macro reversals.
          </p>
        </div>
      </section>

    </div>
  );
}
