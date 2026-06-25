"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getRanked, getTopGainers, getTopLosers, CurrencyStrength } from "@/app/lib/services/currencyStrength";
import { ArrowUp, ArrowDown } from "lucide-react";

function clamp(v: number, min = 0, max = 100) { return Math.max(min, Math.min(max, v)); }

export default function CurrencyStrengthClient() {
  const [data, setData] = useState<CurrencyStrength[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const fetchCurrencyStrength = async () => {
      try {
        const res = await fetch("/api/currency-strength");
        if (!res.ok) {
          throw new Error(`Failed to fetch currency strength: ${res.status}`);
        }
        const json = await res.json();
        setData(json.data || []);
        setLastUpdated(json.lastUpdated || new Date().toISOString());
      } catch (error) {
        console.error("Unable to load currency strength data:", error);
      }
    };

    fetchCurrencyStrength();
  }, []);

  const ranked = useMemo(() => data.slice().sort((a, b) => b.score - a.score), [data]);
  const gainers = useMemo(() => data.slice().sort((a, b) => b.change - a.change).slice(0, 3), [data]);
  const losers = useMemo(() => data.slice().sort((a, b) => a.change - b.change).slice(0, 3), [data]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Strength Rankings</h2>
            <div className="text-xs text-zinc-500">Last updated: {new Date(lastUpdated).toLocaleString()}</div>
          </div>

          <div className="mt-4 space-y-3">
            {ranked.map((c) => (
              <div key={c.code} className="flex items-center gap-4">
                <div className="w-12 font-mono text-sm font-bold">{c.code}</div>
                <div className="flex-1">
                  <div className="w-full bg-zinc-100 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 rounded-full ${c.score >= 60 ? "bg-emerald-400" : c.score >= 45 ? "bg-amber-400" : "bg-rose-400"}`} style={{ width: `${clamp(c.score)}%` }} />
                  </div>
                </div>
                <div className="w-20 text-right font-mono font-bold">{Math.round(c.score)}</div>
                <div className="w-20 text-right text-xs">
                  {c.change > 0 ? (
                    <span className="flex items-center text-emerald-600 gap-1"><ArrowUp className="w-3 h-3" />{c.change.toFixed(2)}</span>
                  ) : (
                    <span className="flex items-center text-rose-600 gap-1"><ArrowDown className="w-3 h-3" />{Math.abs(c.change).toFixed(2)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold">Top Gainers</h3>
          <ul className="mt-3 space-y-2">
            {gainers.map((g) => (
              <li key={g.code} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold w-10">{g.code}</div>
                  <div className="text-sm">{g.name}</div>
                </div>
                <div className="text-emerald-600 font-semibold flex items-center gap-1"><ArrowUp className="w-4 h-4" />{g.change.toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold mt-4">Top Losers</h3>
          <ul className="mt-3 space-y-2">
            {losers.map((g) => (
              <li key={g.code} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold w-10">{g.code}</div>
                  <div className="text-sm">{g.name}</div>
                </div>
                <div className="text-rose-600 font-semibold flex items-center gap-1"><ArrowDown className="w-4 h-4" />{Math.abs(g.change).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Strength Table</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="px-3 py-2">Currency</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr key={c.code} className="border-t border-zinc-100">
                  <td className="px-3 py-3 font-mono font-bold">{c.code} <span className="text-xs text-zinc-500 ml-2">{c.name}</span></td>
                  <td className="px-3 py-3 font-mono font-bold">{Math.round(c.score)}</td>
                  <td className="px-3 py-3">{c.change > 0 ? <span className="text-emerald-600">+{c.change.toFixed(2)}</span> : <span className="text-rose-600">{c.change.toFixed(2)}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
