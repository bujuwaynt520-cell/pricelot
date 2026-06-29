import * as ProgressEngine from "./progressEngine";
import * as AchievementEngine from "./achievementEngine";
import * as RecommendationEngine from "./recommendationEngine";
import * as ActivityEngine from "./activityEngine";
import * as ProfileEngine from "./profileEngine";
import * as StudentEngine from "./studentEngine";
import * as LessonRegistry from "./lessonRegistry";
import * as ContentRegistry from "./contentRegistry";
import * as SearchEngine from "./searchEngine";
import * as SiteStats from "./siteStats";

export const Container = {
  progress: ProgressEngine,
  achievements: AchievementEngine,
  recommendations: RecommendationEngine,
  activity: ActivityEngine,
  profile: ProfileEngine,
  student: StudentEngine,
  lessons: LessonRegistry,
  content: ContentRegistry,
  search: SearchEngine,
  stats: SiteStats,
};