import Link from "next/link";
import { InternalLinkItem } from "@/app/lib/services/internalLinks";

interface RelatedContentSectionProps {
  items: InternalLinkItem[];
  title: string;
  accentClass?: string;
  callout?: string;
}

export function RelatedContentSection({
  items,
  title,
  accentClass = "text-orange-300",
  callout,
}: RelatedContentSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex flex-col gap-2">
        {callout && (
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-500">
            {callout}
          </p>
        )}
        <h2 className={`mb-6 text-2xl font-bold ${accentClass}`}>{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={item.url}
            className="group rounded-xl border border-slate-800/10 bg-slate-900/50 p-6 transition hover:border-slate-600 hover:bg-slate-800/60"
          >
            <div className={`mb-2 text-xs uppercase tracking-wide font-semibold ${accentClass}`}>
              {item.type} · {item.hub}
            </div>
            <h3 className="mb-3 text-lg font-bold text-white group-hover:text-current">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2">{item.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
