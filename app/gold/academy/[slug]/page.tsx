import { Metadata } from "next";
import { GOLD_LESSONS } from "../../../lib/services/goldHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import ContentMediaHero from "@/app/components/ContentMediaHero";
import SaveLessonButton from "@/app/components/SaveLessonButton";
import { buildPageMetadata } from "@/app/lib/seo";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = GOLD_LESSONS.find((l) => l.id === slug);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  const pageImage = lesson.featuredImage
    ? { url: lesson.featuredImage, alt: lesson.title }
    : generateHubImage("gold", "lesson");

  return buildPageMetadata({
    title: `${lesson.title} | Gold Trading Academy`,
    description: lesson.summary,
    canonical: `https://pricelot.com/gold/academy/${slug}`,
    keywords: [lesson.category, lesson.difficulty, ...lesson.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  return GOLD_LESSONS.map((lesson) => ({
    slug: lesson.id,
  }));
}

export default async function GoldLessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = GOLD_LESSONS.find((l) => l.id === slug);

  if (!lesson) {
    notFound();
  }

  const relatedLessons = await getRelatedInternalLinks(slug, "lesson", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-yellow-950 to-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: lesson.title,
            description: lesson.summary,
            educationLevel: lesson.difficulty,
            duration: lesson.readTime,
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
          <a href="/gold?tab=lessons" className="hover:text-yellow-300">
            Academy
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-300">{lesson.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex gap-2">
            <div className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-300">
              {lesson.category}
            </div>
            <div className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300">
              {lesson.difficulty}
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
          <p className="mb-6 text-xl text-zinc-300">{lesson.summary}</p>
          <ContentMediaHero
            image={lesson.featuredImage ? { url: lesson.featuredImage, alt: lesson.title } : undefined}
            fallbackImage={generateHubImage("gold", "lesson")}
            title={lesson.title}
            videoUrl={lesson.videoUrl}
            className="mb-8"
          />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span>📚 {lesson.readTime}</span>
            <span>•</span>
            <span>📊 {lesson.difficulty} Level</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {lesson.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-12 border-t border-yellow-500/20" />

        {/* Lesson Content */}
        <div className="mb-12 space-y-6">
          {lesson.content.map((paragraph, idx) => (
            <div key={idx} className="rounded-lg border border-yellow-500/10 bg-zinc-900/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-300 font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg leading-relaxed text-zinc-200">{paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-12 border-t border-yellow-500/20" />

        {/* Key Takeaways */}
        <div className="mb-12 rounded-lg border border-green-500/20 bg-green-500/5 p-8">
          <h2 className="mb-4 text-xl font-bold text-green-300">✓ Key Takeaways</h2>
          <ul className="space-y-3">
            {lesson.content.slice(0, 3).map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-200">
                <span className="text-green-400 font-bold">✓</span>
                <span>{point.substring(0, 100)}...</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Lessons */}
        <RelatedContentSection
          items={relatedLessons}
          title="Related Lessons"
          accentClass="text-yellow-300"
        />

        {/* CTA Section */}
        <div className="mb-12 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="mb-2 text-lg font-bold text-yellow-300">Ready to apply what you learned?</h3>
              <p className="text-zinc-300">Check out our trading strategies and start practicing</p>
            </div>
            <SaveLessonButton
              lessonId={slug}
              title={lesson.title}
              summary={lesson.summary}
              category={lesson.category}
            />
          </div>
        </div>

        {/* Back to Hub */}
        <div className="text-center">
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

