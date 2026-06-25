import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/app/lib/seo";
import { getSampleNewsletterIssues, NewsletterIssue } from "@/app/lib/services/newsletter";
import NewsletterCTA from "@/app/components/NewsletterCTA";

interface PageProps {
  params: { issue: string };
}

export function generateStaticParams() {
  return getSampleNewsletterIssues().map((issue) => ({ issue: issue.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const issue = getSampleNewsletterIssues().find((item) => item.id === params.issue);

  if (!issue) {
    return {
      title: "Newsletter Issue Not Found | PriceLot",
      description: "The requested newsletter issue could not be found.",
    };
  }

  return buildPageMetadata({
    title: `${issue.title} | PriceLot Newsletter`,
    description: issue.description,
    canonical: `https://pricelot.com/newsletter/${issue.id}`,
    keywords: ["newsletter", "PriceLot newsletter", "market briefing", ...issue.tags],
    type: "article",
  });
}

export default function NewsletterIssuePage({ params }: PageProps) {
  const issue = getSampleNewsletterIssues().find((item) => item.id === params.issue);

  if (!issue) {
    notFound();
  }

  const issueJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: issue.title,
    description: issue.description,
    datePublished: issue.publishDate,
    url: `https://pricelot.com/newsletter/${issue.id}`,
    author: {
      "@type": "Organization",
      name: "PriceLot",
    },
    publisher: {
      "@type": "Organization",
      name: "PriceLot",
    },
    keywords: issue.tags.join(", "),
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: issueJsonLd }} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
              Newsletter Issue
            </div>
            <h1 className="mt-4 text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
              {issue.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 max-w-3xl">
              {issue.description}
            </p>
          </div>
          <div className="text-right text-sm text-zinc-500">
            <div>Published {issue.publishDate}</div>
            <div>{issue.tags.join(" • ")}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-slate-950/95 p-8 text-white shadow-sm">
          <h2 className="text-xl font-semibold text-orange-400">Issue highlights</h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-200">
            {issue.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Why this issue matters</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            This newsletter issue delivers a concise market briefing, actionable trade ideas, and strategy guidance for modern traders. Subscribe to get future issues first.
          </p>
          <Link
            href="/newsletter/signup"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Subscribe for future issues
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900">Newsletter archive access</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Every PriceLot issue is stored in the archive so traders can revisit market themes, setups, and risk management lessons anytime.
        </p>
        <Link
          href="/newsletter"
          className="mt-6 inline-flex items-center gap-2 rounded-3xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
        >
          Browse all newsletter issues
        </Link>
      </div>

      <NewsletterCTA />
    </div>
  );
}
