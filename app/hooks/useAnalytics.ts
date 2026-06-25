"use client";

import { useState, useEffect, useCallback } from "react";

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  label?: string;
  metadata?: Record<string, string | number | boolean>;
}

type Listener = (events: AnalyticsEvent[]) => void;

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.track("page_view", "System", "PriceLot Portal Loaded", {
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
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

  const trackEvent = useCallback(
    (
      action: string,
      category: string,
      label?: string,
      metadata?: Record<string, string | number | boolean>
    ) => {
      analyticsTracker.track(action, category, label, metadata);
    },
    []
  );

  return {
    events,
    trackEvent,
  };
}
