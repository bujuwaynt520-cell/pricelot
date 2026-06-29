"use client";

import { useEffect, useState } from "react";

interface Props {
  lessonId: string;
}

export default function LessonProgress({ lessonId }: Props) {

  const [completed, setCompleted] = useState(false);

  useEffect(() => {

    const stored = localStorage.getItem("pricelot-progress");

    if (!stored) return;

    const progress: string[] = JSON.parse(stored);

    setCompleted(progress.includes(lessonId));

  }, [lessonId]);

  function markComplete() {

    const stored = localStorage.getItem("pricelot-progress");

    let progress: string[] = stored ? JSON.parse(stored) : [];

    if (!progress.includes(lessonId)) {

      progress.push(lessonId);

      localStorage.setItem(
        "pricelot-progress",
        JSON.stringify(progress)
      );

    }

    setCompleted(true);

  }

  return (

    <section className="mt-16 rounded-2xl border p-8">

      <h2 className="text-2xl font-bold mb-4">

        Lesson Progress

      </h2>

      {completed ? (

        <div className="text-green-600 font-bold">

          ✅ Lesson Completed

        </div>

      ) : (

        <button

          onClick={markComplete}

          className="rounded-xl bg-orange-600 px-6 py-3 text-white font-bold"

        >

          Mark Lesson Complete

        </button>

      )}

    </section>

  );

}