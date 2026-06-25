import type { PageImage } from "@/app/types";

interface FeaturedImageProps {
  image: PageImage;
  className?: string;
}

export default function FeaturedImage({ image, className = "" }: FeaturedImageProps) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-slate-800/10 bg-slate-950/5 shadow-sm ${className}`}>
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
}
