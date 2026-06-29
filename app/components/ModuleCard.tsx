import { CourseModule } from "../lib/course-engine/courseTypes";

interface Props {
  module: CourseModule;
}

export default function ModuleCard({ module }: Props) {
  return (
    <div className="rounded-xl border border-zinc-200 p-6">

      <h3 className="text-xl font-bold">
        {module.title}
      </h3>

      <p className="mt-3 text-zinc-600">
        {module.description}
      </p>

      <div className="mt-5 text-sm text-orange-600 font-bold">
        {module.lessonIds.length} Lessons
      </div>

    </div>
  );
}