/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  minDeposit: number;
  maxLeverage: string;
  spreadsFrom: string; // e.g., "0.0 pips"
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
}

export interface Strategy {
  id: string;
  name: string;
  category: "Trend" | "Reversal" | "Scalping" | "Risk Management";
  timeframe: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  winRateEstimate: string; // e.g., "65-70%"
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
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: "Forex" | "Crypto" | "Stock" | "Technical Analysis" | "Risk Management";
  letter: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  label?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  jsonLd: string;
}
