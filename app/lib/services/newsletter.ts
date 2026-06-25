export interface NewsletterIssue {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  highlights: string[];
  url: string;
  tags: string[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  source?: string;
}

export interface NewsletterProvider {
  subscribe(email: string, name?: string, source?: string): Promise<NewsletterSubscriber>;
  getSubscribers(): Promise<NewsletterSubscriber[]>;
  getIssues(): Promise<NewsletterIssue[]>;
}

const LOCAL_STORAGE_KEY = "pricelot_newsletter_subscribers";

const sampleNewsletterIssues: NewsletterIssue[] = [
  {
    id: "issue-01-market-outlook",
    title: "Issue #1: Macro Outlook & FX Signals",
    description: "Weekly market themes, top currency setups, and data-driven risk controls for disciplined traders.",
    publishDate: "2026-06-18",
    highlights: [
      "EURUSD breakout scenario and central bank risk.",
      "Gold price action and safe-haven positioning.",
      "Three short-term momentum setups for crypto.",
    ],
    url: "/newsletter/issue-01-market-outlook",
    tags: ["macro", "forex", "gold", "crypto"],
  },
  {
    id: "issue-02-risk-first-strategy",
    title: "Issue #2: Risk-First Strategy Playbook",
    description: "A mechanical trade plan for managing position size, stop placement, and reward targets across liquid market themes.",
    publishDate: "2026-06-11",
    highlights: [
      "Position sizing rules for low-volatility conditions.",
      "Risk-reward guardrails for breakout trades.",
      "Newsletter-only watchlist for top pair candidates.",
    ],
    url: "/newsletter/issue-02-risk-first-strategy",
    tags: ["risk management", "strategy", "position sizing"],
  },
  {
    id: "issue-03-strategy-deep-dive",
    title: "Issue #3: Strategy Deep Dive & Trading Psychology",
    description: "A breakdown of systematic entries, exits, and mindset discipline for traders who want repeatable edge.",
    publishDate: "2026-06-04",
    highlights: [
      "How to avoid revenge trading after drawdown.",
      "A checklist for high-conviction setups.",
      "Editorial lessons from the latest commodities flows.",
    ],
    url: "/newsletter/issue-03-strategy-deep-dive",
    tags: ["trading psychology", "commodities", "strategy"],
  },
];

function loadLocalSubscribers(): NewsletterSubscriber[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NewsletterSubscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalSubscribers(subscribers: NewsletterSubscriber[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscribers));
}

export class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string, name?: string, source?: string): Promise<NewsletterSubscriber> {
    const existing = loadLocalSubscribers().find((subscriber) => subscriber.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return existing;
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      email,
      name,
      createdAt: new Date().toISOString(),
      source,
    };

    const subscribers = loadLocalSubscribers();
    saveLocalSubscribers([...subscribers, newSubscriber]);
    return newSubscriber;
  }

  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    return loadLocalSubscribers();
  }

  async getIssues(): Promise<NewsletterIssue[]> {
    return Promise.resolve(sampleNewsletterIssues);
  }
}

export const newsletterProvider = new LocalNewsletterProvider();

export function getSampleNewsletterIssues(): NewsletterIssue[] {
  return sampleNewsletterIssues;
}
