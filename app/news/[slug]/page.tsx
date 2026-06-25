import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getNewsArticleBySlug } from "@/app/lib/services/newsFeed";
import { getRelatedInternalLinks } from "@/app/lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import NewsletterCTA from "@/app/components/NewsletterCTA";
import { buildPageMetadata } from "@/app/lib/seo";
import { getEditorialImage } from "@/app/lib/image";
import FeaturedImage from "@/app/components/FeaturedImage";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getNewsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "News Article Not Found | PriceLot",
      description: "The requested market news article could not be found.",
    };
  }

  const pageImage = getEditorialImage();

  return buildPageMetadata({
    title: `${article.title} | PriceLot News Hub`,
    description: article.summary,
    canonical: `https://pricelot.com/news/${article.slug}`,
    keywords: [article.category, ...article.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const article = await getNewsArticleBySlug(params.slug);
  if (!article) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
        <h3 className="text-xl font-bold text-zinc-900">News article not found</h3>
        <p className="text-zinc-500 text-sm">The story you are looking for is not available in the current feed.</p>
        <Link href="/news" className="inline-block px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow">
          Back to News Hub
        </Link>
      </div>
    );
  }

  const relatedArticles = await getRelatedInternalLinks(article.slug, "news", 4);
  const pageImage = getEditorialImage();
  const articleJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [pageImage.url],
    datePublished: article.publishDate,
    author: [{
      "@type": "Person",
      name: article.author,
    }],
    publisher: {
      "@type": "Organization",
      name: "PriceLot",
    },
    description: article.summary,
  });

  return (
    <div className="space-y-8 animate-fade-in text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Market News
        </Link>

        <div className="mt-6 space-y-6">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-orange-600">{article.category}</div>
          <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 tracking-tight">{article.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500 font-mono">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> {article.publishDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> {article.author}
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed">{article.summary}</p>
        </div>

        <FeaturedImage image={pageImage} className="mt-8" />

        <article className="prose prose-zinc max-w-none text-zinc-800 text-sm md:text-base leading-relaxed font-sans border-t border-zinc-100 pt-8 space-y-6 markdown-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>

        <RelatedContentSection
          items={relatedArticles}
          title="More from the newsroom"
          accentClass="text-zinc-900"
          callout="Related headlines"
        />

        <div className="mt-12">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}

