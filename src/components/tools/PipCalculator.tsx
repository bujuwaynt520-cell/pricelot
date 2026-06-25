/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { HelpCircle, Activity, Calculator, ArrowRightLeft } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function PipCalculator() {
  const { trackEvent } = useAnalytics();

  // Inputs
  const [currencyPair, setCurrencyPair] = useState<string>("EUR/USD");
  const [positionLots, setPositionLots] = useState<number>(1.0);
  const [exchangeRate, setExchangeRate] = useState<number>(1.0854);

  // Calculated Outputs
  const [standardPipVal, setStandardPipVal] = useState<number>(10.00);
  const [miniPipVal, setMiniPipVal] = useState<number>(1.00);
  const [microPipVal, setMicroPipVal] = useState<number>(0.10);
  const [customPositionPipVal, setCustomPositionPipVal] = useState<number>(10.00);

  // Dictionary of major currency pairs and how their pip value conversions are calculated
  // pipDecimal determines if a pip is 0.0001 or 0.01 (JPY pairs)
  // baseQuoteType determines how we convert quote currency to USD account currency
  // "direct": Quote is USD, Pip value is fixed at $10/lot
  // "inverse": Base is USD, Quote is other (e.g. USD/JPY). Pip value is 1000 JPY or 10 Quote units / Exchange Rate.
  // "cross": Quote is GBP, etc. Pip value is 10 Quote units * GBP/USD rate.
  const pairsConfig: Record<string, { pipDecimal: number; quoteCurrency: string; conversionType: "direct" | "inverse" | "cross" | "cross-inverse"; defaultRate: number }> = {
    "EUR/USD": { pipDecimal: 0.0001, quoteCurrency: "USD", conversionType: "direct", defaultRate: 1.0000 },
    "GBP/USD": { pipDecimal: 0.0001, quoteCurrency: "USD", conversionType: "direct", defaultRate: 1.0000 },
    "AUD/USD": { pipDecimal: 0.0001, quoteCurrency: "USD", conversionType: "direct", defaultRate: 1.0000 },
    "NZD/USD": { pipDecimal: 0.0001, quoteCurrency: "USD", conversionType: "direct", defaultRate: 1.0000 },
    "USD/JPY": { pipDecimal: 0.01, quoteCurrency: "JPY", conversionType: "inverse", defaultRate: 154.22 },
    "USD/CAD": { pipDecimal: 0.0001, quoteCurrency: "CAD", conversionType: "inverse", defaultRate: 1.3620 },
    "USD/CHF": { pipDecimal: 0.0001, quoteCurrency: "CHF", conversionType: "inverse", defaultRate: 0.8950 },
    "EUR/GBP": { pipDecimal: 0.0001, quoteCurrency: "GBP", conversionType: "cross", defaultRate: 1.2642 }, // converted via GBP/USD rate
    "EUR/CHF": { pipDecimal: 0.0001, quoteCurrency: "CHF", conversionType: "cross-inverse", defaultRate: 0.8950 }, // converted via USD/CHF rate
  };

  // Sync exchange rate input when pair changes to its realistic default rate
  useEffect(() => {
    if (pairsConfig[currencyPair]) {
      setExchangeRate(pairsConfig[currencyPair].defaultRate);
    }
  }, [currencyPair]);

  // Perform Calculations
  useEffect(() => {
    const config = pairsConfig[currencyPair];
    if (!config) return;

    let basePipValueInQuote = config.pipDecimal * 100000; // standard lot size is 100,000 units
    let pipValueInUSD = 10.00;

    if (config.conversionType === "direct") {
      pipValueInUSD = basePipValueInQuote; // Since quote is USD, pip value is flat $10 USD
    } else if (config.conversionType === "inverse") {
      // e.g. USD/JPY or USD/CAD
      // Pip Value = Base Pip Value in Quote / Exchange Rate
      if (exchangeRate > 0) {
        pipValueInUSD = basePipValueInQuote / exchangeRate;
      }
    } else if (config.conversionType === "cross") {
      // e.g. EUR/GBP where we need to multiply by GBP/USD rate (supplied in exchangeRate input)
      pipValueInUSD = basePipValueInQuote * exchangeRate;
    } else if (config.conversionType === "cross-inverse") {
      // e.g. EUR/CHF where we divide by USD/CHF rate (supplied in exchangeRate input)
      if (exchangeRate > 0) {
        pipValueInUSD = basePipValueInQuote / exchangeRate;
      }
    }

    setStandardPipVal(pipValueInUSD);
    setMiniPipVal(pipValueInUSD / 10);
    setMicroPipVal(pipValueInUSD / 100);
    setCustomPositionPipVal(pipValueInUSD * positionLots);
  }, [currencyPair, positionLots, exchangeRate]);

  const handleLogClick = () => {
    trackEvent("calculator_pip_value", "Tools", `Pip value calculated for ${currencyPair}`, {
      positionLots,
      exchangeRate,
      standardPipVal,
      customPositionPipVal,
    });
  };

  return (
    <div id="pip-calc-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Inputs Column */}
      <div className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            Pip Variables
          </span>
          <span className="text-[10px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full border border-zinc-200/60 font-bold flex items-center gap-1">
            <Calculator className="w-3 h-3 text-zinc-500" /> Auto-Updating
          </span>
        </div>

        <div className="space-y-5 text-xs font-mono">
          {/* Pair Selection */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold flex items-center gap-1.5">
              Select Currency Pair:
              <span title="Select pair to load its mathematical decimals and conversion algorithms." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
            </label>
            <select
              id="pip-pair-selector"
              value={currencyPair}
              onChange={(e) => setCurrencyPair(e.target.value)}
              className="w-full bg-zinc-50 text-zinc-900 text-sm font-sans font-bold px-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none cursor-pointer transition-colors"
            >
              {Object.keys(pairsConfig).map((pair) => (
                <option key={pair} value={pair}>
                  {pair} ({pairsConfig[pair].quoteCurrency} quote)
                </option>
              ))}
            </select>
          </div>

          {/* Position size in lots */}
          <div className="space-y-2">
            <label className="text-zinc-500 font-bold flex items-center gap-1.5">
              Position Size (Lots):
              <span title="Size of position in standard lots (e.g. 1 lot = 100,000 units, 0.10 lot = 10,000 units)." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <input
                id="pip-lots-input"
                type="number"
                step="0.01"
                min="0.01"
                value={positionLots === 0 ? "" : positionLots}
                onChange={(e) => setPositionLots(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="1.0"
                className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 font-sans text-xs font-bold uppercase">
                lots
              </div>
            </div>
          </div>

          {/* Dynamic Exchange Rate conversion input */}
          {pairsConfig[currencyPair]?.conversionType !== "direct" && (
            <div className="space-y-2">
              <label className="text-zinc-500 font-bold flex items-center gap-1.5">
                {pairsConfig[currencyPair]?.conversionType === "inverse"
                  ? `Current ${currencyPair} Exchange Rate:`
                  : pairsConfig[currencyPair]?.conversionType === "cross"
                  ? "Current GBP/USD Exchange Rate:"
                  : "Current USD/CHF Exchange Rate:"}
                <span title="Needed to convert the foreign quote pip value back to your USD account balance." className="cursor-help flex items-center"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /></span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <input
                  id="pip-rate-input"
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  value={exchangeRate === 0 ? "" : exchangeRate}
                  onChange={(e) => setExchangeRate(Math.max(0.0001, parseFloat(e.target.value) || 0.0001))}
                  placeholder="1.0"
                  className="w-full bg-zinc-50 text-zinc-900 text-base font-sans font-bold px-4 py-3 border border-zinc-200/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition-colors"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 font-sans text-xs font-bold">
                  <ArrowRightLeft className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 leading-normal block">
                * Note: Conversion rates are critical for non-USD quote currency pairs (e.g. JPY, CAD, CHF) to map exact USD account equivalents.
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleLogClick}
          className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-sm cursor-pointer border border-zinc-900 hover:border-zinc-800"
        >
          Log Pip Analytics
        </button>
      </div>

      {/* Outputs Column */}
      <div className="lg:col-span-6 bg-zinc-950 text-white border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-zinc-900 pb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Output Sizing Vector
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center relative overflow-hidden">
            <div className="absolute right-0 top-0 text-[100px] leading-none font-black font-serif text-zinc-850/30 select-none pointer-events-none">
              PIP
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block relative z-10">
              Value of 1 Pip for {positionLots} Lot(s)
            </span>
            <div className="text-4xl font-mono font-black text-orange-500 mt-2 tracking-tighter relative z-10">
              ${customPositionPipVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-1.5 block relative z-10">
              Based on standard 100,000 contracts
            </span>
          </div>

          {/* Lot Size Standard Conversions */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3.5">
            <div className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800 pb-2">
              Standardized Pip Value Breakdown
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">1 Standard Lot (100k):</span>
              <span className="text-white font-bold">${standardPipVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">1 Mini Lot (10k):</span>
              <span className="text-white font-bold">${miniPipVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-zinc-850/60 pt-2">
              <span className="text-zinc-500">1 Micro Lot (1k):</span>
              <span className="text-white font-bold">${microPipVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD</span>
            </div>
          </div>
        </div>

        {/* Educational Note */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs space-y-2">
          <span className="font-serif font-bold italic text-white block">Under the Hood</span>
          <p className="text-zinc-500 leading-relaxed text-[11px] font-sans">
            A <b>pip</b> represents the smallest price movement in currency markets (usually <b>0.0001</b>). On a standard lot (100,000 units), moving 1 pip means a quote change of 10 base currency units. Knowing your exact pip value is fundamental to controlling your risk per point.
          </p>
        </div>
      </div>
    </div>
  );
}
