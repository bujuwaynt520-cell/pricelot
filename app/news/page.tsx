import { Metadata } from "next";
import Link from "next/link";
import { Newspaper, Sparkles } from "lucide-react";
import NewsHubClient from "./NewsHubClient";
import NewsletterCTA from "../components/NewsletterCTA";
import { NEWS_CATEGORIES } from "@/app/lib/services/newsFeed";

export const metadata: Metadata = {
  title: "Market News Hub | PriceLot News & Market Updates",
  description: "Stay ahead with curated trading news, market headlines, and actionable updates across forex, crypto, indices, gold, and commodities.",
  alternates: {
    canonical: "https://pricelot.com/news",
  },
};

export default function NewsPage() {
  return (
    <div id="news-hub" className="space-y-8 animate-fade-in text-left">
      <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm p-6 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-[0.22em] border border-orange-100 shadow-sm">
              <Newspaper className="w-4 h-4" /> Market News Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
              News, trends, and market-moving storylines for active traders.
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base leading-7 max-w-2xl">
              Browse featured headlines, trending stories, and live market commentary from the PriceLot newsroom. Use search and category filters to surface the news that matters to your trading window.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm max-w-sm">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-500 mb-3">Today’s market signal</div>
            <div className="text-lg font-semibold text-zinc-900">High momentum in FX and crypto</div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-3">
              Featured news is updated continuously with expert commentary and fast market context for major macro events.
            </p>
            <Link
              href="/economic-calendar"
              className="mt-5 inline-flex items-center gap-2 text-orange-600 font-bold text-sm hover:text-orange-500"
            >
              View Economic Calendar
            </Link>
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 text-zinc-700">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <h2 className="text-lg font-semibold">Featured Briefings</h2>
            </div>
            <p className="text-zinc-500 text-sm mt-3">
              Handpicked headlines and expert summaries for the most critical market stories today.
            </p>
          </div>

          <NewsHubClient />
        </div>

        <aside className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5 shadow-sm">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-500 mb-3">Categories</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-2 rounded-2xl bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                All
              </span>
              {NEWS_CATEGORIES.map((category) => (
                <span key={category} className="px-3 py-2 rounded-2xl bg-white text-zinc-700 text-xs font-semibold border border-zinc-200">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-500 mb-3">Why PriceLot News</div>
            <ul className="space-y-3 text-zinc-500 text-sm">
              <li className="flex gap-3">
                <span className="text-orange-600">•</span>
                Timely market coverage across the most traded asset classes.
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600">•</span>
                Data-driven summaries designed for traders and risk managers.
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600">•</span>
                Curated updates that connect macro events to trading opportunities.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <div className="px-4 py-10 lg:px-8">
        <NewsletterCTA />
      </div>
    </div>
  );
}
