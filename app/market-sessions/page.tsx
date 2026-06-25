import { Metadata } from "next";
import SessionTrackerClient from "./SessionTrackerClient";

export const metadata: Metadata = {
  title: "Forex Market Sessions | PriceLot Sessions Tracker",
  description: "Live Forex session clock — see Sydney, Tokyo, London, and New York sessions with UTC and local times, active session highlights, overlaps and countdowns.",
  alternates: { canonical: "https://pricelot.com/market-sessions" },
  openGraph: {
    title: "Forex Market Sessions | PriceLot Sessions Tracker",
    description: "Live Forex session clock with session timelines, active session highlighting, and countdowns to open/close.",
    url: "https://pricelot.com/market-sessions",
  },
};

export default function MarketSessionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Forex Market Sessions",
    url: "https://pricelot.com/market-sessions",
    description: "Live Forex session clock for Sydney, Tokyo, London, and New York with UTC and local time support.",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-serif font-black italic text-zinc-900">Forex Market Sessions</h1>
        <p className="text-zinc-500 mt-2">Live session tracker showing market open/close times, active session highlighting, overlaps and countdowns.</p>
      </div>

      <SessionTrackerClient />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
