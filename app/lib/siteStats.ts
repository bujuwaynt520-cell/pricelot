import { getContentCount } from "./contentRegistry";
import { getLessonCount } from "./lessonRegistry";

export function getSiteStats() {
  return {
    totalContent: getContentCount(),
    totalLessons: getLessonCount(),
  };
}