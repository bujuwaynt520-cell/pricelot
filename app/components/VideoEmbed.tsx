'use client';

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  url: string;
  title?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  className?: string;
}

function getVideoProvider(url: string): "youtube" | "vimeo" | "self-hosted" | null {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg"))
    return "self-hosted";
  return null;
}

function getEmbedUrl(url: string, provider: "youtube" | "vimeo"): string {
  if (provider === "youtube") {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }

  if (provider === "vimeo") {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return url;
}

export default function VideoEmbed({
  url,
  title = "Video",
  thumbnail,
  width = 560,
  height = 315,
  autoplay = false,
  className = "",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const provider = getVideoProvider(url);
  const aspectRatio = (height / width) * 100;

  if (!provider) {
    return (
      <div className={`rounded-xl border border-red-200 bg-red-50 p-4 ${className}`}>
        <p className="text-sm text-red-600">
          Invalid video URL. Supported: YouTube, Vimeo, or direct MP4/WebM links.
        </p>
      </div>
    );
  }

  if (provider === "self-hosted") {
    return (
      <video
        controls
        autoPlay={autoplay}
        className={`w-full h-auto rounded-xl border border-zinc-200 shadow-sm ${className}`}
        title={title}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className={`relative w-full rounded-xl overflow-hidden ${className}`}>
      {/* Aspect Ratio Container */}
      <div
        style={{
          paddingBottom: `${aspectRatio}%`,
        }}
        className="relative w-full bg-black"
      >
        {!isPlaying && thumbnail && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center group hover:bg-black/40 transition"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <Play className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition" />
          </button>
        )}

        {!isPlaying && !thumbnail && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/50 group hover:bg-black/60 transition"
            aria-label={`Play video: ${title}`}
          >
            <Play className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition" />
          </button>
        )}

        {isPlaying && (
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={getEmbedUrl(url, provider)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Title Overlay (optional) */}
      {title && !isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
        </div>
      )}
    </div>
  );
}
