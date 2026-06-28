"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Star, ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, SlidersHorizontal, Layers, Check, RefreshCw } from "lucide-react";
import { SAMPLE_BROKERS } from "../data";
import { Broker } from "../types";
import { useAnalytics } from "../hooks/useAnalytics";

interface BrokerReviewProps {
  selectedBrokerId?: string | null;
  onClearSelection?: () => void;
}

export default function BrokerReview({ selectedBrokerId, onClearSelection }: BrokerReviewProps) {
  const { trackEvent } = useAnalytics();
  const [expandedBrokerId, setExpandedBrokerId] = useState<string | null>(null);
  
  // Interactive Broker Comparison list
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filters state
  const [maxDepositFilter, setMaxDepositFilter] = useState<number>(600);
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [regulationFilter, setRegulationFilter] = useState<boolean>(false); // strictly multi-regulated FCA/ASIC

  // Referral warning modal state
  const [referralBroker, setReferralBroker] = useState<Broker | null>(null);

  const brokerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Deep-link from global search
  useEffect(() => {
    if (selectedBrokerId) {
      const broker = SAMPLE_BROKERS.find((b) => b.id === selectedBrokerId);
      if (broker) {
        setExpandedBrokerId(broker.id);
        
        // Reset filters to ensure it's visible
        setMaxDepositFilter(600);
        setPlatformFilter("All");
        setRegulationFilter(false);

        setTimeout(() => {
          const element = brokerRefs.current[broker.id];
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            trackEvent("broker_scrolled_to_review", "Brokers", broker.name);
          }
        }, 150);
      }
    }
  }, [selectedBrokerId]);

  const handleToggleExpand = (id: string, brokerName: string) => {
    const isExpanding = expandedBrokerId !== id;
    setExpandedBrokerId(isExpanding ? id : null);
    if (isExpanding) {
      trackEvent("broker_review_expanded", "Brokers", brokerName);
    }
    if (onClearSelection) {
      onClearSelection();
    }
  };

  const handleToggleCompare = (id: string, brokerName: string) => {
    setCompareList((prev) => {
      const isIncluded = prev.includes(id);
      let updated;
      if (isIncluded) {
        updated = prev.filter((bId) => bId !== id);
        trackEvent("broker_compare_removed", "Brokers", brokerName);
      } else {
        if (prev.length >= 3) {
          alert("You can compare a maximum of 3 brokers simultaneously.");
          return prev;
        }
        updated = [...prev, id];
        trackEvent("broker_compare_added", "Brokers", brokerName);
      }
      return updated;
    });
  };

  const handleTriggerReferral = (broker: Broker) => {
    setReferralBroker(broker);
    trackEvent("broker_referral_initiated", "Brokers", broker.name, { minDeposit: broker.minDeposit });
  };

  const handleConfirmReferral = () => {
    if (referralBroker) {
      trackEvent("broker_referral_completed", "Brokers", referralBroker.name, {
        referralUrl: `https://www.pricelot.com/go/${referralBroker.id}`,
      });
      // Simulate redirection
      setReferralBroker(null);
    }
  };

  const handleResetFilters = () => {
    setMaxDepositFilter(600);
    setPlatformFilter("All");
    setRegulationFilter(false);
    setCompareList([]);
    setExpandedBrokerId(null);
    if (onClearSelection) {
      onClearSelection();
    }
    trackEvent("brokers_reset_filters", "Brokers", "Filters Cleared");
  };

  // Extract platforms lists dynamically
  const allPlatforms = ["All", ...Array.from(new Set(SAMPLE_BROKERS.flatMap((b) => b.platforms)))];

  // Filter Logic
  const filteredBrokers = SAMPLE_BROKERS.filter((b) => {
    const matchesDeposit = b.minDeposit <= maxDepositFilter;
    const matchesPlatform = platformFilter === "All" ? true : b.platforms.includes(platformFilter);
    const matchesRegulation = regulationFilter
      ? b.regulatedBy.some((r) => r.includes("FCA") || r.includes("ASIC"))
      : true;

    return matchesDeposit && matchesPlatform && matchesRegulation;
  });

  return (
    <section id="brokers-section" className="space-y-8 animate-fade-in text-left">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">Neutral Broker Comparison Matrix</h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              No sponsored tier rankings. Browse raw statistics, fee structures, and multi-regulator compliance vectors.
            </p>
          </div>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => {
              setShowCompareModal(true);
              trackEvent("broker_compare_overlay_opened", "Brokers", `Comparing ${compareList.length} Brokers`);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" /> Compare Selected ({compareList.length})
          </button>
        )}
      </div>

      {/* Filter Parameters Widget */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-zinc-800 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-orange-600" /> Filter Criteria
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Min Deposit Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Max Minimum Deposit:</span>
              <span className="text-zinc-900 font-bold">${maxDepositFilter}</span>
            </div>
            <input
              type="range"
              min="0"
              max="600"
              step="50"
              value={maxDepositFilter}
              onChange={(e) => {
                setMaxDepositFilter(parseInt(e.target.value));
                trackEvent("broker_filter_deposit_adjusted", "Brokers", e.target.value);
              }}
              className="w-full accent-orange-600 bg-zinc-200 h-1 rounded cursor-pointer"
            />
          </div>

          {/* Platform Filter */}
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 font-mono block">Trading Engine Platform:</label>
            <div className="flex flex-wrap gap-1.5">
              {allPlatforms.map((plat) => (
                <button
                  key={plat}
                  onClick={() => {
                    setPlatformFilter(plat);
                    trackEvent("broker_filter_platform_selected", "Brokers", plat);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-full border transition cursor-pointer ${
                    platformFilter === plat
                      ? "bg-orange-50 text-orange-600 border-orange-200"
                      : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Regulation Toggle */}
          <div className="flex items-center justify-between md:justify-center gap-4">
            <div className="space-y-0.5">
              <span className="text-xs text-zinc-800 font-bold block">FCA / ASIC Standard</span>
              <span className="text-[10px] text-zinc-400 font-mono block">Show Tier-1 multi-regulated only</span>
            </div>
            <button
              onClick={() => {
                setRegulationFilter(!regulationFilter);
                trackEvent("broker_filter_regulation_toggled", "Brokers", String(!regulationFilter));
              }}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                regulationFilter ? "bg-orange-600" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  regulationFilter ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div>Showing {filteredBrokers.length} of {SAMPLE_BROKERS.length} Available Broker Houses</div>
          <button onClick={handleResetFilters} className="text-orange-600 hover:underline flex items-center gap-1 cursor-pointer font-bold">
            <RefreshCw className="w-3 h-3 animate-spin-slow" /> Reset Filter Matrix
          </button>
        </div>
      </div>

      {/* Grid of Brokers */}
      <div className="space-y-6">
        {filteredBrokers.length > 0 ? (
          filteredBrokers.map((broker) => {
            const isExpanded = expandedBrokerId === broker.id;
            const isCompared = compareList.includes(broker.id);
            return (
              <div
                key={broker.id}
                ref={(el) => {
                  brokerRefs.current[broker.id] = el;
                }}
                className={`bg-white border rounded-xl p-5 md:p-6 transition-all duration-300 ${
                  isExpanded 
                    ? "border-orange-500 shadow-md" 
                    : "border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                {/* Main Card Header Specs */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-zinc-100">
                  
                  {/* Title block */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-2xl border border-zinc-100 shrink-0">
                      {broker.logo}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-zinc-900 font-serif font-black italic text-lg leading-tight">{broker.name}</h3>
                        <span className="text-[10px] text-zinc-400 font-mono">Est. {broker.established}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Compliance Verified
                        </div>
                        <span className="text-zinc-300 text-xs">•</span>
                        <span className="text-zinc-500 text-[10px] font-mono">{broker.regulatedBy[0] || "Licensed"}</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Specifications metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono max-w-sm w-full lg:w-auto shrink-0 self-center lg:self-auto">
                    <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                      <div className="text-[9px] text-zinc-400 uppercase">Min Deposit</div>
                      <div className="text-zinc-900 font-bold mt-0.5">${broker.minDeposit}</div>
                    </div>
                    <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                      <div className="text-[9px] text-zinc-400 uppercase">Max Leverage</div>
                      <div className="text-zinc-900 font-bold mt-0.5">{broker.maxLeverage}</div>
                    </div>
                    <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                      <div className="text-[9px] text-zinc-400 uppercase">Spreads From</div>
                      <div className="text-orange-600 font-bold mt-0.5">{broker.spreadsFrom}</div>
                    </div>
                  </div>
 
                  {/* Actions buttons */}
                  <div className="flex sm:flex-row lg:flex-col gap-2 shrink-0 lg:w-44">
                    <button
                      onClick={() => handleTriggerReferral(broker)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition"
                    >
                      Open Account <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleCompare(broker.id, broker.name)}
                      className={`flex-1 px-4 py-2 text-xs font-bold rounded-xl border transition ${
                        isCompared
                          ? "bg-orange-50 text-orange-600 border-orange-200"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      {isCompared ? "✓ Compare List" : "Add to Compare"}
                    </button>
                  </div>
 
                </div>

                {/* Regulation, Platforms Tags */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 text-xs font-mono border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-zinc-400 uppercase text-[10px]">Regulated:</span>
                    {broker.regulatedBy.map((reg) => (
                      <span key={reg} className="px-2 py-0.5 bg-zinc-50 text-zinc-600 rounded border border-zinc-100 text-[10px]">
                        {reg}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-zinc-400 uppercase text-[10px]">Platforms:</span>
                    {broker.platforms.map((plat) => (
                      <span key={plat} className="px-2 py-0.5 bg-zinc-50 text-zinc-600 rounded border border-zinc-100 text-[10px]">
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons brief summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 text-xs">
                  <div className="space-y-2">
                    <div className="font-serif font-bold italic text-zinc-900 uppercase tracking-wide text-[10px]">Key Advantages</div>
                    <ul className="space-y-1.5 text-zinc-600">
                      {broker.pros.slice(0, 2).map((pro, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-serif font-bold italic text-zinc-400 uppercase tracking-wide text-[10px]">Potential Drawbacks</div>
                    <ul className="space-y-1.5 text-zinc-600">
                      {broker.cons.slice(0, 2).map((con, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Expanded Details review content */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100 pt-6 mt-4 border-t border-zinc-100" : "max-h-0 opacity-0"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Specs Fact Checklist */}
                    <div className="md:col-span-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3 font-mono">
                      <div className="font-bold text-zinc-500 text-[10px] uppercase tracking-wider pb-1.5 border-b border-zinc-100">
                        Operational Fact Checklist
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between border-b border-zinc-100 pb-1">
                          <span className="text-zinc-500">Established:</span>
                          <span className="text-zinc-900 font-bold">{broker.established}</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-100 pb-1">
                          <span className="text-zinc-500">US Clients:</span>
                          <span className="text-zinc-900 font-bold">{broker.usClients ? "Allowed" : "Restricted"}</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-100 pb-1">
                          <span className="text-zinc-500">Execution Type:</span>
                          <span className="text-zinc-900 font-bold">ECN / DMA STP</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-zinc-500">Platforms Support:</span>
                          <span className="text-zinc-900 font-bold font-sans text-[11px]">{broker.platforms.join(", ")}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-zinc-500">Primary Regulators:</span>
                          <span className="text-zinc-900 font-bold font-sans text-[11px]">{broker.regulatedBy.join(", ")}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-200 text-[10px] text-zinc-400 space-y-1.5 leading-relaxed">
                        <div>Accepted deposit channels:</div>
                        <div className="flex flex-wrap gap-1 text-zinc-700 font-semibold font-sans">
                          {broker.depositMethods.join(", ")}
                        </div>
                      </div>
                    </div>

                    {/* Detailed evaluation text */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1.5 text-xs text-zinc-600">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">Editorial Verdict</span>
                        <p className="leading-relaxed font-sans text-sm text-zinc-800">{broker.summary}</p>
                      </div>

                      <div className="space-y-1.5 text-xs text-zinc-600">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">Detailed Execution Testing</span>
                        <p className="leading-relaxed font-sans text-sm text-zinc-500">{broker.reviewText}</p>
                      </div>

                      {/* Full Pros & Cons list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans pt-2">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-orange-600 uppercase tracking-wider block font-semibold">Full Pros list</span>
                          <ul className="space-y-1 text-zinc-500 leading-snug">
                            {broker.pros.map((pro, i) => (
                              <li key={i} className="flex gap-1.5 items-start">
                                <span className="text-orange-500 shrink-0">✓</span> <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-semibold">Full Cons list</span>
                          <ul className="space-y-1 text-zinc-500 leading-snug">
                            {broker.cons.map((con, i) => (
                              <li key={i} className="flex gap-1.5 items-start">
                                <span className="text-zinc-400 shrink-0">⚠</span> <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Expand Toggle */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-center">
                  <button
                    onClick={() => handleToggleExpand(broker.id, broker.name)}
                    className="text-zinc-500 hover:text-orange-600 font-mono text-xs font-semibold cursor-pointer transition-colors duration-200"
                  >
                    {isExpanded ? "Collapse evaluation details" : "Read full editorial evaluation"}
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl col-span-full">
            <Layers className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-700 font-semibold">No brokers match your filter metrics</p>
            <p className="text-zinc-400 text-sm mt-1">Try relaxing your Deposit threshold or selecting All platforms.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition cursor-pointer shadow-sm"
            >
              Reset Comparison Parameters
            </button>
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Matrix Overlay Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl custom-scrollbar">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h4 className="font-serif font-black italic text-zinc-900 text-lg">Compare Broker Specs Side-by-Side</h4>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition shadow-sm"
              >
                CLOSE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {compareList.map((id) => {
                const b = SAMPLE_BROKERS.find((broker) => broker.id === id);
                if (!b) return null;
                return (
                  <div key={b.id} className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-4 relative shadow-sm">
                    {/* Remove button */}
                    <button
                      onClick={() => handleToggleCompare(b.id, b.name)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-orange-600 text-xs font-mono font-bold cursor-pointer transition"
                    >
                      REMOVE
                    </button>

                    <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
                      <span className="text-2xl bg-white p-1.5 rounded border border-zinc-100">{b.logo}</span>
                      <div>
                        <h5 className="font-serif font-bold italic text-zinc-900 text-sm">{b.name}</h5>
                        <div className="flex items-center text-orange-500 text-xs font-mono mt-0.5">
                          <Star className="w-3 h-3 fill-current" /> <span className="ml-1 text-zinc-700 font-bold">{b.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-zinc-600">
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Minimum Deposit</span>
                        <span className="text-zinc-900 font-bold text-sm">${b.minDeposit}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Max leverage</span>
                        <span className="text-zinc-900 font-bold">{b.maxLeverage}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Spread from</span>
                        <span className="text-orange-600 font-bold">{b.spreadsFrom}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Regulators</span>
                        <span className="text-zinc-700 font-bold text-[10px] whitespace-normal block mt-0.5 leading-snug">
                          {b.regulatedBy.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Platforms</span>
                        <span className="text-zinc-700 font-bold text-[10px] whitespace-normal block mt-0.5 leading-snug">
                          {b.platforms.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">Established</span>
                        <span className="text-zinc-700 font-bold">{b.established}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[9px] block uppercase font-bold">USA clients</span>
                        <span className={`font-bold ${b.usClients ? "text-orange-600" : "text-zinc-400"}`}>
                          {b.usClients ? "YES" : "NO"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200">
                      <button
                        onClick={() => {
                          setShowCompareModal(false);
                          handleTriggerReferral(b);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition shadow-sm"
                      >
                        Launch account <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* Referral Warning Dialog */}
      {referralBroker && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center border border-orange-100 mx-auto shadow-inner">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-serif font-black italic text-zinc-900 text-lg">Exiting PriceLot Portal</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                You are about to be referred to our independent compliance partner link for <b className="text-zinc-900">{referralBroker.name}</b>. 
              </p>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                PriceLot does not collect user deposits. Always verify security credentials, domains, and regulatory registries directly with local financial watchdogs prior to making any wire transfers.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setReferralBroker(null);
                  trackEvent("broker_referral_cancelled", "Brokers", referralBroker.name);
                }}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl border border-zinc-200 cursor-pointer transition"
              >
                Go back
              </button>
              <button
                onClick={handleConfirmReferral}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition shadow-sm"
              >
                Proceed securely
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
