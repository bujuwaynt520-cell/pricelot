export type DataProviderSource = "seed" | "live";

export const CALENDAR_PROVIDER: DataProviderSource =
  process.env.CALENDAR_PROVIDER?.toLowerCase() === "live" ? "live" : "seed";

export const NEWS_PROVIDER: DataProviderSource =
  process.env.NEWS_PROVIDER?.toLowerCase() === "live" ? "live" : "seed";

export const MARKET_DATA_PROVIDER: DataProviderSource =
  process.env.MARKET_DATA_PROVIDER?.toLowerCase() === "live" ? "live" : "seed";

export const LIVE_CALENDAR_API_URL = process.env.CALENDAR_API_URL || "";
export const LIVE_NEWS_API_URL = process.env.NEWS_API_URL || "";
export const LIVE_MARKET_DATA_API_URL = process.env.MARKET_DATA_API_URL || "";

export function cacheControlHeader(ttl = 300, staleWhileRevalidate = 600) {
  return `public, s-maxage=${ttl}, stale-while-revalidate=${staleWhileRevalidate}`;
}

export async function fetchJsonWithCache<T>(url: string, options: RequestInit = {}, revalidateSeconds = 60): Promise<T> {
  const response = await fetch(url, { ...options, next: { revalidate: revalidateSeconds } as any });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchJsonWithFallback<T>(
  url: string,
  fallback: T,
  revalidateSeconds = 60
): Promise<T> {
  try {
    return await fetchJsonWithCache<T>(url, {}, revalidateSeconds);
  } catch (error) {
    return fallback;
  }
}

export async function fetchProviderData<T>(
  provider: DataProviderSource,
  liveFetcher: () => Promise<T>,
  fallback: T,
  isValid: (result: T) => boolean = () => true,
  fallbackLogMessage = "Live data fetch failed, falling back to seed data."
): Promise<T> {
  if (provider === "live") {
    try {
      const result = await liveFetcher();
      if (isValid(result)) {
        return result;
      }
      console.warn(`${fallbackLogMessage} Received empty or invalid live payload.`);
    } catch (error) {
      console.error(fallbackLogMessage, error);
    }
  }

  return fallback;
}
