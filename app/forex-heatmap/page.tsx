import { Metadata } from "next";
import HeatMapClient from "./HeatMapClient";

export const metadata: Metadata = {
  title: "Forex Heat Map | Currency Performance Matrix",
  description: "Interactive Forex heat map showing percentage moves across major currencies with strongest/weakest highlights and daily movers.",
  alternates: { canonical: "https://pricelot.com/forex-heatmap" },
  openGraph: {
    title: "Forex Heat Map | Currency Performance Matrix",
    description: "Interactive Forex heat map showing percentage moves across major currencies.",
    url: "https://pricelot.com/forex-heatmap",
  },
};

export default function ForexHeatMapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Forex Heat Map",
    url: "https://pricelot.com/forex-heatmap",
    description: "FX heat map showing cross moves and top movers for major currencies.",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-serif font-black italic text-zinc-900">Forex Heat Map</h1>
        <p className="text-zinc-500 mt-2">Matrix of cross currency percentage moves with heat coloring and summary widgets.</p>
      </div>

      <HeatMapClient />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
