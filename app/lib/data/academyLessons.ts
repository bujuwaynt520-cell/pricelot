import { supportResistanceLesson } from "./supportResistanceLesson";

export const academyLessons = [
  supportResistanceLesson,
];

export function getLessonBySlug(slug: string) {
  return academyLessons.find(
    lesson => lesson.slug === slug
  );
}

export function getAllLessons() {
  return academyLessons;
}