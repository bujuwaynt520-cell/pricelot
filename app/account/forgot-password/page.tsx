'use client';

import { useState } from "react";
import { userPlatformProvider } from "@/app/lib/services/userPlatform";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await userPlatformProvider.requestPasswordReset(email);
      setMessage("If a matching account exists, we’ve sent password reset instructions.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Password reset request failed.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">Forgot password</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Enter your email and we’ll send instructions for resetting your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm grid gap-4">
        <label className="space-y-2 text-sm text-zinc-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900"
            required
          />
        </label>
        <button type="submit" className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition">
          Send reset link
        </button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </form>
    </div>
  );
}
