"use client";

import { useEffect, useState } from "react";

import {

  Achievement,

  getAchievements,

} from "../lib/achievementEngine";

export default function Achievements() {

  const [items, setItems] =

    useState<Achievement[]>([]);

  useEffect(() => {

    setItems(getAchievements());

  }, []);

  return (

    <section className="mt-16">

      <h2 className="text-3xl font-black mb-8">

        Achievements

      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map((item) => (

          <div

            key={item.id}

            className={`rounded-2xl border p-6 ${
              item.unlocked
                ? "border-orange-500 bg-orange-50"
                : "border-zinc-200 bg-white"
            }`}
          >

            <div className="text-3xl mb-4">

              {item.unlocked ? "🏆" : "🔒"}

            </div>

            <h3 className="font-bold text-xl">

              {item.title}

            </h3>

            <p className="text-zinc-600 mt-3">

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}