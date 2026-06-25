import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, TrendingUp, BarChart4, ArrowUpRight, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { buildCollectionJsonLd } from "@/app/lib/seo";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import { AssetHeroImage, AssetGallery, AssetChartDisplay } from "@/app/components/AssetMedia";
import {
  getMarketAssetPageParams,
  getMarketAssetProfile,
} from "@/app/lib/services/assetEngine";

interface PageProps {
  params: {
    category: string;
    asset: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profile = await getMarketAssetProfile(params);

  if (!profile) {
    return {
      title: "Market Asset Not Found | PriceLot",
      description: "The requested market asset profile could not be found.",
    };
  }

  return profile.metadata;
}

export async function generateStaticParams() {
  return getMarketAssetPageParams();
}

export default async function MarketAssetProfilePage({ params }: PageProps) {
  const profile = await getMarketAssetProfile(params);
  if (!profile) {
    notFound();
  }

  const { 
    quote, 
    categoryAssets, 
    profileUrl, 
    categoryPath, 
    relatedItems, 
    breadcrumbs, 
    faqItems, 
    faqJsonLd, 
    breadcrumbsJsonLd,
    heroImage,
    chartImages,
    mediaLibrary,
  } = profile;
  const changeClass = quote.changePercent >= 0 ? "text-emerald-400" : "text-rose-400";
  const changeSign = quote.changePercent >= 0 ? "+" : "";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCollectionJsonLd({
            name: `${quote.displayName} Market Profile`,
            description: `Detail page for ${quote.displayName} and active market conditions.`,
            url: `https://pricelot.com${profileUrl}`,
            itemList: [
              {
                position: 1,
                name: `${quote.displayName} (${quote.symbol})`,
                url: `https://pricelot.com${profileUrl}`,
              },
            ],
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={categoryPath}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300 transition hover:text-orange-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {quote.assetType} markets
            </Link>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-500">Market profile</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {quote.displayName}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Live quote data, market context, and related trading resources for {quote.displayName}.
            </p>
            <nav id="asset-breadcrumbs" className="mt-6 text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
              {breadcrumbs.map((crumb, idx) => (
                <span key={crumb.url} className={idx === breadcrumbs.length - 1 ? "font-bold text-white" : ""}>
                  {idx > 0 && <span aria-hidden="true">/</span>} {crumb.label}
                </span>
              ))}
            </nav>
          </div>

          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Current quote</div>
            <div className="mt-4 flex items-end gap-4">
              <div>
                <div className="text-4xl font-bold text-white">{quote.lastPrice}</div>
                <div className={changeClass}>
                  {changeSign}
                  {quote.changePercent.toFixed(2)}%
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                {quote.assetType}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
          <section className="space-y-8 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Bid / Ask</div>
                <div className="mt-3 text-lg font-semibold text-white">{quote.bid} / {quote.ask}</div>
              </div>
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Day range</div>
                <div className="mt-3 text-lg font-semibold text-white">{quote.low} - {quote.high}</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Volume</div>
                <div className="mt-3 text-lg font-semibold text-white">{quote.volume.toLocaleString()}</div>
              </div>
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Change</div>
                <div className={
                  `mt-3 text-lg font-semibold ${quote.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}`
                }>
                  {changeSign}{quote.changeAbsolute.toFixed(2)} ({changeSign}{quote.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Updated</div>
                <div className="mt-3 text-lg font-semibold text-white">{new Date(quote.updatedAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3 text-slate-300">
                <BarChart4 className="w-5 h-5 text-orange-300" />
                <div>
                  <p className="font-semibold text-white">Market context</p>
                  <p className="text-sm text-slate-400">This profile page highlights the latest price action and key trade factors for {quote.displayName}.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                  <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Support</div>
                  <div className="mt-3 text-lg font-semibold text-white">{quote.low}</div>
                </div>
                <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-5">
                  <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Resistance</div>
                  <div className="mt-3 text-lg font-semibold text-white">{quote.high}</div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
              <div className="flex items-center gap-3 text-slate-300">
                <Info className="w-5 h-5 text-orange-300" />
                <p className="font-semibold text-white">Why this asset matters</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                {quote.displayName} is one of the primary {quote.assetType.toLowerCase()} instruments used by traders to gauge broader market sentiment and price dynamics.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
              <div className="flex items-center gap-3 text-slate-300">
                <ArrowUpRight className="w-5 h-5 text-orange-300" />
                <p className="font-semibold text-white">Trade-ready resources</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Explore related market commentary, strategies, and glossary entries for {quote.assetType} trading with the links below.
              </p>
              <div className="mt-6 space-y-3">
                <Link href={categoryPath} className="block rounded-2xl bg-slate-950/50 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
                  Browse {quote.assetType} market dashboard
                </Link>
                <Link href={`/markets`} className="block rounded-2xl border border-slate-800/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-orange-400/40">
                  Return to Markets Hub
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <AssetHeroImage image={heroImage} title={`${quote.displayName} Trading Profile`} />
        <AssetChartDisplay charts={chartImages} symbol={quote.symbol} />

        {mediaLibrary?.galleryImages && (
          <AssetGallery images={mediaLibrary.galleryImages} title={`${quote.displayName} Market Gallery`} />
        )}

        <RelatedContentSection
          items={relatedItems}
          title="Market learning & trade ideas"
          accentClass="text-orange-300"
          callout="Related resources"
        />

        <section className="mt-10 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Frequently asked questions</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Trading {quote.displayName}: what every trader should know</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-6">
                <p className="font-semibold text-white">{item.question}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {categoryAssets.length > 1 ? (
          <section className="mt-12 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-orange-300">More {quote.assetType} profiles</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Explore other assets in this category</h2>
              </div>
              <Link href={categoryPath} className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                Back to {quote.assetType} market overview
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {categoryAssets
                .filter((item) => item.symbol !== quote.symbol)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.symbol}
                    href={`/markets/${item.assetType.toLowerCase()}/${item.symbol.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`}
                    className="group rounded-3xl border border-slate-800/80 bg-slate-950/50 p-6 transition hover:border-orange-400/40 hover:bg-slate-900"
                  >
                    <div className="text-sm uppercase tracking-[0.3em] text-orange-300">{item.symbol}</div>
                    <h3 className="mt-3 text-xl font-bold text-white">{item.displayName}</h3>
                    <p className="mt-3 text-sm text-slate-400">{item.assetType} profile</p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <span className={`text-lg font-semibold ${item.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                      </span>
                      <span className="text-orange-300 text-xs uppercase tracking-[0.3em] font-semibold">View</span>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
