"use client";

import { useEffect, useState } from "react";
import XPCard from "./XPCard";

export default function AcademyDashboard() {

  const [completed, setCompleted] = useState(0);

  useEffect(() => {

    const stored = localStorage.getItem("pricelot-progress");

    if (!stored) {

      setCompleted(0);

      return;

    }

    const lessons: string[] = JSON.parse(stored);

    setCompleted(lessons.length);

  }, []);

  const totalLessons = 1000;

  const percentage = Math.round(
    (completed / totalLessons) * 100
  );

  return (

    <section className="rounded-3xl bg-zinc-900 text-white p-10 mb-12">

      <h1 className="text-4xl font-black mb-8">

        Welcome Back

      </h1>

      {/* XP Card */}

      <div className="mb-10">

        <XPCard />

      </div>

      {/* Dashboard Stats */}

      <div className="grid md:grid-cols-3 gap-8">

        <div>

          <h2 className="text-sm uppercase opacity-70">

            Lessons Completed

          </h2>

          <p className="text-5xl font-black mt-3">

            {completed}

          </p>

        </div>

        <div>

          <h2 className="text-sm uppercase opacity-70">

            Academy Progress

          </h2>

          <p className="text-5xl font-black mt-3">

            {percentage}%

          </p>

        </div>

        <div>

          <h2 className="text-sm uppercase opacity-70">

            Goal

          </h2>

          <p className="text-2xl font-bold mt-3">

            Become Consistently Profitable

          </p>

        </div>

      </div>

      {/* Progress Bar */}

      <div className="mt-10">

        <div className="h-5 rounded-full bg-zinc-700 overflow-hidden">

          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

    </section>

  );

}