export type Lesson = {
  id: string;
  title: string;
  slug: string;
  duration: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  estimatedHours: number;
  lessons: Lesson[];
};

export const academyCourses: Course[] = [
  {
    id: "forex-basics",
    title: "Forex Basics",
    slug: "forex-basics",
    description:
      "Master the complete foundation of Forex trading from absolute beginner level.",

    category: "Forex",

    level: "Beginner",

    estimatedHours: 18,

    lessons: [
      {
        id: "what-is-forex",
        title: "What is Forex?",
        slug: "what-is-forex",
        duration: "8 min",
      },

      {
        id: "currency-pairs",
        title: "Currency Pairs",
        slug: "currency-pairs",
        duration: "10 min",
      },

      {
        id: "what-is-a-pip",
        title: "What is a Pip?",
        slug: "what-is-a-pip",
        duration: "7 min",
      },

      {
        id: "lot-size",
        title: "Lot Size",
        slug: "lot-size",
        duration: "9 min",
      },

      {
        id: "leverage",
        title: "Leverage",
        slug: "leverage",
        duration: "12 min",
      },

      {
        id: "margin",
        title: "Margin",
        slug: "margin",
        duration: "10 min",
      },

      {
        id: "spread",
        title: "Spread",
        slug: "spread",
        duration: "8 min",
      },

      {
        id: "bid-ask",
        title: "Bid vs Ask",
        slug: "bid-vs-ask",
        duration: "9 min",
      },

      {
        id: "market-orders",
        title: "Market Orders",
        slug: "market-orders",
        duration: "11 min",
      },

      {
        id: "stop-loss",
        title: "Stop Loss",
        slug: "stop-loss",
        duration: "10 min",
      },
    ],
  },
];