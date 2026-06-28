import { Metadata } from "next";
import StrategyLibrary from "@/app/components/StrategyLibrary";

export const metadata: Metadata = {
  title: "Systematic Strategy Library | Backtested Price Action Blueprints | PriceLot",
  description: "Browse our audited index of rule-based trading blueprints. Technical indicators, exact entry coordinates, risk margins, and win-rate estimates based on historic runs.",
  alternates: {
    canonical: "https://pricelot.com/strategies",
  },
};

export default function StrategiesPage() {
  return <StrategyLibrary />;
}
