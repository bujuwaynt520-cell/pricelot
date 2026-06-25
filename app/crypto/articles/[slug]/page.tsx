import { Metadata } from "next";
import { CRYPTO_ARTICLES } from "../../../lib/services/cryptoHub";
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
  const article = CRYPTO_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  // Use featured image from article, fallback to hub image
  const featuredImage = article.featuredImage
    ? article.featuredImage
    : generateHubImage("crypto", "article").url;

  return {
    title: `${article.title} | Crypto Trading Hub`,
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
  return CRYPTO_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function CryptoArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = CRYPTO_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedInternalLinks(slug, "article", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950">
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
            image: "https://pricelot.com/crypto-banner.jpg",
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex text-sm text-slate-400">
          <a href="/crypto" className="hover:text-cyan-300">
            Crypto Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/crypto?tab=articles" className="hover:text-cyan-300">
            Articles
          </a>
          <span className="mx-2">/</span>
          <span className="text-cyan-300">{article.title}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            {article.category}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{article.title}</h1>
          <p className="mb-6 text-xl text-slate-300">{article.summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{Math.ceil(article.content.split(" ").length / 200)} min read</span>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <FeaturedImage
            image={{ url: article.featuredImage, alt: article.title }}
            className="mb-8"
          />
        )}

        {/* Video Embed */}
        {article.videoUrl && (
          <VideoEmbed
            url={article.videoUrl}
            title={`${article.title} - Video Guide`}
            className="mb-8"
          />
        )}

        <div className="mb-12 border-t border-cyan-500/20" />

        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg leading-relaxed text-slate-200">
            {article.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-12 border-t border-cyan-500/20" />

        <RelatedContentSection
          items={relatedArticles}
          title="Related Articles"
          accentClass="text-cyan-300"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveArticleButton
            articleSlug={slug}
            title={article.title}
            summary={article.summary}
            category={article.category}
          />
          <a
            href="/crypto"
            className="inline-block rounded-lg border border-cyan-500/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
          >
            ← Back to Crypto Hub
          </a>
        </div>
      </div>
    </div>
  );
}

