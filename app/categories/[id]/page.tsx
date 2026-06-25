import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  SAMPLE_LESSONS_EXTENDED,
  SAMPLE_STRATEGIES_EXTENDED,
  SAMPLE_GLOSSARY_EXTENDED,
  ENGINE_ARTICLES,
  getBreadcrumbs,
  getJsonLdBreadcrumbs
} from "../../lib/contentEngine";
import { buildPageMetadata } from "../../lib/seo";
import { getCategoryBannerImage } from "../../lib/image";
import {
  GraduationCap,
  TrendingUp,
  ShieldAlert,
  Award,
  Layers,
  Globe,
  BookOpen,
  Zap,
  HelpCircle,
  Clock,
  User,
  ChevronRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = CATEGORIES[id];

  if (!category) {
    return {
      title: "Category Not Found | PriceLot",
      description: "The requested category is not found.",
    };
  }

  const pageImage = getCategoryBannerImage(id, category.name);

  return buildPageMetadata({
    title: `${category.name} Hub | Professional Trading Resources`,
    description: category.description,
    canonical: `https://pricelot.com/categories/${id}`,
    keywords: [category.name, "trading", "education", "strategy"],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "website",
  });
}

const ICON_MAP: Record<string, any> = {
  GraduationCap: GraduationCap,
  TrendingUp: TrendingUp,
  ShieldAlert: ShieldAlert,
  Award: Award,
  Layers: Layers,
  Globe: Globe,
};

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = CATEGORIES[id];

  if (!category) {
    notFound();
  }

  const IconComponent = ICON_MAP[category.icon] || BookOpen;

  // Gather matching content
  // Normalize names for comparison
  const normalizedCategoryName = category.name.toLowerCase().trim();

  const matchedArticles = ENGINE_ARTICLES.filter(
    (a) => a.category.toLowerCase().trim() === normalizedCategoryName
  );

  const matchedLessons = SAMPLE_LESSONS_EXTENDED.filter(
    (l) => l.category.toLowerCase().trim() === normalizedCategoryName
  );

  const matchedStrategies = SAMPLE_STRATEGIES_EXTENDED.filter(
    (s) => s.category.toLowerCase().trim() === normalizedCategoryName
  );

  const matchedGlossary = SAMPLE_GLOSSARY_EXTENDED.filter(
    (g) => g.category.toLowerCase().trim() === normalizedCategoryName
  );

  const totalCount =
    matchedArticles.length +
    matchedLessons.length +
    matchedStrategies.length +
    matchedGlossary.length;

  const breadcrumbs = getBreadcrumbs(`/categories/${id}`);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/categories/${id}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Breadcrumbs */}
      <nav id="category-breadcrumbs" className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
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

      {/* Hero Banner */}
      <div id="category-hero" className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 shadow-inner">
          <IconComponent className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <div className="space-y-2 flex-1">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
            Curated Resource Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight leading-none">
            {category.name}
          </h1>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-3xl">
            {category.description}
          </p>
        </div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 font-mono text-center shrink-0">
          <div className="text-2xl font-bold text-zinc-800">{totalCount}</div>
          <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Total Pages</div>
        </div>
      </div>

      {/* Dynamic Bento Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Side: Articles & Lessons */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Academy Curriculum */}
          <div id="category-lessons" className="space-y-4">
            <h2 className="text-xl font-serif font-black italic text-zinc-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" /> Interactive Course Curriculum
            </h2>
            {matchedLessons.length > 0 ? (
              <div className="grid gap-4">
                {matchedLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/academy/${lesson.id}`}
                    className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 rounded-xl p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-zinc-400 font-bold uppercase">{lesson.difficulty}</span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition">
                        {lesson.title}
                      </h3>
                      <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-orange-600 group-hover:translate-x-1 transition shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic font-mono p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
                No active course curriculum in this category yet.
              </p>
            )}
          </div>

          {/* Educational Articles */}
          <div id="category-articles" className="space-y-4">
            <h2 className="text-xl font-serif font-black italic text-zinc-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-600" /> Masterclass & Deep Dive Articles
            </h2>
            {matchedArticles.length > 0 ? (
              <div className="grid gap-4">
                {matchedArticles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/articles/${art.slug}`}
                    className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 rounded-xl p-5 transition flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <span>Updated: {art.updatedDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> By {art.authorId === "editorial-board" ? "Editorial Board" : art.authorId}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                    {art.tags && art.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {art.tags.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded-full text-[10px] font-mono text-zinc-500">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic font-mono p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
                No articles published under this category yet.
              </p>
            )}
          </div>

        </div>

        {/* Sidebar: Strategies & Glossary */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Backtested Strategies */}
          <div id="category-strategies" className="space-y-4">
            <h2 className="text-lg font-serif font-black italic text-zinc-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" /> Backtested Strategies
            </h2>
            {matchedStrategies.length > 0 ? (
              <div className="grid gap-3">
                {matchedStrategies.map((strat) => (
                  <Link
                    key={strat.id}
                    href={`/strategies/${strat.id}`}
                    className="group block bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 rounded-xl p-4 transition text-left"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400 font-bold uppercase">{strat.difficulty}</span>
                      <span className="text-orange-600 font-black">{strat.winRateEstimate} Win</span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition">
                      {strat.name}
                    </h3>
                    <p className="text-zinc-500 text-[11px] line-clamp-2 leading-relaxed mt-1">
                      {strat.description}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic font-mono p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
                No trading strategies for this category.
              </p>
            )}
          </div>

          {/* Reference Terminology */}
          <div id="category-glossary" className="space-y-4">
            <h2 className="text-lg font-serif font-black italic text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-600" /> Glossary Terminology
            </h2>
            {matchedGlossary.length > 0 ? (
              <div className="bg-white border border-zinc-200 rounded-xl p-4 divide-y divide-zinc-100">
                {matchedGlossary.slice(0, 15).map((term) => (
                  <Link
                    key={term.id}
                    href={`/glossary?term=${term.id}`}
                    className="group block py-2.5 hover:text-orange-600 transition text-left first:pt-0 last:pb-0"
                  >
                    <div className="font-bold text-sm text-zinc-900 group-hover:text-orange-600 transition flex items-center justify-between">
                      <span>{term.term}</span>
                      <span className="w-5 h-5 bg-zinc-50 text-zinc-400 font-bold font-mono text-[10px] flex items-center justify-center border border-zinc-150 rounded">
                        {term.letter}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs line-clamp-1 leading-normal mt-0.5">
                      {term.definition}
                    </p>
                  </Link>
                ))}
                {matchedGlossary.length > 15 && (
                  <Link
                    href="/glossary"
                    className="block text-center text-xs font-mono font-bold text-orange-600 hover:text-orange-500 pt-3"
                  >
                    View All {matchedGlossary.length} Glossary Terms →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic font-mono p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
                No glossary terms found in this category.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
