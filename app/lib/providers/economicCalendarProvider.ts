import { CALENDAR_PROVIDER, fetchProviderData } from "@/app/lib/services/dataProvider";
import { fetchLiveEconomicEvents } from "@/app/lib/services/liveData";
import { EconomicEvent } from "@/app/types";

export interface EconomicCalendarFilters {
  date?: string;
  currency?: string;
  impact?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface EconomicCalendarPageResult {
  events: EconomicEvent[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export const SAMPLE_ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: "usd-jobless-20260624",
    title: "Initial Jobless Claims",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-06-24T12:30:00Z",
    impact: "High",
    forecast: "215k",
    previous: "218k",
    unit: "k",
    source: "TradingEconomics",
    region: "US",
    category: "Employment",
    slug: "initial-jobless-claims-2026-06-24",
    notes: "Weekly jobless claims are a leading indicator of economic health.",
  },
  {
    id: "eur-manufacturing-20260624",
    title: "Manufacturing PMI (Flash)",
    currency: "EUR",
    country: "Eurozone",
    datetimeUtc: "2026-06-24T08:00:00Z",
    impact: "Medium",
    forecast: "52.1",
    previous: "51.8",
    unit: "",
    source: "Markit Economics",
    region: "EU",
    category: "Manufacturing",
    slug: "eurozone-manufacturing-pmi-2026-06-24",
  },
  {
    id: "gbp-retail-20260624",
    title: "Retail Sales (MoM)",
    currency: "GBP",
    country: "United Kingdom",
    datetimeUtc: "2026-06-24T08:00:00Z",
    impact: "Medium",
    forecast: "0.2%",
    previous: "-0.1%",
    unit: "%",
    source: "ONS",
    region: "UK",
    category: "Consumer",
    slug: "uk-retail-sales-2026-06-24",
  },
  {
    id: "usd-durable-20260625",
    title: "Durable Goods Orders",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-06-25T12:30:00Z",
    impact: "High",
    forecast: "2.1%",
    previous: "-1.2%",
    unit: "%",
    source: "Census Bureau",
    region: "US",
    category: "Manufacturing",
    slug: "durable-goods-orders-2026-06-25",
  },
  {
    id: "jpy-cpi-20260625",
    title: "Consumer Price Index (YoY)",
    currency: "JPY",
    country: "Japan",
    datetimeUtc: "2026-06-25T23:30:00Z",
    impact: "High",
    forecast: "2.1%",
    previous: "2.0%",
    unit: "%",
    source: "Statistics Bureau",
    region: "JP",
    category: "Inflation",
    slug: "japan-cpi-2026-06-25",
  },
  {
    id: "aud-ppp-20260625",
    title: "Producer Price Index (QoQ)",
    currency: "AUD",
    country: "Australia",
    datetimeUtc: "2026-06-25T01:30:00Z",
    impact: "Medium",
    forecast: "0.6%",
    previous: "0.5%",
    unit: "%",
    source: "ABS",
    region: "AU",
    category: "Inflation",
    slug: "australia-ppi-2026-06-25",
  },
  {
    id: "usd-gdp-20260626",
    title: "Advance GDP (QoQ, Annualized)",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-06-26T12:30:00Z",
    impact: "High",
    forecast: "2.8%",
    previous: "3.4%",
    unit: "%",
    source: "BEA",
    region: "US",
    category: "GDP",
    slug: "us-gdp-advance-2026-06-26",
    notes: "Quarterly GDP growth is the most important economic indicator.",
  },
  {
    id: "eur-consumer-20260626",
    title: "Consumer Confidence (Flash)",
    currency: "EUR",
    country: "Eurozone",
    datetimeUtc: "2026-06-26T10:00:00Z",
    impact: "Medium",
    forecast: "-14.5",
    previous: "-13.2",
    unit: "",
    source: "European Commission",
    region: "EU",
    category: "Consumer",
    slug: "eurozone-consumer-confidence-2026-06-26",
  },
  {
    id: "cad-unemployment-20260626",
    title: "Unemployment Rate",
    currency: "CAD",
    country: "Canada",
    datetimeUtc: "2026-06-26T11:30:00Z",
    impact: "High",
    forecast: "6.0%",
    previous: "5.9%",
    unit: "%",
    source: "Statistics Canada",
    region: "CA",
    category: "Employment",
    slug: "canada-unemployment-2026-06-26",
  },
  {
    id: "eur-inflation-20260629",
    title: "CPI Flash (YoY)",
    currency: "EUR",
    country: "Eurozone",
    datetimeUtc: "2026-06-29T09:00:00Z",
    impact: "High",
    forecast: "2.5%",
    previous: "2.4%",
    unit: "%",
    source: "Eurostat",
    region: "EU",
    category: "Inflation",
    slug: "eurozone-cpi-2026-06-29",
    notes: "Key inflation data for the ECB policy decisions.",
  },
  {
    id: "gbp-retail-20260629",
    title: "Retail Sales (YoY)",
    currency: "GBP",
    country: "United Kingdom",
    datetimeUtc: "2026-06-29T08:00:00Z",
    impact: "Medium",
    forecast: "1.2%",
    previous: "0.8%",
    unit: "%",
    source: "ONS",
    region: "UK",
    category: "Consumer",
    slug: "uk-retail-sales-yoy-2026-06-29",
  },
  {
    id: "usd-ism-20260701",
    title: "ISM Manufacturing PMI",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-07-01T14:00:00Z",
    impact: "High",
    forecast: "50.8",
    previous: "50.5",
    unit: "",
    source: "ISM",
    region: "US",
    category: "Manufacturing",
    slug: "ism-manufacturing-2026-07-01",
  },
  {
    id: "aud-employment-20260701",
    title: "Employment Change",
    currency: "AUD",
    country: "Australia",
    datetimeUtc: "2026-07-01T01:30:00Z",
    impact: "High",
    forecast: "25.0k",
    previous: "38.5k",
    unit: "k",
    source: "ABS",
    region: "AU",
    category: "Employment",
    slug: "australia-employment-2026-07-01",
  },
  {
    id: "usd-nonfarm-20260702",
    title: "Non-Farm Payrolls (NFP)",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-07-02T12:30:00Z",
    impact: "High",
    forecast: "225k",
    previous: "218k",
    unit: "k",
    source: "BLS",
    region: "US",
    category: "Employment",
    slug: "nonfarm-payrolls-2026-07-02",
    notes: "Most important monthly data release. High volatility expected.",
  },
  {
    id: "usd-unemployment-20260702",
    title: "Unemployment Rate",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-07-02T12:30:00Z",
    impact: "High",
    forecast: "3.9%",
    previous: "3.8%",
    unit: "%",
    source: "BLS",
    region: "US",
    category: "Employment",
    slug: "unemployment-rate-2026-07-02",
  },
  {
    id: "usd-avg-hourly-earnings-20260702",
    title: "Average Hourly Earnings (YoY)",
    currency: "USD",
    country: "United States",
    datetimeUtc: "2026-07-02T12:30:00Z",
    impact: "High",
    forecast: "4.2%",
    previous: "4.0%",
    unit: "%",
    source: "BLS",
    region: "US",
    category: "Employment",
    slug: "average-hourly-earnings-2026-07-02",
  },
  {
    id: "eur-services-20260703",
    title: "Services PMI (Flash)",
    currency: "EUR",
    country: "Eurozone",
    datetimeUtc: "2026-07-03T09:00:00Z",
    impact: "Medium",
    forecast: "53.5",
    previous: "53.2",
    unit: "",
    source: "Markit Economics",
    region: "EU",
    category: "Services",
    slug: "eurozone-services-pmi-2026-07-03",
  },
  {
    id: "gbp-services-20260703",
    title: "Services PMI (Flash)",
    currency: "GBP",
    country: "United Kingdom",
    datetimeUtc: "2026-07-03T08:30:00Z",
    impact: "Medium",
    forecast: "53.0",
    previous: "52.8",
    unit: "",
    source: "Markit Economics",
    region: "UK",
    category: "Services",
    slug: "uk-services-pmi-2026-07-03",
  },
];

function applyCalendarFilters(events: EconomicEvent[], filters: EconomicCalendarFilters): EconomicEvent[] {
  return events.filter((event) => {
    if (filters.date && !event.datetimeUtc.startsWith(filters.date)) {
      return false;
    }
    if (filters.currency && event.currency.toUpperCase() !== filters.currency.toUpperCase()) {
      return false;
    }
    if (filters.impact && event.impact !== filters.impact) {
      return false;
    }
    if (filters.category && event.category?.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    return true;
  });
}

async function fetchCalendarEvents(): Promise<EconomicEvent[]> {
  return fetchProviderData<EconomicEvent[]>(
    CALENDAR_PROVIDER,
    fetchLiveEconomicEvents,
    SAMPLE_ECONOMIC_EVENTS,
    (events) => Array.isArray(events) && events.length > 0,
    "Live economic calendar fetch failed, falling back to seed data."
  );
}

export async function getEconomicCalendarPage(
  filters: EconomicCalendarFilters = {}
): Promise<EconomicCalendarPageResult> {
  const page = Math.max(filters.page ?? 1, 1);
  const pageSize = Math.max(filters.pageSize ?? 12, 1);
  const events = await fetchCalendarEvents();
  const filtered = applyCalendarFilters(events, filters);
  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const pagedEvents = filtered.slice((page - 1) * pageSize, page * pageSize);

  return {
    events: pagedEvents,
    page,
    pageSize,
    total,
    totalPages,
  };
}

export async function getEconomicEventBySlug(slug: string): Promise<EconomicEvent | undefined> {
  const events = await fetchCalendarEvents();
  return events.find((event) => event.slug === slug);
}
