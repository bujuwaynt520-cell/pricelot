"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnalyticsEvent } from "../types";

type Listener = (events: AnalyticsEvent[]) => void;

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      // Seed with initial page view
      this.track("page_view", "System", "PriceLot Portal Loaded", {
        url: window.location.href,
        userAgent: navigator?.userAgent || "unknown",
      });
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Push current list to new listener
    listener([...this.events]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public track(
    action: string,
    category: string,
    label?: string,
    metadata?: Record<string, string | number | boolean>
  ) {
    const newEvent: AnalyticsEvent = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toLocaleTimeString(),
      action,
      category,
      label,
      metadata,
    };

    // Keep only last 50 events to prevent memory bloat
    this.events = [newEvent, ...this.events].slice(0, 50);
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.events]));
  }
}

// Global instance
export const analyticsTracker = new AnalyticsTracker();

export function useAnalytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    const unsubscribe = analyticsTracker.subscribe((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return unsubscribe;
  }, []);

  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    metadata?: Record<string, string | number | boolean>
  ) => {
    analyticsTracker.track(action, category, label, metadata);
  };

  return {
    events,
    trackEvent,
  };
}
