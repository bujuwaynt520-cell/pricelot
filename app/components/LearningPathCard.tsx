import Link from "next/link";
import { LearningPath } from "../lib/path-engine/pathTypes";

interface Props {
  path: LearningPath;
}

export default function LearningPathCard({

  path,

}: Props) {

  return (

    <Link

      href={`/academy/path/${path.slug}`}

      className="block rounded-2xl border p-6 hover:border-orange-500 transition"

    >

      <h2 className="text-2xl font-black">

        {path.title}

      </h2>

      <p className="mt-3 text-zinc-600">

        {path.description}

      </p>

      <div className="mt-6 font-bold text-orange-600">

        {path.steps.length} Courses

      </div>

    </Link>

  );

}