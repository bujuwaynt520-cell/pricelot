import { NewsArticle } from "@/app/types";
import { LIVE_NEWS_API_URL, fetchJsonWithCache } from "../dataProvider";

export async function fetchLiveNewsArticles(): Promise<NewsArticle[]> {
  if (!LIVE_NEWS_API_URL) return [];
  return fetchJsonWithCache<NewsArticle[]>(LIVE_NEWS_API_URL, {}, 60);
}
