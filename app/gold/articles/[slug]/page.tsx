import { Metadata } from "next";
import Link from "next/link";
import { GOLD_ARTICLES } from "../../../lib/services/goldHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import SaveArticleButton from "@/app/components/SaveArticleButton";
import VideoEmbed from "@/app/components/VideoEmbed";
import FeaturedImage from "@/app/components/FeaturedImage";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = GOLD_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  // Use featured image from article, fallback to hub image
  const featuredImage = article.featuredImage
    ? article.featuredImage
    : generateHubImage("gold", "article").url;

  return {
    title: `${article.title} | Gold Trading Hub`,
    description: article.summary,
    keywords: [article.category, ...article.tags],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [{ url: featuredImage }],
    },
  };
}

export async function generateStaticParams() {
  return GOLD_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function GoldArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = GOLD_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedInternalLinks(slug, "article", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-yellow-950 to-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.summary,
            author: {
              "@type": "Person",
              name: article.author,
            },
            datePublished: article.publishDate,
            image: "https://pricelot.com/gold-banner.jpg",
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex text-sm text-zinc-400">
          <a href="/gold" className="hover:text-yellow-300">
            Gold Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/gold?tab=articles" className="hover:text-yellow-300">
            Articles
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-300">{article.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-300">
            {article.category}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{article.title}</h1>
          <p className="mb-6 text-xl text-zinc-300">{article.summary}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{Math.ceil(article.content.split(" ").length / 200)} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <FeaturedImage
            image={{ url: article.featuredImage, alt: article.title }}
            className="mb-12"
          />
        )}

        {/* Video Embed */}
        {article.videoUrl && (
          <VideoEmbed
            url={article.videoUrl}
            title={`${article.title} - Video Guide`}
            className="mb-12"
          />
        )}

        {/* Divider */}
        <div className="mb-12 border-t border-yellow-500/20" />

        {/* Main Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg leading-relaxed text-zinc-200">
            {article.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12 border-t border-yellow-500/20" />

        {/* Related Articles */}
        <RelatedContentSection
          items={relatedArticles}
          title="Related Articles"
          accentClass="text-yellow-300"
        />

        {/* Back to Hub */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveArticleButton
            articleSlug={slug}
            title={article.title}
            summary={article.summary}
            category={article.category}
          />
          <a
            href="/gold"
            className="inline-block rounded-lg border border-yellow-500/30 px-6 py-3 text-sm font-semibold text-yellow-300 transition hover:border-yellow-400 hover:bg-yellow-500/10"
          >
            ← Back to Gold Hub
          </a>
        </div>
      </div>
    </div>
  );
}

