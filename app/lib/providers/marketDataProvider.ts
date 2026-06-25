import { MARKET_DATA_PROVIDER, fetchProviderData } from "@/app/lib/services/dataProvider";
import { fetchLiveMarketData } from "@/app/lib/services/liveData";
import { MarketAssetType, MarketDataResponse, MarketQuote } from "@/app/types";

const MARKET_QUOTE_SEED: MarketQuote[] = [
  {
    symbol: "EUR/USD",
    displayName: "Euro / US Dollar",
    assetType: "Forex",
    lastPrice: 1.0865,
    changePercent: 0.21,
    changeAbsolute: 0.0023,
    bid: 1.0864,
    ask: 1.0866,
    high: 1.0881,
    low: 1.0847,
    volume: 912_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "GBP/USD",
    displayName: "British Pound / US Dollar",
    assetType: "Forex",
    lastPrice: 1.2614,
    changePercent: 0.12,
    changeAbsolute: 0.0015,
    bid: 1.2613,
    ask: 1.2615,
    high: 1.2630,
    low: 1.2598,
    volume: 638_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "USD/JPY",
    displayName: "US Dollar / Japanese Yen",
    assetType: "Forex",
    lastPrice: 156.23,
    changePercent: -0.18,
    changeAbsolute: -0.28,
    bid: 156.20,
    ask: 156.26,
    high: 156.75,
    low: 155.98,
    volume: 1_180_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "XAU/USD",
    displayName: "Gold / US Dollar",
    assetType: "Gold",
    lastPrice: 2248.7,
    changePercent: 0.35,
    changeAbsolute: 7.8,
    bid: 2248.5,
    ask: 2248.9,
    high: 2253.4,
    low: 2240.1,
    volume: 72_400,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "BTC/USD",
    displayName: "Bitcoin / US Dollar",
    assetType: "Crypto",
    lastPrice: 63250,
    changePercent: 1.82,
    changeAbsolute: 1130,
    bid: 63210,
    ask: 63290,
    high: 63640,
    low: 62110,
    volume: 24_500,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "US500",
    displayName: "S&P 500 Index",
    assetType: "Indices",
    lastPrice: 5305.6,
    changePercent: 0.65,
    changeAbsolute: 34.2,
    bid: 5305.1,
    ask: 5305.9,
    high: 5315.8,
    low: 5278.4,
    volume: 12_800,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "WTI",
    displayName: "Crude Oil (WTI)",
    assetType: "Commodities",
    lastPrice: 82.45,
    changePercent: -0.25,
    changeAbsolute: -0.21,
    bid: 82.40,
    ask: 82.50,
    high: 83.10,
    low: 82.12,
    volume: 48_700,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "BRENT",
    displayName: "Brent Crude Oil",
    assetType: "Commodities",
    lastPrice: 88.72,
    changePercent: 0.18,
    changeAbsolute: 0.16,
    bid: 88.65,
    ask: 88.79,
    high: 89.25,
    low: 87.90,
    volume: 36_200,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "NGAS",
    displayName: "Natural Gas",
    assetType: "Commodities",
    lastPrice: 2.79,
    changePercent: -0.42,
    changeAbsolute: -0.01,
    bid: 2.78,
    ask: 2.80,
    high: 2.84,
    low: 2.76,
    volume: 55_400,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "AUD/USD",
    displayName: "Australian Dollar / US Dollar",
    assetType: "Forex",
    lastPrice: 0.6548,
    changePercent: 0.15,
    changeAbsolute: 0.0010,
    bid: 0.6547,
    ask: 0.6549,
    high: 0.6562,
    low: 0.6532,
    volume: 521_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "USD/CAD",
    displayName: "US Dollar / Canadian Dollar",
    assetType: "Forex",
    lastPrice: 1.3621,
    changePercent: -0.08,
    changeAbsolute: -0.0011,
    bid: 1.3620,
    ask: 1.3622,
    high: 1.3638,
    low: 1.3598,
    volume: 718_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "USD/CHF",
    displayName: "US Dollar / Swiss Franc",
    assetType: "Forex",
    lastPrice: 0.8823,
    changePercent: 0.22,
    changeAbsolute: 0.0019,
    bid: 0.8822,
    ask: 0.8824,
    high: 0.8835,
    low: 0.8805,
    volume: 436_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "NZD/USD",
    displayName: "New Zealand Dollar / US Dollar",
    assetType: "Forex",
    lastPrice: 0.5892,
    changePercent: 0.28,
    changeAbsolute: 0.0016,
    bid: 0.5891,
    ask: 0.5893,
    high: 0.5908,
    low: 0.5876,
    volume: 389_000,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "ETH/USD",
    displayName: "Ethereum / US Dollar",
    assetType: "Crypto",
    lastPrice: 2342.50,
    changePercent: 3.15,
    changeAbsolute: 71.30,
    bid: 2341.20,
    ask: 2343.80,
    high: 2425.00,
    low: 2210.50,
    volume: 18_600,
    updatedAt: new Date().toISOString(),
  },
  {
    symbol: "NASDAQ",
    displayName: "NASDAQ-100 Index",
    assetType: "Indices",
    lastPrice: 21045.8,
    changePercent: 0.82,
    changeAbsolute: 171.2,
    bid: 21044.5,
    ask: 21046.9,
    high: 21108.2,
    low: 20895.1,
    volume: 9_450,
    updatedAt: new Date().toISOString(),
  },
];

export const MARKET_ASSET_TYPES: MarketAssetType[] = ["Forex", "Gold", "Crypto", "Indices", "Commodities"];

export function getSampleMarketData(): MarketDataResponse {
  return {
    quotes: MARKET_QUOTE_SEED,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getMarketData(): Promise<MarketDataResponse> {
  return fetchProviderData<MarketDataResponse>(
    MARKET_DATA_PROVIDER,
    fetchLiveMarketData,
    getSampleMarketData(),
    (response) => Array.isArray(response.quotes) && response.quotes.length > 0,
    "Live market data fetch failed, falling back to seed market data."
  );
}

export async function getMarketQuoteBySymbol(symbol: string): Promise<MarketQuote | undefined> {
  const data = await getMarketData();
  return data.quotes.find((quote) => quote.symbol.toLowerCase() === symbol.toLowerCase());
}

export async function getMarketQuotesByType(assetType: MarketAssetType): Promise<MarketQuote[]> {
  const data = await getMarketData();
  return data.quotes.filter((quote) => quote.assetType === assetType);
}

export async function getTopMarketGainers(limit = 5): Promise<MarketQuote[]> {
  const data = await getMarketData();
  return [...data.quotes].sort((a, b) => b.changePercent - a.changePercent).slice(0, limit);
}

export async function getTopMarketLosers(limit = 5): Promise<MarketQuote[]> {
  const data = await getMarketData();
  return [...data.quotes].sort((a, b) => a.changePercent - b.changePercent).slice(0, limit);
}

export async function getMarketSummary(): Promise<Record<MarketAssetType, number>> {
  const data = await getMarketData();
  return MARKET_ASSET_TYPES.reduce((summary, type) => {
    summary[type] = data.quotes.filter((quote) => quote.assetType === type).length;
    return summary;
  }, {} as Record<MarketAssetType, number>);
}

const MARKET_ASSET_TYPE_MAP: Record<string, MarketAssetType> = {
  forex: "Forex",
  gold: "Gold",
  crypto: "Crypto",
  indices: "Indices",
  commodities: "Commodities",
};

export function normalizeMarketSymbol(symbol: string): string {
  return symbol.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function getMarketQuoteSlug(symbol: string): string {
  return normalizeMarketSymbol(symbol);
}

const MARKET_QUOTE_SLUG_ALIASES: Record<string, string> = {
  bitcoin: "btcusd",
  btc: "btcusd",
  ethereum: "ethusd",
  eth: "ethusd",
  gold: "xauusd",
  xau: "xauusd",
  sp500: "us500",
  nasdaq: "nasdaq",
  brent: "brent",
  "brent-oil": "brent",
  wti: "wti",
  "wti-crude-oil": "wti",
  "natural-gas": "ngas",
  natgas: "ngas",
  ngas: "ngas",
  audusd: "audusd",
  usdcad: "usdcad",
  usdchf: "usdchf",
  nzdusd: "nzdusd",
  eurusd: "eurusd",
  gbpusd: "gbpusd",
  usdjpy: "usdjpy",
};

export function resolveMarketQuoteSlug(slug: string): string {
  const normalized = normalizeMarketSymbol(slug);
  return MARKET_QUOTE_SLUG_ALIASES[normalized] || normalized;
}

export async function getMarketQuoteParams(): Promise<{ category: string; asset: string }[]> {
  const data = await getMarketData();

  const canonicalSlugs = data.quotes.map((quote) => ({
    category: quote.assetType.toLowerCase(),
    asset: getMarketQuoteSlug(quote.symbol),
  }));

  const aliasSlugs = Object.entries(MARKET_QUOTE_SLUG_ALIASES)
    .filter(([alias]) => !canonicalSlugs.some((item) => item.asset === alias))
    .map(([alias, canonicalSlug]) => {
      const quote = data.quotes.find((quote) => getMarketQuoteSlug(quote.symbol) === canonicalSlug);
      return quote ? { category: quote.assetType.toLowerCase(), asset: alias } : null;
    })
    .filter(Boolean) as { category: string; asset: string }[];

  return [...canonicalSlugs, ...aliasSlugs];
}

export function parseMarketAssetType(assetSlug: string): MarketAssetType | undefined {
  return MARKET_ASSET_TYPE_MAP[assetSlug.toLowerCase()];
}

export function getMarketQuotePath(quote: MarketQuote): string {
  return `/markets/${quote.assetType.toLowerCase()}/${normalizeMarketSymbol(quote.symbol)}`;
}

export async function getMarketQuotesByAssetSlug(assetSlug: string): Promise<MarketQuote[]> {
  const assetType = parseMarketAssetType(assetSlug);
  return assetType ? getMarketQuotesByType(assetType) : [];
}

export async function getMarketQuoteByAssetAndSlug(
  assetSlug: string,
  quoteSlug: string
): Promise<MarketQuote | undefined> {
  const assetType = parseMarketAssetType(assetSlug);
  if (!assetType) return undefined;

  const resolvedQuoteSlug = resolveMarketQuoteSlug(quoteSlug);
  const data = await getMarketData();

  return data.quotes.find(
    (quote) =>
      quote.assetType === assetType && normalizeMarketSymbol(quote.symbol) === resolvedQuoteSlug
  );
}
