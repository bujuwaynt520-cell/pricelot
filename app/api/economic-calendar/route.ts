import { NextRequest, NextResponse } from "next/server";
import { filterEconomicEvents } from "@/app/lib/services/economicCalendar";
import { EconomicCalendarResponse } from "@/app/types/economic";
import { cacheControlHeader } from "@/app/lib/services/dataProvider";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date"); // ISO format: YYYY-MM-DD
  const currency = searchParams.get("currency"); // Filter by currency
  const impact = searchParams.get("impact"); // Filter by impact
  const timezone = searchParams.get("timezone") || "UTC"; // User's timezone

  const filtered = await filterEconomicEvents({
    date: date ?? undefined,
    currency: currency ?? undefined,
    impact: impact ?? undefined,
  });

  filtered.sort(
    (a, b) => new Date(a.datetimeUtc).getTime() - new Date(b.datetimeUtc).getTime()
  );

  const response: EconomicCalendarResponse = {
    date: date || new Date().toISOString().split("T")[0],
    events: filtered,
    timezoneOffset: timezone,
    nextUpdate: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": cacheControlHeader(300, 600),
    },
  });
}
