import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getCategoryCounts } from "../lib/contentEngine";
import { BookOpen, GraduationCap, TrendingUp, ShieldAlert, Award, Globe } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-5 h-5 text-orange-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-orange-600" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-orange-600" />,
  Award: <Award className="w-5 h-5 text-orange-600" />,
  Globe: <Globe className="w-5 h-5 text-orange-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-orange-600" />,
};

export const metadata: Metadata = {
  title: "Resource Categories | PriceLot Trading Hub",
  description: "Browse curated PriceLot resource categories for trading education, strategies, glossary terms, and premium market guides.",
  alternates: {
    canonical: "https://pricelot.com/categories",
  },
};

export default function CategoriesIndexPage() {
  const categoryCounts = getCategoryCounts();
  const categories = Object.values(CATEGORIES);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-700 border border-orange-100 shadow-sm">
          <BookOpen className="w-4 h-4" /> Resource Taxonomy
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
          Explore PriceLot Topic Categories
        </h1>
        <p className="max-w-3xl text-zinc-500 text-sm md:text-base leading-relaxed">
          Each category page consolidates articles, lessons, strategies, and glossary terms into a focused learning hub for your trading workflow.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-50 p-3 border border-orange-100 shadow-inner">
                  {ICON_MAP[category.icon] ?? ICON_MAP.BookOpen}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">{category.name}</h2>
                  <p className="text-xs text-zinc-400 uppercase tracking-[0.25em] font-bold">Category hub</p>
                </div>
              </div>
              <div className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600">
                {categoryCounts[category.id] ?? 0} pages
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
