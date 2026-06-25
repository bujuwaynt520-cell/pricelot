/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, TrendingUp, Shield, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_BROKERS, SAMPLE_STRATEGIES, SAMPLE_LESSONS, SAMPLE_GLOSSARY } from "../data";
import { useAnalytics } from "../hooks/useAnalytics";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, onNavigate }: SearchOverlayProps) {
  const { trackEvent } = useAnalytics();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      trackEvent("search_overlay_opened", "Search", "Search Overlay Opened");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Search indexing
  const normalizedQuery = query.toLowerCase().trim();

  const matchedBrokers = normalizedQuery
    ? SAMPLE_BROKERS.filter(
        (b) =>
          b.name.toLowerCase().includes(normalizedQuery) ||
          b.summary.toLowerCase().includes(normalizedQuery) ||
          b.platforms.some((p) => p.toLowerCase().includes(normalizedQuery)) ||
          b.regulatedBy.some((r) => r.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedStrategies = normalizedQuery
    ? SAMPLE_STRATEGIES.filter(
        (s) =>
          s.name.toLowerCase().includes(normalizedQuery) ||
          s.description.toLowerCase().includes(normalizedQuery) ||
          s.indicators.some((i) => i.toLowerCase().includes(normalizedQuery)) ||
          s.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedLessons = normalizedQuery
    ? SAMPLE_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(normalizedQuery) ||
          l.summary.toLowerCase().includes(normalizedQuery) ||
          l.category.toLowerCase().includes(normalizedQuery) ||
          l.content.some((c) => c.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedGlossary = normalizedQuery
    ? SAMPLE_GLOSSARY.filter(
        (g) =>
          g.term.toLowerCase().includes(normalizedQuery) ||
          g.definition.toLowerCase().includes(normalizedQuery) ||
          g.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults =
    matchedBrokers.length + matchedStrategies.length + matchedLessons.length + matchedGlossary.length;

  const handleSelect = (tab: string, itemId: string, itemType: string, label: string) => {
    trackEvent("search_result_clicked", "Search", `${itemType}: ${label}`, { query, itemId });
    onNavigate(tab, itemId);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="search-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-900/65 backdrop-blur-md pt-20 px-4 md:px-6"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-3xl bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 bg-zinc-50">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-zinc-900 text-lg placeholder-zinc-400 focus:outline-none font-sans font-bold"
            placeholder="Search brokers, strategies, lessons, glossary terms..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 2) {
                trackEvent("search_query_typed", "Search", e.target.value);
              }
            }}
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-150 text-zinc-400 hover:text-zinc-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-5 custom-scrollbar bg-white">
          {query === "" ? (
            <div className="text-center py-10">
              <p className="text-zinc-500 text-sm font-sans">Type something to begin searching PriceLot...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["ApexPrime", "ECN Spread", "RSI Indicator", "Support", "Leverage"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      trackEvent("search_suggestion_clicked", "Search", tag);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-600 text-xs font-bold rounded-full border border-zinc-200 hover:border-zinc-300 transition cursor-pointer"
                  >
                    "{tag}"
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10">
              <HelpCircle className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-zinc-700 font-serif font-bold italic">No results matched your search</p>
              <p className="text-zinc-500 text-sm mt-1">Try searching for other terms like "Spread", "MACD", or "Risk".</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">
                Found {totalResults} matching results
              </div>

              {/* Brokers */}
              {matchedBrokers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-orange-600" /> BROKERS ({matchedBrokers.length})
                  </h4>
                  <div className="grid gap-2">
                    {matchedBrokers.map((broker) => (
                      <button
                        key={broker.id}
                        onClick={() => handleSelect("brokers", broker.id, "Broker", broker.name)}
                        className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-orange-50/10 border border-zinc-200 hover:border-orange-200 rounded-xl transition text-left group cursor-pointer"
                      >
                        <div>
                          <div className="font-serif font-black italic text-zinc-900 flex items-center gap-2">
                            <span>{broker.logo}</span>
                            <span>{broker.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 font-normal font-mono font-bold">
                              ★ {broker.rating}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{broker.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Strategies */}
              {matchedStrategies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-600" /> TRADING STRATEGIES ({matchedStrategies.length})
                  </h4>
                  <div className="grid gap-2">
                    {matchedStrategies.map((strat) => (
                      <button
                        key={strat.id}
                        onClick={() => handleSelect("strategies", strat.id, "Strategy", strat.name)}
                        className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-orange-50/10 border border-zinc-200 hover:border-orange-200 rounded-xl transition text-left group cursor-pointer"
                      >
                        <div>
                          <div className="font-serif font-black italic text-zinc-900 flex items-center gap-2">
                            <span>{strat.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-full font-mono">
                              {strat.category}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{strat.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Academy Lessons */}
              {matchedLessons.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-orange-600" /> ACADEMY LESSONS ({matchedLessons.length})
                  </h4>
                  <div className="grid gap-2">
                    {matchedLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleSelect("academy", lesson.id, "Academy", lesson.title)}
                        className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-orange-50/10 border border-zinc-200 hover:border-orange-200 rounded-xl transition text-left group cursor-pointer"
                      >
                        <div>
                          <div className="font-serif font-black italic text-zinc-900 flex items-center gap-2">
                            <span>{lesson.title}</span>
                            <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-full">
                              {lesson.category}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{lesson.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {matchedGlossary.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-orange-600" /> GLOSSARY DICTIONARY ({matchedGlossary.length})
                  </h4>
                  <div className="grid gap-2">
                    {matchedGlossary.map((gloss) => (
                      <button
                        key={gloss.id}
                        onClick={() => handleSelect("glossary", gloss.id, "Glossary", gloss.term)}
                        className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-orange-50/10 border border-zinc-200 hover:border-orange-200 rounded-xl transition text-left group cursor-pointer"
                      >
                        <div>
                          <div className="font-serif font-black italic text-zinc-900 flex items-center gap-2">
                            <span>{gloss.term}</span>
                            <span className="text-xs px-2 py-0.5 bg-zinc-900 text-white rounded-md font-mono">
                              Letter {gloss.letter}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{gloss.definition}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
