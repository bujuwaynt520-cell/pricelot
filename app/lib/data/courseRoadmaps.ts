export interface CourseLesson {

  id: string;

  title: string;

  slug: string;

}

export interface CourseRoadmap {

  id: string;

  title: string;

  lessons: CourseLesson[];

}

export const forexFoundation: CourseRoadmap = {

  id: "foundation",

  title: "Forex Foundations",

  lessons: [

    {

      id: "intro",

      title: "Introduction",

      slug: "introduction",

    },

    {

      id: "currency-pairs",

      title: "Currency Pairs",

      slug: "currency-pairs",

    },

    {

      id: "pips",

      title: "Pips",

      slug: "pips",

    },

    {

      id: "support-resistance",

      title: "Support & Resistance",

      slug: "support-resistance",

    },

    {

      id: "trend",

      title: "Trend Structure",

      slug: "trend-structure",

    },

    {

      id: "market-structure",

      title: "Market Structure",

      slug: "market-structure",

    }

  ]

};