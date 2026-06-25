'use client';

import Link from "next/link";

interface AuthorAvatarProps {
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
  twitter?: string;
  linkedin?: string;
  href?: string;
  size?: "small" | "medium" | "large";
}

export default function AuthorAvatar({
  name,
  avatar,
  bio,
  role,
  twitter,
  linkedin,
  href,
  size = "medium",
}: AuthorAvatarProps) {
  const sizeClasses = {
    small: "w-10 h-10 text-lg",
    medium: "w-12 h-12 text-2xl",
    large: "w-16 h-16 text-4xl",
  };

  const content = (
    <div
      className={`flex items-start gap-3 ${href ? "group cursor-pointer" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`${sizeClasses[size]} flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-200 ${
          href ? "group-hover:border-orange-300 group-hover:shadow-md transition" : ""
        }`}
      >
        {avatar}
      </div>

      {/* Info */}
      {size !== "small" && (
        <div className="min-w-0 flex-1">
          <h4
            className={`font-semibold text-zinc-900 ${
              href ? "group-hover:text-orange-600 transition" : ""
            } ${size === "large" ? "text-lg" : "text-sm"}`}
          >
            {name}
          </h4>
          {role && (
            <p className={`text-zinc-600 ${size === "large" ? "text-sm" : "text-xs"}`}>
              {role}
            </p>
          )}
          {bio && size === "large" && (
            <p className="text-sm text-zinc-500 line-clamp-2 mt-1">{bio}</p>
          )}

          {/* Social Links */}
          {(twitter || linkedin) && size === "large" && (
            <div className="flex gap-2 mt-2">
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-600 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  Twitter
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-600 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
