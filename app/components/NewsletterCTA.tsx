"use client";

import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section className="rounded-3xl border border-orange-200 bg-orange-50/80 p-6 text-left shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-orange-700">
            <Mail className="w-4 h-4" /> Newsletter Growth
          </div>
          <div>
            <h2 className="text-2xl font-serif font-black italic text-zinc-900">Get the next PriceLot briefing by email.</h2>
            <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
              Join traders who receive market commentary, strategy updates, and prioritized newsletter issues directly in their inbox.
            </p>
          </div>
        </div>

        <Link
          href="/newsletter/signup"
          className="inline-flex items-center gap-2 rounded-3xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          <Sparkles className="w-4 h-4" /> Sign up now
        </Link>
      </div>
    </section>
  );
}
