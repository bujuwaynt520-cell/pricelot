export interface LessonProgress {
  lessonId: string;

  completedSections: string[];

  completedQuiz: boolean;

  score: number;

  completed: boolean;

  lastVisited: string;
}

const STORAGE_KEY = "pricelot_lesson_progress";

export function getAllProgress(): LessonProgress[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getLessonProgress(
  lessonId: string
): LessonProgress | undefined {
  return getAllProgress().find((p) => p.lessonId === lessonId);
}

export function saveLessonProgress(progress: LessonProgress) {
  if (typeof window === "undefined") return;

  const existing = getAllProgress().filter(
    (p) => p.lessonId !== progress.lessonId
  );

  existing.push(progress);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function clearLessonProgress() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}

export function getCompletedLessonCount(): number {
  return getAllProgress().filter((p) => p.completed).length;
}

export function getAverageQuizScore(): number {
  const all = getAllProgress();

  if (all.length === 0) return 0;

  const total = all.reduce((sum, p) => sum + p.score, 0);

  return Math.round(total / all.length);
}