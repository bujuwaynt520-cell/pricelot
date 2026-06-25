import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AUTHORS,
  SAMPLE_LESSONS_EXTENDED,
  SAMPLE_STRATEGIES_EXTENDED,
  ENGINE_ARTICLES,
  getBreadcrumbs,
  getJsonLdBreadcrumbs
} from "../../lib/contentEngine";
import { buildPageMetadata } from "../../lib/seo";
import { getAuthorBannerImage } from "../../lib/image";
import {
  ChevronRight,
  BookOpen,
  Layers,
  Zap,
  Twitter,
  Linkedin,
  Clock,
  ArrowRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const author = AUTHORS[id];

  if (!author) {
    return {
      title: "Author Not Found | PriceLot",
      description: "The requested expert is not registered.",
    };
  }

  const pageImage = getAuthorBannerImage(id, author.name);

  return buildPageMetadata({
    title: `${author.name} | Financial Expert & Analyst`,
    description: author.bio,
    canonical: `https://pricelot.com/authors/${id}`,
    keywords: [author.name, author.role, "financial analysis", "trading"],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "profile",
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { id } = await params;
  const author = AUTHORS[id];

  if (!author) {
    notFound();
  }

  // Gather matching content authored by this person
  const matchedArticles = ENGINE_ARTICLES.filter(
    (a) => a.authorId === id
  );

  const matchedLessons = SAMPLE_LESSONS_EXTENDED.filter(
    (l) => l.authorId === id
  );

  const matchedStrategies = SAMPLE_STRATEGIES_EXTENDED.filter(
    (s) => s.authorId === id
  );

  const totalCount =
    matchedArticles.length +
    matchedLessons.length +
    matchedStrategies.length;

  const breadcrumbs = getBreadcrumbs(`/authors/${id}`);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/authors/${id}`);

  // Author JSON-LD Profile Schema
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.role,
      "description": author.bio,
      "sameAs": [
        author.twitter || "",
        author.linkedin || ""
      ].filter(Boolean)
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav id="author-breadcrumbs" className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
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

      {/* Profile Bio Card */}
      <div id="author-profile-card" className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-4xl shrink-0 shadow-inner">
          {author.avatar}
        </div>
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider">
              Verified Financial Contributor
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-black italic text-zinc-900 leading-tight">
              {author.name}
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-semibold font-mono">
              {author.role}
            </p>
          </div>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-4xl">
            {author.bio}
          </p>

          {/* Social Profiles */}
          <div className="flex gap-3 pt-1">
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 text-zinc-500 hover:text-orange-600 transition shadow-sm flex items-center gap-1.5 text-xs font-mono font-bold"
              >
                <Twitter className="w-4 h-4" /> Twitter
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 text-zinc-500 hover:text-orange-600 transition shadow-sm flex items-center gap-1.5 text-xs font-mono font-bold"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
            <div className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg font-mono text-xs text-zinc-500 font-bold ml-auto">
              Total Authored Nodes: {totalCount}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Authored Works */}
      <div className="space-y-8 pt-2">
        <h2 className="text-xl font-serif font-black italic text-zinc-900 border-b border-zinc-200 pb-2">
          Authored Content Portfolio
        </h2>

        {totalCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Articles */}
            {matchedArticles.map((art) => (
              <div key={art.slug} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 bg-zinc-150 text-zinc-700 font-bold uppercase rounded">
                      Deep Dive Article
                    </span>
                    <span className="text-zinc-400">{art.updatedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <Link
                  href={`/articles/${art.slug}`}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group mt-auto"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            ))}

            {/* Lessons */}
            {matchedLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 font-bold uppercase rounded border border-orange-100">
                      Academy Lesson
                    </span>
                    <span className="text-zinc-400">{lesson.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                    {lesson.summary}
                  </p>
                </div>
                <Link
                  href={`/academy/${lesson.id}`}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group mt-auto"
                >
                  Go to Masterclass <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            ))}

            {/* Strategies */}
            {matchedStrategies.map((strat) => (
              <div key={strat.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between hover:border-orange-200 transition shadow-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 bg-zinc-900 text-white font-bold uppercase rounded">
                      Strategy Blueprint
                    </span>
                    <span className="text-orange-600 font-bold">{strat.winRateEstimate} Win</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 line-clamp-2 leading-snug">
                    {strat.name}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                    {strat.description}
                  </p>
                </div>
                <Link
                  href={`/strategies/${strat.id}`}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 hover:text-orange-500 group mt-auto"
                >
                  Analyze Mechanics <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            ))}

          </div>
        ) : (
          <p className="text-zinc-400 text-xs italic font-mono p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
            This contributor has not authored any content records yet.
          </p>
        )}
      </div>
    </div>
  );
}
