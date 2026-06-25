import { MARKET_DATA_PROVIDER, fetchProviderData } from "@/app/lib/services/dataProvider";
import { fetchLiveCurrencyStrength } from "@/app/lib/services/liveData";
import type { CurrencyStrength } from "@/app/types";

export interface CurrencyStrengthResponse {
  data: CurrencyStrength[];
  lastUpdated: string;
}

export const SAMPLE_CURRENCY_STRENGTH: CurrencyStrength[] = [
  { code: "USD", name: "US Dollar", score: 72, change: 1.8 },
  { code: "EUR", name: "Euro", score: 58, change: -0.6 },
  { code: "GBP", name: "British Pound", score: 61, change: 0.9 },
  { code: "JPY", name: "Japanese Yen", score: 49, change: -1.2 },
  { code: "CHF", name: "Swiss Franc", score: 53, change: 0.2 },
  { code: "AUD", name: "Australian Dollar", score: 45, change: -0.9 },
  { code: "NZD", name: "New Zealand Dollar", score: 40, change: -1.6 },
  { code: "CAD", name: "Canadian Dollar", score: 66, change: 1.1 },
];

export function buildCurrencyStrengthResponse(): CurrencyStrengthResponse {
  return {
    data: SAMPLE_CURRENCY_STRENGTH,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getCurrencyStrengthData(): Promise<CurrencyStrengthResponse> {
  return fetchProviderData<CurrencyStrengthResponse>(
    MARKET_DATA_PROVIDER,
    fetchLiveCurrencyStrength,
    buildCurrencyStrengthResponse(),
    (response) => Array.isArray(response.data) && response.data.length > 0,
    "Live currency strength fetch failed, falling back to seed strength data."
  );
}

export function getRanked(data: CurrencyStrength[] = SAMPLE_CURRENCY_STRENGTH, limit = 8) {
  return data.slice().sort((a, b) => b.score - a.score).slice(0, limit);
}

export function getTopGainers(data: CurrencyStrength[] = SAMPLE_CURRENCY_STRENGTH, limit = 3) {
  return data.slice().sort((a, b) => b.change - a.change).slice(0, limit);
}

export function getTopLosers(data: CurrencyStrength[] = SAMPLE_CURRENCY_STRENGTH, limit = 3) {
  return data.slice().sort((a, b) => a.change - b.change).slice(0, limit);
}
