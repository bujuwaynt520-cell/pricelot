import type { PageImage } from "@/app/types";
import FeaturedImage from "./FeaturedImage";
import VideoEmbed from "./VideoEmbed";

interface ContentMediaHeroProps {
  image?: PageImage;
  fallbackImage: PageImage;
  title: string;
  videoUrl?: string;
  className?: string;
}

export default function ContentMediaHero({
  image,
  fallbackImage,
  title,
  videoUrl,
  className = "",
}: ContentMediaHeroProps) {
  const heroImage = image?.url ? image : fallbackImage;

  return (
    <div className={`space-y-6 ${className}`}>
      <FeaturedImage image={heroImage} />
      {videoUrl && (
        <VideoEmbed
          url={videoUrl}
          title={`${title} video overview`}
          className="mt-6"
        />
      )}
    </div>
  );
}
