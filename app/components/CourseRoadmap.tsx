"use client";

import Link from "next/link";
import { forexFoundation } from "../lib/data/courseRoadmaps";

export default function CourseRoadmap() {

  return (

    <section className="rounded-3xl border border-zinc-200 bg-white p-8">

      <h2 className="text-3xl font-black mb-8">

        Forex Foundations Roadmap

      </h2>

      <div className="space-y-4">

        {forexFoundation.lessons.map((lesson, index) => (

          <Link

            key={lesson.id}

            href={`/academy/${lesson.slug}`}

            className="flex items-center justify-between rounded-2xl border border-zinc-200 p-5 hover:border-orange-500 hover:bg-orange-50 transition"

          >

            <div className="flex items-center gap-5">

              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center">

                {index + 1}

              </div>

              <span className="font-semibold">

                {lesson.title}

              </span>

            </div>

            <span className="text-orange-600 font-bold">

              →

            </span>

          </Link>

        ))}

      </div>

    </section>

  );

}