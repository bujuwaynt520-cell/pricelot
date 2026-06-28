import { LessonContent } from "./lessonTypes";

export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function calculateLessonCompletion(
  totalSections: number,
  completedSections: number
): number {
  if (totalSections === 0) return 0;

  return Math.round((completedSections / totalSections) * 100);
}

export function lessonHasQuiz(lesson: LessonContent): boolean {
  return lesson.quiz.length > 0;
}

export function lessonHasDownloads(lesson: LessonContent): boolean {
  return !!lesson.downloads;
}

export function lessonHasNavigation(lesson: LessonContent): boolean {
  return !!lesson.navigation;
}

export function lessonHasRelatedLessons(lesson: LessonContent): boolean {
  return (lesson.relatedLessons?.length ?? 0) > 0;
}

export function lessonHasGlossaryLinks(lesson: LessonContent): boolean {
  return (lesson.glossaryTerms?.length ?? 0) > 0;
}