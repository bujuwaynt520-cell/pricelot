'use client';

import { useEffect, useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";
import type { WatchlistItem } from "@/app/types";

export default function AccountWatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userPlatformProvider.getCurrentUser().then((user) => {
      if (!user) {
        setWatchlist([]);
        setLoading(false);
        return;
      }

      userPlatformProvider.getWatchlist(user.id).then((items) => {
        setWatchlist(items);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Watchlist</h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-2xl">
          Track the markets you care about: forex pairs, gold, crypto, indices, and commodities.
        </p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">Loading...</div>
        ) : watchlist.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
            No watchlist items yet. Add symbols from the market hubs to begin monitoring them.
          </div>
        ) : (
          watchlist.map((item) => (
            <div key={item.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{item.assetType}</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">{item.displayName}</p>
                </div>
                <span className="text-xs text-zinc-500">Added {new Date(item.addedAt).toLocaleDateString()}</span>
              </div>
              {item.note ? <p className="mt-3 text-sm text-zinc-600">{item.note}</p> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
