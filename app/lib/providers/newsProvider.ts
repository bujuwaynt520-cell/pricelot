import { NEWS_PROVIDER, fetchProviderData } from "@/app/lib/services/dataProvider";
import { fetchLiveNewsArticles } from "@/app/lib/services/liveData";
import { NewsArticle, NewsCategory } from "@/app/types";

export interface NewsQueryOptions {
  category?: NewsCategory | "All";
  source?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface NewsPageResult {
  articles: NewsArticle[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  categories: NewsCategory[];
  sources: string[];
}

export const NEWS_CATEGORIES: NewsCategory[] = ["Forex", "Gold", "Crypto", "Indices", "Commodities"];

export const SAMPLE_NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "Dollar Rebounds After FOMC Minutes Signal Slow Rate Cuts",
    slug: "dollar-rebounds-after-fomc-minutes-signal-slow-rate-cuts",
    category: "Forex",
    author: "Avery Chen",
    publishDate: "2026-06-24",
    summary: "The US dollar gained ground after the latest Fed minutes suggested that rate cuts will be delayed until later this year.",
    content: "The US dollar regained composure Wednesday as the Federal Reserve minutes indicated a patient approach to interest-rate cuts.\n\nTraders reacted to the language that emphasized ongoing inflation risks and the need to see sustained progress before easing policy.\n\n- Fed officials said labor market strength remains a key data point.\n- Market pricing adjusted and front-end yields climbed.\n\nThe greenback was strongest against the yen and commodity currencies, as risk-off flows returned amid economic uncertainty.",
    tags: ["USD", "FOMC", "interest rates", "dollar"],
    featured: true,
    trending: true,
  },
  {
    title: "Gold Extends Rally Ahead of ECB Decision",
    slug: "gold-extends-rally-ahead-of-ecb-decision",
    category: "Gold",
    author: "Nina Patel",
    publishDate: "2026-06-23",
    summary: "Bullion prices climbed as traders priced in softer eurozone growth and a more dovish ECB outlook.",
    content: "Gold advanced for a third session as investor demand picked up ahead of the European Central Bank policy decision.\n\nWith growth data under pressure, the inflation-sensitive metal is benefiting from safe-haven inflows and lower real yields.\n\nKey takeaways:\n- Spot gold is trading near a one-month high.\n- Analysts say resistance around $2,250 remains key.\n\nA weaker euro and risk-off sentiment helped bullion outperform other safe assets.",
    tags: ["XAUUSD", "ECB", "safe haven", "bullion"],
    featured: true,
    trending: false,
  },
  {
    title: "Bitcoin Drops Below $63,000 After Miner Selling Pressures",
    slug: "bitcoin-drops-below-63000-after-miner-selling-pressures",
    category: "Crypto",
    author: "Leo Martinez",
    publishDate: "2026-06-22",
    summary: "Bitcoin fell as miners increased sell-side activity and macro traders shrugged off optimistic ETF inflows.",
    content: "Bitcoin moved lower on mounting selling pressure from miners who are taking profits after a strong rally.\n\nWhile ETF flows remain positive, the market is digesting the increased supply and the lack of fresh retail demand.\n\nObservations:\n- Miner outflows have spiked to multi-week highs.\n- Support sits at $62,200 before the next technical level near $60,000.\n\nAnalysts note that the narrative will remain fragile until volatility subsides.",
    tags: ["BTC", "miners", "ETF", "crypto market"],
    featured: false,
    trending: true,
  },
  {
    title: "S&P 500 Eyes New Record as Technology Sector Leads Gains",
    slug: "sp500-eyes-new-record-as-technology-sector-leads-gains",
    category: "Indices",
    author: "Mia Grant",
    publishDate: "2026-06-24",
    summary: "US equities pushed higher, with mega-cap tech names driving the S&P 500 toward another record close.",
    content: "The S&P 500 climbed to fresh highs amid optimism around earnings and resilient consumer spending.\n\nTechnology stocks led the advance, while defensive sectors lagged.\n\nMarket notes:\n- Investors are betting on AI-related revenue growth for major chipmakers.\n- Option implied volatility remains subdued.\n\nTraders will now look to the upcoming economic calendar for clues on rate expectations.",
    tags: ["S&P 500", "tech", "equities", "market breadth"],
    featured: true,
    trending: true,
  },
  {
    title: "Oil Prices Retreat as OPEC+ Supply Discipline Is Questioned",
    slug: "oil-prices-retreat-as-opec-plus-supply-discipline-is-questioned",
    category: "Commodities",
    author: "Jasper King",
    publishDate: "2026-06-23",
    summary: "Crude futures pulled back after analysts questioned whether OPEC+ would maintain voluntary supply cuts beyond summer.",
    content: "Oil sellers regained control after a brief rally, as traders questioned the sustainability of OPEC+ output discipline.\n\nThe market is watching whether Gulf producers will extend cuts or ease supply as demand growth falters.\n\nKey points:\n- WTI slipped below $85/bbl.\n- Analysts expect volatility around the next OPEC+ meeting.\n\nThose positioning for a summer rebound are now more cautious amid weaker refinery margins.",
    tags: ["WTI", "OPEC+", "supply", "crude"],
    featured: false,
    trending: false,
  },
];

const DEFAULT_PAGE_SIZE = 12;

function matchesCategory(article: NewsArticle, category?: NewsCategory | "All") {
  return !category || category === "All" || article.category === category;
}

function matchesSource(article: NewsArticle, source?: string) {
  if (!source) return true;
  return article.source?.toLowerCase().includes(source.toLowerCase());
}

function matchesQuery(article: NewsArticle, query?: string) {
  if (!query) return true;
  const normalizedQuery = query.toLowerCase().trim();
  return (
    article.title.toLowerCase().includes(normalizedQuery) ||
    article.summary.toLowerCase().includes(normalizedQuery) ||
    article.content.toLowerCase().includes(normalizedQuery) ||
    article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
    article.author.toLowerCase().includes(normalizedQuery)
  );
}

function getSources(articles: NewsArticle[]) {
  return Array.from(new Set(articles.map((article) => article.source))).sort();
}

async function fetchNewsArticles(): Promise<NewsArticle[]> {
  return fetchProviderData<NewsArticle[]>(
    NEWS_PROVIDER,
    fetchLiveNewsArticles,
    SAMPLE_NEWS_ARTICLES,
    (articles) => Array.isArray(articles) && articles.length > 0,
    "Live news fetch failed, falling back to seed news."
  );
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return await fetchNewsArticles();
}

export async function getNewsPage(options: NewsQueryOptions = {}): Promise<NewsPageResult> {
  const articles = await fetchNewsArticles();
  const filtered = articles.filter((article) => {
    return (
      matchesCategory(article, options.category) &&
      matchesSource(article, options.source) &&
      matchesQuery(article, options.query)
    );
  });

  const page = Math.max(options.page ?? 1, 1);
  const pageSize = Math.max(options.pageSize ?? DEFAULT_PAGE_SIZE, 1);
  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return {
    articles: pageItems,
    page,
    pageSize,
    total,
    totalPages,
    categories: NEWS_CATEGORIES,
    sources: getSources(articles),
  };
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  const articles = await fetchNewsArticles();
  return articles.find((article) => article.slug === slug);
}

export function getFeaturedNewsArticles(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.featured).slice(0, 2);
}

export function getTrendingNewsArticles(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.trending).slice(0, 4);
}

export function getFilteredNews(
  articles: NewsArticle[],
  category: NewsCategory | "All",
  query: string
): NewsArticle[] {
  const normalizedQuery = query.toLowerCase().trim();
  return articles.filter((article) => {
    const matchesCategory = category === "All" || article.category === category;
    const matchesText =
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.summary.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    return matchesCategory && (!normalizedQuery || matchesText);
  });
}

export function getRelatedNewsArticles(current: NewsArticle, articles: NewsArticle[], limit = 4): NewsArticle[] {
  return articles
    .filter((article) => article.slug !== current.slug)
    .map((article) => {
      const sameCategoryScore = article.category === current.category ? 3 : 0;
      const tagOverlap = article.tags.filter((tag) => current.tags.includes(tag)).length * 2;
      return {
        article,
        score: sameCategoryScore + tagOverlap,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}
