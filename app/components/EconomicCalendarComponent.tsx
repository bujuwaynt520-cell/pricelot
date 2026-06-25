"use client";

import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import { EconomicEvent } from "@/app/types/economic";
import { Calendar, Filter, Download, Bell } from "lucide-react";
import CountdownTimer from "@/app/components/CountdownTimer";
import EconomicEventCard from "@/app/components/EconomicEventCard";
import { useAnalytics } from "@/app/hooks/useAnalytics";

export default function EconomicCalendarComponent() {
  const { trackEvent } = useAnalytics();
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedImpact, setSelectedImpact] = useState<string>("");

  // Fetch calendar data
  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedDate) params.append("date", selectedDate);
        if (selectedCurrency) params.append("currency", selectedCurrency);
        if (selectedImpact) params.append("impact", selectedImpact);

        const res = await fetch(`/api/economic-calendar?${params.toString()}`);
        const data = await res.json();
        setEvents(data.events || []);

        trackEvent("calendar_loaded", "Economic Calendar", `Loaded ${data.events?.length} events`, {
          date: selectedDate,
          currency: selectedCurrency,
          impact: selectedImpact,
        });
      } catch (error) {
        console.error("Failed to fetch calendar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [selectedDate, selectedCurrency, selectedImpact, trackEvent]);

  // User search filtering
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return events;

    return events.filter((event) => {
      const values = [event.title, event.country, event.currency, event.category, event.source];
      return values.some((value) => value?.toLowerCase().includes(query));
    });
  }, [events, searchQuery]);

  // Get unique currencies for filter
  const uniqueCurrencies = Array.from(new Set(events.map((e) => e.currency))).sort();

  const highImpactTodayEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.impact === "High" &&
          event.datetimeUtc.startsWith(selectedDate)
      ),
    [events, selectedDate]
  );

  const nextEvent = useMemo(() => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.datetimeUtc).getTime() > now.getTime())
      .sort((a, b) => new Date(a.datetimeUtc).getTime() - new Date(b.datetimeUtc).getTime())[0];
  }, [events]);

  // Group events by time
  const groupedEvents = filteredEvents.reduce(
    (acc, event) => {
      const time = new Date(event.datetimeUtc).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      });
      if (!acc[time]) {
        acc[time] = [];
      }
      acc[time].push(event);
      return acc;
    },
    {} as Record<string, EconomicEvent[]>
  );

  const sortedTimes = Object.keys(groupedEvents).sort();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    trackEvent("calendar_filter_date", "Economic Calendar", newDate);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency === selectedCurrency ? "" : currency);
    trackEvent("calendar_filter_currency", "Economic Calendar", currency);
  };

  const handleImpactChange = (impact: string) => {
    setSelectedImpact(impact === selectedImpact ? "" : impact);
    trackEvent("calendar_filter_impact", "Economic Calendar", impact);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    trackEvent("calendar_search", "Economic Calendar", e.target.value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-950/50 border border-orange-900/30 px-2 py-0.5 rounded">
                Live Calendar
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black italic text-white">
              Economic Events Calendar
            </h1>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
              Track high-impact economic indicators in real-time. Monitor NFP, CPI, GDP, and 100+ other events that move currency pairs. Filter by impact level and currency to focus on what matters.
            </p>
          </div>
          <button
            onClick={() => trackEvent("calendar_subscribe_clicked", "Economic Calendar", "Subscribe button")}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg whitespace-nowrap"
          >
            <Bell className="w-4 h-4 inline mr-1.5" />
            Subscribe to Alerts
          </button>
        </div>
      </div>

      {/* Next Event Hero */}
      {nextEvent && (
        <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-700">
                <span>Next Event Countdown</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900">{nextEvent.title}</h2>
              <p className="text-sm text-zinc-600 max-w-2xl">
                {nextEvent.country} • {nextEvent.currency} • {nextEvent.category}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-1 rounded-full bg-zinc-100">Impact: {nextEvent.impact}</span>
                <span className="px-2 py-1 rounded-full bg-zinc-100">Importance: {nextEvent.importance ?? (nextEvent.impact === "High" ? 5 : nextEvent.impact === "Medium" ? 3 : 2)}/5</span>
              </div>
            </div>
            <div className="rounded-3xl bg-zinc-950 px-6 py-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-widest text-zinc-300">Next release</p>
                  <div className="mt-4 text-3xl md:text-4xl font-semibold">
                <CountdownTimer utcTime={nextEvent.datetimeUtc} className="text-white" />
              </div>
              <div className="mt-3 text-lg font-semibold text-orange-300">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(nextEvent.datetimeUtc).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })} UTC
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-400">UTC time shown. Tap event for full details.</p>
            </div>
          </div>
        </div>
      )}

      {/* High Impact Today */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">High Impact Today</p>
            <h2 className="text-xl font-semibold text-zinc-900">Stay ahead of today’s biggest market movers</h2>
          </div>
          <p className="text-sm text-zinc-600">
            {highImpactTodayEvents.length} high-impact event{highImpactTodayEvents.length === 1 ? "" : "s"} scheduled for {selectedDate}.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {highImpactTodayEvents.length > 0 ? (
            highImpactTodayEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-3xl border border-zinc-100 p-4 bg-zinc-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{event.currency}</p>
                    <h3 className="mt-2 text-base font-semibold text-zinc-900">{event.title}</h3>
                  </div>
                  <span className="text-2xl">{event.region === "EU" ? "🇪🇺" : event.region === "US" ? "🇺🇸" : event.region === "UK" ? "🇬🇧" : event.region === "JP" ? "🇯🇵" : event.region === "CA" ? "🇨🇦" : event.region === "AU" ? "🇦🇺" : "🌐"}</span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>{new Date(event.datetimeUtc).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC</span>
                  <span className="rounded-full bg-red-50 px-2 py-1 text-red-700">{event.impact}</span>
                </div>
                <p className="mt-3 text-sm text-zinc-600">Importance {event.importance ?? (event.impact === "High" ? 5 : event.impact === "Medium" ? 3 : 2)}/5</p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-zinc-100 p-6 bg-zinc-50 text-zinc-600">
              No high-impact events are scheduled for this day.
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange-600" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">Filters</h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search events, countries, currencies..."
              className="w-full md:w-80 px-3 py-2 border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={() => trackEvent("calendar_export", "Economic Calendar", "Export CSV")}
              className="text-xs font-mono font-bold text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded hover:bg-zinc-100 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Date (UTC)</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Currency Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Currency</label>
            <div className="flex flex-wrap gap-2">
              {uniqueCurrencies.slice(0, 5).map((curr) => (
                <button
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`px-3 py-1.5 text-xs font-bold font-mono rounded border transition ${
                    selectedCurrency === curr
                      ? "bg-orange-100 border-orange-300 text-orange-700"
                      : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {curr}
                </button>
              ))}
              {uniqueCurrencies.length > 5 && (
                <span className="text-xs text-zinc-500 font-mono py-1.5">+{uniqueCurrencies.length - 5}</span>
              )}
            </div>
          </div>

          {/* Impact Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Impact</label>
            <div className="flex gap-2">
              {["High", "Medium", "Low"].map((impact) => (
                <button
                  key={impact}
                  onClick={() => handleImpactChange(impact)}
                  className={`px-3 py-1.5 text-xs font-bold font-mono rounded border transition ${
                    selectedImpact === impact
                      ? "bg-red-100 border-red-300 text-red-700"
                      : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {impact}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-zinc-100 pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedDate(new Date().toISOString().split("T")[0]);
              trackEvent("calendar_quick_link", "Economic Calendar", "Today");
            }}
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 px-3 py-1.5 rounded hover:bg-orange-50 transition"
          >
            Today
          </button>
          <button
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setSelectedDate(tomorrow.toISOString().split("T")[0]);
              trackEvent("calendar_quick_link", "Economic Calendar", "Tomorrow");
            }}
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 px-3 py-1.5 rounded hover:bg-orange-50 transition"
          >
            Tomorrow
          </button>
          <button
            onClick={() => {
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              setSelectedDate(nextWeek.toISOString().split("T")[0]);
              trackEvent("calendar_quick_link", "Economic Calendar", "Next Week");
            }}
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 px-3 py-1.5 rounded hover:bg-orange-50 transition"
          >
            Next Week
          </button>
          <button
            onClick={() => trackEvent("calendar_export", "Economic Calendar", "Export CSV")}
            className="ml-auto text-xs font-mono font-bold text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded hover:bg-zinc-100 transition flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-500 mt-3 text-sm">Loading calendar events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white border border-zinc-200 rounded-xl">
          <p className="text-zinc-600 font-mono">No events found for the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedTimes.map((time) => (
            <div key={time} className="space-y-3">
              <div className="flex items-center gap-3 px-1">
                <span className="text-sm font-bold text-zinc-700 bg-orange-100 px-3 py-1.5 rounded-full font-mono min-w-fit">
                  {time} UTC
                </span>
                <div className="flex-1 h-px bg-zinc-200"></div>
                <span className="text-xs text-zinc-500 font-mono">{groupedEvents[time].length} event(s)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedEvents[time].map((event) => (
                  <EconomicEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-2">
        <h3 className="text-sm font-bold text-blue-900">💡 Pro Tips</h3>
        <ul className="text-xs text-blue-800 space-y-1 leading-relaxed">
          <li>• <strong>High Impact events</strong> typically cause the largest currency moves. Plan your risk management accordingly.</li>
          <li>• <strong>Times shown are UTC.</strong> Use our Session Clock tool to convert to your local timezone.</li>
          <li>• <strong>Subscribe to alerts</strong> for specific currencies to get notified 1 hour before major data releases.</li>
        </ul>
      </div>
    </div>
  );
}
