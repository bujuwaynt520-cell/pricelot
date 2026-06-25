/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Percent, Activity, ShieldCheck, HelpCircle } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function PositionSizeCalculator() {
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

  // Pip value dictionary for 1 standard lot (100,000 units)
  const pipValues: Record<string, { val: number; desc: string }> = {
    "EUR/USD": { val: 10.0, desc: "Standard USD Pip Value" },
    "GBP/USD": { val: 10.0, desc: "Standard USD Pip Value" },
    "AUD/USD": { val: 10.0, desc: "Standard USD Pip Value" },
    "NZD/USD": { val: 10.0, desc: "Standard USD Pip Value" },
    "USD/JPY": { val: 6.48, desc: "USD/JPY at ~154.22 rate" },
    "USD/CHF": { val: 11.2, desc: "USD/CHF at ~0.89 rate" },
    "USD/CAD": { val: 7.35, desc: "USD/CAD at ~1.36 rate" },
    "EUR/GBP": { val: 12.65, desc: "Cross pair with EUR account currency equivalents" },
    "EUR/JPY": { val: 6.48, desc: "Cross pair JPY equivalent" },
    "BTC/USD": { val: 1.0, desc: "Crypto 1 Point value" },
  };

  useEffect(() => {
    // 1. Calculate cash risked
    const cash = (balance * riskPercent) / 100;
    setCashRisked(cash);

    // 2. Compute Lot Size
    const pipVal = pipValues[currencyPair]?.val || 10.0;
    let calculatedLots = 0;
    
    if (stopLossPips > 0 && pipVal > 0) {
      calculatedLots = cash / (stopLossPips * pipVal);
    }

    // Set standard lot size rounded to 2 decimals, mini lots (x10), micro lots (x100)
    const standard = parseFloat(calculatedLots.toFixed(2));
    setLotSize(standard);
    setMiniLots(parseFloat((calculatedLots * 10).toFixed(1)));
    setMicroLots(parseFloat((calculatedLots * 100).toFixed(0)));
  }, [balance, riskPercent, stopLossPips, currencyPair]);

  const handleCalculateLog = () => {
    trackEvent("calculator_position_sizing", "Tools", `Sizing for ${currencyPair}`, {
      balance,
      riskPercent,
      stopLossPips,
      calculatedLots: lotSize,
      cashRisked,
    });
  };

  return (
    <div id="position-sizing-calc-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Column */}
      <div className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            Sizing Parameters
          </span>
          <span className="text-[10px] font-mono bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100 font-bold">
            Live Form
          </span>
        </div>

        <div className="space-y-5 text-xs font-mono">
          {/* Account Balance */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold flex items-center gap-1.5">
              Account Balance:
              <span title="Your total trading account equity." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 text-sm font-sans">
                $
              </div>
              <input
                id="balance-input"
                type="number"
                value={balance === 0 ? "" : balance}
                onChange={(e) => setBalance(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="10000"
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold pl-8 pr-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Risk Percentage Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500 font-bold flex items-center gap-1.5">
                Risk Capital Percentage:
                <span title="Percentage of account balance you want to risk on this trade." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
              </label>
              <span className="text-orange-600 font-bold font-sans text-sm">{riskPercent}%</span>
            </div>
            <input
              id="risk-percent-slider"
              type="range"
              min="0.25"
              max="10"
              step="0.25"
              value={riskPercent}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
              className="w-full accent-orange-600 bg-zinc-200 h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>Conservative (0.5%)</span>
              <span>Standard (2%)</span>
              <span>Professional (5%+)</span>
            </div>
          </div>

          {/* Stop Loss in Pips */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold flex items-center gap-1.5">
              Stop Loss (Pips):
              <span title="The distance in pips from your entry price to your stop loss level." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <input
                id="stop-loss-input"
                type="number"
                value={stopLossPips === 0 ? "" : stopLossPips}
                onChange={(e) => setStopLossPips(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="25"
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 font-sans text-xs font-bold uppercase">
                pips
              </div>
            </div>
          </div>

          {/* Asset Instrument Selection */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold flex items-center gap-1.5">
              Currency Pair / Asset:
              <span title="The asset pair you are trading. This determines the pip value equation." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
            </label>
            <select
              id="asset-selector"
              value={currencyPair}
              onChange={(e) => setCurrencyPair(e.target.value)}
              className="w-full bg-zinc-50 text-zinc-900 text-sm font-sans font-bold px-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none cursor-pointer transition-colors"
            >
              {Object.keys(pipValues).map((pair) => (
                <option key={pair} value={pair}>
                  {pair} — Pip Value: ${pipValues[pair].val}/lot
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculateLog}
          className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-sm cursor-pointer border border-zinc-900 hover:border-zinc-800"
        >
          Log Calculation History
        </button>
      </div>

      {/* Outputs Column */}
      <div className="lg:col-span-6 bg-zinc-950 text-white border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-zinc-900 pb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Sizing Strategy Matrix
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cash at Risk */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Risk Capital (USD)</span>
              <div className="text-2xl font-mono font-bold text-orange-500 mt-1">${cashRisked.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">{riskPercent}% of account balance</span>
            </div>

            {/* Standard Lots */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Standard Contract Lots</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">{lotSize} lots</div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">100,000 base units/lot</span>
            </div>
          </div>

          {/* Sizing Breakdown Details */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3.5">
            <div className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800 pb-2">
              Alternative Broker Lot Scales
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Standard Lots (100k):</span>
              <span className="text-white font-bold">{lotSize} contracts</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">Mini Lots (10k / 0.1):</span>
              <span className="text-white font-bold">{miniLots} contracts</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">Micro Lots (1k / 0.01):</span>
              <span className="text-white font-bold">{microLots} contracts</span>
            </div>
          </div>
        </div>

        {/* Warning Badge */}
        <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl flex items-start gap-3 mt-6 text-xs text-left">
          <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-serif font-bold italic text-orange-400 block text-[13px]">Broker Risk Protection Notice</span>
            <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              To enforce your strict limit of <b>${cashRisked.toFixed(2)}</b> risk, you must configure a hard stop loss at exactly <b>{stopLossPips} pips</b>. Executing a position size of <b>{lotSize} lots</b> without a stop loss exposes you to full margin liquidations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
