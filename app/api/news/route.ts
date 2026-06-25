import { NextResponse } from "next/server";
import { getNewsArticles } from "@/app/lib/services/newsFeed";
import { cacheControlHeader } from "@/app/lib/services/dataProvider";

export async function GET() {
  const articles = await getNewsArticles();
  return NextResponse.json(articles, {
    headers: {
      "Cache-Control": cacheControlHeader(300, 600),
    },
  });
}
