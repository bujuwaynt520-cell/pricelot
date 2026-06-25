import type { Metadata } from "next";
import type { PageImage } from "../types";

interface BuildMetadataParams {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  openGraphImage?: string | PageImage;
  twitterImage?: string | PageImage;
  type?: "website" | "article" | "profile";
}

function normalizeOpenGraphImage(image: string | PageImage) {
  return typeof image === "string" ? { url: image } : image;
}

export function buildPageMetadata({
  title,
  description,
  canonical,
  keywords,
  openGraphImage,
  twitterImage,
  type = "website",
}: BuildMetadataParams): Metadata {
  const ogImage = openGraphImage ? normalizeOpenGraphImage(openGraphImage) : undefined;
  const twitterImageUrl = twitterImage ? normalizeOpenGraphImage(twitterImage).url : ogImage?.url;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: twitterImageUrl
      ? {
          card: "summary_large_image",
          title,
          description,
          images: [twitterImageUrl],
        }
      : undefined,
  };
}

export function buildCollectionJsonLd(options: {
  name: string;
  description: string;
  url: string;
  itemList: { position: number; name: string; url: string }[];
}): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: options.name,
      description: options.description,
      url: options.url,
      itemListElement: options.itemList.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: item.name,
        url: item.url,
      })),
    },
    null,
    2
  );
}
