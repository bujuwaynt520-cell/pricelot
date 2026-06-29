import Link from "next/link";
import { Course } from "../lib/course-engine/courseTypes";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/academy/course/${course.slug}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-6 hover:border-orange-500 hover:shadow-lg transition"
    >
      <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase text-orange-700">
        {course.category}
      </span>

      <h2 className="text-2xl font-black mt-4">
        {course.title}
      </h2>

      <p className="mt-4 text-zinc-600">
        {course.description}
      </p>

      <div className="flex gap-6 mt-6 text-sm text-zinc-500">

        <span>
          {course.difficulty}
        </span>

        <span>
          {course.estimatedHours} hrs
        </span>

        <span>
          {course.modules.length} Modules
        </span>

      </div>
    </Link>
  );
}