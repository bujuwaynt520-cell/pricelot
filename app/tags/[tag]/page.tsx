import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SAMPLE_LESSONS_EXTENDED,
  SAMPLE_STRATEGIES_EXTENDED,
  SAMPLE_GLOSSARY_EXTENDED,
  ENGINE_ARTICLES,
  getBreadcrumbs,
  getJsonLdBreadcrumbs
} from "../../lib/contentEngine";
import { buildPageMetadata } from "../../lib/seo";
import { getTagBannerImage } from "../../lib/image";
import {
  ChevronRight,
  BookOpen,
  Layers,
  Zap,
  HelpCircle,
  Tag,
  Clock,
  ArrowRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const pageImage = getTagBannerImage(decodedTag);

  return buildPageMetadata({
    title: `Articles and Guides on #${decodedTag} | PriceLot Trading Hub`,
    description: `Browse all technical guides, backtested strategies, glossary terms, and curriculum courses on PriceLot related to #${decodedTag}.`,
    canonical: `https://pricelot.com/tags/${tag}`,
    keywords: [decodedTag, "trading", "education", "analysis"],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "website",
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase().trim();

  // Find matches across content types
  const matchedArticles = ENGINE_ARTICLES.filter((a) =>
    a.tags?.map((t) => t.toLowerCase().trim()).includes(decodedTag)
  );

  const matchedLessons = SAMPLE_LESSONS_EXTENDED.filter((l) =>
    l.tags?.map((t) => t.toLowerCase().trim()).includes(decodedTag)
  );

  const matchedStrategies = SAMPLE_STRATEGIES_EXTENDED.filter((s) =>
    s.tags?.map((t) => t.toLowerCase().trim()).includes(decodedTag)
  );

  const matchedGlossary = SAMPLE_GLOSSARY_EXTENDED.filter((g) =>
    g.tags?.map((t) => t.toLowerCase().trim()).includes(decodedTag)
  );

  const totalCount =
    matchedArticles.length +
    matchedLessons.length +
    matchedStrategies.length +
    matchedGlossary.length;

  if (totalCount === 0) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbs(`/tags/${tag}`);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/tags/${tag}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Breadcrumbs */}
      <nav id="tag-breadcrumbs" className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.url} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="w-3 h-3 text-zinc-300" />}
            <Link
              href={crumb.url}
              className={`hover:text-orange-600 transition ${
                idx === breadcrumbs.length - 1 ? "text-zinc-600 font-bold pointer-events-none" : ""
              }`}
            >
              {crumb.label}
            </Link>
          </div>
        ))}
      </nav>

      {/* Header */}
      <div id="tag-hero" className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 shadow-inner">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider">
              Topic Taxonomy
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-black italic text-zinc-900 leading-tight">
              #{decodedTag}
            </h1>
          </div>
        </div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-1.5 font-mono text-center">
          <div className="text-xl font-bold text-zinc-800">{totalCount}</div>
          <div className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Matched Nodes</div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Academy Lessons */}
        {matchedLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600 font-bold uppercase rounded border border-orange-100">
                  Academy Lesson
                </span>
                <span className="text-zinc-400 font-bold">{lesson.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                {lesson.title}
              </h2>
              <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                {lesson.summary}
              </p>
            </div>
            <Link
              href={`/academy/${lesson.id}`}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group"
            >
              Start Lesson <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        ))}

        {/* Long-form Articles */}
        {matchedArticles.map((art) => (
          <div key={art.slug} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 font-bold uppercase rounded border border-zinc-200">
                  Deep Dive Article
                </span>
                <span className="text-zinc-400">{art.updatedDate}</span>
              </div>
              <h2 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                {art.title}
              </h2>
              <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>
            <Link
              href={`/articles/${art.slug}`}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group"
            >
              Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        ))}

        {/* Backtested Strategies */}
        {matchedStrategies.map((strat) => (
          <div key={strat.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-zinc-900 text-white font-bold uppercase rounded">
                  Strategy Card
                </span>
                <span className="text-orange-600 font-bold">{strat.winRateEstimate} Win</span>
              </div>
              <h2 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                {strat.name}
              </h2>
              <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                {strat.description}
              </p>
            </div>
            <Link
              href={`/strategies/${strat.id}`}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group"
            >
              Analyze Strategy <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        ))}

        {/* Glossary Terms */}
        {matchedGlossary.map((term) => (
          <div key={term.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 text-zinc-500 font-bold uppercase rounded">
                  Glossary Definition
                </span>
                <span className="w-4 h-4 bg-zinc-100 text-zinc-500 font-bold text-[9px] flex items-center justify-center rounded">
                  {term.letter}
                </span>
              </div>
              <h2 className="text-base font-bold text-zinc-900 line-clamp-1 leading-snug">
                {term.term}
              </h2>
              <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                {term.definition}
              </p>
            </div>
            <Link
              href={`/glossary?term=${term.id}`}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group"
            >
              View Reference <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}
