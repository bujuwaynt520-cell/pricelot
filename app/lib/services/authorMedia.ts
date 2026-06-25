/**
 * Author Media Management
 * Handles author avatars, images, and biographical media
 */

export interface AuthorMediaProfile {
  authorId: string;
  name: string;
  title: string;
  avatar: string; // Profile picture URL
  avatarAlt: string; // Alt text for avatar
  avatarThumbnail?: string; // Small thumbnail version
  bio: string; // Short biography
  bioImage?: string; // Hero image for author profile
  bioImageAlt?: string;
  credentials?: string; // Credentials/certifications
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  publishedCount?: number;
  followersCount?: number;
}

export interface AuthorMediaLibrary {
  [authorId: string]: AuthorMediaProfile;
}

const AUTHOR_MEDIA_LIBRARY: AuthorMediaLibrary = {
  "jane-doe": {
    authorId: "jane-doe",
    name: "Jane Doe, CFA",
    title: "Senior Quantitative Analyst",
    avatar: "https://via.placeholder.com/96?text=JD",
    avatarAlt: "Jane Doe, CFA - Senior Quantitative Analyst",
    avatarThumbnail: "https://via.placeholder.com/48?text=JD",
    bio: "Jane has 12+ years of experience trading currency derivatives and designing programmatic hedging strategies.",
    bioImage: "https://via.placeholder.com/1200x400?text=Jane+Doe",
    bioImageAlt: "Jane Doe working in a professional trading environment",
    credentials: "CFA Level III, MBA from Stanford",
    socialLinks: {
      twitter: "https://twitter.com/janedoe_cfa",
      linkedin: "https://linkedin.com/in/janedoe-cfa",
    },
    publishedCount: 47,
    followersCount: 3200,
  },
  "john-smith": {
    authorId: "john-smith",
    name: "John Smith",
    title: "Director of Systematic Trading Systems",
    avatar: "https://via.placeholder.com/96?text=JS",
    avatarAlt: "John Smith - Director of Systematic Trading Systems",
    avatarThumbnail: "https://via.placeholder.com/48?text=JS",
    bio: "Ex-FX spot trader at a Tier-1 investment bank specializing in low-latency execution.",
    bioImage: "https://via.placeholder.com/1200x400?text=John+Smith",
    bioImageAlt: "John Smith analyzing market data on multiple monitors",
    credentials: "20+ years trading experience, Former JP Morgan",
    socialLinks: {
      twitter: "https://twitter.com/johnsmith_fx",
      linkedin: "https://linkedin.com/in/johnsmith-systematic",
    },
    publishedCount: 63,
    followersCount: 4100,
  },
  "editorial-board": {
    authorId: "editorial-board",
    name: "PriceLot Editorial Board",
    title: "Independent Audit Committee",
    avatar: "https://via.placeholder.com/96?text=EB",
    avatarAlt: "PriceLot Editorial Board",
    avatarThumbnail: "https://via.placeholder.com/48?text=EB",
    bio: "Industry veterans committed to strict objectivity and regulatory transparency.",
    bioImage: "https://via.placeholder.com/1200x400?text=Editorial+Board",
    bioImageAlt: "PriceLot editorial team in office environment",
    credentials: "Industry experts with 200+ combined years experience",
    publishedCount: 156,
    followersCount: 12000,
  },
};

export function getAuthorMediaProfile(
  authorId: string
): AuthorMediaProfile | undefined {
  return AUTHOR_MEDIA_LIBRARY[authorId];
}

export function getAllAuthorMediaProfiles(): AuthorMediaProfile[] {
  return Object.values(AUTHOR_MEDIA_LIBRARY);
}

export function getAuthorAvatar(authorId: string): {
  url: string;
  alt: string;
  thumbnail?: string;
} | null {
  const author = AUTHOR_MEDIA_LIBRARY[authorId];
  if (!author) return null;
  return {
    url: author.avatar,
    alt: author.avatarAlt,
    thumbnail: author.avatarThumbnail,
  };
}

export function buildAuthorStructuredData(
  author: AuthorMediaProfile,
  authorPageUrl: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      image: author.avatar,
      url: authorPageUrl,
      description: author.bio,
      sameAs: Object.entries(author.socialLinks || {})
        .map(([, url]) => url)
        .filter(Boolean),
    },
    null,
    2
  );
}
