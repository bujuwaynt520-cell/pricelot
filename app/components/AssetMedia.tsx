"use client";

import type { AssetMediaLibrary } from "@/app/lib/services/assetMedia";

interface AssetHeroImageProps {
  image: { url: string; alt: string; caption?: string };
  title?: string;
}

export function AssetHeroImage({ image, title }: AssetHeroImageProps) {
  return (
    <figure className="mb-8 rounded-3xl border border-slate-800/90 overflow-hidden bg-slate-900/80">
      <img
        src={image.url}
        alt={image.alt}
        loading="eager"
        className="w-full h-auto object-cover"
      />
      {(image.caption || title) && (
        <figcaption className="p-4 bg-slate-950/40 text-sm text-slate-300">
          {image.caption || title}
        </figcaption>
      )}
    </figure>
  );
}

interface AssetGalleryProps {
  images: AssetMediaLibrary["galleryImages"];
  title?: string;
}

export function AssetGallery({ images, title }: AssetGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {title || "Market Gallery"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, idx) => (
          <figure
            key={idx}
            className="rounded-2xl border border-slate-800/60 overflow-hidden"
          >
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              className="w-full h-56 object-cover"
            />
            <figcaption className="p-3 bg-slate-950/40 text-sm">
              <p className="text-white font-semibold">{image.caption}</p>
              {image.creditLine && (
                <p className="mt-1 text-xs text-slate-400">{image.creditLine}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

interface AssetChartDisplayProps {
  charts: {
    dailyChart: string;
    weeklyChart: string;
    monthlyChart: string;
  };
  symbol: string;
}

export function AssetChartDisplay({ charts, symbol }: AssetChartDisplayProps) {
  return (
    <div className="grid gap-6 mt-8 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
        <h3 className="text-sm font-semibold text-orange-300 mb-3">Daily Chart</h3>
        <img
          src={charts.dailyChart}
          alt={`${symbol} daily chart`}
          loading="lazy"
          className="w-full h-auto rounded"
        />
      </div>
      <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
        <h3 className="text-sm font-semibold text-orange-300 mb-3">
          Weekly Chart
        </h3>
        <img
          src={charts.weeklyChart}
          alt={`${symbol} weekly chart`}
          loading="lazy"
          className="w-full h-auto rounded"
        />
      </div>
      <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
        <h3 className="text-sm font-semibold text-orange-300 mb-3">
          Monthly Chart
        </h3>
        <img
          src={charts.monthlyChart}
          alt={`${symbol} monthly chart`}
          loading="lazy"
          className="w-full h-auto rounded"
        />
      </div>
    </div>
  );
}
