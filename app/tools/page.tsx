import { Metadata } from "next";
import { Percent } from "lucide-react";
import CalculatorTool from "./CalculatorTool";

export const metadata: Metadata = {
  title: "Position Sizing & Risk Management Calculator | PriceLot Tools",
  description: "Calculate optimal contract lot sizes (Standard, Mini, Micro) instantly based on your custom account balance, preferred stop loss distance, and risk capital percentage thresholds.",
  alternates: {
    canonical: "https://pricelot.com/tools",
  },
};

export default function ToolsPage() {
  return (
    <div id="calculator-tool" className="space-y-8 animate-fade-in text-left">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">Risk & Position Sizing Calculator</h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              Calculate standard contract lots based on strict mathematical allocation parameters to prevent severe drawdown cycles.
            </p>
          </div>
        </div>
      </div>

      {/* Render interactive calculator wrapper */}
      <CalculatorTool />

    </div>
  );
}
