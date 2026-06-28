import { LessonContent } from "../lesson-engine/lessonTypes";

export const supportResistanceLesson: LessonContent = {
  id: "support-resistance",

  slug: "support-resistance",

  title: "Support and Resistance",

  shortDescription:
    "Learn how markets react at important price levels and how professional traders identify support and resistance zones.",

  metadata: {
    author: "PriceLot Editorial Team",

    category: "Forex",

    tags: ["support", "resistance", "market structure"],

    readingTime: 15,

    difficulty: "Beginner",

    lastUpdated: "2026-06-28",
  },

  objectives: [
    {
      id: "1",
      text: "Understand what support is.",
    },
    {
      id: "2",
      text: "Understand what resistance is.",
    },
    {
      id: "3",
      text: "Learn how to draw zones correctly.",
    },
  ],

  sections: [
    {
      id: "intro",

      title: "Introduction",

      type: "text",

      content:
        "Support and resistance are among the most important concepts in technical analysis. They represent areas where buyers and sellers repeatedly enter the market.",
    },

    {
      id: "support",

      title: "What is Support?",

      type: "text",

      content:
        "Support is a price level where buying pressure is strong enough to prevent price from falling further.",
    },

    {
      id: "resistance",

      title: "What is Resistance?",

      type: "text",

      content:
        "Resistance is a price level where selling pressure is strong enough to prevent price from rising further.",
    },
  ],

  quiz: [],

  downloads: {},

  relatedLessons: [],

  glossaryTerms: ["support", "resistance"],
};