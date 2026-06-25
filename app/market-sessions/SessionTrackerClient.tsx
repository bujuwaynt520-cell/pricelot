"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Clock, Globe, Layers } from "lucide-react";

type Session = {
  id: string;
  name: string;
  startUtcHour: number; // 0-23
  endUtcHour: number; // 0-23, end exclusive
  color: string;
};

const SESSIONS: Session[] = [
  { id: "sydney", name: "Sydney", startUtcHour: 22, endUtcHour: 7, color: "bg-amber-200" },
  { id: "tokyo", name: "Tokyo", startUtcHour: 0, endUtcHour: 9, color: "bg-rose-200" },
  { id: "london", name: "London", startUtcHour: 8, endUtcHour: 17, color: "bg-sky-200" },
  { id: "newyork", name: "New York", startUtcHour: 13, endUtcHour: 22, color: "bg-lime-200" },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function utcNow(): Date {
  return new Date(new Date().toISOString());
}

function hoursMinutesFromDate(d: Date) {
  return { hours: d.getUTCHours(), minutes: d.getUTCMinutes(), seconds: d.getUTCSeconds() };
}

function inSession(nowUtc: Date, session: Session) {
  const h = nowUtc.getUTCHours();
  const m = nowUtc.getUTCMinutes();
  // Handle wrap-around sessions where start > end (Sydney)
  if (session.startUtcHour < session.endUtcHour) {
    return h >= session.startUtcHour && (h < session.endUtcHour || (h === session.endUtcHour && m === 0));
  }
  return h >= session.startUtcHour || h < session.endUtcHour;
}

function sessionEndUtc(nowUtc: Date, session: Session) {
  const end = new Date(nowUtc.toISOString());
  // set to session.endUtcHour (next occurrence)
  end.setUTCMinutes(0, 0, 0);
  const h = nowUtc.getUTCHours();
  if (session.startUtcHour < session.endUtcHour) {
    // same-day end
    end.setUTCHours(session.endUtcHour);
    if (h >= session.endUtcHour) {
      // already passed; move to next day
      end.setUTCDate(end.getUTCDate() + 1);
    }
  } else {
    // wrap-around e.g., 22 -> 7
    if (h < session.endUtcHour) {
      // we're after midnight before end
      end.setUTCHours(session.endUtcHour);
    } else {
      // we're same day before midnight, end is next day at endUtcHour
      end.setUTCDate(end.getUTCDate() + 1);
      end.setUTCHours(session.endUtcHour);
    }
  }
  return end;
}

function sessionStartUtc(nowUtc: Date, session: Session) {
  const start = new Date(nowUtc.toISOString());
  start.setUTCMinutes(0, 0, 0);
  const h = nowUtc.getUTCHours();
  if (session.startUtcHour < session.endUtcHour) {
    start.setUTCHours(session.startUtcHour);
    if (h >= session.startUtcHour) {
      // today at start
    } else {
      // earlier in future? set to previous day
      start.setUTCDate(start.getUTCDate() - 1);
    }
  } else {
    // wrap-around (start > end)
    if (h >= session.startUtcHour) {
      start.setUTCHours(session.startUtcHour);
    } else {
      // before start hour (after midnight), start was yesterday
      start.setUTCDate(start.getUTCDate() - 1);
      start.setUTCHours(session.startUtcHour);
    }
  }
  return start;
}

function msToHMS(ms: number) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function SessionTrackerClient() {
  const [now, setNow] = useState<Date>(utcNow());
  const [tz, setTz] = useState<string>("UTC");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    const id = setInterval(() => setNow(utcNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const { hours, minutes, seconds } = hoursMinutesFromDate(now);

  const activeSessions = useMemo(() => {
    return SESSIONS.filter((s) => inSession(now, s));
  }, [now]);

  const active = activeSessions.length > 0 ? activeSessions[0] : null;

  const nextSession = useMemo(() => {
    // find next session start after now in UTC order
    const nowH = now.getUTCHours();
    const candidates = SESSIONS.map((s) => {
      const start = sessionStartUtc(now, s);
      const nextStart = new Date(start.toISOString());
      if (start <= now) {
        // move to next occurrence
        nextStart.setUTCDate(nextStart.getUTCDate() + 1);
      }
      return { s, nextStart };
    });
    candidates.sort((a, b) => a.nextStart.getTime() - b.nextStart.getTime());
    return candidates[0];
  }, [now]);

  const timeToNextOpen = nextSession ? nextSession.nextStart.getTime() - now.getTime() : 0;
  const timeToClose = active ? sessionEndUtc(now, active).getTime() - now.getTime() : 0;

  // compute overlaps: for each pair, check if intervals intersect
  const overlaps = useMemo(() => {
    const pairs: { a: Session; b: Session; overlap: boolean }[] = [];
    const getRange = (now: Date, s: Session) => {
      const start = sessionStartUtc(now, s);
      const end = sessionEndUtc(now, s);
      return { start: start.getTime(), end: end.getTime() };
    };
    for (let i = 0; i < SESSIONS.length; i++) {
      for (let j = i + 1; j < SESSIONS.length; j++) {
        const r1 = getRange(now, SESSIONS[i]);
        const r2 = getRange(now, SESSIONS[j]);
        const overlap = Math.max(r1.start, r2.start) < Math.min(r1.end, r2.end);
        pairs.push({ a: SESSIONS[i], b: SESSIONS[j], overlap });
      }
    }
    return pairs.filter((p) => p.overlap);
  }, [now]);

  // timeline rendering: compute percent positions on 24h scale
  const timeline = useMemo(() => {
    const scale = (hour: number) => (hour / 24) * 100;
    return SESSIONS.map((s) => {
      // for wrap-around, create two segments
      if (s.startUtcHour < s.endUtcHour) {
        const left = scale(s.startUtcHour);
        const width = scale(s.endUtcHour) - left;
        return [{ left, width, s }];
      }
      // wrap-around: from start to 24, and 0 to end
      const left1 = scale(s.startUtcHour);
      const width1 = 100 - left1;
      const left2 = 0;
      const width2 = scale(s.endUtcHour) - left2;
      return [ { left: left1, width: width1, s }, { left: left2, width: width2, s } ];
    }).flat();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">UTC Clock</div>
            <div className="flex items-baseline gap-4 mt-2">
              <div className="text-3xl font-mono font-bold">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</div>
              <div className="text-sm text-zinc-500">Timezone: {tz}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Market Status</div>
            <div className="mt-2 flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-700"}`}>
                {active ? "OPEN" : "CLOSED"}
              </div>
              <div className="text-sm text-zinc-500">Active: {active ? active.name : "None"}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative h-8 bg-zinc-50 rounded-full border border-zinc-100 overflow-hidden">
            {timeline.map((seg, idx) => (
              <div
                key={idx}
                className={`absolute top-0 h-8 z-10 ${seg.s.color} opacity-80 border-r border-zinc-100`}
                style={{ left: `${seg.left}%`, width: `${seg.width}%` }}
                title={`${seg.s.name} ${seg.s.startUtcHour}:00 - ${seg.s.endUtcHour}:00 UTC`}
              />
            ))}

            {/* current UTC marker */}
            <div
              className="absolute top-0 h-8 w-px bg-orange-600 z-20"
              style={{ left: `${(now.getUTCHours() + now.getUTCMinutes() / 60) / 24 * 100}%` }}
            />
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3">
            {SESSIONS.map((s) => {
              const isActive = inSession(now, s);
              const end = sessionEndUtc(now, s);
              const start = sessionStartUtc(now, s);
              return (
                <div key={s.id} className={`p-3 rounded-2xl border ${isActive ? "border-orange-200 shadow-sm" : "border-zinc-200"} bg-white`}> 
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-orange-500" : "bg-zinc-300"}`} />
                      <div className="font-semibold text-sm">{s.name}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{isActive ? "Open" : "Closed"}</div>
                  </div>

                  <div className="mt-3 text-xs text-zinc-500">UTC: {pad(s.startUtcHour)}:00 - {pad(s.endUtcHour)}:00</div>
                  <div className="text-xs text-zinc-500">Local: {start.toLocaleString()} — {end.toLocaleString()}</div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>Closes in</div>
                    <div className="font-mono font-bold">{isActive ? msToHMS(end.getTime() - now.getTime()) : "--:--:--"}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>Next session opens</div>
              <div className="font-mono font-bold">{msToHMS(timeToNextOpen)}</div>
            </div>
            {active && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <div>Current session closes in</div>
                <div className="font-mono font-bold">{msToHMS(timeToClose)}</div>
              </div>
            )}

            {overlaps.length > 0 && (
              <div className="mt-3 text-xs text-zinc-500">
                <strong>Overlaps:</strong> {overlaps.map((o) => `${o.a.name}/${o.b.name}`).join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
