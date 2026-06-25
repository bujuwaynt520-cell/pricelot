/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import DashboardHome from "./components/DashboardHome";
import BrokerReview from "./components/BrokerReview";
import StrategyLibrary from "./components/StrategyLibrary";
import Academy from "./components/Academy";
import Glossary from "./components/Glossary";
import TradingToolsHub from "./components/TradingToolsHub";
import SearchOverlay from "./components/SearchOverlay";
import SEOConfigurator from "./components/SEOConfigurator";
import AnalyticsPanel from "./components/AnalyticsPanel";
import { useAnalytics } from "./hooks/useAnalytics";

export default function App() {
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Monitor tab changes and log page views
  useEffect(() => {
    trackEvent("page_view_changed", "Navigation", `Navigated to ${activeTab}`, {
      tab: activeTab,
      timestamp: new Date().toISOString(),
    });
    // Reset selected item when navigating between primary tabs
    setSelectedItemId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

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

  const handleNavigate = (tab: string, itemId?: string) => {
    setActiveTab(tab);
    if (itemId) {
      setSelectedItemId(itemId);
    } else {
      setSelectedItemId(null);
    }
  };

  const handleClearSelection = () => {
    setSelectedItemId(null);
  };

  return (
    <div id="pricelot-root-layout" className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between selection:bg-orange-600 selection:text-white font-sans">
      
      {/* Navigation Header */}
      <Navigation
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Responsive Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Workspace Column */}
          <div className="lg:col-span-8 space-y-8 col-span-12">
            {activeTab === "home" && (
              <DashboardHome
                onNavigate={handleNavigate}
                onOpenSearch={() => setIsSearchOpen(true)}
              />
            )}
            
            {activeTab === "brokers" && (
              <BrokerReview
                selectedBrokerId={selectedItemId}
                onClearSelection={handleClearSelection}
              />
            )}

            {activeTab === "strategies" && (
              <StrategyLibrary
                selectedStrategyId={selectedItemId}
                onClearSelection={handleClearSelection}
              />
            )}

            {activeTab === "academy" && (
              <Academy
                selectedLessonId={selectedItemId}
                onClearSelection={handleClearSelection}
              />
            )}

            {activeTab === "glossary" && (
              <Glossary
                selectedTermId={selectedItemId}
                onClearSelection={handleClearSelection}
              />
            )}

            {activeTab === "tools" && (
              <TradingToolsHub
                onNavigate={handleNavigate}
              />
            )}
          </div>

          {/* Right Sidebar: Dynamic Real-time SEO and Indexing inspector */}
          <aside className="lg:col-span-4 space-y-6 col-span-12">
            <SEOConfigurator
              activeTab={activeTab}
              selectedItemId={selectedItemId}
            />

            {/* Quick search reminder for sidebar */}
            <div className="bg-white border border-zinc-200 p-6 rounded-xl space-y-3 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Usability Hack</span>
              <h5 className="font-serif font-bold text-zinc-900 text-sm italic">Keyboard Navigation</h5>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-zinc-700 font-mono text-[10px]">Ctrl+K</kbd> anywhere on the site to trigger our search indexing scanner instantly.
              </p>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg border border-zinc-900 transition cursor-pointer uppercase tracking-wider"
              >
                Scan Site Elements
              </button>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer Block */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Search Dialog Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating Collapsible Real-time Analytics Tracker Console */}
      <AnalyticsPanel />

    </div>
  );
}
