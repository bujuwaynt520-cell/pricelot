import {
  markLessonComplete,
  getStudentProgress,
} from "./progressEngine";

import { getAchievements } from "./achievementEngine";

import { recordActivity } from "./activityEngine";

import { getAllRecommendations } from "./recommendationEngine";

export function completeStudentLesson(
  lessonId: string,
  lessonTitle: string,
  lessonSlug: string
) {
  const progress = markLessonComplete(lessonId);

  recordActivity({
    id: lessonId,
    type: "Lesson",
    title: lessonTitle,
    slug: `/academy/${lessonSlug}`,
    timestamp: Date.now(),
  });

  return {
    progress,
    achievements: getAchievements(),
    recommendations: getAllRecommendations(),
  };
}

export function getStudentProfile() {
  return {
    progress: getStudentProgress(),
    achievements: getAchievements(),
    recommendations: getAllRecommendations(),
  };
}