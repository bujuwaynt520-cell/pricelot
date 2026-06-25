'use client';

import { useEffect, useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";
import type { SavedContentItem, User } from "@/app/types";

export default function AccountSavedPage() {
  const [savedContent, setSavedContent] = useState<SavedContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userPlatformProvider.getCurrentUser().then((user) => {
      if (!user) {
        setSavedContent([]);
        setLoading(false);
        return;
      }

      userPlatformProvider.getSavedContent(user.id).then((items) => {
        setSavedContent(items);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Saved Content</h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-2xl">
          Keep track of articles, lessons, strategies, and broker reviews you want to revisit.
        </p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">Loading...</div>
        ) : savedContent.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
            No saved items yet. Save content from strategy guides, academy lessons, or market analysis pages.
          </div>
        ) : (
          savedContent.map((item) => (
            <div key={item.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{item.source}</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">{item.title}</p>
                </div>
                <span className="text-xs text-zinc-500">{new Date(item.savedAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{item.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
