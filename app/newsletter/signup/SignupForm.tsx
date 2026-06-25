"use client";

import { useState } from "react";
import { newsletterProvider } from "../../lib/services/newsletter";
import { Mail, Sparkles } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await newsletterProvider.subscribe(email.trim(), name.trim() || undefined, "newsletter-signup-page");
      setStatus("Thanks! You’re subscribed and will receive the next PriceLot issue.");
      setEmail("");
      setName("");
    } catch (error) {
      setStatus("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
          <Mail className="w-4 h-4" /> Newsletter signup
        </div>
        <h1 className="text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
          Join PriceLot’s email audience.
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Get weekly market intelligence, trade ideas, and educational dispatches before they reach the site. Perfect for traders who want a disciplined edge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">First name (optional)</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Alex"
            className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-orange-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Subscribing…" : "Subscribe now"}
        </button>

        {status && <div className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">{status}</div>}

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-500">
          <div className="font-semibold text-zinc-700">Why subscribe?</div>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Weekly market insights for traders.</li>
            <li>First access to newsletter-only watchlists.</li>
            <li>No spam, unsubscribe anytime.</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
