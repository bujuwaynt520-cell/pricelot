import type { AffiliateProgram } from "@/app/types";

interface AffiliateCardProps {
  program: AffiliateProgram;
}

export default function AffiliateCard({ program }: AffiliateCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-950 px-6 py-4 text-slate-50">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Partner Offer</p>
        <h2 className="mt-2 text-lg font-semibold text-white">{program.name}</h2>
      </div>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-7 text-slate-700">{program.description}</p>
        <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Why this program?</p>
          <p>{program.highlights}</p>
        </div>
        <a
          href={program.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Visit partner site
        </a>
      </div>
    </article>
  );
}
