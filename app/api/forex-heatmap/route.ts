import { NextResponse } from "next/server";
import { getHeatmapData } from "@/app/lib/services/forexHeatmap";
import { cacheControlHeader } from "@/app/lib/services/dataProvider";

export async function GET() {
  const data = await getHeatmapData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": cacheControlHeader(300, 600),
    },
  });
}
