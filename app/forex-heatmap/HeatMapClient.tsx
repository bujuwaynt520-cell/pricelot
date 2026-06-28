"use client";

import React, { useMemo, useState, useEffect } from "react";
import { CURRENCIES, buildHeatmapMatrix, getStrongestCurrency, getWeakestCurrency, getDailyMovers, HeatmapResponse } from "@/app/lib/services/forexHeatmap";
import { ArrowUp, ArrowDown } from "lucide-react";

function colorForChange(p: number) {
  // thresholds
  if (p >= 2) return "bg-emerald-800 text-white"; // dark green
  if (p >= 0.5) return "bg-emerald-300 text-zinc-900"; // light green
  if (p > -0.5 && p < 0.5) return "bg-zinc-200 text-zinc-900"; // neutral
  if (p <= -0.5 && p > -2) return "bg-rose-300 text-zinc-900"; // light red
  return "bg-rose-800 text-white"; // dark red
}

export default function HeatMapClient() {
  const [matrixData, setMatrixData] = useState<HeatmapResponse>(() => buildHeatmapMatrix());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await fetch("/api/forex-heatmap");
        if (!res.ok) {
          throw new Error(`Failed to fetch heatmap: ${res.status}`);
        }
        const data = (await res.json()) as HeatmapResponse;
        setMatrixData(data);
      } catch (error) {
        console.error("Unable to load forex heatmap data:", error);
      }
    };

    fetchHeatmap();
  }, []);

  const strongest = useMemo(() => getStrongestCurrency(matrixData.matrix), [matrixData]);
  const weakest = useMemo(() => getWeakestCurrency(matrixData.matrix), [matrixData]);
  const movers = useMemo(() => getDailyMovers(matrixData.matrix, 6), [matrixData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm overflow-auto">
          <div className="text-xs text-zinc-500 mb-3 flex items-center justify-between">
            <div>Currency Matrix (rows = base, columns = quote)</div>
            <div>
              Last updated:{" "}
              {matrixData.lastUpdated
                ? new Date(matrixData.lastUpdated).toLocaleString()
                : "--"}
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left">Base \ Quote</th>
                  {CURRENCIES.map((q) => (
                    <th key={q} className="p-2 text-center text-xs text-zinc-600">{q}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CURRENCIES.map((base) => (
                  <tr key={base} className="border-t">
                    <td className="p-2 font-mono font-bold">{base}</td>
                    {CURRENCIES.map((quote) => {
                      const cell = matrixData.matrix.find((m) => m.base === base && m.quote === quote);
                      const val = cell?.change ?? 0;
                      const cls = base === quote ? "bg-zinc-50 text-zinc-400" : colorForChange(val);
                      return (
                        <td key={`${base}-${quote}`} className={`p-2 text-center text-sm ${cls} border-l`}> 
                          {base === quote ? "—" : `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Strongest Currency</h4>
            <div className="mt-2 flex items-center justify-between">
              <div className="font-mono font-bold text-lg">{strongest.currency}</div>
              <div className="text-sm text-zinc-500">Score: {strongest.score.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Weakest Currency</h4>
            <div className="mt-2 flex items-center justify-between">
              <div className="font-mono font-bold text-lg">{weakest.currency}</div>
              <div className="text-sm text-zinc-500">Score: {weakest.score.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Daily Movers</h4>
            <ul className="mt-2 space-y-2">
              {movers.map((m) => (
                <li key={m.pair} className="flex items-center justify-between text-sm">
                  <div className="font-mono">{m.pair}</div>
                  <div className={`font-semibold ${m.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{m.change >= 0 ? "+" : ""}{m.change.toFixed(2)}%</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-4 text-sm">
            <div className="font-semibold">Market Summary</div>
            <div className="mt-2 text-zinc-600">
              The matrix shows percentage moves for base currencies vs quote currencies. Stronger currencies are green, weaker are red. Use this to spot cross strength and intraday movers.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
