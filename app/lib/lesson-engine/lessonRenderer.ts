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

  sections: LessonContent["sections"];
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

    objectives: lesson.objectives.map((o) => o.text),

    sections: lesson.sections,
  };
}