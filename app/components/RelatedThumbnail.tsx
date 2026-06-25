import Link from "next/link";
import type { PageImage } from "@/app/types";

interface RelatedThumbnailProps {
  url: string;
  title: string;
  thumbnail?: PageImage;
  category?: string;
}

export default function RelatedThumbnail({
  url,
  title,
  thumbnail,
  category,
}: RelatedThumbnailProps) {
  return (
    <Link href={url}>
      <div className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
        {/* Thumbnail Image */}
        <div className="relative overflow-hidden bg-zinc-100 h-32">
          {thumbnail ? (
            <img
              src={thumbnail.url}
              alt={thumbnail.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
              <span className="text-zinc-400 text-2xl">📄</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 space-y-1.5">
          {category && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase tracking-wider">
              {category}
            </span>
          )}
          <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2 group-hover:text-orange-600 transition">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
