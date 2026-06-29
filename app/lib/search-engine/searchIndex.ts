import { getAllLessons } from "../data/academyLessons";

import { addToSearch } from "./searchUtils";

export function buildSearchIndex() {

  const lessons = getAllLessons();

  lessons.forEach(lesson => {

    addToSearch({

      id: lesson.id,

      title: lesson.title,

      slug: lesson.slug,

      type: "lesson",

      category: lesson.metadata.category,

      description: lesson.shortDescription,

      tags: lesson.metadata.tags,

    });

  });

}