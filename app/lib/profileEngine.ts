import { getStudentProgress } from "./progressEngine";
import { getAchievements } from "./achievementEngine";
import { getAllRecommendations } from "./recommendationEngine";
import { getBookmarks } from "./bookmarks";
import { getActivity } from "./activityEngine";

export interface StudentProfile {
  progress: ReturnType<typeof getStudentProgress>;
  achievements: ReturnType<typeof getAchievements>;
  bookmarks: ReturnType<typeof getBookmarks>;
  activity: ReturnType<typeof getActivity>;
  recommendations: ReturnType<typeof getAllRecommendations>;
}

export function getStudentProfile(): StudentProfile {
  return {
    progress: getStudentProgress(),
    achievements: getAchievements(),
    bookmarks: getBookmarks(),
    activity: getActivity(),
    recommendations: getAllRecommendations(),
  };
}