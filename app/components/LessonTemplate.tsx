import { LessonContent } from "../lib/lesson-engine/lessonTypes";
import { renderLesson } from "../lib/lesson-engine/lessonRenderer";

interface Props {
  lesson: LessonContent;
}

export default function LessonTemplate({ lesson }: Props) {
  const rendered = renderLesson(lesson);

  return (
    <article className="max-w-5xl mx-auto">

      <header className="mb-12">

        <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-5">
          {rendered.hero.category}
        </div>

        <h1 className="text-5xl font-black mb-6">
          {rendered.hero.title}
        </h1>

        <p className="text-xl text-zinc-600">
          {rendered.hero.description}
        </p>

        <div className="flex flex-wrap gap-6 mt-8 text-sm text-zinc-500">

          <span>
            Difficulty:
            {" "}
            {rendered.hero.difficulty}
          </span>

          <span>
            Reading Time:
            {" "}
            {rendered.hero.readingTime}
            {" "}
            min
          </span>

          <span>
            Author:
            {" "}
            {rendered.hero.author}
          </span>

        </div>

      </header>

      <section className="mb-16">

        <h2 className="text-3xl font-bold mb-6">

          Learning Objectives

        </h2>

        <ul className="space-y-3">

          {rendered.objectives.map((objective) => (

            <li
              key={objective}
              className="flex gap-3"
            >

              <span className="text-green-600">
                ✓
              </span>

              {objective}

            </li>

          ))}

        </ul>

      </section>

      <section className="space-y-12">

        {rendered.sections.map((section) => (

          <section
            key={section.id}
          >

            <h2 className="text-3xl font-bold mb-5">

              {section.title}

            </h2>

            <div className="text-lg leading-8 text-zinc-700">

              {section.content}

            </div>

          </section>

        ))}

      </section>

    </article>
  );
}