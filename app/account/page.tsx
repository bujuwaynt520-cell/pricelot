import Link from "next/link";

export default function AccountHomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-zinc-900">My Account</h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-2xl">
          Manage your profile, saved insights, learning progress, and asset watchlists all in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Profile", href: "/account/profile", description: "Edit your account details and preferences." },
          { label: "Saved", href: "/account/saved", description: "Review your saved articles, lessons, strategies, and broker reviews." },
          { label: "Progress", href: "/account/progress", description: "Track lesson completion, strategy reviews, and reading history." },
          { label: "Watchlist", href: "/account/watchlist", description: "Manage forex, gold, crypto, indices, and commodities watchlists." },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{card.label}</h2>
            <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
