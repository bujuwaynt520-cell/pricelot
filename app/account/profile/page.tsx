'use client';

import { useEffect, useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";
import type { User } from "@/app/types";

export default function AccountProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userPlatformProvider.getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Profile</h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-2xl">
          View and update your personal details, display name, and notification preferences.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Account Summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Email</p>
            <p className="mt-1 text-sm text-zinc-800">{user?.email ?? "Not signed in"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Verified</p>
            <p className="mt-1 text-sm text-zinc-800">{user?.emailVerified ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Member since</p>
            <p className="mt-1 text-sm text-zinc-800">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Display name</p>
            <p className="mt-1 text-sm text-zinc-800">{user?.profile.displayName ?? "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
