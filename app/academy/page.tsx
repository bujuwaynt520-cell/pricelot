import Link from "next/link";

import AcademyDashboard from "../components/AcademyDashboard";
import Achievements from "../components/Achievements";

import { getAllLessons } from "@/app/lib/data/academyLessons";

export default function AcademyPage() {

  const lessons = getAllLessons();

  return (

    <main className="max-w-6xl mx-auto py-12 px-6">

      {/* Student Dashboard */}

      <AcademyDashboard />

      {/* Achievement Cards */}

      <Achievements />

      {/* Academy Title */}

      <h1 className="text-5xl font-black mb-10">

        Academy

      </h1>

      {/* Lesson List */}

      <div className="grid gap-6">

        {lessons.map((lesson) => (

          <Link
            key={lesson.slug}
            href={`/academy/${lesson.slug}`}
            className="rounded-2xl border p-6 hover:border-orange-500 hover:shadow-lg transition"
          >

            <h2 className="text-2xl font-bold">

              {lesson.title}

            </h2>

            <p className="mt-3 text-zinc-600">

              {lesson.shortDescription}

            </p>

          </Link>

        ))}

      </div>

    </main>

  );

}