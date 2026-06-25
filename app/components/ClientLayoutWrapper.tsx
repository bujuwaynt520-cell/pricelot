"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SearchOverlay from "./SearchOverlay";
import { useAnalytics } from "../hooks/useAnalytics";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { trackEvent } = useAnalytics();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Monitor path changes and log page views
  useEffect(() => {
    trackEvent("page_view_changed", "Navigation", `Navigated to ${pathname || "/"}`, {
      path: pathname || "/",
      timestamp: new Date().toISOString(),
    });
    
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        trackEvent("search_hotkey_pressed", "Search", "Ctrl+K Key Trigger");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="pricelot-root-layout" className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between selection:bg-orange-600 selection:text-white font-sans">
      
      {/* Navigation Header */}
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {children}
      </main>

      {/* Footer Block */}
      <Footer />

      {/* Global Search Dialog Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
}
