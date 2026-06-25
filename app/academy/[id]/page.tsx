import { Metadata } from "next";
import Link from "next/link";
import Academy from "../../../src/components/Academy";
import { getRelatedInternalLinks } from "../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import {
  SAMPLE_LESSONS_EXTENDED,
  getJsonLdCourse,
  getJsonLdBreadcrumbs,
  getBreadcrumbs
} from "../../lib/contentEngine";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Server-side SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const lesson = SAMPLE_LESSONS_EXTENDED.find((l) => l.id === id);

  if (!lesson) {
    return {
      title: "Course Lesson Not Found | PriceLot Academy",
      description: "The requested training masterclass is unavailable.",
    };
  }

  return {
    title: `${lesson.title} | PriceLot Trading Academy`,
    description: lesson.summary,
    alternates: {
      canonical: `https://pricelot.com/academy/${id}`,
    },
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      type: "article",
    },
  };
}

export default async function AcademyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const lesson = SAMPLE_LESSONS_EXTENDED.find((l) => l.id === id);
  const relatedLessons = lesson ? await getRelatedInternalLinks(id, "lesson", 3) : [];

  // Fallback JSON-LD schemas
  const lessonJsonLd = lesson ? getJsonLdCourse(lesson) : "";
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/academy/${id}`);
  const breadcrumbs = getBreadcrumbs(`/academy/${id}`);

  return (
    <div className="space-y-4 text-left">
      {/* Server-side Injected Schemas */}
      {lesson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: lessonJsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Dynamic Breadcrumbs Navigation UI Component */}
      <nav id="academy-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
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

      <RelatedContentSection
        items={relatedLessons}
        title="Related Lessons"
        accentClass="text-orange-300"
      />

      {/* Client-side Interactivity (sidebar, scrolling, reading tracking, interactive quiz validation) */}
      <Academy selectedLessonId={id} />
    </div>
  );
}
