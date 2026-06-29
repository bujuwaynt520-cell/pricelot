import { Course } from "./courseTypes";

export const academyCourses: Course[] = [

  {

    id: "foundation",

    slug: "forex-foundation",

    title: "Forex Foundation",

    description:
      "Master the fundamentals before moving to advanced concepts.",

    category: "Forex",

    difficulty: "Beginner",

    estimatedHours: 12,

    certificate: true,

    prerequisites: [],

    modules: [

      {

        id: "market-basics",

        title: "Market Basics",

        description: "Understand how markets work.",

        lessonIds: [

          "support-resistance"

        ]

      }

    ]

  }

];