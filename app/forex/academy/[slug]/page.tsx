import { Metadata } from "next";
import { FOREX_LESSONS } from "../../../lib/services/forexHub";
import { getRelatedInternalLinks } from "../../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import ContentMediaHero from "@/app/components/ContentMediaHero";
import SaveLessonButton from "@/app/components/SaveLessonButton";
import { buildPageMetadata } from "@/app/lib/seo";
import { generateHubImage } from "@/app/lib/services/placeholderImages";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = FOREX_LESSONS.find((l) => l.id === params.slug);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  const pageImage = lesson.featuredImage
    ? { url: lesson.featuredImage, alt: lesson.title }
    : generateHubImage("forex", "lesson");

  return buildPageMetadata({
    title: `${lesson.title} | Forex Trading Academy`,
    description: lesson.summary,
    canonical: `https://pricelot.com/forex/academy/${params.slug}`,
    keywords: [lesson.category, lesson.difficulty, ...lesson.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  return FOREX_LESSONS.map((lesson) => ({ slug: lesson.id }));
}

export default async function ForexLessonPage({ params }: Props) {
  const lesson = FOREX_LESSONS.find((l) => l.id === params.slug);

  if (!lesson) {
    notFound();
  }

  const relatedLessons = await getRelatedInternalLinks(lesson.id, "lesson", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950">
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
        <nav className="mb-8 flex text-sm text-slate-400">
          <a href="/forex" className="hover:text-orange-300">
            Forex Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/forex?tab=lessons" className="hover:text-orange-300">
            Academy
          </a>
          <span className="mx-2">/</span>
          <span className="text-orange-300">{lesson.title}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 flex gap-2">
            <div className="rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300">{lesson.category}</div>
            <div className="rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-300">{lesson.difficulty}</div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
          <p className="mb-6 text-xl text-slate-300">{lesson.summary}</p>
          <ContentMediaHero
            image={lesson.featuredImage ? { url: lesson.featuredImage, alt: lesson.title } : undefined}
            fallbackImage={generateHubImage("forex", "lesson")}
            title={lesson.title}
            videoUrl={lesson.videoUrl}
            className="mb-8"
          />
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>📚 {lesson.readTime}</span>
            <span>•</span>
            <span>📊 {lesson.difficulty} Level</span>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {lesson.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-orange-500/10 px-3 py-1 text-sm text-orange-300">#{tag}</span>
          ))}
        </div>

        <div className="mb-12 border-t border-orange-500/20" />

        <div className="mb-12 space-y-6">
          {lesson.content.map((paragraph, idx) => (
            <div key={idx} className="rounded-lg border border-orange-500/10 bg-slate-900/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-300 font-bold">{idx + 1}</div>
                <p className="text-lg leading-relaxed text-slate-200">{paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        <RelatedContentSection
          items={relatedLessons}
          title="Related Lessons"
          accentClass="text-orange-300"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <SaveLessonButton
            lessonId={params.slug}
            title={lesson.title}
            summary={lesson.summary}
            category={lesson.category}
          />
          <a
            href="/forex"
            className="inline-block rounded-lg border border-orange-500/30 px-6 py-3 text-sm font-semibold text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/10"
          >
            ← Back to Forex Hub
          </a>
        </div>
      </div>
    </div>
  );
}

