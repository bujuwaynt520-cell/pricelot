"use client";

import { useState } from "react";

import { markLessonComplete } from "../lib/progressEngine";

interface Props {
  lessonId: string;
}

export default function CompleteLessonButton({
  lessonId,
}: Props) {

  const [completed, setCompleted] = useState(false);

  function finishLesson() {

    markLessonComplete(lessonId);

    setCompleted(true);

  }

  return (

    <button

      onClick={finishLesson}

      disabled={completed}

      className={`mt-16 rounded-xl px-8 py-4 font-bold transition ${
        completed
          ? "bg-green-600 text-white"
          : "bg-orange-500 hover:bg-orange-600 text-white"
      }`}

    >

      {completed
        ? "Lesson Completed ✓"
        : "Complete Lesson"}

    </button>

  );

}