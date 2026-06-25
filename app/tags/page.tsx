import { Metadata } from "next";
import Link from "next/link";
import { getTagSummary } from "../lib/contentEngine";
import { Tag, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Topic Tags | PriceLot Trading Hub",
  description: "Browse PriceLot topic tags and discover related trading guides, course lessons, strategies, and glossary terms.",
  alternates: {
    canonical: "https://pricelot.com/tags",
  },
};

export default function TagsIndexPage() {
  const tags = getTagSummary();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-700 border border-orange-100 shadow-sm">
          <Tag className="w-4 h-4" /> Topic Tags
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
          Browse Trending Content Tags
        </h1>
        <p className="max-w-3xl text-zinc-500 text-sm md:text-base leading-relaxed">
          PriceLot tags connect your search terms with curated guides, glossary definitions, strategy blueprints, and academy lessons.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag.tag}
            href={`/tags/${encodeURIComponent(tag.tag)}`}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-50 p-3 border border-orange-100 shadow-inner">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">#{tag.tag}</h2>
                  <p className="text-xs text-zinc-400 uppercase tracking-[0.25em] font-bold">Content Tag</p>
                </div>
              </div>
              <div className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600">
                {tag.count} items
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Find the most impactful topics shaping the PriceLot trading library.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
