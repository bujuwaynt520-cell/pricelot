export interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  minDeposit: number;
  maxLeverage: string;
  spreadsFrom: string;
  regulatedBy: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  summary: string;
  depositMethods: string[];
  usClients: boolean;
  established: number;
  overallScore: {
    trust: number;
    fees: number;
    platforms: number;
    support: number;
  };
  commission: string;
  instruments: string[];
  reviewText: string;
  featuredImage?: string; // Hero image for broker detail page
  thumbnailImage?: string; // Logo/thumbnail for broker cards
  videoUrl?: string; // Optional broker walkthrough video
}

export interface Strategy {
  id: string;
  name: string;
  category: "Trend" | "Reversal" | "Scalping" | "Risk Management";
  timeframe: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  winRateEstimate: string;
  description: string;
  indicators: string[];
  rules: {
    buy: string[];
    sell: string[];
  };
  chartsData: {
    name: string;
    price: number;
    ma?: number;
    rsi?: number;
    signal?: "BUY" | "SELL" | null;
  }[];
  riskRewardRatio: string;
  proTips: string;
  featuredImage?: string; // Hero image for strategy detail page
  thumbnailImage?: string; // Thumbnail for strategy list/cards
  videoUrl?: string; // Optional video walkthrough
}

export interface AcademyLesson {
  id: string;
  title: string;
  category: "Beginners Guide" | "Technical Analysis" | "Risk Management" | "Trading Psychology" | "Pro Trading Guides" | "Forex Basics";
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  content: string[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  featuredImage?: string; // Hero image for lesson detail page
  thumbnailImage?: string; // Thumbnail for lesson list/cards
  videoUrl?: string; // Optional instructional video
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: "Forex" | "Crypto" | "Stock" | "Technical Analysis" | "Risk Management";
  letter: string;
  featuredImage?: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  label?: string;
  metadata?: Record<string | number, string | number | boolean>;
}

export type AccountContentType = "Article" | "Lesson" | "Strategy" | "BrokerReview";

export interface UserProfile {
  firstName: string;
  lastName: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  timezone?: string;
  favoriteMarkets?: string[];
  newsletterOptIn?: boolean;
  preferredAssets?: Array<"Forex" | "Gold" | "Crypto" | "Indices" | "Commodities">;
}

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  createdAt: string;
  emailVerified: boolean;
  profile: UserProfile;
  roles: string[];
  lastLoginAt?: string;
  preferences?: {
    darkMode?: boolean;
    locale?: string;
  };
}

export interface SavedContentBase {
  id: string;
  savedAt: string;
  title: string;
  summary: string;
  source: AccountContentType;
  url: string;
}

export interface SavedArticle extends SavedContentBase {
  source: "Article";
  articleSlug: string;
  category: string;
}

export interface SavedLesson extends SavedContentBase {
  source: "Lesson";
  lessonId: string;
  category: string;
}

export interface SavedStrategy extends SavedContentBase {
  source: "Strategy";
  strategyId: string;
  category: string;
}

export interface SavedBrokerReview extends SavedContentBase {
  source: "BrokerReview";
  brokerId: string;
  brokerName: string;
}

export type SavedContentItem = SavedArticle | SavedLesson | SavedStrategy | SavedBrokerReview;

export interface WatchlistItem {
  id: string;
  assetType: "Forex" | "Gold" | "Crypto" | "Indices" | "Commodities";
  symbol: string;
  displayName: string;
  addedAt: string;
  note?: string;
  alertPrice?: number;
  tags?: string[];
}

export interface UserProgress {
  id: string;
  userId: string;
  contentType: "Lesson" | "Strategy" | "Article";
  referenceId: string;
  title: string;
  category: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  progressPercentage: number;
  isComplete: boolean;
  lastViewedAt?: string;
}

export interface PageImage {
  url: string;
  alt: string;
}

export type MonetizationPlacement = "top-banner" | "sidebar" | "in-content" | "footer";

export interface AffiliateProgram {
  id: string;
  name: string;
  description: string;
  affiliateUrl: string;
  highlights: string;
}

export interface SponsoredContent {
  title: string;
  description: string;
  sponsorName: string;
  affiliateDisclosure?: string;
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  jsonLd: string;
}

// Economic Calendar Types
export interface EconomicEvent {
  id: string;
  title: string;
  currency: string;
  country?: string;
  datetimeUtc: string;
  datetimeLocal?: string;
  impact: "Low" | "Medium" | "High";
  actual?: string | number | null;
  forecast?: string | number | null;
  previous?: string | number | null;
  unit?: string;
  source: string;
  region?: string;
  notes?: string;
  slug: string;
  category?: string;
}

export type NewsCategory = "Forex" | "Gold" | "Crypto" | "Indices" | "Commodities";

export interface NewsArticle {
  title: string;
  slug: string;
  category: NewsCategory;
  author: string;
  publishDate: string;
  summary: string;
  content: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export interface CurrencyStrength {
  code: string;
  name: string;
  score: number;
  change: number;
}

export type MarketAssetType = "Forex" | "Gold" | "Crypto" | "Indices" | "Commodities";

export interface MarketQuote {
  symbol: string;
  displayName: string;
  assetType: MarketAssetType;
  lastPrice: number;
  changePercent: number;
  changeAbsolute: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  updatedAt: string;
}

export interface MarketDataResponse {
  quotes: MarketQuote[];
  lastUpdated: string;
}
