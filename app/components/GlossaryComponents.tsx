"use client";

/**
 * Glossary Components
 * Reusable UI components for glossary pages
 */

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import type { GlossaryTermExtended } from "@/app/lib/contentEngine";

/**
 * Glossary Term Card
 */
export function GlossaryTermCard({
  term,
  showCategory = true,
}: {
  term: GlossaryTermExtended;
  showCategory?: boolean;
}) {
  return (
    <Link href={`/glossary/${term.id}`}>
      <div className="p-4 rounded-lg border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
              {term.term}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mt-1">
              {term.definition}
            </p>
          </div>
        </div>
        {showCategory && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {term.category}
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * Glossary Category Filter
 */
export function GlossaryCategoryFilter({
  categories,
  selected,
  onChange,
}: {
  categories: string[];
  selected: string[];
  onChange: (categories: string[]) => void;
}) {
  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange([])}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          selected.length === 0
            ? "bg-orange-300 text-slate-900"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selected.includes(category)
              ? "bg-orange-300 text-slate-900"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

/**
 * Glossary Search Bar
 */
export function GlossarySearch({
  onSearch,
  placeholder = "Search glossary...",
}: {
  onSearch: (query: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-orange-300 focus:outline-none"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

/**
 * Related Glossary Terms
 */
export function RelatedGlossaryTerms({
  terms,
  title = "Related Terms",
}: {
  terms: GlossaryTermExtended[];
  title?: string;
}) {
  if (terms.length === 0) return null;

  return (
    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {terms.map((term) => (
          <Link
            key={term.id}
            href={`/glossary/${term.id}`}
            className="text-orange-600 hover:text-orange-700 hover:underline text-sm"
          >
            {term.term}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Glossary Index A-Z
 */
export function GlossaryAZIndex({
  currentLetter,
  onLetterClick = () => {},
}: {
  currentLetter?: string;
  onLetterClick?: (letter: string) => void;
}) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className={`w-8 h-8 rounded border text-sm font-semibold transition-colors ${
            currentLetter === letter
              ? "bg-orange-300 text-slate-900 border-orange-300"
              : "bg-white text-slate-700 border-slate-300 hover:border-orange-300 hover:bg-orange-50"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

/**
 * Glossary Pagination
 */
export function GlossaryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded border border-slate-300 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? "bg-orange-300 text-slate-900"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded border border-slate-300 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

/**
 * Glossary Stats Banner
 */
export function GlossaryStatsBanner({
  totalTerms,
  categoryCount,
}: {
  totalTerms: number;
  categoryCount: number;
}) {
  return (
    <div className="bg-gradient-to-r from-orange-300/20 to-slate-100 p-6 rounded-lg border border-orange-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Financial Glossary
      </h2>
      <p className="text-slate-600">
        Explore{" "}
        <span className="font-semibold text-orange-600">{totalTerms}+</span>{" "}
        trading terms across{" "}
        <span className="font-semibold text-orange-600">{categoryCount}</span>{" "}
        categories.
      </p>
    </div>
  );
}

/**
 * Category Stats Grid
 */
export function CategoryStatsGrid({
  stats,
}: {
  stats: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => (
          <Link
            key={category}
            href={`/glossary/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            className="p-4 bg-white border border-slate-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            <h3 className="font-semibold text-slate-900">{category}</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{count}</p>
            <p className="text-xs text-slate-500">terms</p>
          </Link>
        ))}
    </div>
  );
}
