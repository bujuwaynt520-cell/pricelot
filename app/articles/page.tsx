import { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import ArticlesList from "./ArticlesList";
import { ENGINE_ARTICLES } from "../lib/contentEngine";

export const metadata: Metadata = {
  title: "Trading Guides & Editorial Deep-Dives | PriceLot Articles",
  description: "Read our rich, content-driven guides covering proprietary trading evaluation rules, funded accounts, high-fidelity quantitative trade journals, and systemic risk models.",
  alternates: {
    canonical: "https://pricelot.com/articles",
  },
};

export default function ArticlesPage() {
  return (
    <div id="articles-directory" className="space-y-8 animate-fade-in text-left">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">PriceLot Editorial & Guides</h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              In-depth investigative reports, prop firm evaluations, quantitative journals, and systemic risk assessments.
            </p>
          </div>
        </div>
      </div>

      {/* Render interactive list wrapper, passing in server database */}
      <ArticlesList articles={ENGINE_ARTICLES} />
    </div>
  );
}
