/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Menu, X, ArrowUpRight, ShieldCheck, BookOpen, Layers, GraduationCap, Compass, Calculator } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

interface NavigationProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
}

export default function Navigation({ activeTab, onNavigate, onOpenSearch }: NavigationProps) {
  const { trackEvent } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Compass },
    { id: "brokers", label: "Brokers", icon: ShieldCheck },
    { id: "strategies", label: "Strategies", icon: Layers },
    { id: "academy", label: "Academy", icon: GraduationCap },
    { id: "glossary", label: "Glossary", icon: BookOpen },
    { id: "tools", label: "Tools", icon: Calculator },
  ];

  const handleNav = (tabId: string) => {
    trackEvent("navigation_clicked", "Navigation", tabId);
    onNavigate(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex items-baseline">
            <span className="text-2xl font-serif font-black tracking-tighter uppercase text-zinc-900 group-hover:text-orange-600 transition-colors duration-200">
              PriceLot<span className="text-orange-600">.</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-wider uppercase text-zinc-400 ml-2.5 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200/60 leading-none">Trading Hub V1</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/60 p-1 border border-zinc-200/80 rounded-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-orange-400" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              trackEvent("search_triggered", "Navigation", "Search Button Clicked");
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 hover:text-zinc-950 border border-zinc-200 rounded-full transition text-sm cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline font-bold text-[9px] font-mono bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">Ctrl+K</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition shadow-sm"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white p-4 space-y-2 animate-fade-in shadow-inner">
          <div className="text-zinc-400 text-[10px] font-mono tracking-wider uppercase px-3 pb-1">Navigation Menu</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${
                  isActive
                    ? "bg-orange-50 border border-orange-200 text-orange-600"
                    : "bg-zinc-50 text-zinc-600 hover:text-zinc-950 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-zinc-400"}`} />
                <span className="font-bold text-sm uppercase tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
