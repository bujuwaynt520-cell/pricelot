import { EconomicEvent } from "@/app/types/economic";
import { LIVE_CALENDAR_API_URL, fetchJsonWithCache } from "../dataProvider";

export async function fetchLiveEconomicEvents(): Promise<EconomicEvent[]> {
  if (!LIVE_CALENDAR_API_URL) return [];
  return fetchJsonWithCache<EconomicEvent[]>(LIVE_CALENDAR_API_URL, {}, 120);
}
