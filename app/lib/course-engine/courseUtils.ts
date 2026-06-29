import { academyCourses } from "./courseData";

export function getAllCourses() {

  return academyCourses;

}

export function getCourse(slug: string) {

  return academyCourses.find(

    c => c.slug === slug

  );

}