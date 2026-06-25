"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { BookOpen, Search, Filter, RefreshCw, Layers } from "lucide-react";
import { SAMPLE_GLOSSARY } from "../data";
import { useAnalytics } from "../hooks/useAnalytics";

interface GlossaryProps {
  selectedTermId?: string | null;
  onClearSelection?: () => void;
}

export default function Glossary({ selectedTermId, onClearSelection }: GlossaryProps) {
  const { trackEvent } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Available letters in our dataset
  const letters = Array.from(new Set(SAMPLE_GLOSSARY.map((item) => item.letter))).sort();
  // Available categories
  const categories = ["All", ...Array.from(new Set(SAMPLE_GLOSSARY.map((item) => item.category)))];

  // Handle selected term routing from global search
  useEffect(() => {
    if (selectedTermId) {
      const term = SAMPLE_GLOSSARY.find((g) => g.id === selectedTermId);
      if (term) {
        setSearchTerm("");
        setSelectedLetter(null);
        setSelectedCategory("All");
        setExpandedTermId(term.id);
        
        // Scroll into view
        setTimeout(() => {
          const element = termRefs.current[term.id];
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            trackEvent("glossary_scrolled_to_term", "Glossary", term.term);
          }
        }, 150);
      }
    }
  }, [selectedTermId]);

  // Filter terms
  const filteredTerms = SAMPLE_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter ? item.letter === selectedLetter : true;
    const matchesCategory = selectedCategory === "All" ? true : item.category === selectedCategory;
    return matchesSearch && matchesLetter && matchesCategory;
  });

  const handleTermClick = (id: string, termName: string) => {
    const isExpanding = expandedTermId !== id;
    setExpandedTermId(isExpanding ? id : null);
    if (isExpanding) {
      trackEvent("glossary_term_expanded", "Glossary", termName);
    }
    if (onClearSelection) {
      onClearSelection();
    }
  };

  const handleLetterSelect = (letter: string | null) => {
    setSelectedLetter(letter);
    trackEvent("glossary_letter_filtered", "Glossary", letter || "Clear Letter");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    trackEvent("glossary_category_filtered", "Glossary", category);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedLetter(null);
    setSelectedCategory("All");
    setExpandedTermId(null);
    if (onClearSelection) {
      onClearSelection();
    }
    trackEvent("glossary_reset_filters", "Glossary", "Filters Reset");
  };

  return (
    <section id="glossary-section" className="space-y-8 animate-fade-in">
      
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">Interactive A-Z Trading Glossary</h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              Demystifying complex financial mechanics, chart indicators, and leverage jargon with zero-fluff definitions.
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-bold rounded-lg border border-zinc-200 transition cursor-pointer shrink-0 shadow-sm uppercase tracking-wider"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear & Reset Filters
        </button>
      </div>

      {/* Filter controls */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-5 shadow-sm">
        
        {/* Search Input and Category Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. margin, pip)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length > 2) {
                  trackEvent("glossary_search_typed", "Glossary", e.target.value);
                }
              }}
              className="w-full bg-white text-zinc-800 text-sm pl-10 pr-4 py-3 border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition shadow-inner"
            />
          </div>

          <div className="lg:col-span-8 flex flex-wrap items-center gap-1.5">
            <div className="text-xs text-zinc-500 font-bold mr-2 flex items-center gap-1 uppercase tracking-wider">
              <Filter className="w-3 h-3" /> Category:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full border transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white border-transparent shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Rolodex */}
        <div className="border-t border-zinc-200 pt-4">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mr-2">A-Z Index:</span>
            <button
              onClick={() => handleLetterSelect(null)}
              className={`px-3 py-1.5 text-xs font-mono font-bold border rounded-md transition cursor-pointer ${
                selectedLetter === null
                  ? "bg-orange-600 text-white border-transparent shadow-sm"
                  : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              ALL
            </button>
            {letters.map((letr) => (
              <button
                key={letr}
                onClick={() => handleLetterSelect(letr)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-bold border rounded-md transition cursor-pointer ${
                  selectedLetter === letr
                    ? "bg-orange-600 text-white border-transparent shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                {letr}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Glossary list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((g) => {
            const isExpanded = expandedTermId === g.id;
            const isRouted = selectedTermId === g.id;
            return (
              <div
                key={g.id}
                ref={(el) => {
                  termRefs.current[g.id] = el;
                }}
                className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-300 group ${
                  isRouted
                    ? "bg-orange-50/60 border-orange-400 shadow-md"
                    : isExpanded
                    ? "bg-orange-50/20 border-orange-200 shadow-sm"
                    : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm"
                }`}
                onClick={() => handleTermClick(g.id, g.term)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 text-xs font-mono font-extrabold border border-zinc-200">
                      {g.letter}
                    </span>
                    <h3 className="text-zinc-900 font-serif font-black italic tracking-tight text-base group-hover:text-orange-600 transition-colors">
                      {g.term}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200 uppercase tracking-wider">
                    {g.category}
                  </span>
                </div>

                <div className={`mt-3 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[300px] opacity-100" : "max-h-12 opacity-60 line-clamp-2"}`}>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    {g.definition}
                  </p>
                </div>
                
                {/* Visual Hint for Expand */}
                <div className="mt-3 flex items-center justify-end">
                  <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase group-hover:text-orange-600 transition-colors">
                    {isExpanded ? "Click to collapse" : "Click to view full definition"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl">
            <Layers className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-700 font-semibold">No dictionary terms matched your parameters</p>
            <p className="text-zinc-400 text-sm mt-1">Try relaxing your search terms or expanding the Letter filter.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
