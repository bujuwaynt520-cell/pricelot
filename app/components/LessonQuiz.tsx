"use client";

import { useState } from "react";

interface Question {

  id: string;

  question: string;

  options: string[];

  correctAnswer: number;

  explanation: string;

}

interface Props {

  questions: Question[];

}

export default function LessonQuiz({
  questions,
}: Props) {

  const [answers, setAnswers] = useState<Record<string, number>>({});

  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((total, question) => {

    if (answers[question.id] === question.correctAnswer) {

      return total + 1;

    }

    return total;

  }, 0);

  return (

    <section className="mt-20 rounded-2xl border p-8">

      <h2 className="text-3xl font-bold mb-8">

        Lesson Quiz

      </h2>

      {questions.map((question) => (

        <div
          key={question.id}
          className="mb-10"
        >

          <h3 className="font-semibold mb-4">

            {question.question}

          </h3>

          <div className="space-y-3">

            {question.options.map((option, index) => (

              <label
                key={index}
                className="flex gap-3 cursor-pointer"
              >

                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === index}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [question.id]: index,
                    })
                  }
                />

                {option}

              </label>

            ))}

          </div>

          {submitted && (

            <div className="mt-3 text-sm text-zinc-600">

              {question.explanation}

            </div>

          )}

        </div>

      ))}

      {!submitted ? (

        <button

          onClick={() => setSubmitted(true)}

          className="rounded-xl bg-orange-600 px-6 py-3 text-white font-bold"

        >

          Submit Quiz

        </button>

      ) : (

        <div className="mt-8">

          <div className="text-2xl font-bold">

            Score:

            {" "}

            {score}

            /

            {questions.length}

          </div>

        </div>

      )}

    </section>

  );

}