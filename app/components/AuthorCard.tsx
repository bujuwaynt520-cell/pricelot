"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { AuthorMediaProfile } from "@/app/lib/services/authorMedia";

interface AuthorCardProps {
  author: AuthorMediaProfile;
  compact?: boolean;
  showStats?: boolean;
}

export function AuthorCard({
  author,
  compact = false,
  showStats = true,
}: AuthorCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={author.avatarThumbnail || author.avatar}
          alt={author.avatarAlt}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {author.name}
          </p>
          <p className="text-xs text-slate-400 truncate">{author.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
      <div className="flex items-start gap-6">
        <img
          src={author.avatar}
          alt={author.avatarAlt}
          className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white">{author.name}</h3>
          <p className="mt-1 text-orange-300 font-semibold">{author.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {author.bio}
          </p>

          {author.credentials && (
            <p className="mt-2 text-xs text-slate-400">{author.credentials}</p>
          )}

          {showStats && (
            <div className="mt-4 flex gap-6 text-sm">
              <div>
                <div className="font-semibold text-white">
                  {author.publishedCount}
                </div>
                <div className="text-slate-400">Articles Published</div>
              </div>
              <div>
                <div className="font-semibold text-white">
                  {author.followersCount?.toLocaleString()}
                </div>
                <div className="text-slate-400">Followers</div>
              </div>
            </div>
          )}

          {author.socialLinks && Object.values(author.socialLinks).some(Boolean) && (
            <div className="mt-4 flex gap-3">
              {author.socialLinks.twitter && (
                <Link
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  Twitter
                </Link>
              )}
              {author.socialLinks.linkedin && (
                <Link
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  LinkedIn
                </Link>
              )}
              {author.socialLinks.website && (
                <Link
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  Website
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface AuthorAvatarProps {
  author: AuthorMediaProfile;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  showTitle?: boolean;
}

export function AuthorAvatar({
  author,
  size = "md",
  showName = false,
  showTitle = false,
}: AuthorAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={author.avatar}
        alt={author.avatarAlt}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0`}
        loading="lazy"
      />
      {(showName || showTitle) && (
        <div className="min-w-0">
          {showName && (
            <p className="text-sm font-semibold text-white truncate">
              {author.name}
            </p>
          )}
          {showTitle && (
            <p className="text-xs text-slate-400 truncate">{author.title}</p>
          )}
        </div>
      )}
    </div>
  );
}
