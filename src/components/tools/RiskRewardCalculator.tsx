/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { HelpCircle, Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function RiskRewardCalculator() {
  const { trackEvent } = useAnalytics();

  // Inputs
  const [tradeDirection, setTradeDirection] = useState<"BUY" | "SELL">("BUY");
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [stopLoss, setStopLoss] = useState<number>(1.0825);
  const [takeProfit, setTakeProfit] = useState<number>(1.0925);
  const [lots, setLots] = useState<number>(1.0);
  const [currencyPair, setCurrencyPair] = useState<string>("EUR/USD");

  // Calculated Outputs
  const [riskPips, setRiskPips] = useState<number>(25);
  const [rewardPips, setRewardPips] = useState<number>(75);
  const [rrRatio, setRrRatio] = useState<number>(3.0);
  const [cashRisked, setCashRisked] = useState<number>(250);
  const [cashReward, setCashReward] = useState<number>(750);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pip config for JPY and other pairs
  const pipConfig: Record<string, { pipDecimal: number; multiplier: number; pipValue: number }> = {
    "EUR/USD": { pipDecimal: 0.0001, multiplier: 10000, pipValue: 10.0 },
    "GBP/USD": { pipDecimal: 0.0001, multiplier: 10000, pipValue: 10.0 },
    "AUD/USD": { pipDecimal: 0.0001, multiplier: 10000, pipValue: 10.0 },
    "USD/JPY": { pipDecimal: 0.01, multiplier: 100, pipValue: 6.48 },
    "USD/CHF": { pipDecimal: 0.0001, multiplier: 10000, pipValue: 11.2 },
    "USD/CAD": { pipDecimal: 0.0001, multiplier: 10000, pipValue: 7.35 },
  };

  // When asset changes, sync default entry, stop loss, and take profit to realistic ranges
  useEffect(() => {
    if (currencyPair === "USD/JPY") {
      setEntryPrice(154.20);
      setStopLoss(153.80);
      setTakeProfit(155.20);
    } else {
      setEntryPrice(1.0850);
      setStopLoss(1.0825);
      setTakeProfit(1.0925);
    }
  }, [currencyPair]);

  // Recalculate RR Metrics
  useEffect(() => {
    // Validation
    let error: string | null = null;
    if (tradeDirection === "BUY") {
      if (stopLoss >= entryPrice) {
        error = "Stop Loss must be lower than Entry Price for Long positions.";
      } else if (takeProfit <= entryPrice) {
        error = "Take Profit must be higher than Entry Price for Long positions.";
      }
    } else {
      // SELL
      if (stopLoss <= entryPrice) {
        error = "Stop Loss must be higher than Entry Price for Short positions.";
      } else if (takeProfit >= entryPrice) {
        error = "Take Profit must be lower than Entry Price for Short positions.";
      }
    }
    setValidationError(error);

    const asset = pipConfig[currencyPair] || { pipDecimal: 0.0001, multiplier: 10000, pipValue: 10.0 };
    
    // Risk and Reward calculation in Pips
    let calculatedRiskPips = 0;
    let calculatedRewardPips = 0;

    if (tradeDirection === "BUY") {
      calculatedRiskPips = (entryPrice - stopLoss) * asset.multiplier;
      calculatedRewardPips = (takeProfit - entryPrice) * asset.multiplier;
    } else {
      calculatedRiskPips = (stopLoss - entryPrice) * asset.multiplier;
      calculatedRewardPips = (entryPrice - takeProfit) * asset.multiplier;
    }

    // Handle decimal floating issues
    calculatedRiskPips = parseFloat(calculatedRiskPips.toFixed(1));
    calculatedRewardPips = parseFloat(calculatedRewardPips.toFixed(1));

    setRiskPips(Math.max(0, calculatedRiskPips));
    setRewardPips(Math.max(0, calculatedRewardPips));

    // RR Ratio
    if (calculatedRiskPips > 0) {
      setRrRatio(parseFloat((calculatedRewardPips / calculatedRiskPips).toFixed(2)));
    } else {
      setRrRatio(0);
    }

    // Cash amounts
    const standardPipVal = asset.pipValue;
    const totalRiskCash = calculatedRiskPips * standardPipVal * lots;
    const totalRewardCash = calculatedRewardPips * standardPipVal * lots;

    setCashRisked(parseFloat(totalRiskCash.toFixed(2)));
    setCashReward(parseFloat(totalRewardCash.toFixed(2)));

  }, [tradeDirection, entryPrice, stopLoss, takeProfit, lots, currencyPair]);

  const handleLogClick = () => {
    trackEvent("calculator_risk_reward", "Tools", `RR computed for ${currencyPair}`, {
      tradeDirection,
      entryPrice,
      stopLoss,
      takeProfit,
      rrRatio,
      validation: validationError || "Valid Setup",
    });
  };

  return (
    <div id="rr-calc-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Inputs Column */}
      <div className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            Trade Plan Inputs
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setTradeDirection("BUY")}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg border uppercase transition font-mono ${
                tradeDirection === "BUY"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-black"
                  : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Long (Buy)
            </button>
            <button
              onClick={() => setTradeDirection("SELL")}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg border uppercase transition font-mono ${
                tradeDirection === "SELL"
                  ? "bg-rose-50 border-rose-200 text-rose-700 font-black"
                  : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Short (Sell)
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono">
          {/* Pair Asset selection */}
          <div className="space-y-1.5">
            <label className="text-zinc-500 font-bold block">Target Asset:</label>
            <select
              id="rr-pair-select"
              value={currencyPair}
              onChange={(e) => setCurrencyPair(e.target.value)}
              className="w-full bg-zinc-50 text-zinc-900 text-sm font-sans font-bold px-4 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
            >
              {Object.keys(pipConfig).map((pair) => (
                <option key={pair} value={pair}>
                  {pair} (Pip Unit: {pipConfig[pair].multiplier === 100 ? "0.01" : "0.0001"})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Entry Price */}
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-bold block">Entry Price:</label>
              <input
                id="rr-entry-input"
                type="number"
                step="0.0001"
                value={entryPrice === 0 ? "" : entryPrice}
                onChange={(e) => setEntryPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-3 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
            </div>

            {/* Position size lots */}
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-bold block">Lots Sizing:</label>
              <input
                id="rr-lots-input"
                type="number"
                step="0.1"
                value={lots === 0 ? "" : lots}
                onChange={(e) => setLots(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-3 py-2.5 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Stop Loss Price */}
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-bold flex items-center justify-between">
                <span>Stop Loss Price:</span>
                {tradeDirection === "BUY" ? (
                  <span className="text-[9px] text-zinc-400 font-medium">(&lt; Entry)</span>
                ) : (
                  <span className="text-[9px] text-zinc-400 font-medium">(&gt; Entry)</span>
                )}
              </label>
              <input
                id="rr-stoploss-input"
                type="number"
                step="0.0001"
                value={stopLoss === 0 ? "" : stopLoss}
                onChange={(e) => setStopLoss(Math.max(0, parseFloat(e.target.value) || 0))}
                className={`w-full text-base font-sans font-bold px-3 py-2.5 border rounded-xl focus:outline-none transition-colors ${
                  validationError?.includes("Stop Loss")
                    ? "bg-rose-50 border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                    : "bg-zinc-50 border-zinc-200/80 text-zinc-900 focus:border-orange-500 focus:ring-orange-500"
                }`}
              />
            </div>

            {/* Take Profit Price */}
            <div className="space-y-1.5">
              <label className="text-zinc-500 font-bold flex items-center justify-between">
                <span>Take Profit Price:</span>
                {tradeDirection === "BUY" ? (
                  <span className="text-[9px] text-zinc-400 font-medium">(&gt; Entry)</span>
                ) : (
                  <span className="text-[9px] text-zinc-400 font-medium">(&lt; Entry)</span>
                )}
              </label>
              <input
                id="rr-takeprofit-input"
                type="number"
                step="0.0001"
                value={takeProfit === 0 ? "" : takeProfit}
                onChange={(e) => setTakeProfit(Math.max(0, parseFloat(e.target.value) || 0))}
                className={`w-full text-base font-sans font-bold px-3 py-2.5 border rounded-xl focus:outline-none transition-colors ${
                  validationError?.includes("Take Profit")
                    ? "bg-rose-50 border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
                    : "bg-zinc-50 border-zinc-200/80 text-zinc-900 focus:border-orange-500 focus:ring-orange-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Validation Banner */}
        {validationError ? (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 font-mono">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        ) : (
          <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-start gap-2 text-xs text-emerald-800 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Plan configuration matches standard mechanical validation schemas.</span>
          </div>
        )}

        <button
          onClick={handleLogClick}
          className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-sm cursor-pointer border border-zinc-900 hover:border-zinc-800"
        >
          Verify Sizing Layout
        </button>
      </div>

      {/* Outputs Column */}
      <div className="lg:col-span-6 bg-zinc-950 text-white border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-zinc-900 pb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Plan Performance Metrics
          </div>

          {/* R-Multiple Circle or Large stat */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Risk-to-Reward Ratio (R-Multiple)
              </span>
              <div className="text-3xl font-mono font-black text-orange-500 tracking-tight">
                1 : {rrRatio.toFixed(2)}
              </div>
              <span className="text-[10px] text-zinc-500 block">
                Expected mathematical efficiency index
              </span>
            </div>
            
            <div className={`p-3 rounded-xl border font-mono font-bold text-xs ${
              rrRatio >= 2.0 
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                : rrRatio >= 1.0 
                ? "bg-orange-500/5 border-orange-500/20 text-orange-400"
                : "bg-rose-500/5 border-rose-500/20 text-rose-400"
            }`}>
              {rrRatio >= 2.0 ? "Strong Setup (2+)" : rrRatio >= 1.0 ? "Moderate Setup" : "Insolvent Risk (&lt;1)"}
            </div>
          </div>

          {/* Sizing Breakdown Details */}
          <div className="grid grid-cols-2 gap-4">
            {/* Risk (Pips & Cash) */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Stop Loss Risk</span>
              <div className="text-xl font-mono font-bold text-zinc-100">{riskPips} pips</div>
              <div className="text-lg font-mono font-bold text-rose-500">-${cashRisked.toLocaleString()}</div>
              <span className="text-[9px] font-mono text-zinc-500 block">Total cost on stop hit</span>
            </div>

            {/* Reward (Pips & Cash) */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Target Reward</span>
              <div className="text-xl font-mono font-bold text-zinc-100">{rewardPips} pips</div>
              <div className="text-lg font-mono font-bold text-emerald-500">+${cashReward.toLocaleString()}</div>
              <span className="text-[9px] font-mono text-zinc-500 block">Total yield on profit target</span>
            </div>
          </div>
        </div>

        {/* Dynamic Strategic summary */}
        <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-xl flex items-start gap-3 mt-6 text-xs text-left">
          <TrendingUp className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-serif font-bold italic text-white block">Systematic Strategy Insights</span>
            {rrRatio >= 2.0 ? (
              <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
                This trade setup features an excellent <b>1:{rrRatio} Risk-to-Reward</b> structure. High R-multiple trades ensure that even with a win rate of only 40%, your portfolio will remain positively solvent and growing over high volume sample sizes.
              </p>
            ) : (
              <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
                This trade setup is sub-optimal with a ratio of <b>1:{rrRatio}</b>. Systematic quant models generally avoid executing trades below 1:2.0 because it requires an excessively high win rate (greater than 50%) to absorb transaction spreads and slippages.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
