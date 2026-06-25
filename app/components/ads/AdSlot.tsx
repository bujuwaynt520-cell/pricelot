import type { MonetizationPlacement } from "@/app/types";

interface AdSlotProps {
  placement: MonetizationPlacement;
  className?: string;
}

const PLACEMENT_LABELS: Record<MonetizationPlacement, string> = {
  "top-banner": "Top Banner",
  sidebar: "Sidebar",
  "in-content": "In-Content",
  footer: "Footer",
};

export default function AdSlot({ placement, className = "" }: AdSlotProps) {
  const label = PLACEMENT_LABELS[placement] ?? "Advertisement";

  return (
    <div className={`rounded-3xl border border-zinc-200 bg-slate-950/90 p-6 text-left text-sm text-slate-100 shadow-sm ${className}`}>
      <div className="mb-3 inline-flex items-center rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-200">
        {label} Placeholder
      </div>
      <div className="space-y-2">
        <p className="text-zinc-300">This is a monetization placeholder for the {label.toLowerCase()} ad placement.</p>
        <p className="text-[11px] text-zinc-500">Implement your ad network or programmatic slot here when ready.</p>
      </div>
    </div>
  );
}
