import { Metadata } from "next";
import Academy from "../components/Academy";

export const metadata: Metadata = {
  title: "Interactive Academy Portal | Free Trading Masterclasses | PriceLot",
  description: "A comprehensive curriculum mapping core trading concepts. Structured tutorials spanning pips, lot calculations, leverage controls, and market psychology.",
  alternates: {
    canonical: "https://pricelot.com/academy",
  },
};

export default function AcademyPage() {
  return <Academy />;
}
