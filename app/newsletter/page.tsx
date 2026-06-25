import { Metadata } from "next";
import Link from "next/link";
import { buildCollectionJsonLd, buildPageMetadata } from "../lib/seo";
import { getSampleNewsletterIssues, NewsletterIssue } from "../lib/services/newsletter";
import { Mail, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "PriceLot Newsletter Archive | Trading Research & Market Briefings",
  description: "Browse past PriceLot newsletter issues, market briefings, trade ideas, and subscriber-only insights to support better trading decisions.",
  canonical: "https://pricelot.com/newsletter",
  keywords: ["newsletter", "trading newsletter", "market briefing", "email newsletter", "PriceLot newsletter"],
});

export default function NewsletterIndexPage() {
  const issues: NewsletterIssue[] = getSampleNewsletterIssues();
  const newsletterJsonLd = buildCollectionJsonLd({
    name: "PriceLot Newsletter Archive",
    description: "Browse archived newsletter issues and market briefings delivered by PriceLot.",
    url: "https://pricelot.com/newsletter",
    itemList: issues.map((issue, index) => ({
      position: index + 1,
      name: issue.title,
      url: `https://pricelot.com${issue.url}`,
    })),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: newsletterJsonLd }} />
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Mail className="w-4 h-4" /> PriceLot Newsletter
            </div>
            <h1 className="text-4xl font-serif font-black italic text-zinc-900 tracking-tight">
              Subscribe for weekly market intelligence and trading playbooks.
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
              Get the latest issue delivered to your inbox and access archived editorials, trade alerts, and strategies before they publish on the site.
            </p>
          </div>
          <Link
            href="/newsletter/signup"
            className="inline-flex items-center gap-2 rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-orange-500 transition"
          >
            <Sparkles className="w-4 h-4" /> Join the newsletter
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            href={issue.url}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 text-zinc-500 text-xs uppercase tracking-[0.3em] font-bold">
              <span>{issue.publishDate}</span>
              <span>{issue.tags.join(" • ")}</span>
            </div>
            <h2 className="mt-4 text-2xl font-serif font-black text-zinc-900 group-hover:text-orange-600 transition">
              {issue.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{issue.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {issue.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
              Read issue <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
