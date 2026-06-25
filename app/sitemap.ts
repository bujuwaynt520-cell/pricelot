import { MetadataRoute } from "next";
import { AUTHORS, CATEGORIES, ENGINE_ARTICLES, SAMPLE_LESSONS_EXTENDED, SAMPLE_STRATEGIES_EXTENDED, SAMPLE_GLOSSARY_EXTENDED, getTagSummary } from "./lib/contentEngine";
import { SAMPLE_BROKERS } from "./data";
import { getComparisonPairs } from "./lib/services/brokerHub";
import { getEconomicEvents } from "./lib/services/economicCalendar";
import { getNewsArticles } from "./lib/services/newsFeed";
import { getSampleNewsletterIssues } from "./lib/services/newsletter";
import { GOLD_ARTICLES, GOLD_LESSONS, GOLD_STRATEGIES } from "./lib/services/goldHub";
import { CRYPTO_ARTICLES, CRYPTO_LESSONS, CRYPTO_STRATEGIES } from "./lib/services/cryptoHub";
import { INDICES_ARTICLES, INDICES_LESSONS, INDICES_STRATEGIES } from "./lib/services/indicesHub";
import { COMMODITIES_ARTICLES, COMMODITIES_LESSONS, COMMODITIES_STRATEGIES } from "./lib/services/commoditiesHub";
import { FOREX_ARTICLES, FOREX_LESSONS, FOREX_STRATEGIES } from "./lib/services/forexHub";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pricelot.com";

  // 1. Static Routes
  const staticRoutes = ["", "/search", "/tools", "/articles", "/brokers", "/compare", "/strategies", "/academy", "/glossary", "/economic-calendar", "/market-sessions", "/currency-strength", "/forex-heatmap", "/news", "/gold", "/crypto", "/indices", "/commodities", "/forex", "/account", "/account/profile", "/account/saved", "/account/progress", "/account/watchlist", "/account/login", "/account/signup", "/account/forgot-password", "/account/verify-email", "/categories", "/tags", "/authors", "/newsletter", "/newsletter/signup", "/rss.xml"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route === "/news" ? 0.9 : route === "/newsletter" ? 0.85 : route === "/rss.xml" ? 0.4 : 0.8,
  }));

  // 2. Dynamic Articles Routes
  const articleRoutes = ENGINE_ARTICLES.map((art) => ({
    url: `${baseUrl}/articles/${art.slug}`,
    lastModified: new Date(art.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 3. Dynamic News Routes
  const newsArticles = await getNewsArticles();
  const newsRoutes = newsArticles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 4. Dynamic Gold Articles Routes
  const goldArticleRoutes = GOLD_ARTICLES.map((article) => ({
    url: `${baseUrl}/gold/articles/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 5. Dynamic Gold Academy Routes
  const goldLessonRoutes = GOLD_LESSONS.map((lesson) => ({
    url: `${baseUrl}/gold/academy/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 6. Dynamic Gold Strategies Routes
  const goldStrategyRoutes = GOLD_STRATEGIES.map((strategy) => ({
    url: `${baseUrl}/gold/strategies/${strategy.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 7. Dynamic Indices Routes
  const indicesArticleRoutes = INDICES_ARTICLES.map((article) => ({
    url: `${baseUrl}/indices/articles/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const indicesLessonRoutes = INDICES_LESSONS.map((lesson) => ({
    url: `${baseUrl}/indices/academy/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const indicesStrategyRoutes = INDICES_STRATEGIES.map((strategy) => ({
    url: `${baseUrl}/indices/strategies/${strategy.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 8. Dynamic Commodities Routes
  const commodityArticleRoutes = COMMODITIES_ARTICLES.map((article) => ({
    url: `${baseUrl}/commodities/articles/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const commodityLessonRoutes = COMMODITIES_LESSONS.map((lesson) => ({
    url: `${baseUrl}/commodities/academy/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const commodityStrategyRoutes = COMMODITIES_STRATEGIES.map((strategy) => ({
    url: `${baseUrl}/commodities/strategies/${strategy.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 10. Dynamic Forex Routes
  const forexArticleRoutes = FOREX_ARTICLES.map((article) => ({
    url: `${baseUrl}/forex/articles/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const forexLessonRoutes = FOREX_LESSONS.map((lesson) => ({
    url: `${baseUrl}/forex/academy/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const forexStrategyRoutes = FOREX_STRATEGIES.map((strategy) => ({
    url: `${baseUrl}/forex/strategies/${strategy.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const newsletterRoutes = getSampleNewsletterIssues().map((issue) => ({
    url: `${baseUrl}/newsletter/${issue.id}`,
    lastModified: new Date(issue.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // 11. Dynamic Category, Tag, and Author Routes
  const categoryRoutes = Object.keys(CATEGORIES).map((id) => ({
    url: `${baseUrl}/categories/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagRoutes = getTagSummary().map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag.tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const authorRoutes = Object.keys(AUTHORS).map((id) => ({
    url: `${baseUrl}/authors/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 10. Dynamic Brokers Routes
  const brokerRoutes = SAMPLE_BROKERS.map((b) => ({
    url: `${baseUrl}/brokers/${b.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const compareRoutes = getComparisonPairs().map((pair) => ({
    url: `${baseUrl}/compare/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // 8. Dynamic Strategies Routes
  const strategyRoutes = SAMPLE_STRATEGIES_EXTENDED.map((s) => ({
    url: `${baseUrl}/strategies/${s.id}`,
    lastModified: new Date(s.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 9. Dynamic Academy Routes
  const academyRoutes = SAMPLE_LESSONS_EXTENDED.map((l) => ({
    url: `${baseUrl}/academy/${l.id}`,
    lastModified: new Date(l.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 10. Dynamic Glossary Routes
  const glossaryRoutes = SAMPLE_GLOSSARY_EXTENDED.map((g) => ({
    url: `${baseUrl}/glossary/${g.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // 11. Dynamic Economic Calendar Event Routes
  const calendarEvents = await getEconomicEvents();
  const calendarRoutes = calendarEvents.map((event) => ({
    url: `${baseUrl}/economic-calendar/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...newsRoutes,
    ...goldArticleRoutes,
    ...goldLessonRoutes,
    ...goldStrategyRoutes,
    ...indicesArticleRoutes,
    ...indicesLessonRoutes,
    ...indicesStrategyRoutes,
    ...commodityArticleRoutes,
    ...commodityLessonRoutes,
    ...commodityStrategyRoutes,
    ...forexArticleRoutes,
    ...forexLessonRoutes,
    ...forexStrategyRoutes,
    ...newsletterRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...authorRoutes,
    ...brokerRoutes,
    ...compareRoutes,
    ...strategyRoutes,
    ...academyRoutes,
    ...glossaryRoutes,
    ...calendarRoutes,
  ];
}
