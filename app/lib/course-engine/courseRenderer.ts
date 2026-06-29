import { Course } from "./courseTypes";

export function renderCourse(

  course: Course

) {

  return {

    ...course,

    moduleCount: course.modules.length,

    lessonCount: course.modules.reduce(

      (total, module) =>

        total + module.lessonIds.length,

      0

    )

  };

}