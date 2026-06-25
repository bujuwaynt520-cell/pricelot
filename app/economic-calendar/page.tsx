import { Metadata } from "next";
import EconomicCalendarComponent from "@/app/components/EconomicCalendarComponent";

export const metadata: Metadata = {
  title: "Economic Calendar - High Impact Events & Trading Alerts | PriceLot",
  description: "Real-time economic calendar with high-impact events (NFP, CPI, GDP). Track forex-moving indicators by currency and impact. Subscribe to alerts and filter by timezone.",
  keywords: [
    "Economic Calendar",
    "NFP",
    "CPI",
    "GDP",
    "FOMC",
    "Economic Events",
    "Forex Calendar",
    "Trading Events",
    "Economic Indicators",
  ],
  openGraph: {
    title: "Economic Calendar - High Impact Events & Trading Alerts | PriceLot",
    description: "Real-time economic calendar with high-impact events. Track forex-moving indicators by currency and impact.",
    type: "website",
  },
};

export default function EconomicCalendarPage() {
  return (
    <div className="space-y-2">
      <EconomicCalendarComponent />
    </div>
  );
}
