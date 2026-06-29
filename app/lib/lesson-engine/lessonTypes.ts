export type LessonDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type LessonSectionType =
  | "text"
  | "video"
  | "image"
  | "chart"
  | "exercise"
  | "quiz"
  | "warning"
  | "tip"
  | "example";

export interface LessonSection {
  id: string;
  title: string;
  type: LessonSectionType;
  content: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonObjectives {
  id: string;
  text: string;
}

export interface LessonMetadata {
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  difficulty: LessonDifficulty;
  lastUpdated: string;
}

export interface LessonNavigation {
  previousLesson?: string;
  nextLesson?: string;
}

export interface LessonDownload {
  pdf?: string;
  worksheet?: string;
}

export interface LessonMedia {

  id: string;

  type:
    | "image"
    | "video"
    | "youtube"
    | "pdf"
    | "worksheet"
    | "chart"
    | "tradingview";

  title: string;

  url: string;

  caption?: string;

}

export interface LessonContent {
  id: string;

  slug: string;

  title: string;

  shortDescription: string;

  metadata: LessonMetadata;

  objectives: LessonObjectives[];

  sections: LessonSection[];

  media?: LessonMedia[];

  quiz: LessonQuizQuestion[];

  downloads?: LessonDownload;

  navigation?: LessonNavigation;

  relatedLessons?: string[];

  faqs?: {

  question: string;

  answer: string;

}[];

takeaways?: string[];

commonMistakes?: string[];

prerequisites?: string[];

estimatedCompletionTime?: number;

  glossaryTerms?: string[];
}