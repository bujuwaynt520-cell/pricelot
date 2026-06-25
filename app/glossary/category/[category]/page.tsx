import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  GlossaryTermCard,
  GlossaryAZIndex,
  GlossaryStatsBanner,
} from "@/app/components/GlossaryComponents";
import {
  getGlossaryTermsByCategory,
  getAllGlossaryCategories,
} from "@/app/lib/services/glossaryEngine";
import {
  buildGlossaryCategoryMetadata,
  buildGlossaryCollectionStructuredData,
  getCategorySeoSlug,
  getCategoryDescription,
} from "@/app/lib/services/glossaryMetadata";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllGlossaryCategories();
  return categories.map((category) => ({
    category: getCategorySeoSlug(category),
  }));
}

// Generate metadata for category pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;

  // Find the actual category by slug
  const categories = getAllGlossaryCategories();
  const actualCategory = categories.find(
    (cat) => getCategorySeoSlug(cat) === category
  );

  if (!actualCategory) {
    return {
      title: "Category Not Found | PriceLot Glossary",
      description: "The glossary category you're looking for doesn't exist.",
    };
  }

  const terms = getGlossaryTermsByCategory(actualCategory);
  return buildGlossaryCategoryMetadata(actualCategory, terms.length);
}

export default async function GlossaryCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // Find the actual category by slug
  const categories = getAllGlossaryCategories();
  const category = categories.find(
    (cat) => getCategorySeoSlug(cat) === categorySlug
  );

  if (!category) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Category Not Found</h1>
        <p className="text-slate-600">
          The glossary category you're looking for doesn't exist.
        </p>
        <Link href="/glossary" className="text-orange-600 hover:text-orange-700">
          Back to Glossary
        </Link>
      </div>
    );
  }

  const terms = getGlossaryTermsByCategory(category);
  const structuredData = buildGlossaryCollectionStructuredData(
    category,
    terms.length,
    `https://pricelot.com/glossary/category/${categorySlug}`,
    terms
  );

  return (
    <div className="space-y-6">
      {/* Structured Data */}
      <Script
        id={`glossary-category-${category}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Breadcrumbs */}
      <nav className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
        <Link href="/" className="hover:text-orange-600 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/glossary" className="hover:text-orange-600 transition">
          Glossary
        </Link>
        <span>/</span>
        <span className="text-zinc-600 font-bold">{category}</span>
      </nav>

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">{category} Glossary</h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          {getCategoryDescription(category)}
        </p>
        <p className="text-sm text-slate-500">
          {terms.length} terms in this category
        </p>
      </div>

      {/* Category Stats */}
      <GlossaryStatsBanner totalTerms={terms.length} categoryCount={1} />

      {/* A-Z Index */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Browse by Letter</h2>
        <GlossaryAZIndex onLetterClick={() => {}} />
      </div>

      {/* Terms List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">All {category} Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms
            .sort((a, b) => a.term.localeCompare(b.term))
            .map((term) => (
              <GlossaryTermCard key={term.id} term={term} showCategory={false} />
            ))}
        </div>
      </div>

      {/* Back to Glossary */}
      <div className="pt-6 border-t border-slate-200">
        <Link
          href="/glossary"
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Back to All Categories
        </Link>
      </div>
    </div>
  );
}
