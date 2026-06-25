import { Metadata } from "next";
import { INDICES_ARTICLES } from "../../../lib/services/indicesHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import SaveArticleButton from "@/app/components/SaveArticleButton";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INDICES_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Indices Trading Hub`,
    description: article.summary,
    keywords: [article.category, ...article.tags],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author],
    },
  };
}

export async function generateStaticParams() {
  return INDICES_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function IndicesArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = INDICES_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedInternalLinks(slug, "article", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-950">
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
            image: "https://pricelot.com/indices-banner.jpg",
          }),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex text-sm text-slate-400">
          <a href="/indices" className="hover:text-sky-300">Indices Hub</a>
          <span className="mx-2">/</span>
          <a href="/indices?tab=articles" className="hover:text-sky-300">Articles</a>
          <span className="mx-2">/</span>
          <span className="text-sky-300">{article.title}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-300">{article.category}</div>
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
            <span key={tag} className="rounded-lg bg-sky-500/10 px-3 py-1 text-sm text-sky-300">#{tag}</span>
          ))}
        </div>

        <div className="mb-12 border-t border-sky-500/20" />

        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg leading-relaxed text-slate-200">
            {article.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mb-12 border-t border-sky-500/20" />

        <RelatedContentSection
          items={relatedArticles}
          title="Related Articles"
          accentClass="text-sky-300"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveArticleButton
            articleSlug={slug}
            title={article.title}
            summary={article.summary}
            category={article.category}
          />
          <a href="/indices" className="inline-block rounded-lg border border-sky-500/30 px-6 py-3 text-sm font-semibold text-sky-300 transition hover:border-sky-400 hover:bg-sky-500/10">← Back to Indices Hub</a>
        </div>
      </div>
    </div>
  );
}

