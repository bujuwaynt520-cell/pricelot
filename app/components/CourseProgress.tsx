interface Props {
  completed: number;
  total: number;
}

export default function CourseProgress({
  completed,
  total,
}: Props) {

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <div>

      <div className="flex justify-between mb-3">

        <span>

          Progress

        </span>

        <span>

          {percentage}%

        </span>

      </div>

      <div className="h-4 rounded-full bg-zinc-200 overflow-hidden">

        <div
          className="h-full bg-orange-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>

  );

}