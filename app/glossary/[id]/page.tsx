import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Glossary from "../../../src/components/Glossary";
import { getRelatedInternalLinks } from "../../lib/services/internalLinks";
import { RelatedContentSection } from "@/app/components/RelatedContent";
import {
  SAMPLE_GLOSSARY_EXTENDED,
  getJsonLdGlossary,
  getJsonLdBreadcrumbs,
  getBreadcrumbs
} from "../../lib/contentEngine";
import {
  buildGlossaryTermMetadata,
  buildDefinedTermStructuredData,
  buildGlossaryBreadcrumbStructuredData,
} from "@/app/lib/services/glossaryMetadata";
import {
  getGlossaryTermById,
  getRelatedGlossaryTerms,
} from "@/app/lib/services/glossaryEngine";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all glossary terms
export async function generateStaticParams() {
  return SAMPLE_GLOSSARY_EXTENDED.map((term) => ({
    id: term.id,
  }));
}

// 1. Dynamic Server-side Metadata Resolver
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const term = getGlossaryTermById(id);

  if (!term) {
    return {
      title: "Financial Term Not Found | PriceLot Dictionary",
      description: "The requested investment vocabulary definition is unavailable.",
    };
  }

  const canonicalUrl = `https://pricelot.com/glossary/${id}`;
  return buildGlossaryTermMetadata(term, canonicalUrl);
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const term = getGlossaryTermById(id);
  
  // Get related terms from glossary engine
  const relatedGlossaryTerms = term 
    ? getRelatedGlossaryTerms(id, 5)
    : [];
  
  // Also get any related internal content
  const relatedTerms = term ? await getRelatedInternalLinks(id, "glossary", 3) : [];

  const canonicalUrl = `https://pricelot.com/glossary/${id}`;
  
  // Generate structured data
  const definedTermSchema = term
    ? buildDefinedTermStructuredData(term, canonicalUrl)
    : "";
  const breadcrumbSchema = term
    ? buildGlossaryBreadcrumbStructuredData(id, term.term, term.category)
    : "";
  const termJsonLd = term ? getJsonLdGlossary(term) : "";
  const breadcrumbsJsonLd = getJsonLdBreadcrumbs(`/glossary/${id}`);
  const breadcrumbs = getBreadcrumbs(`/glossary/${id}`);

  if (!term) {
    return (
      <div className="space-y-4 text-left">
        <h1 className="text-2xl font-bold text-slate-900">Term Not Found</h1>
        <p className="text-slate-600">The glossary term you're looking for doesn't exist.</p>
        <Link href="/glossary" className="text-orange-600 hover:text-orange-700">
          Back to Glossary
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {/* Structured Data Scripts */}
      <Script
        id={`glossary-defined-term-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: definedTermSchema }}
      />
      <Script
        id={`glossary-breadcrumb-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Script
        id={`glossary-legacy-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: termJsonLd }}
      />
      <Script
        id={`breadcrumbs-legacy-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />

      {/* Breadcrumbs Navigation */}
      <nav id="glossary-breadcrumbs" className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 flex-wrap">
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

      {/* Related Content Section */}
      {relatedGlossaryTerms.length > 0 && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Related Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {relatedGlossaryTerms.map((relatedTerm) => (
              <Link
                key={relatedTerm.id}
                href={`/glossary/${relatedTerm.id}`}
                className="text-orange-600 hover:text-orange-700 text-sm hover:underline"
              >
                {relatedTerm.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      <RelatedContentSection
        items={relatedTerms}
        title="Related Articles & Lessons"
        accentClass="text-orange-300"
      />

      {/* Client-side Glossary dictionary list and filter overlay */}
      <Glossary selectedTermId={id} />
    </div>
  );
}
