/**
 * Video Library Management
 * Handles videos, playlists, and video-related content
 */

export interface VideoAsset {
  id: string;
  title: string;
  description: string;
  url: string;
  youtubeId?: string; // YouTube video ID
  duration: number; // in seconds
  thumbnailUrl: string;
  thumbnailAlt: string;
  publishedAt: string;
  category: string;
  tags: string[];
  instructor?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  transcript?: string;
}

export interface VideoPlaylist {
  id: string;
  title: string;
  description: string;
  category: string;
  videos: VideoAsset[];
  thumbnailUrl?: string;
  totalDuration: number; // in seconds
}

const VIDEO_LIBRARY: Record<string, VideoAsset> = {
  "forex-101": {
    id: "forex-101",
    title: "Forex Trading 101: Complete Beginner's Guide",
    description: "Learn the fundamentals of forex trading including currency pairs, leverage, and basic order execution.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    duration: 1247,
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Forex+101",
    thumbnailAlt: "Forex Trading 101 video thumbnail",
    publishedAt: "2024-01-15T00:00:00Z",
    category: "Beginners Guide",
    tags: ["forex", "basics", "tutorial"],
    instructor: "jane-doe",
    difficulty: "Beginner",
    transcript: "In this video we cover the basics of forex trading...",
  },
  "risk-management-mastery": {
    id: "risk-management-mastery",
    title: "Risk Management Mastery: Protecting Your Capital",
    description: "Deep dive into position sizing, stop-loss placement, and portfolio risk allocation strategies.",
    url: "https://www.youtube.com/embed/a1b2c3d4e5f",
    youtubeId: "a1b2c3d4e5f",
    duration: 2145,
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Risk+Management",
    thumbnailAlt: "Risk management video thumbnail",
    publishedAt: "2024-02-20T00:00:00Z",
    category: "Risk Management",
    tags: ["risk management", "position sizing", "capital preservation"],
    instructor: "john-smith",
    difficulty: "Intermediate",
    transcript: "Risk management is the cornerstone of successful trading...",
  },
  "technical-analysis-live": {
    id: "technical-analysis-live",
    title: "Live Technical Analysis: Reading the Market",
    description: "Real-time chart analysis and technical indicator interpretation for active traders.",
    url: "https://www.youtube.com/embed/xyz789abc123",
    youtubeId: "xyz789abc123",
    duration: 1843,
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Technical+Analysis",
    thumbnailAlt: "Technical analysis video thumbnail",
    publishedAt: "2024-03-10T00:00:00Z",
    category: "Technical Analysis",
    tags: ["technical analysis", "chart patterns", "indicators"],
    instructor: "jane-doe",
    difficulty: "Intermediate",
  },
  "crypto-market-insights": {
    id: "crypto-market-insights",
    title: "Cryptocurrency Market Insights 2024",
    description: "Analysis of bitcoin, ethereum, and emerging altcoins in the crypto market.",
    url: "https://www.youtube.com/embed/crypto2024abc",
    youtubeId: "crypto2024abc",
    duration: 1620,
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Crypto+Insights",
    thumbnailAlt: "Cryptocurrency market insights video thumbnail",
    publishedAt: "2024-02-28T00:00:00Z",
    category: "Crypto",
    tags: ["bitcoin", "ethereum", "cryptocurrency", "blockchain"],
    difficulty: "Intermediate",
  },
};

const VIDEO_PLAYLISTS: Record<string, VideoPlaylist> = {
  "beginner-forex": {
    id: "beginner-forex",
    title: "Beginner Forex Trading Series",
    description: "Complete series for those starting their forex trading journey",
    category: "Forex",
    videos: [VIDEO_LIBRARY["forex-101"]],
    totalDuration: 1247,
  },
  "risk-management-series": {
    id: "risk-management-series",
    title: "Risk Management Mastery Series",
    description: "Advanced risk management techniques for professional traders",
    category: "Risk Management",
    videos: [VIDEO_LIBRARY["risk-management-mastery"]],
    totalDuration: 2145,
  },
  "technical-analysis-training": {
    id: "technical-analysis-training",
    title: "Technical Analysis Training Program",
    description: "Complete technical analysis education from basics to advanced",
    category: "Technical Analysis",
    videos: [VIDEO_LIBRARY["technical-analysis-live"]],
    totalDuration: 1843,
  },
};

export function getVideoAsset(videoId: string): VideoAsset | undefined {
  return VIDEO_LIBRARY[videoId];
}

export function getVideoPlaylist(playlistId: string): VideoPlaylist | undefined {
  return VIDEO_PLAYLISTS[playlistId];
}

export function getVideosByCategory(category: string): VideoAsset[] {
  return Object.values(VIDEO_LIBRARY).filter((video) =>
    video.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getVideosByInstructor(instructorId: string): VideoAsset[] {
  return Object.values(VIDEO_LIBRARY).filter(
    (video) => video.instructor === instructorId
  );
}

export function getRelatedVideos(
  videoId: string,
  limit = 3
): VideoAsset[] {
  const currentVideo = VIDEO_LIBRARY[videoId];
  if (!currentVideo) return [];

  return Object.values(VIDEO_LIBRARY)
    .filter((video) => video.id !== videoId)
    .filter((video) => {
      const tagOverlap = video.tags.filter((tag) =>
        currentVideo.tags.includes(tag)
      ).length;
      return tagOverlap > 0 || video.category === currentVideo.category;
    })
    .slice(0, limit);
}

export function buildVideoStructuredData(
  video: VideoAsset,
  pageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.publishedAt,
      duration: `PT${Math.floor(video.duration / 60)}M${video.duration % 60}S`,
      contentUrl: video.url,
      embedUrl: video.url,
    },
    null,
    2
  );
}

export function buildVideoPlaylistStructuredData(
  playlist: VideoPlaylist,
  pageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: playlist.title,
      description: playlist.description,
      uploadDate: new Date().toISOString(),
      duration: `PT${Math.floor(playlist.totalDuration / 60)}M${
        playlist.totalDuration % 60
      }S`,
      hasPart: playlist.videos.map((video, index) => ({
        "@type": "Clip",
        name: video.title,
        startOffset: 0,
        url: `${pageUrl}#clip-${index}`,
      })),
    },
    null,
    2
  );
}

export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${secs}s`;
}
