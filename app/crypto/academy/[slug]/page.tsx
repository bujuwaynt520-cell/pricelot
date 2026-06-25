import { Metadata } from "next";
import { CRYPTO_LESSONS } from "../../../lib/services/cryptoHub";
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
  const lesson = CRYPTO_LESSONS.find((l) => l.id === slug);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  const pageImage = lesson.featuredImage
    ? { url: lesson.featuredImage, alt: lesson.title }
    : generateHubImage("crypto", "lesson");

  return buildPageMetadata({
    title: `${lesson.title} | Crypto Trading Academy`,
    description: lesson.summary,
    canonical: `https://pricelot.com/crypto/academy/${slug}`,
    keywords: [lesson.category, lesson.difficulty, ...lesson.tags],
    openGraphImage: pageImage,
    twitterImage: pageImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  return CRYPTO_LESSONS.map((lesson) => ({
    slug: lesson.id,
  }));
}

export default async function CryptoLessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = CRYPTO_LESSONS.find((l) => l.id === slug);

  if (!lesson) {
    notFound();
  }

  const relatedLessons = await getRelatedInternalLinks(slug, "lesson", 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950">
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
          <a href="/crypto" className="hover:text-cyan-300">
            Crypto Hub
          </a>
          <span className="mx-2">/</span>
          <a href="/crypto?tab=lessons" className="hover:text-cyan-300">
            Academy
          </a>
          <span className="mx-2">/</span>
          <span className="text-cyan-300">{lesson.title}</span>
        </nav>

        <div className="mb-8">
          <div className="mb-3 flex gap-2">
            <div className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
              {lesson.category}
            </div>
            <div className="rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-300">
              {lesson.difficulty}
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
          <p className="mb-6 text-xl text-slate-300">{lesson.summary}</p>
          <ContentMediaHero
            image={lesson.featuredImage ? { url: lesson.featuredImage, alt: lesson.title } : undefined}
            fallbackImage={generateHubImage("crypto", "lesson")}
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
            <span key={tag} className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mb-12 border-t border-cyan-500/20" />

        <div className="mb-12 space-y-6">
          {lesson.content.map((paragraph, idx) => (
            <div key={idx} className="rounded-lg border border-cyan-500/10 bg-slate-900/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg leading-relaxed text-slate-200">{paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 border-t border-cyan-500/20" />

        <div className="mb-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-8">
          <h2 className="mb-4 text-xl font-bold text-emerald-300">✓ Key Takeaways</h2>
          <ul className="space-y-3">
            {lesson.content.slice(0, 3).map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{point.substring(0, 100)}...</span>
              </li>
            ))}
          </ul>
        </div>

        <RelatedContentSection
          items={relatedLessons}
          title="Related Lessons"
          accentClass="text-cyan-300"
        />

        <div className="mb-12 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="mb-2 text-lg font-bold text-cyan-300">Ready to apply what you learned?</h3>
              <p className="text-slate-300">Explore our trading strategies and start practicing with crypto workflows.</p>
            </div>
            <SaveLessonButton
              lessonId={slug}
              title={lesson.title}
              summary={lesson.summary}
              category={lesson.category}
            />
          </div>
        </div>

        <div className="text-center">
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

