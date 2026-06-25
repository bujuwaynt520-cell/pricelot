/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { HelpCircle, Activity, ShieldCheck, DollarSign, Percent } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function LotSizeCalculator() {
  const { trackEvent } = useAnalytics();

  // Inputs
  const [balance, setBalance] = useState<number>(10000);
  const [riskType, setRiskType] = useState<"PERCENT" | "CASH">("PERCENT");
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [riskCash, setRiskCash] = useState<number>(150);
  const [stopLossPipsPoints, setStopLossPipsPoints] = useState<number>(30);
  const [assetClass, setAssetClass] = useState<string>("FOREX");

  // Calculated Outputs
  const [totalRiskCash, setTotalRiskCash] = useState<number>(150);
  const [calculatedLots, setCalculatedLots] = useState<number>(0.5);
  const [totalUnits, setTotalUnits] = useState<number>(50000);
  const [marginRequired, setMarginRequired] = useState<number>(250);

  // Specifications of asset classes
  // contractSize is how many units are in 1 standard lot
  // pointValue is the monetary value of a 1 pip/point move for 1 standard lot
  // label represents the unit type (e.g. ounces, units, coins, contracts)
  const assetsConfig: Record<string, { name: string; contractSize: number; pointValue: number; label: string; placeholderSL: string }> = {
    "FOREX": { name: "Forex Standard (EUR, GBP, etc.)", contractSize: 100000, pointValue: 10.0, label: "Units", placeholderSL: "Pips (e.g. 30)" },
    "GOLD": { name: "Gold (XAU/USD - 100 oz)", contractSize: 100, pointValue: 1.0, label: "Ounces", placeholderSL: "Points / Cents (e.g. 100 points = $1.00)" },
    "SILVER": { name: "Silver (XAG/USD - 5000 oz)", contractSize: 5000, pointValue: 50.0, label: "Ounces", placeholderSL: "Points / Cents (e.g. 50 points = $0.50)" },
    "BITCOIN": { name: "Bitcoin (BTC/USD - 1 coin)", contractSize: 1, pointValue: 1.0, label: "Coins", placeholderSL: "Dollars (e.g. 500 USD)" },
    "INDICES": { name: "Stock Index (S&P 500, Dow 30)", contractSize: 1, pointValue: 1.0, label: "Contracts", placeholderSL: "Points (e.g. 20 points)" },
  };

  // Sync cash vs percent when balance or settings shift
  useEffect(() => {
    let cash = 150;
    if (riskType === "PERCENT") {
      cash = (balance * riskPercent) / 100;
      setRiskCash(parseFloat(cash.toFixed(2)));
    } else {
      setRiskPercent(parseFloat(((riskCash / balance) * 100).toFixed(2)));
      cash = riskCash;
    }
    setTotalRiskCash(cash);

    // Calculate Lots
    const config = assetsConfig[assetClass];
    if (!config) return;

    let lots = 0;
    if (stopLossPipsPoints > 0 && config.pointValue > 0) {
      // Sizing = Risk Cash / (Stop Loss Distance * Point Value per standard lot/contract)
      lots = cash / (stopLossPipsPoints * config.pointValue);
    }

    lots = parseFloat(lots.toFixed(3)); // 3 decimals for precision scaling
    setCalculatedLots(lots);

    // Total units
    setTotalUnits(parseFloat((lots * config.contractSize).toFixed(2)));

    // Leverage Margin estimate (simulating 1:200 leverage for forex, 1:100 for gold, etc.)
    const leverageFactor = assetClass === "FOREX" ? 200 : assetClass === "GOLD" ? 100 : 20;
    // Estimated margin is roughly Contract Size * Lots / Leverage
    const estimatedMargin = (lots * config.contractSize) / leverageFactor;
    setMarginRequired(parseFloat(estimatedMargin.toFixed(2)));

  }, [balance, riskType, riskPercent, riskCash, stopLossPipsPoints, assetClass]);

  const handleLogClick = () => {
    trackEvent("calculator_lot_sizing", "Tools", `Lot Sized for ${assetClass}`, {
      balance,
      riskType,
      totalRiskCash,
      calculatedLots,
      totalUnits,
    });
  };

  return (
    <div id="lot-sizing-calc-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Inputs Column */}
      <div className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            Sizing Engine
          </span>
          <div className="flex gap-1 border border-zinc-200 p-0.5 rounded-lg bg-zinc-50 font-mono text-[9px] font-bold">
            <button
              onClick={() => setRiskType("PERCENT")}
              className={`px-2 py-0.5 rounded-md transition ${
                riskType === "PERCENT" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Percent className="w-2.5 h-2.5 inline mr-0.5" /> % Risk
            </button>
            <button
              onClick={() => setRiskType("CASH")}
              className={`px-2 py-0.5 rounded-md transition ${
                riskType === "CASH" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Cash Risk
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono">
          {/* Account Balance */}
          <div className="space-y-1.5">
            <label className="text-zinc-500 font-bold block">Account Balance:</label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 text-sm font-sans">
                $
              </div>
              <input
                id="lot-balance-input"
                type="number"
                value={balance === 0 ? "" : balance}
                onChange={(e) => setBalance(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold pl-8 pr-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Risk Sizing input based on type choice */}
          {riskType === "PERCENT" ? (
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-zinc-500 font-bold">Risk Capital Percent:</label>
                <span className="text-orange-600 font-bold font-sans text-sm">{riskPercent}%</span>
              </div>
              <input
                id="lot-risk-percent-input"
                type="number"
                step="0.1"
                min="0.1"
                value={riskPercent === 0 ? "" : riskPercent}
                onChange={(e) => setRiskPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-bold block">Fixed Sizing Risk Cash ($):</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 text-sm font-sans">
                  $
                </div>
                <input
                  id="lot-risk-cash-input"
                  type="number"
                  value={riskCash === 0 ? "" : riskCash}
                  onChange={(e) => setRiskCash(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold pl-8 pr-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Asset Class Selection */}
          <div className="space-y-1.5">
            <label className="text-zinc-500 font-bold block">Asset Class & Contract Spec:</label>
            <select
              id="lot-asset-select"
              value={assetClass}
              onChange={(e) => setAssetClass(e.target.value)}
              className="w-full bg-zinc-50 text-zinc-900 text-sm font-sans font-bold px-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none cursor-pointer transition-colors"
            >
              {Object.keys(assetsConfig).map((key) => (
                <option key={key} value={key}>
                  {assetsConfig[key].name}
                </option>
              ))}
            </select>
          </div>

          {/* Stop Loss Distance */}
          <div className="space-y-1.5">
            <label className="text-zinc-500 font-bold block">
              Stop Loss Distance ({assetsConfig[assetClass]?.placeholderSL.split(" ")[0]}):
            </label>
            <div className="relative rounded-xl shadow-sm">
              <input
                id="lot-stoploss-input"
                type="number"
                value={stopLossPipsPoints === 0 ? "" : stopLossPipsPoints}
                onChange={(e) => setStopLossPipsPoints(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 font-sans text-xs font-bold uppercase">
                {assetsConfig[assetClass]?.placeholderSL.split(" ")[0].toLowerCase()}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogClick}
          className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-sm cursor-pointer border border-zinc-900 hover:border-zinc-800"
        >
          Execute Contract Audit
        </button>
      </div>

      {/* Outputs Column */}
      <div className="lg:col-span-6 bg-zinc-950 text-white border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-zinc-900 pb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Contract Size Breakdown
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sized Lots */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Recommended Lot Sizing</span>
              <div className="text-2xl font-mono font-bold text-orange-500 mt-1">
                {calculatedLots} <span className="text-sm text-zinc-400">lots</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 block">Standard contract multiplier</span>
            </div>

            {/* Total Units */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Total Exposed Volume</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">
                {totalUnits.toLocaleString()} <span className="text-xs text-zinc-400">{assetsConfig[assetClass]?.label}</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 block">Contract size: {assetsConfig[assetClass]?.contractSize} units</span>
            </div>
          </div>

          {/* Sizing Breakdown Details */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3.5">
            <div className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800 pb-2">
              Sizing Exposure Audit
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Exposed Risk Amount:</span>
              <span className="text-white font-bold">${totalRiskCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">Stop Loss Distance:</span>
              <span className="text-white font-bold">{stopLossPipsPoints} {assetsConfig[assetClass]?.placeholderSL.split(" ")[0]}</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">Contract Asset Class:</span>
              <span className="text-white font-bold uppercase">{assetClass}</span>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">Est. Broker Margin Required:</span>
              <span className="text-orange-400 font-bold">${marginRequired.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        {/* Warning Badge */}
        <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl flex items-start gap-3 mt-6 text-xs text-left">
          <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-serif font-bold italic text-orange-400 block text-[13px]">Margin Leveraged Exposure Notice</span>
            <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              Purchasing or selling <b>{calculatedLots} lots</b> of <b>{assetsConfig[assetClass]?.name}</b> will lock an estimated <b>${marginRequired}</b> in margins. Keep an eye on your margin levels to avoid account stop-outs under dynamic volatility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
