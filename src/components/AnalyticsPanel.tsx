/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Terminal, X, ChevronUp, ChevronDown, Trash2, ShieldAlert } from "lucide-react";
import { useAnalytics, analyticsTracker } from "../hooks/useAnalytics";

export default function AnalyticsPanel() {
  const { events, trackEvent } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);

  const handleClearLogs = () => {
    // We can clear logs by calling a simulated method or tracking a reset event
    trackEvent("logs_cleared", "System", "Telemetry Logs Cleared");
  };

  return (
    <div
      id="analytics-console-drawer"
      className="fixed bottom-4 right-4 z-50 w-full max-w-sm md:max-w-md bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300"
    >
      {/* Collapsed Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </div>
          <span className="text-zinc-900 font-bold tracking-tight text-[11px] uppercase flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-orange-600" />
            Analytics Telemetry ({events.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 group-hover:text-orange-600 font-bold uppercase transition-colors">
            {isOpen ? "Collapse console" : "Open log viewer"}
          </span>
          {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-400 animate-bounce" /> : <ChevronUp className="w-4 h-4 text-zinc-400 animate-bounce" />}
        </div>
      </div>

      {/* Expanded Log List Area */}
      {isOpen && (
        <div className="h-72 flex flex-col justify-between bg-white animate-fade-in">
          
          {/* Diagnostic Disclaimer description */}
          <div className="px-4 py-2 bg-orange-50/50 border-b border-orange-100 text-[10px] text-orange-800 flex items-start gap-1.5 leading-snug">
            <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <p>
              <b>Simulated Telemetry:</b> Every search, backtest simulation, and broker click triggers real-time events captured by our <code>useAnalytics</code> framework.
            </p>
          </div>

          {/* List of event logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-left font-mono">
            {events.length > 0 ? (
              events.map((evt) => (
                <div key={evt.id} className="space-y-1 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 leading-normal animate-fade-in">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-150 pb-1">
                    <span>ID: {evt.id}</span>
                    <span>{evt.timestamp}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-orange-600 font-bold uppercase mr-1.5 text-[10px]">
                      [{evt.category}]
                    </span>
                    <span className="text-zinc-800 font-bold">{evt.action}</span>
                  </div>
                  {evt.label && (
                    <div className="text-zinc-600 pl-1 border-l border-zinc-200 text-[11px] italic">
                      "{evt.label}"
                    </div>
                  )}
                  {evt.metadata && Object.keys(evt.metadata).length > 0 && (
                    <pre className="text-[9px] text-zinc-500 mt-1.5 p-1.5 bg-zinc-100 rounded border border-zinc-200 overflow-x-auto">
                      {JSON.stringify(evt.metadata, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center text-[11px] py-10 space-y-2">
                <Terminal className="w-6 h-6 text-zinc-300" />
                <span>No analytics events in buffer memory. Click items to populate logs.</span>
              </div>
            )}
          </div>

          {/* Bottom Bar Controls */}
          <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-[9px] text-zinc-400">BUFFER DEPTH: 50 LOGS</span>
            <button
              onClick={handleClearLogs}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] rounded-lg font-bold cursor-pointer transition"
            >
              <Trash2 className="w-3 h-3 text-orange-400" /> Clear Events
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
