import { NextResponse } from "next/server";
import { getCurrencyStrengthData } from "@/app/lib/services/currencyStrength";
import { cacheControlHeader } from "@/app/lib/services/dataProvider";

export async function GET() {
  const data = await getCurrencyStrengthData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": cacheControlHeader(300, 600),
    },
  });
}
