"use client";

import Link from "next/link";
import { getRecommendations } from "../lib/recommendationEngine";

interface Props {
  currentId: string;
  tags: string[];
}

export default function RelatedRecommendations({
  currentId,
  tags,
}: Props) {
  const items = getRecommendations(tags, currentId);

  if (items.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-black mb-8">
        Continue Learning
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="border rounded-2xl p-6 hover:border-orange-500 transition"
          >
            <div className="text-xs uppercase text-orange-600 font-bold mb-2">
              {item.category}
            </div>

            <h3 className="font-bold text-xl">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}