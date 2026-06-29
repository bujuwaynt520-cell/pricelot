import { LessonContent } from "./lessonTypes";

export interface RenderedLesson {

  hero: {

    title: string;

    description: string;

    difficulty: string;

    readingTime: number;

    category: string;

    author: string;

    lastUpdated: string;

  };

  objectives: string[];

  prerequisites: string[];

  estimatedCompletionTime?: number;

  media: LessonContent["media"];

  sections: LessonContent["sections"];

  quiz: LessonContent["quiz"];

  downloads?: LessonContent["downloads"];

  faqs?: LessonContent["faqs"];

  takeaways?: string[];

  commonMistakes?: string[];

  relatedLessons?: string[];

  navigation?: LessonContent["navigation"];

}

export function renderLesson(
  lesson: LessonContent
): RenderedLesson {

  return {

    hero: {

      title: lesson.title,

      description: lesson.shortDescription,

      difficulty: lesson.metadata.difficulty,

      readingTime: lesson.metadata.readingTime,

      category: lesson.metadata.category,

      author: lesson.metadata.author,

      lastUpdated: lesson.metadata.lastUpdated,

    },

    objectives: lesson.objectives.map(
      (o) => o.text
    ),

    prerequisites:
      lesson.prerequisites ?? [],

    estimatedCompletionTime:
      lesson.estimatedCompletionTime,

    media:
      lesson.media ?? [],

    sections:
      lesson.sections,

    quiz:
      lesson.quiz,

    downloads:
      lesson.downloads,

    faqs:
      lesson.faqs,

    takeaways:
      lesson.takeaways,

    commonMistakes:
      lesson.commonMistakes,

    relatedLessons:
      lesson.relatedLessons,

    navigation:
      lesson.navigation,

  };

}