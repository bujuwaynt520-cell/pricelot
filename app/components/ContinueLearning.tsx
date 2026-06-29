"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ContinueLesson {
  id: string;
  title: string;
  slug: string;
}

export default function ContinueLearning() {

  const [lesson, setLesson] = useState<ContinueLesson | null>(null);

  useEffect(() => {

    const stored = localStorage.getItem("pricelot-current-lesson");

    if (!stored) return;

    setLesson(JSON.parse(stored));

  }, []);

  if (!lesson) return null;

  return (

    <section className="rounded-3xl bg-orange-50 border border-orange-200 p-8">

      <div className="text-sm uppercase font-bold text-orange-700 mb-3">

        Continue Learning

      </div>

      <h2 className="text-3xl font-black mb-4">

        {lesson.title}

      </h2>

      <Link

        href={`/academy/${lesson.slug}`}

        className="inline-flex rounded-xl bg-orange-600 px-6 py-3 text-white font-bold"

      >

        Resume →

      </Link>

    </section>

  );

}