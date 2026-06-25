"use client";

import { useState, useEffect } from "react";
import { Percent, Activity, ShieldCheck } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

export default function CalculatorTool() {
  const { trackEvent } = useAnalytics();

  // Inputs
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [currencyPair, setCurrencyPair] = useState<string>("EUR/USD");

  // Outputs
  const [cashRisked, setCashRisked] = useState<number>(200);
  const [lotSize, setLotSize] = useState<number>(0.8);
  const [miniLots, setMiniLots] = useState<number>(8);
  const [microLots, setMicroLots] = useState<number>(80);

  // Pip value dictionary for 1 standard lot
  const pipValues: Record<string, number> = {
    "EUR/USD": 10.0,
    "GBP/USD": 10.0,
    "AUD/USD": 10.0,
    "USD/JPY": 6.48,
    "USD/CHF": 11.2,
    "USD/CAD": 7.35,
    "BTC/USD": 1.0,
  };

  useEffect(() => {
    // 1. Cash Risk
    const cash = (balance * riskPercent) / 100;
    setCashRisked(cash);

    // 2. Lot Size computation
    // Position Size (Lots) = Risk Capital / (Stop Loss in Pips * Pip Value per lot)
    const pipVal = pipValues[currencyPair] || 10.0;
    
    let calculatedLots = 0;
    if (stopLossPips > 0 && pipVal > 0) {
      calculatedLots = cash / (stopLossPips * pipVal);
    }
    
    // Round to 2 decimal places for standard retail brokerage
    const standard = parseFloat(calculatedLots.toFixed(2));
    setLotSize(standard);
    setMiniLots(parseFloat((standard * 10).toFixed(1)));
    setMicroLots(parseFloat((standard * 100).toFixed(0)));
  }, [balance, riskPercent, stopLossPips, currencyPair]);

  const handleCalculate = () => {
    trackEvent("calculator_tool_calculated", "Tools", currencyPair, {
      balance,
      riskPercent,
      stopLossPips,
      calculatedLots: lotSize,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Left Column: Calculator Inputs */}
      <div className="lg:col-span-6 bg-white border border-zinc-200 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-3">
          Calculation Parameters
        </div>

        <div className="space-y-4 text-xs font-mono">
          {/* Account Balance */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold block">Account Balance (Deposit Currency):</label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 text-sm font-sans">
                $
              </div>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold pl-8 pr-4 py-3 border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition"
              />
            </div>
          </div>

          {/* Risk Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500 font-bold">Risk Capital Percentage:</label>
              <span className="text-orange-600 font-bold font-sans text-sm">{riskPercent}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
              className="w-full accent-orange-600 bg-zinc-200 h-1 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>Conservative (0.5%)</span>
              <span>Standard (2%)</span>
              <span>Aggressive (5%)</span>
            </div>
          </div>

          {/* Stop Loss in Pips */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold block">Stop Loss Spacing (Pips):</label>
            <div className="relative rounded-xl shadow-sm">
              <input
                type="number"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-3 border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 font-sans text-xs">
                pips
              </div>
            </div>
          </div>

          {/* Currency Pair selection */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold block">Asset Instrument Pair:</label>
            <select
              value={currencyPair}
              onChange={(e) => setCurrencyPair(e.target.value)}
              className="w-full bg-zinc-50 text-zinc-900 text-sm font-sans font-bold px-4 py-3 border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none cursor-pointer transition"
            >
              {Object.keys(pipValues).map((pair) => (
                <option key={pair} value={pair}>
                  {pair} (Pip Value: ${pipValues[pair]}/lot)
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-sm cursor-pointer"
        >
          Log Sizing Computation
        </button>
      </div>

      {/* Right Column: Sizing Outputs */}
      <div className="lg:col-span-6 bg-zinc-900 text-white border border-zinc-800 rounded-xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Output Sizing Matrix
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cash Risked */}
            <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Cash At Risk</span>
              <div className="text-2xl font-mono font-bold text-orange-500 mt-1">${cashRisked.toLocaleString()}</div>
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block">{riskPercent}% of Balance</span>
            </div>

            {/* Standard Lots */}
            <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Standard Lots</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">{lotSize} lots</div>
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block">100,000 units/lot</span>
            </div>
          </div>

          {/* Scale breakdown */}
          <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3">
            <div className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800 pb-1.5">
              Broker Lot Scale Alternatives
            </div>
            <div className="flex justify-between items-center">
              <span>Standard Lots:</span>
              <span className="text-white font-bold">{lotSize} contracts</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Mini Lots (0.1):</span>
              <span className="text-white font-bold">{miniLots} contracts</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Micro Lots (0.01):</span>
              <span className="text-white font-bold">{microLots} contracts</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/5 border border-orange-500/10 p-4 rounded-xl flex items-start gap-3 mt-4 text-xs">
          <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-left">
            <span className="font-serif font-bold italic text-white block">Portfolio Armor Warning</span>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              By scaling your position to exactly <b>{lotSize} lots</b>, an adverse move of {stopLossPips} pips will strictly trigger a stop loss of exactly <b>${cashRisked}</b>. Never trade without setting a hard broker stop loss order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
