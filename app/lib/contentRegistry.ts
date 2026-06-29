import { getLessons } from "./lessonRegistry";

export interface RegistryItem {
  id: string;
  slug: string;
  title: string;
  type: string;
}

export function getContentRegistry(): RegistryItem[] {
  return [
    ...getLessons().map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      type: "lesson",
    })),
  ];
}

export function findContent(slug: string) {
  return getContentRegistry().find(
    (item) => item.slug === slug
  );
}

export function getContentCount() {
  return getContentRegistry().length;
}