import { Metadata } from "next";
import CurrencyStrengthClient from "./CurrencyStrengthClient";

export const metadata: Metadata = {
  title: "Currency Strength | Live Forex Strength Meter",
  description: "Currency strength dashboard for USD, EUR, GBP, JPY, CHF, AUD, NZD, CAD — rankings, bars, and top movers.",
  alternates: { canonical: "https://pricelot.com/currency-strength" },
  openGraph: {
    title: "Currency Strength | Live Forex Strength Meter",
    description: "Currency strength dashboard with scores, rankings and top gainers/losers.",
    url: "https://pricelot.com/currency-strength",
  },
};

export default function CurrencyStrengthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Currency Strength Meter",
    url: "https://pricelot.com/currency-strength",
    description: "A currency strength dashboard for major FX pairs providing strength scores and rankings.",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-serif font-black italic text-zinc-900">Currency Strength Meter</h1>
        <p className="text-zinc-500 mt-2">Realistic seed data powers this dashboard — ready for live API integration.</p>
      </div>

      <CurrencyStrengthClient />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
