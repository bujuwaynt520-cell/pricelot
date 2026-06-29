import { getAllLessons } from "./data/academyLessons";

export function getLessonBySlug(slug: string) {
  return getAllLessons().find(
    lesson => lesson.slug === slug
  );
}

export function getLessonById(id: string) {
  return getAllLessons().find(
    lesson => lesson.id === id
  );
}

export function getLessonCount() {
  return getAllLessons().length;
}

export function getLessons() {
  return getAllLessons();
}