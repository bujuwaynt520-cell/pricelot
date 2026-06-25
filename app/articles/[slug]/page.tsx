import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Award, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import NewsletterCTA from "../../components/NewsletterCTA";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import SaveArticleButton from "../../components/SaveArticleButton";
import VideoEmbed from "../../components/VideoEmbed";
import AuthorAvatar from "../../components/AuthorAvatar";
import {
  ENGINE_ARTICLES,
  AUTHORS,
  CATEGORIES,
  calculateReadingTime,
  getJsonLdArticle,
  getJsonLdBreadcrumbs,
  getBreadcrumbs
} from "../../lib/contentEngine";
import { getRelatedInternalLinks } from "../../lib/services/internalLinks";
import { buildPageMetadata } from "../../lib/seo";
import { getEditorialImage } from "../../lib/image";
import { generateHubImage } from "../../lib/services/placeholderImages";
import FeaturedImage from "../../components/FeaturedImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ENGINE_ARTICLES.find((art) => art.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | PriceLot",
      description: "The requested educational guide could not be found.",
    };
  }

  // Use featured image from article, fallback to editorial image
  const pageImage = article.featuredImage
    ? { url: article.featuredImage, alt: article.title }
    : getEditorialImage();

  return buildPageMetadata({
    title: `${article.title} | PriceLot Editorial Guides`,
    description: article.summary,
    canonical: `https://pricelot.com/articles/${slug}`,
    keywords: [article.category, ...article.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ENGINE_ARTICLES.find((art) => art.slug === slug);

  if (!article) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-sans bg-white p-8 rounded-xl border border-zinc-200">
        <h3 className="text-xl font-bold text-zinc-900">Article not found</h3>
        <p className="text-zinc-500 text-sm">The editorial guide requested could not be scanned in our index.</p>
        <Link href="/articles" className="inline-block px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow">
          Back to Articles
        </Link>
      </div>
    );
  }

  const author = AUTHORS[article.authorId] || AUTHORS["editorial-board"];
  const category = CATEGORIES[article.category] || { name: article.category };
  const readTime = calculateReadingTime(article.content);
  const breadcrumbs = getBreadcrumbs(`/articles/${slug}`);
  const related = await getRelatedInternalLinks(slug, "article", 3);

  // Generate structured schemas
  const articleJsonLd = getJsonLdArticle(article, author);
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/articles/${slug}`);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Dynamic JSON-LD Structured Data Injected on Server Side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Breadcrumb Navigation UI Component */}
      <nav id="article-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.url} className="flex items-center gap-1.5">
            {idx > 0 && <span>/</span>}
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

      {/* Main Card Container */}
      <div id="article-detail" className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-10 space-y-8 shadow-sm font-sans">
        {/* Navigation */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition text-xs font-bold uppercase tracking-wider font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles Library
        </Link>

        {/* Header Info */}
        <div className="space-y-4 border-b border-zinc-100 pb-6">
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase tracking-widest">
            {category.name}
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-black italic tracking-tight text-zinc-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published: {article.publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} calculation</span>
            </div>
          </div>
        </div>

        <FeaturedImage
          image={
            article.featuredImage
              ? { url: article.featuredImage, alt: article.title }
              : getEditorialImage()
          }
          className="mt-8"
        />

        {/* Optional Video Embed */}
        {article.videoUrl && (
          <VideoEmbed
            url={article.videoUrl}
            title={`${article.title} - Video Guide`}
            className="mt-8"
          />
        )}

        {/* Author Bio Card (Header) */}
        <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
          <AuthorAvatar
            name={author.name}
            avatar={author.avatar}
            bio={author.bio}
            role={author.role}
            twitter={author.twitter}
            linkedin={author.linkedin}
            size="medium"
          />
        </div>

        {/* Dynamic Rich MDX Content Block using react-markdown */}
        <article className="prose prose-zinc max-w-none text-zinc-800 text-sm md:text-base leading-relaxed font-sans border-b border-zinc-100 pb-8 space-y-4 markdown-body">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-xl md:text-2xl font-serif font-bold italic text-zinc-900 mt-6 mb-2 tracking-tight">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg md:text-xl font-serif font-bold italic text-zinc-900 mt-5 mb-2 tracking-tight">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-serif font-bold italic text-zinc-850 mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-650">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-zinc-650 text-xs md:text-sm">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-zinc-650 text-xs md:text-sm">{children}</ol>,
              li: ({ children }) => <li className="pl-1">{children}</li>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-orange-500 pl-4 py-1.5 italic bg-orange-50/20 text-zinc-700 my-4 rounded-r-lg font-serif">{children}</blockquote>,
              strong: ({ children }) => <strong className="font-bold text-zinc-900">{children}</strong>,
              code: ({ children }) => <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono text-xs text-orange-600 font-bold">{children}</code>
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        <RelatedContentSection
          items={related}
          title="Semantically Related Resources"
          accentClass="text-orange-300"
        />


        {/* Footer info */}
        <div className="mt-12">
          <NewsletterCTA />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>Strict educational independence strictly maintained. No referral codes.</span>
          </div>
          <div className="flex gap-2">
            <SaveArticleButton
              articleSlug={slug}
              title={article.title}
              summary={article.summary}
              category={article.category}
            />
            <Link
              href="/articles"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-center rounded-lg text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer shrink-0"
            >
              Articles Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

