"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { academyLessons } from "../lib/data/academyLessons";

export default function AcademySearch() {

  const [query, setQuery] = useState("");

  const results = useMemo(() => {

    if (!query.trim()) return [];

    return academyLessons.filter((lesson) =>

      lesson.title
        .toLowerCase()
        .includes(query.toLowerCase())

    );

  }, [query]);

  return (

    <section className="rounded-3xl border border-zinc-200 bg-white p-8">

      <h2 className="text-2xl font-black mb-6">

        Search Academy

      </h2>

      <input

        value={query}

        onChange={(e) => setQuery(e.target.value)}

        placeholder="Search lessons..."

        className="w-full rounded-xl border border-zinc-300 px-5 py-4"

      />

      {results.length > 0 && (

        <div className="mt-8 space-y-3">

          {results.map((lesson) => (

            <Link

              key={lesson.id}

              href={`/academy/${lesson.slug}`}

              className="block rounded-xl border border-zinc-200 p-5 hover:border-orange-500"

            >

              <div className="font-bold">

                {lesson.title}

              </div>

              <div className="text-zinc-500 mt-2">

                {lesson.shortDescription}

              </div>

            </Link>

          ))}

        </div>

      )}

    </section>

  );

}