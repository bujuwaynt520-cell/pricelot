/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Wrench, Compass, ShieldCheck, Layers, BookOpen, GraduationCap, Calculator, Percent, Sparkles } from "lucide-react";
import PositionSizeCalculator from "./tools/PositionSizeCalculator";
import PipCalculator from "./tools/PipCalculator";
import RiskRewardCalculator from "./tools/RiskRewardCalculator";
import LotSizeCalculator from "./tools/LotSizeCalculator";
import { useAnalytics } from "../hooks/useAnalytics";

interface TradingToolsHubProps {
  onNavigate: (tab: string, itemId?: string) => void;
}

export default function TradingToolsHub({ onNavigate }: TradingToolsHubProps) {
  const { trackEvent } = useAnalytics();
  const [activeSubTab, setActiveSubTab] = useState<string>("position");

  useEffect(() => {
    trackEvent("tools_sub_tab_changed", "ToolsHub", `Switched to ${activeSubTab}`, {
      subTab: activeSubTab,
    });
  }, [activeSubTab]);

  const toolsList = [
    { id: "position", label: "Position Sizer", icon: Percent, desc: "Sizing lots based on risk and stop spacing." },
    { id: "pip", label: "Pip Value", icon: Calculator, desc: "Find exact dollar value of a single pip." },
    { id: "risk-reward", label: "Risk-Reward Ratio", icon: Sparkles, desc: "Check setup validation & expected value." },
    { id: "lot-sizer", label: "Multi-Asset Lot Sizer", icon: Wrench, desc: "Calculate contract sizes for Forex, Metals, & Crypto." },
  ];

  return (
    <div id="trading-tools-hub" className="space-y-8 animate-fade-in text-left">
      {/* Tools Master Header Banner */}
      <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[110px] leading-none font-black font-serif text-zinc-50/70 select-none pointer-events-none transform translate-y-[-20px] translate-x-[20px]">
          TOOLS
        </div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">
              Systematic Trading Calculators
            </h2>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
              Equip your trading workflow with institutional-grade risk management tools. Protect your capital and manage portfolio drawdowns systematically.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-navigation selector (Responsive buttons/tabs) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-zinc-200 pb-4">
        {toolsList.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeSubTab === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveSubTab(tool.id)}
              className={`flex flex-col items-center md:items-start text-center md:text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? "bg-zinc-900 border-zinc-900 text-white shadow-md shadow-zinc-900/10"
                  : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-zinc-400"}`} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">{tool.label}</span>
              </div>
              <span className={`text-[10px] hidden md:inline leading-snug ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>
                {tool.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active calculator stage */}
      <div className="mt-6">
        {activeSubTab === "position" && <PositionSizeCalculator />}
        {activeSubTab === "pip" && <PipCalculator />}
        {activeSubTab === "risk-reward" && <RiskRewardCalculator />}
        {activeSubTab === "lot-sizer" && <LotSizeCalculator />}
      </div>
    </div>
  );
}
