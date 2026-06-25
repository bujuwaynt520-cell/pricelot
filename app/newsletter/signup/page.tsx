import { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo";
import SignupForm from "./SignupForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Join the PriceLot Newsletter | Market Analysis Delivered",
  description: "Subscribe to the PriceLot newsletter for market briefings, trading playbooks, and weekly insights sent directly to your inbox.",
  canonical: "https://pricelot.com/newsletter/signup",
  keywords: ["newsletter signup", "trading newsletter", "market briefings", "email list"],
});

export default function NewsletterSignupPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-left">
      <SignupForm />
    </div>
  );
}
