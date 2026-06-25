'use client';

import { useEffect, useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<string>("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("Missing verification token.");
      return;
    }

    userPlatformProvider.verifyEmail(token).then((success) => {
      setStatus(success ? "Email verified successfully." : "Verification failed or token expired.");
    });
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Email verification</h1>
        <p className="mt-3 text-sm text-zinc-600">{status}</p>
      </div>
    </div>
  );
}
