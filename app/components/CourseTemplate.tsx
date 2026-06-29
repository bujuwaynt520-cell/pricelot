import { Course } from "../lib/course-engine/courseTypes";
import ModuleCard from "./ModuleCard";

interface Props {
  course: Course;
}

export default function CourseTemplate({
  course,
}: Props) {

  return (

    <article className="max-w-5xl mx-auto">

      <h1 className="text-5xl font-black">

        {course.title}

      </h1>

      <p className="mt-6 text-xl text-zinc-600">

        {course.description}

      </p>

      <div className="grid gap-6 mt-12">

        {course.modules.map((module) => (

          <ModuleCard
            key={module.id}
            module={module}
          />

        ))}

      </div>

    </article>

  );

}