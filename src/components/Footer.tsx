/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, TrendingUp, Sparkles, BookOpen, Layers, ShieldCheck, Mail, Globe } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { trackEvent } = useAnalytics();

  const handleLinkClick = (tabId: string, context: string) => {
    trackEvent("footer_link_clicked", "Footer", `${context} -> ${tabId}`);
    onNavigate(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 border-t border-zinc-900 mt-16 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick("home", "Brand Logo")}>
              <span className="text-2xl font-serif font-black tracking-tighter uppercase text-white hover:text-orange-500 transition-colors duration-200">
                PriceLot<span className="text-orange-500">.</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              PriceLot is an independent financial education portal and broker analytics suite. We equip retail traders with institutional-grade data, backtested strategy mechanics, and neutral broker comparisons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="mailto:support@pricelot.com" onClick={() => trackEvent("footer_contact", "Footer", "Email Clicked")} className="p-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white rounded-lg border border-zinc-800 transition">
                <Mail className="w-4 h-4 text-zinc-400" />
              </a>
              <a href="#" onClick={() => trackEvent("footer_contact", "Footer", "Website Clicked")} className="p-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white rounded-lg border border-zinc-800 transition">
                <Globe className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div>
            <h5 className="text-sm font-serif font-bold italic text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-500" /> Platform Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick("brokers", "Broker Directory")} className="hover:text-orange-500 transition-colors text-left">
                  Broker Intelligence Matrix
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("strategies", "Strategy Library")} className="hover:text-orange-500 transition-colors text-left">
                  Systematic Strategy Index
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("academy", "Academy")} className="hover:text-orange-500 transition-colors text-left">
                  Interactive Academy Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("glossary", "Glossary")} className="hover:text-orange-500 transition-colors text-left">
                  A-Z Market Dictionary
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("tools", "Tools Hub")} className="hover:text-orange-500 transition-colors text-left font-semibold text-orange-500/90">
                  Risk & Position Calculators
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Guides */}
          <div>
            <h5 className="text-sm font-serif font-bold italic text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" /> Key Lessons
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick("academy", "Quick Lesson 1")} className="hover:text-orange-500 transition-colors text-left">
                  Pips, Lots & Leverage Demystified
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("academy", "Quick Lesson 2")} className="hover:text-orange-500 transition-colors text-left">
                  Support & Resistance Frameworks
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("academy", "Quick Lesson 3")} className="hover:text-orange-500 transition-colors text-left">
                  Surviving Multi-trade Drawdowns
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("academy", "Quick Lesson 4")} className="hover:text-orange-500 transition-colors text-left">
                  The Risk-Reward Ratio Equations
                </button>
              </li>
            </ul>
          </div>

          {/* Dynamic Spotlight */}
          <div>
            <h5 className="text-sm font-serif font-bold italic text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" /> Systematic Spotlights
            </h5>
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-2.5">
              <div className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-bold">Featured Concept</div>
              <div className="text-xs text-white font-semibold">"Role Reversal Principle"</div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                When resistance breaks, it flips into dynamic support. Leverage this standard price behavior to enhance entry precision.
              </p>
              <button 
                onClick={() => handleLinkClick("glossary", "Spotlight Glossary")}
                className="text-[11px] font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition uppercase tracking-wide"
              >
                Look up in Glossary <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="mt-8 pt-4 pb-4 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-900 text-[10px] text-zinc-500 leading-relaxed space-y-2">
          <div className="font-serif font-bold italic text-orange-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" /> HIGH RISK INVESTMENT WARNING
          </div>
          <p>
            Trading foreign exchange (Forex) and Contracts for Difference (CFDs) carries a high level of risk and may not be suitable for all investors. The high degree of leverage available can work against you as well as for you. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you could sustain a loss of some or all of your initial investment; therefore, do not invest money that you cannot afford to lose.
          </p>
          <p>
            Any opinions, news, research, analyses, prices, strategies, or other information contained on this website is provided as general market commentary and educational material, and does not constitute investment advice. PriceLot will not accept liability for any loss or damage, including without limitation, any loss of profit, which may arise directly or indirectly from use of or reliance on such information.
          </p>
        </div>

        {/* Bottom Rights */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            © 2026 PriceLot Hub. All rights reserved. Managed under global educational frameworks.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
