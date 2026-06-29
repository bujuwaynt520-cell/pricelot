import { getContentRegistry } from "./contentRegistry";
import { getSiteStats } from "./siteStats";
import { getStudentProfile } from "./profileEngine";

export function getGlobalRegistry() {
  return {
    content: getContentRegistry(),
    stats: getSiteStats(),
    profile: getStudentProfile(),
  };
}