export interface StudentProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastLessonDate?: string;
}

const STORAGE_KEY = "pricelot-student-progress";

const XP_PER_LESSON = 25;

export function getStudentProgress(): StudentProgress {
  if (typeof window === "undefined") {
    return {
      completedLessons: [],
      xp: 0,
      streak: 0,
    };
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      completedLessons: [],
      xp: 0,
      streak: 0,
    };
  }

  return JSON.parse(saved);
}

export function saveStudentProgress(
  progress: StudentProgress
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );
}

export function markLessonComplete(
  lessonId: string
): StudentProgress {
  const progress = getStudentProgress();

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);

    progress.xp += XP_PER_LESSON;

    progress.lastLessonDate = new Date().toISOString();

    saveStudentProgress(progress);
  }

  return progress;
}