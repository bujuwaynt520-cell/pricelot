import { Metadata } from "next";
import Link from "next/link";
import { getAuthorSummaries, AUTHORS } from "../lib/contentEngine";
import { User, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Contributors | PriceLot Authors",
  description: "Explore PriceLot author profiles, expert analysts, and contributors behind our broker audits, strategy tests, and educational guides.",
  alternates: {
    canonical: "https://pricelot.com/authors",
  },
};

export default function AuthorsIndexPage() {
  const authors = getAuthorSummaries();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-700 border border-orange-100 shadow-sm">
          <User className="w-4 h-4" /> Contributors
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
          Meet the PriceLot Editorial Team
        </h1>
        <p className="max-w-3xl text-zinc-500 text-sm md:text-base leading-relaxed">
          Our contributor network powers every review, lesson, glossary definition, and strategy blueprint.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-3xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-3xl shadow-inner">
                {author.avatar}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-zinc-900">{author.name}</h2>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.25em] font-bold">{author.role}</p>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed line-clamp-3">{author.bio}</p>
              </div>
            </div>
            <div className="mt-6 rounded-full bg-zinc-100 px-4 py-2 text-[11px] font-bold text-zinc-600">
              {author.count} published items
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
