import { Metadata } from "next";
import Glossary from "../../src/components/Glossary";
import { buildGlossaryIndexMetadata, buildGlossaryIndexStructuredData } from "@/app/lib/services/glossaryMetadata";
import { getGlossaryStats, getAllGlossaryCategories, getAllGlossaryTerms } from "@/app/lib/services/glossaryEngine";
import Script from "next/script";

const glossaryStats = getGlossaryStats();
const categories = getAllGlossaryCategories();

export const metadata: Metadata = buildGlossaryIndexMetadata();

export default function GlossaryPage() {
  const structuredData = buildGlossaryIndexStructuredData(
    categories,
    glossaryStats.totalTerms
  );

  return (
    <>
      <Script
        id="glossary-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData,
        }}
      />
      <Glossary />
    </>
  );
}
