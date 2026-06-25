import { MARKET_DATA_PROVIDER, fetchProviderData } from "@/app/lib/services/dataProvider";
import { fetchLiveHeatMapData } from "@/app/lib/services/liveData";
import type { MarketQuote } from "@/app/types";

export const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "NZD", "CAD"] as const;
export type CurrencyCode = typeof CURRENCIES[number];

export interface HeatmapCell {
  base: CurrencyCode;
  quote: CurrencyCode;
  change: number;
}

export interface HeatmapResponse {
  matrix: HeatmapCell[];
  lastUpdated: string;
}

export const PAIR_CHANGES: Record<string, number> = {
  "USD/USD": 0,
  "USD/EUR": 0.6,
  "USD/GBP": 0.9,
  "USD/JPY": 1.2,
  "USD/CHF": 0.3,
  "USD/AUD": 1.8,
  "USD/NZD": 2.4,
  "USD/CAD": 1.1,
  "EUR/USD": -0.6,
  "EUR/EUR": 0,
  "EUR/GBP": 0.25,
  "EUR/JPY": 0.65,
  "EUR/CHF": -0.1,
  "EUR/AUD": 1.1,
  "EUR/NZD": 1.6,
  "EUR/CAD": 0.5,
  "GBP/USD": -0.9,
  "GBP/EUR": -0.25,
  "GBP/GBP": 0,
  "GBP/JPY": 0.3,
  "GBP/CHF": -0.2,
  "GBP/AUD": 0.8,
  "GBP/NZD": 1.2,
  "GBP/CAD": 0.7,
  "JPY/USD": -1.2,
  "JPY/EUR": -0.65,
  "JPY/GBP": -0.3,
  "JPY/JPY": 0,
  "JPY/CHF": -0.4,
  "JPY/AUD": -0.1,
  "JPY/NZD": 0.2,
  "JPY/CAD": -0.5,
  "CHF/USD": -0.3,
  "CHF/EUR": 0.1,
  "CHF/GBP": 0.2,
  "CHF/JPY": 0.4,
  "CHF/CHF": 0,
  "CHF/AUD": 0.9,
  "CHF/NZD": 1.3,
  "CHF/CAD": 0.6,
  "AUD/USD": -1.8,
  "AUD/EUR": -1.1,
  "AUD/GBP": -0.8,
  "AUD/JPY": 0.1,
  "AUD/CHF": -0.9,
  "AUD/AUD": 0,
  "AUD/NZD": 0.4,
  "AUD/CAD": -0.2,
  "NZD/USD": -2.4,
  "NZD/EUR": -1.6,
  "NZD/GBP": -1.2,
  "NZD/JPY": -0.2,
  "NZD/CHF": -1.3,
  "NZD/AUD": -0.4,
  "NZD/NZD": 0,
  "NZD/CAD": -0.9,
  "CAD/USD": -1.1,
  "CAD/EUR": -0.5,
  "CAD/GBP": -0.7,
  "CAD/JPY": 0.5,
  "CAD/CHF": -0.6,
  "CAD/AUD": 0.2,
  "CAD/NZD": 0.9,
  "CAD/CAD": 0,
};

export function buildHeatmapMatrix(quotes?: MarketQuote[]): HeatmapResponse {
  if (!quotes || quotes.length === 0) {
    const matrix: HeatmapCell[] = [];
    for (const base of CURRENCIES) {
      for (const quote of CURRENCIES) {
        matrix.push({ base, quote, change: PAIR_CHANGES[`${base}/${quote}`] ?? 0 });
      }
    }
    return { matrix, lastUpdated: new Date().toISOString() };
  }

  const matrix: HeatmapCell[] = [];
  for (const base of CURRENCIES) {
    for (const quote of CURRENCIES) {
      const key = `${base}/${quote}`;
      const change = PAIR_CHANGES[key] ?? 0;
      matrix.push({ base, quote, change });
    }
  }
  return { matrix, lastUpdated: new Date().toISOString() };
}

async function fetchHeatmap(): Promise<HeatmapResponse> {
  return fetchProviderData<HeatmapResponse>(
    MARKET_DATA_PROVIDER,
    fetchLiveHeatMapData,
    buildHeatmapMatrix(),
    (response) => Array.isArray(response.matrix) && response.matrix.length > 0,
    "Live heatmap fetch failed, falling back to seed heatmap."
  );
}

export async function getHeatmapData(): Promise<HeatmapResponse> {
  return await fetchHeatmap();
}

export function getStrongestCurrency(matrix: HeatmapCell[]) {
  const scores = Object.fromEntries(CURRENCIES.map((c) => [c, 0])) as Record<CurrencyCode, number>;
  matrix.forEach((cell) => {
    if (cell.base === cell.quote) return;
    scores[cell.base] += cell.change ?? 0;
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { currency: sorted[0][0], score: sorted[0][1], currencyScores: scores };
}

export function getWeakestCurrency(matrix: HeatmapCell[]) {
  const strongest = getStrongestCurrency(matrix);
  const sorted = Object.entries(strongest.currencyScores).sort((a, b) => a[1] - b[1]);
  return { currency: sorted[0][0], score: sorted[0][1] };
}

export function getDailyMovers(matrix: HeatmapCell[], limit = 6) {
  return matrix
    .filter((cell) => cell.base !== cell.quote)
    .map((cell) => ({ pair: `${cell.base}/${cell.quote}`, change: cell.change }))
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, limit);
}
