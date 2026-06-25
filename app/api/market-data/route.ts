import { NextResponse } from "next/server";
import { getMarketData } from "@/app/lib/services/marketData";
import { cacheControlHeader } from "@/app/lib/services/dataProvider";

export async function GET() {
  const data = await getMarketData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": cacheControlHeader(300, 600),
    },
  });
}
