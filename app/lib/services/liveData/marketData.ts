import { LIVE_MARKET_DATA_API_URL, fetchJsonWithCache } from "../dataProvider";
import type { MarketDataResponse } from "@/app/types";

export async function fetchLiveMarketData(): Promise<MarketDataResponse> {
  if (!LIVE_MARKET_DATA_API_URL) {
    return { quotes: [], lastUpdated: new Date().toISOString() };
  }

  return fetchJsonWithCache<MarketDataResponse>(`${LIVE_MARKET_DATA_API_URL}/market-data`, {}, 60);
}
