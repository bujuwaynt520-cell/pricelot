export interface EconomicEvent {
  id: string;
  title: string;
  currency: string; // ISO code (e.g., "USD", "EUR", "GBP")
  country?: string;
  datetimeUtc: string; // ISO 8601 UTC timestamp
  datetimeLocal?: string; // Local timezone representation
  impact: "Low" | "Medium" | "High";
  importance?: number; // 1-5 importance score
  actual?: string | number | null;
  forecast?: string | number | null;
  previous?: string | number | null;
  unit?: string; // e.g., "%", "k", "m"
  source: string; // e.g., "TradingEconomics", "Investing", "ForexFactory"
  region?: string;
  notes?: string;
  slug: string; // URL-friendly identifier
  category?: string; // e.g., "Employment", "Inflation", "GDP"
}

export interface EconomicCalendarDay {
  date: string; // ISO date (YYYY-MM-DD)
  events: EconomicEvent[];
}

export interface EconomicCalendarResponse {
  date: string;
  events: EconomicEvent[];
  timezoneOffset: string; // e.g., "UTC+0"
  nextUpdate?: string;
}
