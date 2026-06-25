import { LIVE_MARKET_DATA_API_URL, fetchJsonWithCache } from "../dataProvider";
import type { CurrencyCode } from "../forexHeatmap";

export interface HeatmapCell {
  base: CurrencyCode;
  quote: CurrencyCode;
  change: number;
}

export interface HeatmapResponse {
  matrix: HeatmapCell[];
  lastUpdated: string;
}

export async function fetchLiveHeatMapData(): Promise<HeatmapResponse> {
  if (!LIVE_MARKET_DATA_API_URL) {
    return { matrix: [], lastUpdated: new Date().toISOString() };
  }

  return fetchJsonWithCache<HeatmapResponse>(`${LIVE_MARKET_DATA_API_URL}/forex-heatmap`, {}, 60);
}
