"use client";

import { useEffect } from "react";
import { LessonContent } from "../lib/lesson-engine/lessonTypes";
import { renderLesson } from "../lib/lesson-engine/lessonRenderer";
import LessonMedia from "./LessonMedia";
import LessonQuiz from "./LessonQuiz";
import LessonProgress from "./LessonProgress";
import BookmarkButton from "./BookmarkButton";
import CompleteLessonButton from "./CompleteLessonButton";
import { recordActivity } from "../lib/activityEngine";

interface Props {
  lesson: LessonContent;
}

export default function LessonTemplate({ lesson }: Props) {
  useEffect(() => {
    localStorage.setItem(
      "pricelot-current-lesson",
      JSON.stringify({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
      })
    );

    
    recordActivity({

      id: lesson.id,

      type: "Lesson",

      title: lesson.title,

      slug: `/academy/${lesson.slug}`,

      timestamp: Date.now(),

    });

  }, [lesson]);

  const rendered = renderLesson(lesson);

  return (
    <>
      <article className="max-w-5xl mx-auto">

        {/* Hero */}

        <header className="mb-12">

          <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-5">
            {rendered.hero.category}
          </div>

          <h1 className="text-5xl font-black mb-6">
            {rendered.hero.title}
          </h1>

          <p className="text-xl text-zinc-600 mb-8">
            {rendered.hero.description}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-zinc-500">

            <span>
              Difficulty: {rendered.hero.difficulty}
            </span>

            <span>
              Reading Time: {rendered.hero.readingTime} min
            </span>

            <span>
              Author: {rendered.hero.author}
            </span>

          </div>

          <div className="mt-8">
            <BookmarkButton
              id={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              type="lesson"
            />
          </div>

        </header>

        {/* Progress */}

        <section className="mb-16">
          <LessonProgress lessonId={lesson.id} />
        </section>

        {/* Learning Objectives */}

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

        {/* Prerequisites */}

        {rendered.prerequisites.length > 0 && (

          <section className="mb-16">

            <h2 className="text-3xl font-bold mb-6">
              Prerequisites
            </h2>

            <ul className="space-y-3">

              {rendered.prerequisites.map((item) => (

                <li
                  key={item}
                  className="flex gap-3"
                >

                  <span className="text-orange-600">
                    →
                  </span>

                  {item}

                </li>

              ))}

            </ul>

          </section>

        )}

        {/* Lesson Resources */}

        {rendered.media.length > 0 && (

          <section className="mb-16">

            <h2 className="text-3xl font-bold mb-8">
              Lesson Resources
            </h2>

            <div className="space-y-6">

              {rendered.media.map((media) => (

                <LessonMedia
                  key={media.id}
                  media={media}
                />

              ))}

            </div>

          </section>

        )}

        {/* Lesson Content */}

        <section className="space-y-12">

          {rendered.sections.map((section) => (

            <section key={section.id}>

              <h2 className="text-3xl font-bold mb-5">
                {section.title}
              </h2>

              <div className="text-lg leading-8 text-zinc-700 whitespace-pre-line">
                {section.content}
              </div>

            </section>

          ))}

        </section>

        {/* Quiz */}

        {rendered.quiz.length > 0 && (

          <section className="mt-20">

            <LessonQuiz
              questions={rendered.quiz}
            />

          </section>

        )}

        {/* Key Takeaways */}

        {rendered.takeaways.length > 0 && (

          <section className="mt-20">

            <h2 className="text-3xl font-bold mb-6">
              Key Takeaways
            </h2>

            <ul className="space-y-3">

              {rendered.takeaways.map((item) => (

                <li
                  key={item}
                  className="flex gap-3"
                >

                  <span className="text-green-600">
                    ✓
                  </span>

                  {item}

                </li>

              ))}

            </ul>

          </section>

        )}

        {/* Common Mistakes */}

        {rendered.commonMistakes.length > 0 && (

          <section className="mt-20">

            <h2 className="text-3xl font-bold mb-6">
              Common Mistakes
            </h2>

            <ul className="space-y-3">

              {rendered.commonMistakes.map((item) => (

                <li
                  key={item}
                  className="flex gap-3"
                >

                  <span className="text-red-600">
                    ⚠
                  </span>

                  {item}

                </li>

              ))}

            </ul>

          </section>

        )}

        {/* FAQs */}

        {rendered.faqs.length > 0 && (

          <section className="mt-20">

            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">

              {rendered.faqs.map((faq, index) => (

                <div key={index}>

                  <h3 className="text-xl font-semibold mb-2">
                    {faq.question}
                  </h3>

                  <p className="text-zinc-700 leading-8">
                    {faq.answer}
                  </p>

                </div>

              ))}

            </div>

          </section>

        )}

      </article>

      <CompleteLessonButton
        lessonId={lesson.id}
      />
    </>
  );
}