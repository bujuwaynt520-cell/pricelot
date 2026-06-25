import { Metadata } from "next";
import { getEconomicEvents, getEconomicEventBySlug } from "@/app/lib/services/economicCalendar";
import { EconomicEvent } from "@/app/types/economic";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, TrendingUp, BarChart3, Clock } from "lucide-react";
import CountdownTimer from "@/app/components/CountdownTimer";

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const events = await getEconomicEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const event = await getEconomicEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Event Not Found | PriceLot",
      description: "This economic event could not be found.",
    };
  }

  return {
    title: `${event.title} - ${event.currency} | Economic Calendar | PriceLot`,
    description: `${event.title} for ${event.country}. Impact: ${event.impact}. Forecast: ${event.forecast}, Previous: ${event.previous}. Track this event's impact on ${event.currency}.`,
    keywords: [
      event.title,
      event.currency,
      "Economic Event",
      event.category,
      "Forex Calendar",
    ],
    openGraph: {
      title: `${event.title} - ${event.currency}`,
      description: `${event.title} for ${event.country}. Impact: ${event.impact}.`,
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await getEconomicEventBySlug(params.slug);

  if (!event) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Event Not Found</h1>
        <p className="text-zinc-600 mb-6">The economic event you're looking for could not be found.</p>
        <Link
          href="/economic-calendar"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calendar
        </Link>
      </div>
    );
  }

  const eventTime = new Date(event.datetimeUtc);
  const timeString = eventTime.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 border-red-300 text-red-900";
      case "Medium":
        return "bg-orange-100 border-orange-300 text-orange-900";
      case "Low":
        return "bg-gray-100 border-gray-300 text-gray-900";
      default:
        return "bg-zinc-100 border-zinc-300 text-zinc-900";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "High":
        return <AlertTriangle className="w-5 h-5" />;
      case "Medium":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link
        href="/economic-calendar"
        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-500 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Calendar
      </Link>

      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 space-y-6">
        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>{event.country}</span>
            <span>•</span>
            <span>{event.category}</span>
          </div>

          {/* Title and Impact */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-black italic text-zinc-900 mb-2">
                {event.title}
              </h1>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-2xl">
                {event.notes ||
                  `Economic indicator measuring ${event.title.toLowerCase()}. This is a${
                    event.impact === "High" ? " high-impact" : " medium-impact"
                  } event that typically influences ${event.currency} currency movements.`}
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center px-6 py-4 rounded-xl border ${getImpactColor(event.impact)} min-w-fit`}>
              {getImpactIcon(event.impact)}
              <span className="text-xs font-bold uppercase tracking-wider mt-1">{event.impact} Impact</span>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-zinc-200 pt-6">
          {/* Date/Time */}
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">Event Time</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-mono text-sm font-bold text-zinc-900">{timeString}</span>
            </div>
          </div>

          {/* Currency */}
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">Currency</span>
            <span className="font-mono text-lg font-black text-orange-600">{event.currency}</span>
          </div>

          {/* Source */}
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">Source</span>
            <span className="font-mono text-sm font-bold text-zinc-900">{event.source}</span>
          </div>

          {/* Countdown (if applicable) */}
          {new Date(event.datetimeUtc) > new Date() && (
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">Time Until</span>
              <CountdownTimer utcTime={event.datetimeUtc} className="mt-1" />
            </div>
          )}
        </div>
      </div>

      {/* Data Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Forecast */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">Forecast</h3>
          <div className="text-3xl font-black text-blue-900">
            {event.forecast !== null && event.forecast !== undefined ? (
              <>
                {event.forecast}
                {event.unit && <span className="text-lg">{event.unit}</span>}
              </>
            ) : (
              "—"
            )}
          </div>
          <p className="text-xs text-blue-800">
            Expected economic data release value
          </p>
        </div>

        {/* Previous */}
        <div className="bg-zinc-50 border-2 border-zinc-200 rounded-xl p-6 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">Previous</h3>
          <div className="text-3xl font-black text-zinc-900">
            {event.previous !== null && event.previous !== undefined ? (
              <>
                {event.previous}
                {event.unit && <span className="text-lg">{event.unit}</span>}
              </>
            ) : (
              "—"
            )}
          </div>
          <p className="text-xs text-zinc-800">
            Last period actual result
          </p>
        </div>

        {/* Actual */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-green-700">Actual</h3>
          <div className="text-3xl font-black text-green-900">
            {event.actual !== null && event.actual !== undefined ? (
              <>
                {event.actual}
                {event.unit && <span className="text-lg">{event.unit}</span>}
              </>
            ) : (
              "Pending Release"
            )}
          </div>
          <p className="text-xs text-green-800">
            Official released data value
          </p>
        </div>
      </div>

      {/* Trading Impact Section */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Trading Impact & Strategy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-orange-900 text-sm">What This Means</h3>
            <p className="text-sm text-orange-800 leading-relaxed">
              The <strong>{event.title}</strong> is an economic measure of {event.category?.toLowerCase() || "economic activity"}. A {event.impact} impact rating means traders should be prepared for notable {event.currency} volatility around the release time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-orange-900 text-sm">Trading Tips</h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>✓ Check your position sizes before the event</li>
              <li>✓ Widen your stops to allow for volatility</li>
              <li>✓ Use limit orders rather than market orders</li>
              <li>✓ Consider waiting for the number before entering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-zinc-900">Related Tools & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/tools/session-clock"
            className="p-4 border border-zinc-200 hover:border-orange-200 rounded-lg transition hover:bg-orange-50"
          >
            <h3 className="font-bold text-sm text-zinc-900 mb-1">Session Clock</h3>
            <p className="text-xs text-zinc-600">Convert this event time to your local timezone</p>
          </Link>
          <Link
            href="/tools"
            className="p-4 border border-zinc-200 hover:border-orange-200 rounded-lg transition hover:bg-orange-50"
          >
            <h3 className="font-bold text-sm text-zinc-900 mb-1">Position Sizing Calculator</h3>
            <p className="text-xs text-zinc-600">Calculate proper risk for volatile events</p>
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.notes || `${event.title} economic event`,
            startDate: event.datetimeUtc,
            location: {
              "@type": "Place",
              name: event.country,
            },
            organizer: {
              "@type": "Organization",
              name: event.source,
            },
          }),
        }}
      />
    </div>
  );
}
