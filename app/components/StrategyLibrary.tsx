"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Layers, Activity, ShieldAlert, CheckCircle, TrendingUp, Play, Pause, RefreshCw, BarChart2, Info } from "lucide-react";
import { SAMPLE_STRATEGIES } from "../data";
import { Strategy } from "../types";
import { useAnalytics } from "../hooks/useAnalytics";

interface StrategyLibraryProps {
  selectedStrategyId?: string | null;
  onClearSelection?: () => void;
}

export default function StrategyLibrary({ selectedStrategyId, onClearSelection }: StrategyLibraryProps) {
  const { trackEvent } = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeStrategy, setActiveStrategy] = useState<Strategy>(SAMPLE_STRATEGIES[0]);
  
  // Interactive Simulator/Backtest State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simIndex, setSimIndex] = useState(1);
  const [simResults, setSimResults] = useState<{
    trades: number;
    winRate: number;
    netPips: number;
    drawdown: number;
  } | null>(null);

  const categories = ["All", "Trend", "Reversal", "Scalping", "Risk Management"];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Deep-link from global search
  useEffect(() => {
    if (selectedStrategyId) {
      const strat = SAMPLE_STRATEGIES.find((s) => s.id === selectedStrategyId);
      if (strat) {
        setActiveStrategy(strat);
        handleResetSimulation();
        if (onClearSelection) {
          onClearSelection();
        }
      }
    }
  }, [selectedStrategyId]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Backtester simulation loop
  useEffect(() => {
    if (isSimulating) {
      timerRef.current = setInterval(() => {
        setSimIndex((prev) => {
          const maxData = activeStrategy.chartsData.length;
          if (prev >= maxData) {
            setIsSimulating(false);
            if (timerRef.current) clearInterval(timerRef.current);
            
            // Generate final statistics based on strategy parameters
            const isRisk = activeStrategy.category === "Risk Management";
            setSimResults({
              trades: isRisk ? 5 : 10,
              winRate: 60, // Deterministic educational constant
              netPips: isRisk ? 150 : 220, // Deterministic educational constant
              drawdown: isRisk ? 1.5 : 3.0, // Deterministic educational constant
            });
            trackEvent("strategy_backtest_completed", "Strategies", activeStrategy.name, {
              strategyId: activeStrategy.id,
            });
            return maxData;
          }
          return prev + 1;
        });
      }, 700);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSimulating, activeStrategy]);

  const handleStartSimulation = () => {
    if (simIndex >= activeStrategy.chartsData.length) {
      setSimIndex(1);
      setSimResults(null);
    }
    setIsSimulating(true);
    trackEvent("strategy_backtest_started", "Strategies", activeStrategy.name, {
      strategyId: activeStrategy.id,
    });
  };

  const handlePauseSimulation = () => {
    setIsSimulating(false);
    trackEvent("strategy_backtest_paused", "Strategies", activeStrategy.name);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimIndex(1);
    setSimResults(null);
    trackEvent("strategy_backtest_reset", "Strategies", activeStrategy.name);
  };

  const handleSelectStrategy = (strat: Strategy) => {
    setActiveStrategy(strat);
    setIsSimulating(false);
    setSimIndex(1);
    setSimResults(null);
    trackEvent("strategy_selected", "Strategies", strat.name, { id: strat.id });
  };

  // Filter strategy list
  const filteredStrategies = SAMPLE_STRATEGIES.filter((s) => {
    return selectedCategory === "All" ? true : s.category === selectedCategory;
  });

  // Calculate simulated parameters
  const currentChartData = activeStrategy.chartsData.slice(0, simIndex);
  const activeSignal = currentChartData[currentChartData.length - 1]?.signal;

  return (
    <section id="strategies-section" className="space-y-8 animate-fade-in text-left">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">Systematic Strategy Blueprint Index</h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              Transparent, mathematical structures behind trend execution and risk modeling. Backtest systems in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sidebar Selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-4 shadow-sm">
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest px-1">
              Select Framework
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    trackEvent("strategy_category_filtered", "Strategies", cat);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-full border transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white border-transparent"
                      : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="grid gap-2">
              {filteredStrategies.map((strat) => {
                const isActive = activeStrategy.id === strat.id;
                return (
                  <button
                    key={strat.id}
                    onClick={() => handleSelectStrategy(strat)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isActive
                        ? "bg-white border-orange-500 text-orange-600 shadow-sm"
                        : "bg-transparent border-transparent text-zinc-700 hover:bg-zinc-150 hover:text-zinc-950"
                    }`}
                  >
                    <div className="font-serif font-bold italic text-sm leading-snug">{strat.name}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-zinc-200 text-zinc-600 rounded uppercase">
                        {strat.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Difficulty: {strat.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-4 text-xs space-y-2.5 text-zinc-600">
            <div className="font-serif font-bold italic text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-orange-600" /> What is an Axiomatic Guard?
            </div>
            <p className="leading-relaxed">
              Strategies listed as Risk Management serve as system-wide multipliers. They do not trigger buy orders, but instead govern trade size ratios dynamically to protect portfolio equity.
            </p>
          </div>
        </div>

        {/* Right Column: Active Strategy Panel & Simulator */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Details */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Header Specs */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-100 pb-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase tracking-wider">
                  {activeStrategy.category} System
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-black italic tracking-tight text-zinc-900">
                  {activeStrategy.name}
                </h3>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono shrink-0">
                <div className="bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                  <div className="text-[9px] text-zinc-400 uppercase">Win Rate Est.</div>
                  <div className="text-orange-600 font-bold mt-0.5">{activeStrategy.winRateEstimate}</div>
                </div>
                <div className="bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                  <div className="text-[9px] text-zinc-400 uppercase">Target R:R</div>
                  <div className="text-zinc-800 font-bold mt-0.5">{activeStrategy.riskRewardRatio}</div>
                </div>
              </div>
            </div>

            {/* Strategy Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Operational Concept</h4>
              <p className="text-zinc-700 text-sm leading-relaxed">{activeStrategy.description}</p>
            </div>

            {/* Indicators used */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Technical Overlay Specs</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeStrategy.indicators.map((ind, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs rounded-full font-medium">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Entry/Exit Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-3">
                <h5 className="text-xs font-serif font-bold italic text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> Buy Order (LONG) Rules
                </h5>
                <ol className="text-xs text-zinc-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
                  {activeStrategy.rules.buy.map((rule, idx) => (
                    <li key={idx} className="indent-0 pl-1">{rule}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-3">
                <h5 className="text-xs font-serif font-bold italic text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-pulse" /> Sell Order (SHORT) Rules
                </h5>
                <ol className="text-xs text-zinc-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
                  {activeStrategy.rules.sell.map((rule, idx) => (
                    <li key={idx} className="indent-0 pl-1">{rule}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-zinc-100 p-4 rounded-xl border border-zinc-200 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-serif font-bold italic text-zinc-900 uppercase block">Quantitative Safeguard Tip</span>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{activeStrategy.proTips}</p>
              </div>
            </div>

          </div>

          {/* Interactive Backtester Widget */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-black italic text-zinc-900 text-base">Historical Backtest Simulator</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">Evaluate mechanical edge on historical EUR/USD currency cycles.</p>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                {!isSimulating ? (
                  <button
                    onClick={handleStartSimulation}
                    className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Run backtest
                  </button>
                ) : (
                  <button
                    onClick={handlePauseSimulation}
                    className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                  </button>
                )}
                <button
                  onClick={handleResetSimulation}
                  className="p-2 bg-zinc-100 hover:bg-zinc-250 text-zinc-600 rounded-xl border border-zinc-200 transition cursor-pointer"
                  title="Reset simulation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Simulated Live Chart Area */}
            <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-200">
                <div>EUR/USD 1-Hour Chart Simulation</div>
                <div className="flex items-center gap-4">
                  <span>Candles: <b className="text-zinc-900">{simIndex} / {activeStrategy.chartsData.length}</b></span>
                  {isSimulating && <span className="text-orange-600 animate-pulse font-bold">● Simulating...</span>}
                </div>
              </div>

              {/* Simple Chart Visualization */}
              <div className="h-44 flex items-end justify-between gap-1.5 pt-4 relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 top-1/4 border-t border-zinc-200 border-dashed" />
                <div className="absolute inset-x-0 top-2/4 border-t border-zinc-200 border-dashed" />
                <div className="absolute inset-x-0 top-3/4 border-t border-zinc-200 border-dashed" />

                {activeStrategy.chartsData.map((data, idx) => {
                  const isVisible = idx < simIndex;
                  if (!isVisible) return null;

                  // Normalize pricing for simple SVG layout
                  const prices = activeStrategy.chartsData.map(d => d.price);
                  const minPrice = Math.min(...prices) - 0.001;
                  const maxPrice = Math.max(...prices) + 0.001;
                  const percentHeight = ((data.price - minPrice) / (maxPrice - minPrice)) * 100;
                  const maHeight = data.ma ? ((data.ma - minPrice) / (maxPrice - minPrice)) * 100 : 0;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full relative group">
                      
                      {/* Signal marker */}
                      {data.signal && (
                        <div
                          className={`absolute -top-7 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg z-10 animate-bounce ${
                            data.signal === "BUY" ? "bg-orange-600 text-white" : "bg-zinc-900 text-white"
                          }`}
                        >
                          {data.signal}
                        </div>
                      )}

                      {/* Moving average dot */}
                      {data.ma && (
                        <div
                          style={{ bottom: `${maHeight}%` }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-zinc-800 z-10 shadow"
                        />
                      )}

                      {/* Bar candle */}
                      <div
                        style={{ height: `${percentHeight}%` }}
                        className={`w-full max-w-[12px] rounded-t transition-all duration-300 ${
                          data.signal === "BUY"
                            ? "bg-orange-600"
                            : data.signal === "SELL"
                            ? "bg-zinc-400"
                            : "bg-zinc-300 hover:bg-zinc-400"
                        }`}
                      />

                      {/* Label */}
                      <span className="text-[9px] text-zinc-400 font-mono mt-2 shrink-0">
                        {data.name.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap gap-4 pt-2 text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-zinc-300 rounded-sm" /> Historical Candle
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-orange-600 rounded-sm" /> Long (Buy) Pivot Order
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-zinc-400 rounded-sm" /> Short (Sell) Pivot Order
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-zinc-800 rounded-full" /> 20-Period Smoothed MA Overlay
                </div>
              </div>
            </div>

            {/* Backtest Statistics Console Output */}
            <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest pb-3 border-b border-zinc-200">
                Performance Diagnostics Console
              </div>

              {isSimulating ? (
                <div className="py-8 text-center text-xs font-mono text-orange-600 space-y-2 animate-pulse">
                  <div>[COMPUTING MATRIX DATA SERIES]</div>
                  <div>Analyzing historical volatility convergence...</div>
                </div>
              ) : simResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
                    <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Sample Trades</div>
                      <div className="text-xl font-mono font-bold text-zinc-800 mt-0.5">{simResults.trades}</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Simulated Win Rate</div>
                      <div className="text-xl font-mono font-bold text-orange-600 mt-0.5">{simResults.winRate}%</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Net Profit Pips</div>
                      <div className="text-xl font-mono font-bold text-zinc-900 mt-0.5">+{simResults.netPips} pips</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Max Account DD</div>
                      <div className="text-xl font-mono font-bold text-zinc-600 mt-0.5">{simResults.drawdown}%</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-orange-50 border border-orange-100 rounded-lg text-[11px] text-orange-800 leading-relaxed font-sans flex items-start gap-2">
                    <span className="font-mono text-xs mt-0.5 shrink-0">⚠️</span>
                    <span>
                      <strong>Educational Reference Model:</strong> This backtest simulation runs a preset mathematical layout on historical static data. All performance outputs, net pips, win rates, and drawdowns are deterministic indicators generated purely for educational illustration and do not constitute actual or future performance expectations.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs font-mono text-zinc-400 flex flex-col items-center justify-center gap-2">
                  <BarChart2 className="w-8 h-8 text-zinc-300" />
                  <span>Execute a backtest run using the controls above to synthesize performance analytics.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
