'use client';

import { useEffect, useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";
import type { UserProgress } from "@/app/types";

export default function AccountProgressPage() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userPlatformProvider.getCurrentUser().then((user) => {
      if (!user) {
        setProgress([]);
        setLoading(false);
        return;
      }

      userPlatformProvider.getProgress(user.id).then((items) => {
        setProgress(items);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Progress</h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-2xl">
          Review your lesson completions, strategy progress, and reading activity across the academy.
        </p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">Loading...</div>
        ) : progress.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
            Your progress log is empty. Start a lesson or strategy guide to see completion milestones here.
          </div>
        ) : (
          progress.map((item) => (
            <div key={item.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{item.contentType}</p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900">{item.title}</p>
                </div>
                <span className="text-xs text-zinc-500">Last viewed {item.lastViewedAt ? new Date(item.lastViewedAt).toLocaleDateString() : "—"}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Category</p>
                  <p className="mt-1 text-sm text-zinc-800">{item.category}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Progress</p>
                  <p className="mt-1 text-sm text-zinc-800">{item.progressPercentage}%</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Status</p>
                  <p className="mt-1 text-sm text-zinc-800">{item.isComplete ? "Complete" : "In progress"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
