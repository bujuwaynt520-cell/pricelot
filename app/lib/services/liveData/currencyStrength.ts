import { CurrencyStrength } from "@/app/types";
import { LIVE_MARKET_DATA_API_URL, fetchJsonWithCache } from "../dataProvider";

export interface CurrencyStrengthResponse {
  data: CurrencyStrength[];
  lastUpdated: string;
}

export async function fetchLiveCurrencyStrength(): Promise<CurrencyStrengthResponse> {
  if (!LIVE_MARKET_DATA_API_URL) {
    return { data: [], lastUpdated: new Date().toISOString() };
  }

  return fetchJsonWithCache<CurrencyStrengthResponse>(`${LIVE_MARKET_DATA_API_URL}/currency-strength`, {}, 60);
}
