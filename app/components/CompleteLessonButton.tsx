"use client";

interface Props {
  lessonId: string;
}

export default function CompleteLessonButton({
  lessonId,
}: Props) {
  return (
    <div className="mt-16 flex justify-center">
      <button
        className="rounded-xl bg-orange-500 px-8 py-4 text-white font-bold hover:bg-orange-600 transition"
        onClick={() => {
          console.log("Completed lesson:", lessonId);
        }}
      >
        Mark Lesson Complete
      </button>
    </div>
  );
}