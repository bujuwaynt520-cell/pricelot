/**
 * Image Optimization and Management
 * Handles responsive images, lazy loading, fallbacks, and optimization
 */

export interface ResponsiveImage {
  src: string;
  srcSet: string; // WebP and fallback srcset
  sizes: string; // Responsive image sizes
  alt: string;
  title?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  width?: number;
  height?: number;
}

export interface ImageFallback {
  primary: string;
  fallback: string;
  placeholder?: string;
}

export interface OptimizedImageConfig {
  url: string;
  alt: string;
  sizes: string;
  formats: ("webp" | "jpg" | "png")[];
  loading: "lazy" | "eager";
  priority: boolean;
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export function generateResponsiveImageSrcset(
  baseUrl: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return sizes
    .map((size) => `${baseUrl}?w=${size}&q=80 ${size}w`)
    .join(", ");
}

/**
 * Generate WebP fallback srcset
 */
export function generateWebPSrcset(
  baseUrl: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return sizes
    .map((size) => `${baseUrl}?w=${size}&q=80&fm=webp ${size}w`)
    .join(", ");
}

/**
 * Create a responsive image configuration
 */
export function createResponsiveImage(
  url: string,
  alt: string,
  options?: Partial<OptimizedImageConfig>
): ResponsiveImage {
  const config: OptimizedImageConfig = {
    url,
    alt,
    sizes: options?.sizes || "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
    formats: options?.formats || ["webp", "jpg"],
    loading: options?.loading || "lazy",
    priority: options?.priority || false,
  };

  return {
    src: config.url,
    srcSet: generateWebPSrcset(config.url),
    sizes: config.sizes,
    alt: config.alt,
    loading: config.loading as "lazy" | "eager",
    priority: config.priority,
  };
}

/**
 * Get optimized image with fallback
 */
export function getOptimizedImage(
  primary: string,
  fallback: string,
  alt: string,
  options?: Partial<OptimizedImageConfig>
): ResponsiveImage {
  try {
    return createResponsiveImage(primary, alt, options);
  } catch {
    return createResponsiveImage(fallback, alt, options);
  }
}

/**
 * Generate image URLs for different quality tiers
 */
export function generateImageQualityVariants(
  baseUrl: string
): {
  high: string;
  medium: string;
  low: string;
  thumbnail: string;
} {
  return {
    high: `${baseUrl}?q=90`,
    medium: `${baseUrl}?q=80`,
    low: `${baseUrl}?q=60`,
    thumbnail: `${baseUrl}?w=200&h=200&q=80`,
  };
}

/**
 * Create image placeholders for lazy loading
 */
export function generatePlaceholder(width: number, height: number): string {
  // Solid color placeholder
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect fill='%23e5e7eb' width='${width}' height='${height}'/%3E%3C/svg%3E`;
}

/**
 * Build OpenGraph image meta tag
 */
export function buildOpenGraphImage(
  imageUrl: string,
  width = 1200,
  height = 630
): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  return {
    url: imageUrl,
    width,
    height,
    alt: "Content preview image",
  };
}

/**
 * Build Twitter Card image
 */
export function buildTwitterCardImage(imageUrl: string): {
  card: string;
  image: string;
} {
  return {
    card: "summary_large_image",
    image: imageUrl,
  };
}

/**
 * Build image structured data
 */
export function buildImageStructuredData(
  imageUrl: string,
  name: string,
  description: string,
  creditLine?: string
): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      url: imageUrl,
      name,
      description,
      creditText: creditLine || "PriceLot",
      datePublished: new Date().toISOString(),
    },
    null,
    2
  );
}

/**
 * Image optimization presets
 */
export const IMAGE_PRESETS = {
  hero: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
    formats: ["webp", "jpg"] as const,
    loading: "eager" as const,
    priority: true,
  },
  thumbnail: {
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
    formats: ["webp", "jpg"] as const,
    loading: "lazy" as const,
    priority: false,
  },
  inline: {
    sizes: "(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw",
    formats: ["webp", "jpg"] as const,
    loading: "lazy" as const,
    priority: false,
  },
  avatar: {
    sizes: "64px",
    formats: ["webp", "jpg"] as const,
    loading: "eager" as const,
    priority: true,
  },
  gallery: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
    formats: ["webp", "jpg"] as const,
    loading: "lazy" as const,
    priority: false,
  },
};

/**
 * Get image preset configuration
 */
export function getImagePreset(
  presetName: keyof typeof IMAGE_PRESETS
): OptimizedImageConfig {
  const preset = IMAGE_PRESETS[presetName];
  return {
    url: "",
    alt: "",
    ...preset,
    formats: [...preset.formats],
  };
}
