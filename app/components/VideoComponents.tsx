"use client";

import Link from "next/link";
import { Play, Clock } from "lucide-react";
import type { VideoAsset, VideoPlaylist } from "@/app/lib/services/videoLibrary";
import { formatVideoDuration } from "@/app/lib/services/videoLibrary";

interface VideoHeroProps {
  video: VideoAsset;
  autoPlay?: boolean;
}

export function VideoHero({ video, autoPlay = false }: VideoHeroProps) {
  return (
    <div className="mb-8 rounded-3xl border border-slate-800/90 overflow-hidden bg-slate-900/80">
      <div className="relative bg-black">
        <iframe
          width="100%"
          height="600"
          src={`${video.url}${autoPlay ? "?autoplay=1" : ""}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">{video.title}</h2>
        <p className="mt-2 text-slate-300">{video.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {video.difficulty && (
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-semibold">
              {video.difficulty}
            </span>
          )}
          <span className="inline-block px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatVideoDuration(video.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface VideoPlaylistProps {
  playlist: VideoPlaylist;
  currentVideoId?: string;
}

export function VideoPlaylist({
  playlist,
  currentVideoId,
}: VideoPlaylistProps) {
  if (!playlist.videos || playlist.videos.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{playlist.title}</h2>
        <p className="mt-2 text-slate-300">{playlist.description}</p>
        <p className="mt-2 text-sm text-slate-400">
          {playlist.videos.length} videos • {formatVideoDuration(playlist.totalDuration)}
        </p>
      </div>
      <div className="space-y-3">
        {playlist.videos.map((video, idx) => (
          <div
            key={video.id}
            className={`flex gap-4 p-4 rounded-xl border transition cursor-pointer ${
              currentVideoId === video.id
                ? "border-orange-400/60 bg-orange-400/5"
                : "border-slate-800/60 bg-slate-950/40 hover:border-slate-700/60"
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={video.thumbnailUrl}
                alt={video.thumbnailAlt}
                className="w-24 h-16 rounded object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">
                {idx + 1}. {video.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                {video.description}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {formatVideoDuration(video.duration)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RelatedVideosProps {
  videos: VideoAsset[];
  title?: string;
}

export function RelatedVideos({ videos, title = "Related Videos" }: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl border border-slate-800/60 bg-slate-950/40 overflow-hidden transition hover:border-orange-400/40"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition">
                <Play className="w-12 h-12 text-white fill-white opacity-80 group-hover:opacity-100 transition" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white group-hover:text-orange-300 transition line-clamp-2">
                {video.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                {formatVideoDuration(video.duration)}
              </p>
              {video.difficulty && (
                <p className="mt-2 text-xs text-orange-300">{video.difficulty}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface VideoCardProps {
  video: VideoAsset;
  clickable?: boolean;
  onClick?: () => void;
}

export function VideoCard({ video, clickable = false, onClick }: VideoCardProps) {
  const content = (
    <div className="group rounded-2xl border border-slate-800/60 bg-slate-950/40 overflow-hidden transition hover:border-orange-400/40">
      <div className="relative aspect-video bg-black overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition">
          <Play className="w-12 h-12 text-white fill-white opacity-80 group-hover:opacity-100 transition" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-orange-300 transition line-clamp-2">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-slate-400 line-clamp-2">
          {video.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {formatVideoDuration(video.duration)}
          </div>
          {video.difficulty && (
            <span className="text-xs text-orange-300">{video.difficulty}</span>
          )}
        </div>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}
