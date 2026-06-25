"use client";

import { useState } from "react";
import type { ResponsiveImage } from "@/app/lib/services/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  loading = "lazy",
  className = "",
  priority = false,
  fallbackSrc,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      sizes={sizes}
      loading={loading}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

interface ResponsiveImageComponentProps extends ResponsiveImage {
  className?: string;
  containerClassName?: string;
  fallback?: string;
}

export function ResponsiveImageComponent({
  src,
  alt,
  sizes,
  loading = "lazy",
  priority = false,
  className = "",
  containerClassName = "w-full",
  fallback,
}: ResponsiveImageComponentProps) {
  return (
    <div className={containerClassName}>
      <OptimizedImage
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        className={`w-full h-auto ${className}`}
        priority={priority}
        fallbackSrc={fallback}
      />
    </div>
  );
}

interface ImageGalleryProps {
  images: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
  columns?: number;
  gap?: string;
}

export function ImageGallery({
  images,
  columns = 3,
  gap = "gap-4",
}: ImageGalleryProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} ${gap}`}>
      {images.map((image, idx) => (
        <div key={idx} className="rounded-2xl border border-slate-800/60 overflow-hidden">
          <OptimizedImage
            src={image.url}
            alt={image.alt}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
          {image.title && (
            <p className="p-3 bg-slate-950/40 text-sm font-semibold text-white">
              {image.title}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

interface AspectRatioImageProps extends OptimizedImageProps {
  ratio?: "square" | "video" | "3-2" | "16-9";
}

export function AspectRatioImage({
  ratio = "video",
  className = "",
  ...props
}: AspectRatioImageProps) {
  const ratioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    "3-2": "aspect-[3/2]",
    "16-9": "aspect-[16/9]",
  };

  return (
    <div className={`overflow-hidden rounded-lg ${ratioClasses[ratio]}`}>
      <OptimizedImage
        {...props}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}
