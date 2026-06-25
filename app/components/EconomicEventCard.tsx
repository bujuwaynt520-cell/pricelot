import Link from "next/link";
import { EconomicEvent } from "@/app/types/economic";
import {
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface EconomicEventCardProps {
  event: EconomicEvent;
}

const getFlagEmoji = (region?: string) => {
  switch (region) {
    case "US":
      return "🇺🇸";
    case "EU":
      return "🇪🇺";
    case "UK":
      return "🇬🇧";
    case "JP":
      return "🇯🇵";
    case "CA":
      return "🇨🇦";
    case "AU":
      return "🇦🇺";
    default:
      return "🌍";
  }
};

const parseValue = (value?: string | number | null) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

const getActualCardClasses = (event: EconomicEvent) => {
  const actualValue = parseValue(event.actual);
  const forecastValue = parseValue(event.forecast);

  if (actualValue !== null && forecastValue !== null) {
    if (actualValue > forecastValue) {
      return "bg-emerald-50 border-emerald-100 text-emerald-700";
    }
    if (actualValue < forecastValue) {
      return "bg-red-50 border-red-100 text-red-700";
    }
  }

  return "bg-zinc-50 border-zinc-200 text-zinc-800";
};

export default function EconomicEventCard({ event }: EconomicEventCardProps) {
  const eventTime = new Date(event.datetimeUtc);
  const timeString = eventTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-50 border-red-200 text-red-700";
      case "Medium":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "Low":
        return "bg-gray-50 border-gray-200 text-gray-700";
      default:
        return "bg-zinc-50 border-zinc-200 text-zinc-700";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "High":
        return <AlertTriangle className="w-4 h-4" />;
      case "Medium":
        return <AlertCircle className="w-4 h-4" />;
      case "Low":
        return <ArrowDownRight className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const importance = event.importance ?? (event.impact === "High" ? 5 : event.impact === "Medium" ? 3 : 2);

  return (
    <Link href={`/economic-calendar/${event.slug}`}>
      <div className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 p-6 rounded-3xl transition shadow-lg min-h-[340px] flex flex-col justify-between cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getFlagEmoji(event.region)}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{event.currency}</p>
                <p className="text-sm text-zinc-400">{event.country}</p>
              </div>
            </div>
            <div className={`text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border inline-flex items-center gap-2 ${getImpactColor(event.impact)}`}>
              {getImpactIcon(event.impact)}
              {event.impact}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-orange-600 transition leading-snug">
            {event.title}
          </h3>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-zinc-500 font-mono">
            <span>{timeString} UTC</span>
            <CountdownTimer utcTime={event.datetimeUtc} className="text-zinc-500" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-blue-700 font-semibold">Forecast</p>
            <p className="mt-2 text-sm font-bold text-zinc-900">
              {event.forecast ?? "—"}
              {event.unit && event.forecast ? event.unit : ""}
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Previous</p>
            <p className="mt-2 text-sm font-bold text-zinc-900">
              {event.previous ?? "—"}
              {event.unit && event.previous ? event.unit : ""}
            </p>
          </div>
          <div className={`${getActualCardClasses(event)} rounded-3xl px-4 py-3 text-center border text-sm font-bold`}> 
            <p className="text-[10px] uppercase tracking-widest font-semibold">Actual</p>
            <p className="mt-2 text-sm">
              {event.actual ?? "TBD"}
              {event.unit && event.actual ? event.unit : ""}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Importance {importance}/5</span>
          <span className="flex items-center gap-1">
            <span>{event.source}</span>
            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-orange-600 transition" />
          </span>
        </div>
      </div>
    </Link>
  );
}
