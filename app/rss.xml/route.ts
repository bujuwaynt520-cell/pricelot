import { NextResponse } from "next/server";
import { ENGINE_ARTICLES } from "../lib/contentEngine";

function buildRssItem(article: typeof ENGINE_ARTICLES[number]) {
  return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>https://pricelot.com/articles/${article.slug}</link>
      <guid>https://pricelot.com/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const rssItems = ENGINE_ARTICLES.slice(0, 20).map(buildRssItem).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>PriceLot Articles Feed</title>
      <link>https://pricelot.com/rss.xml</link>
      <description>Latest trading guides, strategies, and glossary updates from PriceLot.</description>
      <language>en-US</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${rssItems}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "content-type": "application/rss+xml; charset=UTF-8",
    },
  });
}
